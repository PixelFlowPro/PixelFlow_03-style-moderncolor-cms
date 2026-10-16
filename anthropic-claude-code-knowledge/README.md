# Anthropic — Claude Code: base de connaissances complète

Snapshot récupéré le **16 octobre 2026** depuis les sources officielles d'Anthropic :
la documentation officielle de Claude Code et de la plateforme Claude, le blog Engineering,
les annonces, les articles et guides de claude.com, et les dépôts GitHub publics `anthropics/*`.
Tout explique comment Anthropic construit son harnais (Claude Code / Agent SDK), conçoit ses agents
(subagents, skills, hooks, MCP, plugins, Managed Agents) et organise ses workflows.

| Dossier | Contenu | Fichiers | Source |
|---|---|---|---|
| [01-claude-code-docs](01-claude-code-docs/INDEX.md) | Toute la doc officielle Claude Code, Agent SDK compris (`agent-sdk/`), en Markdown d'origine | 228 | https://code.claude.com/docs/llms.txt |
| [02-claude-platform-docs](02-claude-platform-docs/INDEX.md) | Doc plateforme Claude : agents & outils, tool use, Agent Skills, MCP, Managed Agents, prompt engineering, modèles, **system prompts publiés** (`release-notes/system-prompts`) | 323 | https://platform.claude.com/llms.txt |
| [03-engineering-blog](03-engineering-blog/INDEX.md) | Tous les articles du blog Engineering d'Anthropic | 26 | https://www.anthropic.com/engineering |
| [04-anthropic-news](04-anthropic-news/INDEX.md) | Annonces liées à Claude Code, Agent SDK, Skills, MCP, sécurité | 10 | https://www.anthropic.com/news |
| [05-claude-com-resources](05-claude-com-resources/INDEX.md) | Articles et guides claude.com sur Claude Code, agents, skills, hooks, subagents, Cowork, Managed Agents… | 192 | https://claude.com/resources |
| [06-github-repos](06-github-repos/_COMMITS.txt) | 18 dépôts officiels (code source, plugins, skills, SDK, actions, cookbooks) | ~6 300 | https://github.com/anthropics |
| [_scripts](_scripts) | Scripts utilisés pour le scraping (relançables) | | |

## Par où commencer (harnais, agents, workflow)

**Comment fonctionne le harnais**
- `01-claude-code-docs/how-claude-code-works.md` — boucle agentique, outils intégrés
- `01-claude-code-docs/features-overview.md` — quand utiliser CLAUDE.md, skills, subagents, hooks, MCP, plugins
- `01-claude-code-docs/context-window.md`, `prompt-caching.md`, `memory.md`, `claude-directory.md`
- `01-claude-code-docs/agent-sdk/agent-loop.md`, `overview.md`, `modifying-system-prompts.md`
- `03-engineering-blog/effective-harnesses-for-long-running-agents.md`
- `03-engineering-blog/harness-design-long-running-apps.md`
- `03-engineering-blog/managed-agents.md`, `how-we-contain-claude.md`, `claude-code-sandboxing.md`, `claude-code-auto-mode.md`

**Comment ils façonnent leurs agents**
- `03-engineering-blog/building-effective-agents.md` — patterns de référence
- `03-engineering-blog/effective-context-engineering-for-ai-agents.md`
- `03-engineering-blog/writing-tools-for-agents.md`, `advanced-tool-use.md`, `code-execution-with-mcp.md`, `claude-think-tool.md`
- `03-engineering-blog/multi-agent-research-system.md`
- `03-engineering-blog/equipping-agents-for-the-real-world-with-agent-skills.md`
- `03-engineering-blog/demystifying-evals-for-ai-agents.md`
- `01-claude-code-docs/sub-agents.md`, `agent-teams.md`, `skills.md`, `hooks.md`, `hooks-guide.md`, `plugins.md`, `mcp.md`
- `02-claude-platform-docs/release-notes/system-prompts*` — prompts système publiés
- `02-claude-platform-docs/managed-agents/` — agents hébergés

**Workflows et bonnes pratiques**
- `03-engineering-blog/claude-code-best-practices.md`, `01-claude-code-docs/best-practices.md`, `common-workflows.md`
- `05-claude-com-resources/articles__how-anthropic-teams-use-claude-code.md`
- `05-claude-com-resources/articles__steering-claude-code-skills-hooks-rules-subagents-and-more.md`
- `05-claude-com-resources/articles__subagents-in-claude-code.md`, `articles__introducing-dynamic-workflows-in-claude-code.md`, `articles__multi-agent-coordination-patterns.md`
- `05-claude-com-resources/articles__how-claude-code-works-in-large-codebases-best-practices-and-where-to-start.md`

**Code source**
- `06-github-repos/claude-code/` — plugins officiels, exemples de hooks/commands/agents, types des mods, CHANGELOG complet
- `06-github-repos/claude-agent-sdk-python/`, `claude-agent-sdk-typescript/`, `claude-agent-sdk-demos/`
- `06-github-repos/skills/` — skills officielles (SKILL.md) ; `claude-plugins-official/`, `knowledge-work-plugins/`
- `06-github-repos/claude-code-action/` — Claude Code dans GitHub Actions ; `claude-code-security-review/`
- `06-github-repos/claude-quickstarts/` (dont `autonomous-coding`), `claude-cookbooks/`

## Notes sur la collecte
- Docs (01, 02) : fichiers `.md` officiels servis par les sites, inchangés. Langue : anglais.
  Exclus de 02 : les références d'API générées `api/beta`, `api/organization`, `api/compliance` (endpoints REST, sans rapport avec le harnais).
- Articles (03–05) : HTML converti en Markdown, avec en-tête `source:` pointant vers l'URL d'origine.
  Quelques guides claude.com (`guides__*` très courts) sont des pages de téléchargement protégées par formulaire : seul le texte public a été récupéré.
- Dépôts (06) : clone superficiel de la branche par défaut (commit et date dans `_COMMITS.txt`), sans `.git`,
  sans fichiers binaires (images, PDF, polices…), sans lockfiles, sans fichiers > 1 Mio ; sorties des notebooks Jupyter vidées.
  Licences d'origine conservées dans chaque dépôt.
- Pas d'accès à du contenu interne/non public d'Anthropic : uniquement ce qui est publié.
- Retirés car ils contiennent des tokens factices bloqués par la push protection GitHub : `claude-code-action/test/sanitizer.test.ts`, `claude-code-action/test/format-turns.test.ts`.
