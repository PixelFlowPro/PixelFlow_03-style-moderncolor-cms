const fs = require('fs').promises;
const path = require('path');
const yaml = require('js-yaml');

async function parseMarkdownFile(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8');
    const normalizedContent = content.replace(/\r\n/g, '\n').replace(/^\uFEFF/, '').trim();
    const frontmatterMatch = normalizedContent.match(/^---\n([\s\S]*?)(?:\n---\s*(?:\n|$)|$)/);
    if (!frontmatterMatch) {
      console.warn(`No valid frontmatter in: ${filePath}`);
      return { metadata: {}, body: normalizedContent };
    }
    const frontmatter = frontmatterMatch[1].trim();
    if (!frontmatter) {
      console.warn(`Empty frontmatter in: ${filePath}`);
      return { metadata: {}, body: normalizedContent };
    }
    const metadata = yaml.load(frontmatter, { schema: yaml.FAILSAFE_SCHEMA }) || {};
    const body = normalizedContent.slice(frontmatterMatch[0].length).trim();
    return { metadata, body };
  } catch (error) {
    console.error(`Error parsing file: ${filePath}`, error);
    return { metadata: {}, body: '' };
  }
}

async function generateFileList(dir, outputFile, isSingleFile = false) {
  try {
    await fs.access(dir);
    if (isSingleFile) {
      const filePath = path.join(dir, 'skills.md');
      const { metadata } = await parseMarkdownFile(filePath);
      await fs.writeFile(outputFile, JSON.stringify(metadata, null, 2));
      console.log(`Generated: ${outputFile}`);
      return;
    }

    const files = await fs.readdir(dir);
    const mdFiles = files.filter(file => file.endsWith('.md'));
    if (!mdFiles.length) {
      console.warn(`No Markdown files found in: ${dir}`);
      await fs.writeFile(outputFile, JSON.stringify([]));
      return;
    }

    const items = await Promise.all(
      mdFiles.map(async file => {
        const filePath = path.join(dir, file);
        const { metadata, body } = await parseMarkdownFile(filePath);
        return {
          name: file.replace('.md', ''),
          path: `/${path.join(dir, file).replace(/\\/g, '/').replace(/^.*?(?=data)/, '')}`,
          metadata,
          body
        };
      })
    );

    await fs.writeFile(outputFile, JSON.stringify(items.filter(item => Object.keys(item.metadata).length > 0), null, 2));
    console.log(`Generated: ${outputFile}`);
  } catch (error) {
    console.error(`Error processing directory: ${dir}`, error);
    await fs.writeFile(outputFile, JSON.stringify(isSingleFile ? {} : []));
  }
}

(async () => {
  await generateFileList(path.join(__dirname, 'data/projects'), path.join(__dirname, 'data/projects.json'));
  await generateFileList(path.join(__dirname, 'data/offers'), path.join(__dirname, 'data/offers.json'));
  await generateFileList(path.join(__dirname, 'data/skills'), path.join(__dirname, 'data/skills.json'), true);
})();