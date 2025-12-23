# Hexo 博客使用指南

## 📦 环境信息

- Node.js: v24.11.1
- npm: 11.6.2
- Hexo: 8.1.1
- 主题: Chic

## 🚀 常用命令

### 1. 启动本地服务器

```bash
npm run server
# 或
hexo server
```

访问地址：http://localhost:4000/

### 2. 创建新文章

```bash
hexo new "文章标题"
# 文章会创建在 source/_posts/ 目录下
```

### 3. 清理缓存

```bash
npm run clean
# 或
hexo clean
```

### 4. 生成静态文件

```bash
npm run build
# 或
hexo generate
```

### 5. 部署到 GitHub Pages

```bash
npm run deploy
# 或
hexo deploy
```

会自动部署到：https://github.com/kakarrot0109/kakarrot0109.github.io

### 6. 完整部署流程（推荐）

```bash
# 清理 -> 生成 -> 部署
hexo clean && hexo generate && hexo deploy
```

## 📝 文章管理

### 创建新文章

```bash
hexo new post "我的新文章"
```

### 创建草稿

```bash
hexo new draft "草稿标题"
```

### 发布草稿

```bash
hexo publish "草稿标题"
```

### 文章 Front-matter 示例

```yaml
---
title: 文章标题
date: 2025-01-23 10:00:00
categories:
  - 分类名
tags:
  - 标签1
  - 标签2
---
这里是文章内容...
```

## 🔧 配置文件

### 主配置文件

- `_config.yml` - Hexo 主配置
- `themes/Chic/_config.yml` - 主题配置

### 重要配置项

- **网站标题**: `_config.yml` 中的 `title`
- **作者信息**: `_config.yml` 中的 `author`
- **部署设置**: `_config.yml` 中的 `deploy`

## 📁 目录结构

```
blog/
├── _config.yml          # Hexo 配置文件
├── package.json         # 依赖管理
├── scaffolds/           # 模板文件
├── source/              # 源文件
│   ├── _posts/         # 文章目录
│   ├── about/          # 关于页面
│   └── CNAME           # 自定义域名
├── themes/              # 主题目录
│   └── Chic/           # 当前使用的主题
└── public/             # 生成的静态文件（git ignore）
```

## 🛠️ 常见问题

### 1. 端口被占用

如果启动服务器时提示端口 4000 被占用：

```bash
# 查找占用端口的进程
lsof -i :4000

# 杀掉进程
kill <PID>

# 或使用其他端口
hexo server -p 5000
```

### 2. 依赖安装

如果需要重新安装依赖：

```bash
rm -rf node_modules
npm install
```

### 3. 清理并重新生成

如果页面显示异常：

```bash
hexo clean
hexo generate
```

## 🌐 部署说明

### GitHub Pages 部署

1. 确保 `_config.yml` 中的 deploy 配置正确
2. 运行部署命令：

```bash
hexo deploy
```

### 自定义域名

- 域名配置文件：`source/CNAME`
- 当前域名：kakarrot.com

## 📚 插件列表

- **hexo-deployer-git**: Git 部署插件
- **hexo-abbrlink**: 永久链接生成
- **hexo-blog-encrypt**: 文章加密
- **hexo-generator-archive**: 归档页面生成
- **hexo-generator-category**: 分类页面生成
- **hexo-generator-tag**: 标签页面生成

## 💡 提示

1. 每次修改文章后，刷新浏览器即可看到更新（开发服务器会自动监听）
2. 部署前建议先在本地预览，确保一切正常
3. 重要修改前建议先用 git 提交当前版本
4. 可以使用 `hexo new draft` 创建草稿，编辑完成后再发布

## 🔗 相关链接

- Hexo 官方文档: https://hexo.io/zh-cn/docs/
- Chic 主题文档: https://github.com/Siricee/hexo-theme-Chic
- 博客仓库: https://github.com/kakarrot0109/kakarrot0109.github.io
