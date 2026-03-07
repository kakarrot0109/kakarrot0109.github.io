# CLAUDE.md

> AI 助手使用指南 - KAKARROT'S BLOG 项目

## 项目概述

这是一个基于 **Hexo 8.1.1** 构建的个人技术博客，使用 **Chic** 主题，部署在 GitHub Pages 上。

- **网站地址**: https://kakarrot.com
- **仓库地址**: https://github.com/kakarrot0109/kakarrot0109.github.io
- **博客主题**: 产品、哲学、历史、魔兽、音乐
- **作者**: KAKARROT
- **语言**: 简体中文 (zh-CN)
- **时区**: Asia/Shanghai

## 项目架构

### 技术栈

- **静态站点生成器**: Hexo 8.1.1
- **主题**: Chic
- **Node.js**: v24.11.1
- **包管理器**: npm 11.6.2
- **部署方式**: GitHub Pages (通过 hexo-deployer-git)
- **永久链接**: 使用 hexo-abbrlink 生成 CRC32 哈希

### 关键插件

- `hexo-deployer-git` - 自动部署到 GitHub
- `hexo-abbrlink` - 生成简短永久链接
- `hexo-blog-encrypt` - 文章加密功能
- `hexo-generator-*` - 归档/分类/标签页面生成

### 目录结构

```
website/
├── _config.yml           # Hexo 主配置文件
├── package.json          # 项目依赖
├── scaffolds/            # 文章模板
├── source/               # 源文件目录
│   ├── _posts/          # 博客文章 (Markdown)
│   ├── about/           # 关于页面
│   ├── category/        # 分类页面
│   ├── tag/             # 标签页面
│   └── CNAME            # 自定义域名配置
├── themes/               # 主题目录
│   └── Chic/            # 当前使用的 Chic 主题
├── public/              # 生成的静态文件 (被 .gitignore)
└── .deploy_git/         # Git 部署目录 (被 .gitignore)
```

## Git 工作流

### 分支策略

- **source**: 源代码分支（当前分支）- 存放 Hexo 源文件
- **master**: 部署分支 - 存放生成的静态网站文件

### 重要提示

⚠️ **永远不要直接修改 master 分支** - 这个分支由 `hexo deploy` 自动管理

## 开发工作流

### 1. 创建新文章

```bash
# 创建新文章
hexo new "文章标题"

# 创建草稿
hexo new draft "草稿标题"

# 发布草稿
hexo publish "草稿标题"
```

文章会创建在 `source/_posts/` 目录，使用 Markdown 格式。

### 2. Front Matter 规范

每篇文章应包含以下元数据：

```yaml
---
title: 文章标题
date: YYYY-MM-DD HH:mm:ss
categories:
  - 分类名称
tags:
  - 标签1
  - 标签2
abbrlink: auto-generated # 由 hexo-abbrlink 自动生成
---
```

### 3. 本地预览

```bash
# 启动开发服务器
npm run server
# 或
hexo server

# 访问地址: http://localhost:4000/
```

开发服务器会自动监听文件变化，刷新浏览器即可看到更新。

### 4. 清理和构建

```bash
# 清理缓存和生成的文件
npm run clean

# 生成静态文件
npm run build
```

### 5. 部署流程

```bash
# 完整部署流程（推荐）
hexo clean && hexo generate && hexo deploy

# 或使用 npm scripts
npm run clean && npm run build && npm run deploy
```

部署会自动推送到 `master` 分支的 GitHub Pages。

## Claude 助手指导原则

### 在处理此项目时，请遵循以下原则：

#### 1. 文章管理

- **创建新文章**: 使用 `hexo new` 命令，不要手动创建文件
- **Front Matter**: 始终包含 title, date, categories, tags
- **文件名**: Hexo 会根据 `new_post_name: :title.md` 自动生成
- **永久链接**: abbrlink 会自动生成，不要手动设置
- **内容格式**: 使用标准 Markdown 语法

#### 2. 配置修改

- **主配置**: 修改 `_config.yml` 时要格外小心
- **主题配置**: 主题配置在 `themes/Chic/_config.yml`
- **YAML 语法**: 确保缩进正确（使用空格，不是 Tab）
- **重启服务**: 修改配置后需要重启 `hexo server`

#### 3. 部署注意事项

- **部署前检查**:
  - 确保在 `source` 分支
  - 先本地预览确认无误
  - 运行 `hexo clean` 清理旧文件
- **不要直接操作**:
  - public/ 目录（自动生成）
  - .deploy_git/ 目录（自动管理）
  - master 分支（自动部署）
- **提交源码**: 在 source 分支提交 Markdown 源文件，而非生成的 HTML

#### 4. 故障排查

常见问题和解决方案：

```bash
# 端口被占用
lsof -i :4000
kill <PID>
# 或使用其他端口
hexo server -p 5000

# 页面显示异常
hexo clean && hexo generate

# 依赖问题
rm -rf node_modules
npm install

# 部署失败
# 检查 _config.yml 中的 deploy 配置
# 确保有 GitHub 仓库写入权限
```

#### 5. 文件操作约定

- **读取文章**: 使用 Read 工具读取 `source/_posts/*.md`
- **编辑文章**: 使用 Edit 工具修改现有文章
- **创建文章**: 使用 Bash 工具执行 `hexo new`
- **不要**: 直接操作 public/ 或 .deploy_git/ 目录

#### 6. Git 提交规范

提交信息应清晰描述变更内容：

```bash
# 好的示例
git commit -m "新增: 关于 Hexo 插件的文章"
git commit -m "更新: 修正关于页面的联系方式"
git commit -m "修复: 修复文章分类显示问题"

# 避免
git commit -m "update"
git commit -m "fix"
```

#### 7. 性能和最佳实践

- **图片**: 优先使用外链或 CDN，避免在源码仓库存储大文件
- **插件**: 谨慎添加插件，可能影响生成速度
- **缓存**: 遇到问题时优先尝试 `hexo clean`
- **预览**: 重大修改前在本地充分测试

## 常用命令速查

| 命令                              | 说明                |
| --------------------------------- | ------------------- |
| `hexo new "title"`                | 创建新文章          |
| `hexo new draft "title"`          | 创建草稿            |
| `hexo publish "title"`            | 发布草稿            |
| `hexo server` / `npm run server`  | 启动本地服务器      |
| `hexo clean` / `npm run clean`    | 清理缓存            |
| `hexo generate` / `npm run build` | 生成静态文件        |
| `hexo deploy` / `npm run deploy`  | 部署到 GitHub Pages |
| `hexo clean && hexo g && hexo d`  | 完整部署流程        |

## 环境要求

- Node.js >= 18.x (当前使用 v24.11.1)
- npm >= 8.x (当前使用 11.6.2)
- Git >= 2.x

## 相关链接

- [Hexo 官方文档](https://hexo.io/zh-cn/docs/)
- [Chic 主题文档](https://github.com/Siricee/hexo-theme-Chic)
- [Hexo Abbrlink 插件](https://github.com/rozbo/hexo-abbrlink)
- [项目 GitHub 仓库](https://github.com/kakarrot0109/kakarrot0109.github.io)

## 记住

1. **source 分支** = 源代码 (你应该在这里工作)
2. **master 分支** = 部署目标 (自动管理，不要手动修改)
3. 部署前一定要在本地预览
4. 配置文件使用空格缩进，不是 Tab
5. 永久链接由 abbrlink 自动生成，不要手动编辑
6. 遇到问题先尝试 `hexo clean`

---

**最后更新**: 2026-02-10
**维护者**: KAKARROT
