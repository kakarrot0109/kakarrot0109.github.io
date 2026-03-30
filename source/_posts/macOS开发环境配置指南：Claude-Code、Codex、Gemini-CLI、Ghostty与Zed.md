---
title: macOS开发环境配置指南：Claude Code、Codex、Gemini CLI、Ghostty与Zed
categories:
  - 技术教程
tags:
  - macOS
  - AI工具
  - 开发环境
  - 终端
  - 编辑器
abbrlink: 97de73d2
date: 2026-03-30 14:18:05
---

本文将详细介绍如何在 macOS 上配置现代化的 AI 辅助开发环境，包括三大 AI 编程助手（Claude Code、Codex、Gemini CLI）以及两款优秀的开发工具（Ghostty 终端和 Zed 编辑器）。

<!-- more -->

## 前置要求

- macOS 12.0 或更高版本
- Homebrew 包管理器
- 基本的命令行操作知识

如果尚未安装 Homebrew，请先执行：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

---

## 一、Claude Code 安装配置

Claude Code 是 Anthropic 官方推出的 AI 编程助手 CLI 工具，基于 Claude 模型提供智能代码辅助。

### 1.1 安装

```bash
# 使用 Homebrew 安装
brew install anthropics/claude/claude-code

# 验证安装
claude-code --version
```

### 1.2 配置

首次使用需要进行身份验证：

```bash
# 启动认证流程
claude-code auth login
```

按照提示在浏览器中完成 Anthropic 账号登录，授权后即可使用。

### 1.3 基本使用

```bash
# 启动交互式对话
claude-code chat

# 对指定文件进行操作
claude-code chat --file your-file.js

# 使用特定模型
claude-code chat --model opus
```

### 1.4 配置文件

Claude Code 的配置文件位于 `~/.claude/settings.json`，可以自定义：

```json
{
  "defaultModel": "opus",
  "autoApprove": false,
  "theme": "dark"
}
```

---

## 二、Codex 安装配置

Codex 是另一款强大的 AI 编程助手，提供代码生成、重构和解释功能。

### 2.1 安装

```bash
# 使用 npm 全局安装
npm install -g @codex-ai/cli

# 或使用 Homebrew
brew install codex-cli

# 验证安装
codex --version
```

### 2.2 配置

```bash
# 初始化配置
codex init

# 设置 API Key（需要先在官网注册）
codex config set apiKey YOUR_API_KEY
```

### 2.3 基本使用

```bash
# 启动交互模式
codex chat

# 生成代码
codex generate "create a REST API with Express"

# 解释代码
codex explain your-file.py

# 重构代码
codex refactor your-file.js --style functional
```

### 2.4 项目集成

在项目根目录创建 `.codexrc` 文件：

```json
{
  "language": "javascript",
  "framework": "react",
  "style": "functional",
  "testFramework": "jest"
}
```

---

## 三、Gemini CLI 安装配置

Gemini CLI 是 Google 推出的基于 Gemini 模型的命令行工具，支持多模态输入。

### 3.1 安装

```bash
# 使用 pip 安装
pip3 install google-generativeai-cli

# 或使用 Homebrew
brew install gemini-cli

# 验证安装
gemini --version
```

### 3.2 配置

```bash
# 设置 API Key（从 Google AI Studio 获取）
export GEMINI_API_KEY="your-api-key"

# 将环境变量添加到 shell 配置文件
echo 'export GEMINI_API_KEY="your-api-key"' >> ~/.zshrc
source ~/.zshrc
```

### 3.3 基本使用

```bash
# 文本对话
gemini chat "解释什么是闭包"

# 分析图片
gemini vision image.png "描述这张图片"

# 代码生成
gemini code "用 Python 实现快速排序"

# 交互模式
gemini interactive
```

### 3.4 高级配置

创建 `~/.gemini/config.yaml`：

```yaml
model: gemini-pro
temperature: 0.7
max_tokens: 2048
language: zh-CN
```

---

## 二、Codex 安装配置

Codex 是另一款强大的 AI 编程助手，提供代码生成、重构和解释功能。

### 2.1 安装

```bash
# 使用 npm 全局安装
npm install -g @codex-ai/cli

# 或使用 Homebrew
brew install codex-cli

# 验证安装
codex --version
```

### 2.2 配置

```bash
# 初始化配置
codex init

# 设置 API Key（需要先在官网注册）
codex config set apiKey YOUR_API_KEY
```

### 2.3 基本使用

```bash
# 启动交互模式
codex chat

# 生成代码
codex generate "create a REST API with Express"

# 解释代码
codex explain your-file.py

# 重构代码
codex refactor your-file.js --style functional
```

### 2.4 项目集成

在项目根目录创建 `.codexrc` 文件：

```json
{
  "language": "javascript",
  "framework": "react",
  "style": "functional",
  "testFramework": "jest"
}
```

---

## 三、Gemini CLI 安装配置

Gemini CLI 是 Google 推出的基于 Gemini 模型的命令行工具，支持多模态输入。

### 3.1 安装

```bash
# 使用 pip 安装
pip3 install google-generativeai-cli

# 或使用 Homebrew
brew install gemini-cli

# 验证安装
gemini --version
```

### 3.2 配置

```bash
# 设置 API Key（从 Google AI Studio 获取）
export GEMINI_API_KEY="your-api-key"

# 将环境变量添加到 shell 配置文件
echo 'export GEMINI_API_KEY="your-api-key"' >> ~/.zshrc
source ~/.zshrc
```

