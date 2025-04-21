const fs = require('fs').promises;
const path = require('path');

exports.handler = async (event) => {
  try {
    const data = JSON.parse(event.body);
    const submissionsDir = path.join(process.cwd(), 'data/submissions');
    await fs.mkdir(submissionsDir, { recursive: true });
    const filename = `submission-${Date.now()}.json`;
    const filePath = path.join(submissionsDir, filename);

    await fs.writeFile(filePath, JSON.stringify(data, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Submission saved successfully' })
    };
  } catch (error) {
    console.error('Error saving submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to save submission' })
    };
  }
};