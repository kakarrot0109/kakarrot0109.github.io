---
title: Hexo更新升级
categories: Hexo
tags:
  - Hexo
  - Blog
  - Github
abbrlink: efab4cb0
description: Hexo博客上线后一直没空更新，强迫症走起来。
date: 2022-07-12 00:00:00
---

## npm 的全局软件更新

```shell
# 清理NPM缓存
$ npm cache clean -f

# 全局安装版本检测、版本升级工具
$ npm install -g npm-check
$ npm install -g npm-upgrade

# 全局检测哪些模块可以升级，这里可以根据打印的提示信息，手动安装最新版本的模块
$ npm-check -g

# 全局更新模块
$ npm update -g

# 全局安装或更新Hexo的最新版本
$ npm install --global hexo
```

## hexo 当前目录的软件更新

```shell
# 进入博客的根目录
$ cd /blog-root

# 检测Hexo哪些模块可以升级
$ npm-check

# 删除package-lock.json
# rm -rf package-lock.json

# 更新package.json，一直回车即可
$ npm-upgrade

# 删除整个模块目录，这样可以避免很多坑
$ rm -rf node_modules

# 更新Hexo的模块
$ npm update --save

# 若出现依赖的问题，用以下命令检查一下，然后把报错的统一修复一下即可
$ npm audix

# 或者强制更新
$ npm update --save --force
```

## 检查方法

在上述步骤完成后，package.json 将成为以下版本信息：

```json package.json
{
  "name": "hexo-site",
  "version": "0.0.0",
  "private": true,
  "scripts": {
    "build": "hexo generate",
    "clean": "hexo clean",
    "deploy": "hexo deploy",
    "server": "hexo server"
  },
  "hexo": {
    "version": "6.2.0"
  },
  "dependencies": {
    "hexo": "^6.2.0",
    "hexo-abbrlink": "^2.2.1",
    "hexo-deployer-git": "^3.0.0",
    "hexo-generator-archive": "^1.0.0",
    "hexo-generator-category": "^1.0.0",
    "hexo-generator-index": "^2.0.0",
    "hexo-generator-search": "^2.4.3",
    "hexo-generator-tag": "^1.0.0",
    "hexo-renderer-ejs": "^2.0.0",
    "hexo-renderer-marked": "^5.0.0",
    "hexo-renderer-pug": "^3.0.0",
    "hexo-renderer-stylus": "^2.0.1",
    "hexo-server": "^3.0.0",
    "hexo-theme-landscape": "^0.0.3"
  },
  "devDependencies": {
    "gulp": "^4.0.2",
    "gulp-clean-css": "^4.3.0",
    "gulp-fontmin": "^0.7.4",
    "gulp-html-minifier-terser": "^6.0.1",
    "gulp-htmlclean": "^2.7.22",
    "gulp-replace": "^1.1.3",
    "gulp-terser": "^2.1.0"
  }
}
```

在其它开发机上，也可以依据已更新成功的`package.json`，直接通过`npm install`进行升级。

## 问题

至此 Hexo 的升级就结束了，但是不要着急将源文件上传到仓库，先在本地三连一下`hexo clean && hexo g -d`，如果在执行`Hexo d`的时候报错了，可以尝试删除`.deploy_git`文件夹里面的内容，这个是前面生成的网站项目内容，与当前的不兼容。

如果还报错也可能是没按照步骤来，本文章里每个指令都有它的作用，可以删除重来一遍。

个人建议使用自动部署的同学先在本地三连一下，然后访问 github 的链接预览一下，确认一下没什么大问题再覆盖掉仓库。

## 参考链接

> https://sianx.com/posts/f16f368c/
