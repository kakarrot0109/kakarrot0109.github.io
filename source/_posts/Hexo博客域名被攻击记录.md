---
title: GitHub Pages 自定义域名被劫持与恢复记录
categories:
  - Hexo
tags:
  - Blog
  - Github
  - 配置
abbrlink: 5781cb
date: 2025-12-29 15:30:00
---

## 问题背景

今天发现我的博客 `kakarrot.com` 无法正常访问，出现了两个诡异的现象：

1. 访问 `kakarrot.com` 显示的是一个**赌博网站**（DADU128 Slot）
2. 访问 `kakarrot0109.github.io` 显示 **404 - Site not found**

第一反应是域名被劫持了，但经过排查发现问题比想象的更复杂。

<!-- more -->

## 问题排查

### 1. DNS 解析检查

首先检查 DNS 解析是否正常：

```bash
dig kakarrot.com +short
# 返回: 198.18.0.73 (错误的IP)

dig @8.8.8.8 kakarrot.com +short
# 返回: kakarrot0109.github.io -> 185.199.xxx.xxx (GitHub Pages IP)
```

通过 Google DNS 查询显示 CNAME 记录是正确的，但本地解析到了错误的 IP。

### 2. GitHub Pages 状态检查

访问 GitHub 仓库的 Settings → Pages，发现两个问题：

**问题一：仓库是私有的**

页面显示："Upgrade or make this repository public to enable Pages"

GitHub Pages 免费版只支持公开仓库，私有仓库需要升级到 GitHub Pro。

**问题二：自定义域名被占用**

将仓库改为公开后，配置自定义域名时出现警告：

> "The custom domain `kakarrot.com` is already taken. If you are the owner of this domain, check out [GitHub Docs] for information about how to verify and release this domain."

这就是问题的根源——我的域名被**其他 GitHub 账户绑定**了！

## 问题原因分析

这是一种 GitHub Pages 的域名劫持攻击：

1. 攻击者发现某个域名的 DNS 指向 GitHub Pages（CNAME 到 `*.github.io`）
2. 但该域名在 GitHub 上没有被验证所有权
3. 攻击者在自己的 GitHub 仓库中配置该域名作为自定义域名
4. GitHub Pages 就会将该域名的流量导向攻击者的网站

这种攻击利用的是 GitHub Pages 的工作机制：GitHub 根据请求的 Host 头来决定返回哪个仓库的内容。如果域名没有被验证，任何人都可以"声明"使用它。

## 解决方案

### 步骤一：将仓库改为公开

1. 进入仓库 Settings → General
2. 滚动到底部 "Danger Zone"
3. 点击 "Change repository visibility"
4. 选择 "Make public"

### 步骤二：验证域名所有权

这是最关键的一步，用于从攻击者手中"夺回"域名控制权。

1. 进入 GitHub 账户设置：https://github.com/settings/pages
2. 点击 "Add a domain"
3. 输入域名 `kakarrot.com`
4. GitHub 会生成一个 TXT 记录验证要求，类似：
   ```
   主机记录: _github-pages-challenge-kakarrot0109
   记录值: a034b75ef658207bb454fc2edb01ff
   ```
5. 在域名 DNS 管理后台（我用的是阿里云）添加这条 TXT 记录
6. 等待 DNS 生效后，回到 GitHub 点击 "Verify"
7. 验证成功后，域名会从攻击者的账户中释放

### 步骤三：配置 DNS 记录

在阿里云 DNS 中配置以下记录：

| 主机记录 | 记录类型 | 记录值 |
|---------|---------|--------|
| @ | A | 185.199.108.153 |
| @ | A | 185.199.109.153 |
| @ | A | 185.199.110.153 |
| @ | A | 185.199.111.153 |
| www | CNAME | kakarrot0109.github.io |
| _github-pages-challenge-xxx | TXT | (验证码) |

使用 4 个 A 记录而不是 CNAME 是因为根域名（@）不能设置 CNAME。

### 步骤四：配置 GitHub Pages

1. 进入仓库 Settings → Pages
2. Source 选择 "Deploy from a branch"
3. Branch 选择 `master`，目录选择 `/ (root)`
4. Custom domain 输入 `kakarrot.com`，点击 Save
5. 等待 DNS check successful
6. 勾选 "Enforce HTTPS"

### 步骤五：重新部署博客

```bash
hexo clean && hexo generate && hexo deploy
```

## 预防措施

为了防止这种攻击再次发生，建议：

1. **始终验证域名所有权**：在 GitHub 账户设置中添加并验证你的所有自定义域名
2. **保持仓库公开**：如果使用免费版 GitHub Pages
3. **定期检查**：偶尔访问自己的网站确认正常
4. **配置 HTTPS**：启用 Enforce HTTPS 增加安全性

## 总结

这次经历让我了解到 GitHub Pages 自定义域名的安全机制。域名验证功能就是为了防止这种劫持攻击，但很多人（包括我）在初次配置时可能忽略了这一步。

如果你也在使用 GitHub Pages + 自定义域名，强烈建议立即去 https://github.com/settings/pages 验证你的域名所有权，避免遭遇同样的问题。

---

*参考文档：[Verifying your custom domain for GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)*
