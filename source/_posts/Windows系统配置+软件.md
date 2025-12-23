---
title: Windows系统配置+软件
categories: Windows
tags:
  - 电脑
  - 配置
  - 软件
abbrlink: ab19a1ed
description: 新电脑初始化配置+常用软件
date: 2024-06-06 00:00:00
---

## 前言

老电脑服役 7 年终于退休，新电脑配置已经确定，作为重度电脑使用者，梳理下常用的系统配置+常用软件备份，方便己用。

## 系统配置

> 操作系统：Windows11

**桌面设置**

- 系统名称：设置-主页更改电脑名称

- 个性化：主题颜色+壁纸+mac 鼠标样式
- 任务栏：关闭/隐藏任务项、托盘图标关闭、其他系统托盘图标打开、任务栏行为全部关闭、从不合并
- 更新：Windows 系统更新至最新，打开更新提醒

- 文件夹选项：打开资源管理器时打开此电脑、文件夹视图、显示隐藏文件、显示文件后缀

**系统设置**

- 开机启动
- 磁盘清理

## 软件列表

**系统工具**

- Clash\UU 加速器
- Chrome\Edge
- MacType
- Logitech Options
- GeekUninstaller
- 思源黑体、思源宋体、思源编程

---

**生产力工具**

- Office：Office 365 家庭版 + Visio LTSC 专业版 2021
- Axure RP9
- Xmind
- Typora
- Vscode
- GIt\Node.js\Hexo

---

**生活软件**

- 微信\QQ\钉钉\腾讯会议：聊天软件
- Spotify\QQ 音乐：听歌软件
- 115 网盘\百度网盘：网盘软件
- Eagle：图片软件
- NeatReader：读书软件
- PotPlayer：视频软件
- High-Logic FontCreator 13：字体软件
- Internet Download Manager：下载软件
- Battle\Steam\完美世界对战平台\5E 对战平台：游戏平台

---

**Cursor Setting**

```json settings.json
// Cursor 编辑器核心配置文件
// 维护者: KAKARROT
// 包含视觉体验、代码规范及语言特定设置
{
  // 编辑器体验
  "editor.fontSize": 14,
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', Menlo, monospace",
  "editor.fontLigatures": true,
  "editor.lineHeight": 24,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.smoothScrolling": true,
  "editor.minimap.enabled": false,
  "editor.renderWhitespace": "selection",
  "editor.indentSize": "tabSize",

  // 文件与格式化
  "files.autoSave": "onFocusChange",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",

  // 语言配置
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2,
    "editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.tabSize": 2
  },
  "[python]": {
    "editor.defaultFormatter": "ms-python.black-formatter",
    "editor.tabSize": 4,
    "editor.formatOnType": true
  },
  "[markdown]": {
    "editor.wordWrap": "on",
    "editor.quickSuggestions": {
      "comments": "off",
      "strings": "off",
      "other": "off"
    },
    "editor.fontSize": 15
  },
  "[plaintext]": {
    "editor.wordWrap": "on",
    "editor.fontSize": 15
  },

  // Python
  "python.languageServer": "Pylance",
  "python.analysis.typeCheckingMode": "basic",
  "python.analysis.autoImportCompletions": true,
  "python.terminal.activateEnvironment": true,

  // Emmet
  "emmet.includeLanguages": { "vue-html": "html", "vue": "html" },

  // 终端
  "terminal.integrated.fontFamily": "'JetBrains Mono', monospace",
  "terminal.integrated.fontSize": 13,
  "terminal.integrated.cursorBlinking": true,

  // 文件排除
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/__pycache__": true,
    "**/*.pyc": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.venv": true
  },

  // 工作区
  "workbench.startupEditor": "newUntitledFile",
  "workbench.colorTheme": "Cursor Light",
  "explorer.confirmDelete": false,
  "git.enableSmartCommit": true,
  "git.confirmSync": false,

  // Claude Code
  "claudeCode.preferredLocation": "panel",
  "claudeCode.selectedModel": "opus"
}
```