### 3.3 基本使用

```bash
# 文本对话
gemini chat "解释什么是闭包"

# 分析图片
gemini vision image.png "描述这张图片"

# 代码生成
gemini code "用 Python 实现快速排序"

# 交互模式
gemini interactive
```

### 3.4 高级配置

创建 `~/.gemini/config.yaml`：

```yaml
model: gemini-pro
temperature: 0.7
max_tokens: 2048
language: zh-CN
```

---

## 四、Ghostty 终端安装配置

Ghostty 是一款现代化的 GPU 加速终端模拟器，以其极快的渲染速度和简洁的设计著称。

### 4.1 安装

```bash
# 使用 Homebrew 安装
brew install --cask ghostty

# 或从官网下载 DMG 安装包
# https://ghostty.org/download
```

### 4.2 基础配置

配置文件位于 `~/.config/ghostty/config`：

```ini
# 字体设置
font-family = "JetBrains Mono"
font-size = 14

# 主题
theme = "catppuccin-mocha"

# 窗口设置
window-padding-x = 10
window-padding-y = 10
window-decoration = true

# 性能
gpu-renderer = metal
```

### 4.3 快捷键配置

```ini
# 新建标签页
keybind = cmd+t=new_tab

# 切换标签页
keybind = cmd+shift+[=previous_tab
keybind = cmd+shift+]=next_tab

# 分屏
keybind = cmd+d=split_horizontal
keybind = cmd+shift+d=split_vertical
```

---

## 五、Zed 编辑器安装配置

Zed 是一款高性能的现代代码编辑器，由 Atom 团队打造，原生支持 AI 辅助编程。

### 5.1 安装

```bash
# 使用 Homebrew 安装
brew install --cask zed

# 或从官网下载
# https://zed.dev/download
```

### 5.2 基础配置

打开 Zed，按 `Cmd+,` 进入设置，或编辑 `~/.config/zed/settings.json`：

```json
{
  "theme": "One Dark",
  "buffer_font_family": "JetBrains Mono",
  "buffer_font_size": 14,
  "ui_font_size": 14,
  "tab_size": 2,
  "format_on_save": "on",
  "autosave": "on_focus_change"
}
```

### 5.3 AI 助手集成

Zed 内置 AI 助手支持，配置方法：

```json
{
  "assistant": {
    "enabled": true,
    "default_model": {
      "provider": "anthropic",
      "model": "claude-opus-4"
    }
  }
}
```

使用快捷键 `Cmd+Shift+A` 唤起 AI 助手。

### 5.4 推荐扩展

在 Zed 中按 `Cmd+Shift+X` 打开扩展市场，推荐安装：

- **Vim Mode** - Vim 键位支持
- **Prettier** - 代码格式化
- **ESLint** - JavaScript 代码检查
- **GitLens** - Git 增强功能
- **Tailwind CSS** - Tailwind 智能提示

---

## 六、工作流整合

### 6.1 终端与 AI 工具联动

在 Ghostty 中使用 AI 工具的推荐工作流：

```bash
# 在 Ghostty 中启动 Claude Code
claude-code chat

# 或使用 Gemini 分析代码
gemini code "优化这段代码的性能" < your-file.js
```

### 6.2 Zed 与 AI 助手协作

在 Zed 中的典型工作流：

1. 编写代码时按 `Cmd+Shift+A` 唤起 AI 助手
2. 选中代码后右键选择"Ask AI"进行代码解释或重构
3. 使用 `Cmd+/` 快速注释，AI 会自动生成文档注释

### 6.3 推荐配置组合

| 场景 | 推荐工具组合 |
|------|-------------|
| 前端开发 | Zed + Claude Code + Ghostty |
| Python 数据分析 | Zed + Gemini CLI + Ghostty |
| 全栈开发 | Zed + Codex + Ghostty |
| 快速原型 | Claude Code + Gemini CLI |

---

## 七、常见问题

### 7.1 Claude Code 认证失败

```bash
# 清除旧的认证信息
rm -rf ~/.claude/auth

# 重新登录
claude-code auth login
```

### 7.2 Ghostty 字体显示异常

确保已安装 Nerd Font 字体：

```bash
brew tap homebrew/cask-fonts
brew install --cask font-jetbrains-mono-nerd-font
```

### 7.3 Zed 扩展安装失败

```bash
# 清除扩展缓存
rm -rf ~/.config/zed/extensions

# 重启 Zed
```

---

## 八、总结

通过本文的配置，你已经搭建了一套现代化的 AI 辅助开发环境：

- **Claude Code** - 强大的代码理解和生成能力
- **Codex** - 快速的代码重构和解释
- **Gemini CLI** - 多模态输入支持
- **Ghostty** - 高性能 GPU 加速终端
- **Zed** - 原生 AI 集成的现代编辑器

这套工具链可以显著提升开发效率，建议根据实际需求选择合适的工具组合。

---

## 参考资源

- [Claude Code 官方文档](https://docs.anthropic.com/claude-code)
- [Codex CLI GitHub](https://github.com/codex-ai/cli)
- [Gemini API 文档](https://ai.google.dev/docs)
- [Ghostty 官网](https://ghostty.org)
- [Zed 官方文档](https://zed.dev/docs)

---

**更新日期**: 2026-03-30
**适用系统**: macOS 12.0+
