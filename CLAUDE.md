# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Weekly 周总结 - A personal weekly summary webpage project for recording and displaying weekly learning, work, and life summaries.

## Commands

```bash
npm install          # Install dependencies (gray-matter, marked)
npm run build        # Build static HTML to dist/
```

## Architecture

- **Build script** (`build.js`): Reads all `.md` files from `posts/`, parses frontmatter with gray-matter, converts Markdown to HTML with marked, and outputs static HTML to `dist/`
- **Templates** (`templates/`): `index.html` uses `{{posts}}` placeholder; `post.html` uses `{{title}}`, `{{date}}`, `{{content}}`
- **Posts** (`posts/`): Markdown files with YAML frontmatter (`title`, `date`). Posts are sorted by date descending.

## Technical Decisions

- **部署平台**: Vercel (auto-runs `node build.js` on push)
- **主色调**: 橄榄绿
- **字体**: FZPingXYSK.TTF（方正屏显雅宋）
- **风格**: 简洁但精致（注重细节、排版、留白、微交互）
- **开发工具**: 使用 frontend-design 技能实现高质量前端界面

## Development Guidelines

After making code changes, commit and push to GitHub.
