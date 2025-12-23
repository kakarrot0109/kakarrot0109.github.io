---
title: Hexo+Github轻量级博客搭建
categories: Hexo
tags:
  - Hexo
  - Blog
  - Github
abbrlink: 383a0bb0
date: 2014-01-01 00:00:00
description: Hexo博客上线，告别臃肿的WordPress，之前一直对于轻量级博客念念不忘，看来必有回响。
---

## Hexo 是什么？

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

### GitHub 优点

- 轻量级的博客系统，没有麻烦的配置
- 使用标记语言，比如 Markdown
- 无需自己搭建服务器
- 根据 Github 的限制，对应的每个站有 300MB 空间
- 可以绑定自己的域名

### Hexo 优点

- 用于搭建博客网站框架，可以简单实现优美的博客网站
- 在本地端搭建，就可脱机查阅
- 架构不依托于其他门户网站，不再担心门户网站倒闭，不担心博文丢失或难以导出
- 博文为 markdown 格式，通用，容易上手，便于快速书写
- 可部署在 github 上
- 创造者来自中国台湾，所以几乎所有模板都关注到了中文的兼容性，很适合使用汉语的码农

## 搭建方法

**新建 GitHub repository**

登录 GitHub 账号，新建 respository，名字为：username.github.io

**Hexo 安装**

```shell
node -v # 查看node版本
npm -v # 查看npm版本
npm install -g hexo-cli #-g表示全局安装，npm默认为当前项目安装
npm install hexo-server --save #安装server模块 hexo3.0更新
```

环境变量添加值`C:\Users\KAKARROT\AppData\Roaming\npm\hexo.cmd`

**Hexo 部署**

```shell
hexo init WebSite #新建博客文件夹
cd WebSite #进入博客文件夹
npm install #安装npm服务
hexo g #生成静态页面
hexo s #启动服务
```

现在就可以在 localhost:4000 查看网页了

**文件目录概览**

- public：执行 hexo generate 命令，输出的静态网页内容目录
- scaffolds：layout 模板文件目录，其中的 md 文件可以添加编辑
- scripts：扩展脚本目录，这里可以自定义一些 javascript 脚本
- source：文章源码目录，该目录下的 markdown 和 html 文件均会被 hexo 处理。该页面对应 repo 的根目录，404 文件、favicon.ico 文件，CNAME 文件等都应该放这里，该目录下可新建页面目录。
- drafts：草稿文章
- posts：发布文章 themes：主题文件目录
- config.yml：全局配置文件，大多数的设置都在这里
- package.json：应用程序数据，指明 hexo 的版本等信息，类似于一般软件中的关于按钮

**Hexo 部署到 GitHub**

```shell
npm install hexo-deployer-git --save
git config --global user.name "xxx" # 配置用户名
git config --global user.email "xxx@xxx.com" # 配置邮箱
```

在`Website\source`下新建文件`CNAME`

```md CNAME
kakarrot.com
```

## 域名解析

登录阿里云域名管理 添加 2 条解析记录

| 记录类型 | 主机记录 | 记录值                 |
| -------- | -------- | ---------------------- |
| CNAME    | WWW      | kakarrot0109.github.io |
| CNAME    | @        | kakarrot0109.github.io |

## 博客上线

解析后稍等 3-5min，强制刷新浏览器即可看到新站点。

## 博客同步

将源文件夹放至坚果云等同步网盘，实时同步。

## 参考链接

> https://hexo.io/zh-cn/docs/

> http://theme-next.iissnan.com/

> http://www.shuang0420.com/2016/05/12/Github-Pages-Hexo%E6%90%AD%E5%BB%BA%E4%B8%AA%E4%BA%BA%E5%8D%9A%E5%AE%A2/
