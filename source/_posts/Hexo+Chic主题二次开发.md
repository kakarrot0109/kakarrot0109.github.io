---
title: Hexo+Chic主题二次开发
categories: Hexo
tags:
  - Hexo
  - Blog
abbrlink: 11c47c28
description: Hexo "Chic"主题用过好久了，重新折腾一下。
date: 2022-06-07 00:00:00
---

## Chic theme 介绍

- 主题介绍：优雅、功能全面、阅读友好的 hexo 主题。
- 主题地址：[GitHub 仓库地址](https://github.com/Siricee/hexo-theme-Chic)

#### 下载主题

```shell
cd your-blog/themes
git clone https://github.com/Siricee/hexo-theme-Chic.git Chic
```

其中 `your-blog` 为你的博客目录。

如果你已经有了主题，那么可以使用 `git pull` 命令更新主题。

#### 启用主题

```shell
cd your-blog
vim _config.yml
```

找到 `theme` 字段，修改为 `Chic`
然后保存并退出。

#### 本地测试

```shell
hexo s
```

---

## Chic theme 自定义配置

#### 主题配置文件

配置文件修改为自己的信息。首页部分基本已经完成自定义了。

```yml _config.yml
# 头部
navname: Kakarrot's Blog

# 导航栏项目
nav:
  归档: /archives
  # 分类: /category
  # 标签: /tag
  关于: /about

# 网站图标
favicon: /favicon.ico

# 个人资料
nickname: Kakarrot

### 这个变量是 MarkDown 格式。
description: 我只想事情是它本来该有的那个样子 <br>**I just want things to be what they are supposed to be**

### 头像
avatar: /image/avatar.jpg

# 主菜单导航
## 链接关键词不应该被更改。
## 关键词后接完整的 URL。
## 未使用的关键词可以被注释掉。
links:
  # 博客:
  # 分类:
  # 标签:
  # 链接:
  # 简历:
  # 发布:
  # 奖杯:
  # 画廊:
  # RSS:
  # 支付宝:
  # 知乎:
  # LinkedIn:
  # FaceBook:
  # Twitter:
  # Skype:

# 如何显示链接：你有 2 个选择--文本或图标。
links_text_enable: True
links_icon_enable: True

# 文章页面
## 文章元数据
post_meta_enable: True
post_author_enable: True
post_date_enable: True
post_category_enable: True

## 文章版权
post_copyright_enable: False
post_copyright_author_enable: False
post_copyright_permalink_enable: False
post_copyright_license_enable: False
post_copyright_license_text: Copyright (c) 2019 <a href="http://creativecommons.org/licenses/by-nc/4.0/">CC-BY-NC-4.0</a> LICENSE
post_copyright_slogan_enable: False
post_copyright_slogan_text: Do you believe in <strong>DESTINY</strong>?

## 目录
post_toc_enable: True

# 页面
page_title_enable: True

# 日期/时间格式
## Hexo 使用 Moment.js 来解析和显示日期
## 你可以自定义日期格式，定义在
## http://momentjs.com/docs/#/displaying/format/
date_format: YYYY年MM月DD日
# time_format:

# 样式表加载在 <head> 中
stylesheets:
  - /css/style.css

# 脚本加载在 body 末尾
scripts:
  - /js/script.js
  - /js/tocbot.min.js
    # tscanlin/tocbot: Build a table of contents from headings in an HTML document.
    # https://github.com/tscanlin/tocbot

# 插件功能
## Mathjax：数学公式支持
## https://www.mathjax.org
mathjax:
  enable: true
  import: demand # global or demand
  ## global: all pages will load mathjax,this will degrade performance and some grammers may be parsed wrong.
  ## demand: Recommend option,if your post need fomula, you can declare 'mathjax: true' in Front-matter
```

#### 主题颜色

页面颜色配置,修改首页 Dark Mode 背景色。

```css _partial\variable.styl
$dark-background-color = #363636
```

#### 主题汉化

文章页面的作者、日期、分类等信息已经汉化了，并且将日期里的时间给隐藏了。

```html post.ejs
<div class="post-meta">
  <% if(theme.post_author_enable && config.author){ %> 作者:
  <a itemprop="author" rel="author" href="/"
    ><%- config.author %>&nbsp;&nbsp;</a
  >
  <% } %> <% if(page.date && theme.post_date_enable){ %>
  <span class="post-time">
    日期: <a href="#"><%- date(page.date, theme.date_format) %>&nbsp;&nbsp;</a>
  </span>
  <% } %> <% if(page.categories.length!==0 && theme.post_category_enable){ %>
  <span class="post-category">
    分类: <% page.categories.forEach(item=>{ %>
    <a href="<%- url_for(item.path) %>"><%- item.name %></a>
    <% }) %>
  </span>
  <% } %>
</div>
```

文章页面底部的标签和返回隐藏了。

```html post.ejs
<!-- <section class="post-tags">
  <div>
    <span>Tag(s):</span>
    <span class="tag">
      <% if(page.tags.length!==0){%> <% page.tags.forEach(item=>{ %>
      <a href="<%- url_for(item.path) %>"># <%- item.name %></a>
      <% }) %> <% } %>
    </span>
  </div>
  <div>
    <a href="javascript:window.history.back();">back</a>
    <span>· </span>
    <a href="<%- config.root %>">home</a>
  </div>
</section> -->
```

文章页面边栏快捷按钮汉化

```js toc.ejs
<div class="post-toc">
  <div class="tocbot-list"></div>
  <div class="tocbot-list-menu">
    <a class="tocbot-toc-expand" onclick="expand_toc()">
      展开全部
    </a>
    <a onclick="go_top()">返回顶部</a>
    <a onclick="go_bottom()">降至底部</a>
  </div>
</div>;

b.innerText = expanded ? "展开全部" : "收起全部";
```

分类页面&标签页面汉化

```html _page\category.ejs
<div class="container">
  <div class="post-wrap categories">
    <h2 class="post-title">-&nbsp;分类&nbsp;·&nbsp;<%-page.category%>-</h2>
  </div>
  <%- partial('archive', {pagination: config.category, index: true}) %>
</div>
```

```html _page\tag.ejs
<%# single tag page%>
<div class="container">
  <div class="post-wrap tags">
    <h2 class="post-title">-&nbsp;标签&nbsp;·&nbsp;<%-page.tag%>-</h2>
  </div>
  <%- partial('archive', {pagination: config.tag, index: true}) %>
</div>
```

#### 主题自定义CSS

```css _partial\custom.styl
// 深色模式代码块
.dark-theme .post-content figure,
.dark-theme .post-content figure.highlight .code pre {
    background-color: #23241f;
    color: #f8f8f2;

}

// 深色模式代码块行号
.dark-theme .post-content figure.highlight .gutter pre {
    background-color: #23241f;
    color: $dark-mode-pre-line-number-foreground-color;
}

// 深色模式引用模式
$dark-post-blockquote-background-color = #23241f
```