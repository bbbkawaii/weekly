# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Weekly 周总结 - A personal weekly summary webpage project for recording and displaying weekly learning, work, and life summaries.

## Technical Decisions

### 技术方案
- **部署平台**: Vercel
- **内容格式**: Markdown 文件（用户手写）
- **构建方式**: Node.js 构建脚本自动生成静态 HTML
- **主色调**: 橄榄绿
- **字体**: FZPingXYSK.TTF（方正屏显雅宋）
- **风格**: 简洁但精致（注重细节、排版、留白、微交互）
- **开发工具**: 使用 frontend-design 技能实现高质量前端界面

### 工作流程
1. 在 `posts/` 目录写 `.md` 文件（带 frontmatter: title, date）
2. 推送到 GitHub
3. Vercel 自动运行 `node build.js`
4. 脚本扫描所有 md 文件，生成静态 HTML 到 `dist/`
5. 部署完成

### 项目结构
```
weekly/
├── posts/                  # Markdown 周总结目录
│   └── 2025-01-week1.md   # 示例文件
├── templates/              # HTML 模板
│   ├── index.html         # 列表页模板
│   └── post.html          # 文章页模板
├── build.js               # 构建脚本
├── style.css              # 样式文件
├── package.json           # Node.js 配置
├── vercel.json            # Vercel 配置
└── FZPingXYSK.TTF         # 字体文件
```

## Development Guidelines

After making code changes, commit and push to GitHub.
