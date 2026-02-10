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
- AppCleaner：软件卸载

---

**生产力工具**

- Office 365：Word、Excel、PowerPoint
- Typora
- Cursor
- Git\Node.js\Hexo
- Homebrew：包管理器
- Ghostty：终端工具

---

**生活软件**

- 微信\QQ\钉钉\腾讯会议：聊天软件
- Spotify\Apple Music：听歌软件
- 115 网盘\百度网盘：网盘软件
- Eagle：图片管理软件

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

# 常用软件/工具
brew install git
brew install node
brew install pnpm
brew install mole
brew install --cask claude-code
npm install -g hexo-cli

# 常用字体
brew tap homebrew/cask-fonts
brew install --cask font-jetbrains-mono-nerd-font
brew install --cask font-black-han-sans
```

---

**Git 配置**

```bash
# 全局配置
git config --global user.name "your-name"
git config --global user.email "your-email"
```

---

**Hexo 配置**

```bash
## 按错误提示，在项目根目录执行：
rm -rf node_modules && npm install --force
## 或先清理缓存后再安装：
rm -rf node_modules package-lock.json && npm install
```