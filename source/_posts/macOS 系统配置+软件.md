---
title: macOS 系统配置+软件
date: 2026-03-30 16:45:57
categories:
  - 技术
tags:
  - macOS
  - 开发环境
  - Homebrew
---

# macOS 系统配置+软件

> 适用于 macOS (Apple Silicon)

## 一、系统基础配置

### 1.1 命令行工具

```bash
xcode-select --install
```

### 1.2 系统设置

**触控板**
- 轻点来点按
- 三指拖移：辅助功能 → 指针控制 → 触控板选项

**Finder**
- 显示文件扩展名
- 显示路径栏和状态栏

**安全**
- 启用 FileVault 磁盘加密
- 设置触控 ID

---

## 二、Homebrew 包管理器

### 2.1 安装 Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装完成后，根据提示将 Homebrew 添加到 PATH：

```bash
# Apple Silicon (M1/M2/M3)
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### 2.2 常用命令

```bash
brew install <软件名>           # 安装命令行工具
brew install --cask <应用名>    # 安装图形应用
brew upgrade                   # 升级所有软件
brew cleanup                   # 清理旧版本
```

### 2.3 推荐软件

**开发工具**

```bash
brew install git
brew install node
brew install mole
```

**浏览器**

```bash
brew install --cask google-chrome
```

**编辑器和 IDE**

```bash
brew install --cask zed                    # 现代化代码编辑器
brew install --cask typora                 # Markdown 编辑器
```

**终端**

```bash
brew install --cask ghostty                # 高性能终端
```

**笔记工具**

```bash
brew install --cask obsidian               # 知识管理
```

**通讯工具**

```bash
brew install --cask wechat                 # 微信
brew install --cask wechatwork             # 企业微信
brew install --cask feishu                 # 飞书
brew install --cask dingtalk               # 钉钉
```

**字体**

```bash
brew install --cask font-jetbrains-mono-nerd-font
```

---

## 三、AI 开发工具

### 3.1 Claude Code

```bash
brew install --cask claude-code
claude-code chat
```

配置文件：`~/.claude/CLAUDE.md`

### 3.2 Codex

```bash
brew install --cask codex
codex chat
```

### 3.3 Gemini CLI

```bash
brew install gemini-cli
export GEMINI_API_KEY="your-api-key"
gemini-cli chat
```

## 四、常见问题

**Homebrew 安装慢**
```bash
export HOMEBREW_BREW_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/brew.git"
export HOMEBREW_CORE_GIT_REMOTE="https://mirrors.tuna.tsinghua.edu.cn/git/homebrew/homebrew-core.git"
brew update
```

**权限错误**
```bash
sudo chown -R $(whoami) /opt/homebrew
```

---

*最后更新：2026-03-30*
