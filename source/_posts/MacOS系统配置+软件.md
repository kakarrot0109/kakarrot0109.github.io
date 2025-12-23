---
title: MacOS系统配置+软件
categories: MacOS
tags:
  - 电脑
  - 配置
  - 软件
description: Mac电脑初始化配置+常用软件
abbrlink: a8db8342
date: 2024-06-06 00:00:00
---

## 前言

从 Windows 切换到 MacOS，作为重度电脑使用者，梳理下 Mac 常用的系统配置+常用软件备份，方便己用。

## 系统配置

> 操作系统：macOS Sequoia

**桌面设置**

- 系统名称：系统设置-通用-关于本机-名称
- 外观：浅色模式、强调色、高亮显示颜色
- 壁纸：系统设置-墙纸
- 程序坞：自动隐藏、调整大小、移除不常用图标
- 菜单栏：显示日期、电池百分比、隐藏 Siri 图标

**触控板/鼠标**

- 触控板：轻点来点按、三指拖移（辅助功能-指针控制）、更多手势全开
- 鼠标：调整跟踪速度、自然滚动关闭

**访达设置**

- 通用：新窗口显示位置改为用户目录
- 边栏：自定义常用文件夹
- 高级：显示所有文件扩展名、搜索当前文件夹
- 显示：显示路径栏、显示状态栏

**系统设置**

- 键盘：按键重复速率最快、重复前延迟最短
- 节能：根据需要调整
- 安全性：允许任何来源（终端执行：`sudo spctl --master-disable`）
- 登录项：管理开机启动

## 软件列表

**系统工具**

- Shadowrocket：代理工具
- Chrome：浏览器
- Raycast：效率启动器（替代 Spotlight）
- AppCleaner：软件卸载
- The Unarchiver：解压工具
- IINA：视频播放器
- MonitorControl：外接显示器亮度控制
- 思源黑体、思源宋体、Sarasa Gothic：字体

---

**生产力工具**

- Office 365：Word、Excel、PowerPoint
- Axure RP 10
- Xmind
- Typora
- VSCode\Cursor
- Git\Node.js\Hexo
- Homebrew：包管理器
- iTerm2：终端工具
- OrbStack：Docker 替代品

---

**生活软件**

- 微信\QQ\钉钉\腾讯会议：聊天软件
- Spotify\Apple Music：听歌软件
- 115 网盘\百度网盘：网盘软件
- Eagle：图片管理软件
- NeatReader：读书软件
- Steam：游戏平台

---

**Homebrew 常用命令**

```bash
# 安装 Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 常用命令
brew install <package>      # 安装软件包
brew install --cask <app>   # 安装 GUI 应用
brew update                 # 更新 Homebrew
brew upgrade                # 升级所有包
brew list                   # 列出已安装
brew cleanup                # 清理旧版本
```

---

**终端配置（Zsh）**

```bash
# 安装 Oh My Zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# 常用插件
plugins=(git zsh-autosuggestions zsh-syntax-highlighting)
```

---

**Git 配置**

```bash
# 全局配置
git config --global user.name "your-name"
git config --global user.email "your-email"

# 生成 SSH 密钥
ssh-keygen -t ed25519 -C "your-email"
```

---

**常用快捷键**

| 功能         | 快捷键             |
| ------------ | ------------------ |
| 截图         | Cmd + Shift + 4    |
| 全屏截图     | Cmd + Shift + 3    |
| 录屏         | Cmd + Shift + 5    |
| Spotlight    | Cmd + Space        |
| 强制退出     | Cmd + Option + Esc |
| 切换应用     | Cmd + Tab          |
| 关闭窗口     | Cmd + W            |
| 退出应用     | Cmd + Q            |
| 显示隐藏文件 | Cmd + Shift + .    |

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
