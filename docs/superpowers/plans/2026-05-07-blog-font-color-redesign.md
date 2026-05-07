# Blog 字体 + 配色重设计 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把博客视觉语言从 Apple Blue 切到 Editorial · 琥珀（米黄宣纸 / 炭黑双模式）+ 自托管 Latin 字体（Cormorant Garamond + Inter），保持 GFW 不可达时仍可用。

**Architecture:** 改动集中在 Chic 主题的三个 stylus 文件 + 一个新建字体目录。`font.styl` 加 @font-face + 重写字体栈，`variable.styl` 替换两套主题的 17 个 color token 各一份，`custom.styl` 把 70 处硬编码 hex 替换成新值。**不动任何 .ejs 布局、不动 Hexo 配置、不动文章 Markdown**。

**Tech Stack:** Hexo 8.1.1 · Stylus · GitHub Pages · WOFF2（fontsource via jsdelivr）

**Spec reference:** `docs/superpowers/specs/2026-05-07-blog-font-color-redesign-design.md`

**重要约定（来自 CLAUDE.md）：所有 `git commit` 步骤必须先经用户确认。计划里给出 commit 命令但执行前请询问用户。**

---

## File Structure

| 文件 / 目录 | 责任 |
|---|---|
| `themes/Chic/source/fonts/latin/` (NEW) | 5 个 WOFF2 文件（Cormorant 600/700 + Inter 400/500/600） |
| `themes/Chic/source/css/font.styl` | `@font-face` 声明 + 3 个字体栈变量 |
| `themes/Chic/source/css/variable.styl` | 34 个 color token（17 light + 17 dark） |
| `themes/Chic/source/css/custom.styl` | 替换 70 处硬编码 hex 颜色（gradient、selection、focus 等） |

---

### Task 1: 下载并放置 Latin WOFF2 字体

**Files:**
- Create: `themes/Chic/source/fonts/latin/cormorant-garamond-600.woff2`
- Create: `themes/Chic/source/fonts/latin/cormorant-garamond-700.woff2`
- Create: `themes/Chic/source/fonts/latin/inter-400.woff2`
- Create: `themes/Chic/source/fonts/latin/inter-500.woff2`
- Create: `themes/Chic/source/fonts/latin/inter-600.woff2`

来源：fontsource via jsdelivr（CDN 已验证 200 OK，每个文件 ~16-24KB，subset = latin only，不含 latin-ext / 不含 cyrillic / 不含 vietnamese，最小化首屏成本）

- [ ] **Step 1.1: 创建字体目录**

```bash
mkdir -p /Users/kk/Development/website/themes/Chic/source/fonts/latin
```

- [ ] **Step 1.2: 下载 5 个 WOFF2 文件**

```bash
cd /Users/kk/Development/website/themes/Chic/source/fonts/latin

curl -sL -o cormorant-garamond-600.woff2 "https://cdn.jsdelivr.net/npm/@fontsource/cormorant-garamond@latest/files/cormorant-garamond-latin-600-normal.woff2"
curl -sL -o cormorant-garamond-700.woff2 "https://cdn.jsdelivr.net/npm/@fontsource/cormorant-garamond@latest/files/cormorant-garamond-latin-700-normal.woff2"
curl -sL -o inter-400.woff2 "https://cdn.jsdelivr.net/npm/@fontsource/inter@latest/files/inter-latin-400-normal.woff2"
curl -sL -o inter-500.woff2 "https://cdn.jsdelivr.net/npm/@fontsource/inter@latest/files/inter-latin-500-normal.woff2"
curl -sL -o inter-600.woff2 "https://cdn.jsdelivr.net/npm/@fontsource/inter@latest/files/inter-latin-600-normal.woff2"
```

- [ ] **Step 1.3: 验证文件大小（防止下到错误 / 404 页面）**

```bash
ls -la /Users/kk/Development/website/themes/Chic/source/fonts/latin/
```

Expected: 5 个 `.woff2` 文件，每个 size ≥ 8KB（实际应在 14-26KB 之间）。如果有文件 < 5KB，说明下载失败，重新执行 Step 1.2。

- [ ] **Step 1.4: 验证 WOFF2 文件头**

```bash
file /Users/kk/Development/website/themes/Chic/source/fonts/latin/*.woff2
```

Expected: 每个文件输出 `Web Open Font Format (Version 2), TrueType, ...`。如果显示 `HTML document` 或 `ASCII text`，说明下到了错误页面，重新执行 Step 1.2。

---

### Task 2: 改写 `font.styl` — @font-face 声明 + 三个字体栈

**Files:**
- Modify: `themes/Chic/source/css/font.styl`（完全重写，13 行 → ~70 行）

- [ ] **Step 2.1: 用以下完整内容覆盖 `themes/Chic/source/css/font.styl`**

```stylus
/**
 * 字体配置 - Editorial · 琥珀
 *
 * 设计原则：
 * 1. CJK 走系统字体（不引网络中文，避免 5MB+ 首屏成本）
 * 2. Latin 自托管 WOFF2（避开 Google Fonts CDN 在 GFW 下的不稳定）
 * 3. 代码字体走系统等宽（SF Mono / Menlo / Consolas / Liberation Mono）
 * 4. 每个角色都有完整跨平台 fallback 链
 **/

// ==============================
// Latin 自托管字体声明
// ==============================

@font-face
  font-family 'Cormorant Garamond'
  font-style normal
  font-weight 600
  font-display swap
  src url('../fonts/latin/cormorant-garamond-600.woff2') format('woff2')

@font-face
  font-family 'Cormorant Garamond'
  font-style normal
  font-weight 700
  font-display swap
  src url('../fonts/latin/cormorant-garamond-700.woff2') format('woff2')

@font-face
  font-family 'Inter'
  font-style normal
  font-weight 400
  font-display swap
  src url('../fonts/latin/inter-400.woff2') format('woff2')

@font-face
  font-family 'Inter'
  font-style normal
  font-weight 500
  font-display swap
  src url('../fonts/latin/inter-500.woff2') format('woff2')

@font-face
  font-family 'Inter'
  font-style normal
  font-weight 600
  font-display swap
  src url('../fonts/latin/inter-600.woff2') format('woff2')

// ==============================
// 字体栈
// ==============================

// 标题（衬线，人文气）
$font-family-serif = 'Cormorant Garamond', Georgia, 'Times New Roman', Times, 'Source Han Serif SC', 'Noto Serif SC', 'Songti SC', STSong, STZhongsong, SimSun, NSimSun, serif

// 正文（无衬线，长文友好）
$font-family = 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Helvetica, Arial, 'Source Han Sans SC', 'Noto Sans SC', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif

// 代码（等宽，不引网络字体）
$font-family-mono = 'JetBrains Mono', 'Fira Code', 'SF Mono', Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace
```

- [ ] **Step 2.2: 启动 dev server，确认无编译错误**

```bash
cd /Users/kk/Development/website && hexo clean && hexo server
```

Expected: 输出 `INFO  Hexo is running at http://localhost:4000/`，无 `stylus error`。

按 `Ctrl+C` 关闭后继续。

---

### Task 3: 改写 `variable.styl` Light 主题 token

**Files:**
- Modify: `themes/Chic/source/css/variable.styl`（替换第 6-45 行的 light 主题块）

- [ ] **Step 3.1: 用以下内容替换 `variable.styl` 文件中 `/** light theme */` 段落（注释行 + 后续 17 个变量）**

替换前的旧块大致是 line 6 的 `/** light theme - 温暖浅色主题 **/` 到 line 45（含活力橙）。

新内容：

```stylus
/** light theme - Editorial · 琥珀 · 米黄宣纸 **/

// 背景色 - 米黄宣纸
$light-background-color = #FFFBEB

// 文字色 - 深石青（不是纯黑）
$light-font-color = #0F172A
$light-font-secondary-color = #78716C

// 导航激活色 - 琥珀
$light-navbar-active-color = #B45309

// 全站链接（默认深色 / hover 琥珀）
$light-global-link-color = #0F172A
$light-global-link-hover-color = #B45309

// 文章正文链接 - 琥珀
$light-post-link-color = #B45309
$light-post-link-hover-color = #92400E

// 分页链接
$light-pagination-link-color = #B45309
$light-pagination-link-active-color = #0F172A

// 边框色 - 暖米
$light-border-color = #FAEEE1

// 代码配色
$light-code-font-color = #92400E
$light-code-background-color = #FFFFFF

// 引用块
$light-post-blockquote-border-color = #B45309
$light-post-blockquote-background-color = #FFFFFF

// 表格
$light-post-table-background-color = #FFFFFF

// 强调色 - 琥珀（::selection 用）
$light-accent-color = #B45309
```

- [ ] **Step 3.2: 启动 dev server，确认基础页面背景已变米黄**

```bash
cd /Users/kk/Development/website && hexo clean && hexo server
```

打开 http://localhost:4000/，应见：
- 页面底色变成米黄（`#FFFBEB`）
- 正文颜色变成深石青（`#0F172A`）
- **暂时**深色模式可能还是旧值（dark token 还没改），这是预期，下一个 task 处理

---

### Task 4: 改写 `variable.styl` Dark 主题 token

**Files:**
- Modify: `themes/Chic/source/css/variable.styl`（替换 `/** dark theme */` 段落）

- [ ] **Step 4.1: 用以下内容替换 `variable.styl` 中 `/** dark theme */` 段落（17 个变量）**

```stylus
/** dark theme - Editorial · 琥珀 · 炭 **/

// 背景色 - 炭
$dark-background-color = #1A1816

// 文字色 - 暖白
$dark-font-color = #F0E9DC
$dark-font-secondary-color = #A89E88

// 导航激活色 - 琥珀亮
$dark-navbar-active-color = #E8B765

// 全站链接
$dark-global-link-color = #F0E9DC
$dark-global-link-hover-color = #E8B765

// 文章链接 - 琥珀亮
$dark-post-link-color = #E8B765
$dark-post-link-hover-color = #F5C97D

// 分页链接
$dark-pagination-link-color = #E8B765
$dark-pagination-link-active-color = #F0E9DC

// 边框色 - 深褐
$dark-border-color = #3A352F

// 代码配色 - 琥珀
$dark-code-font-color = #E8B765
$dark-code-background-color = #2A2622

// 引用块
$dark-post-blockquote-border-color = #E8B765
$dark-post-blockquote-background-color = #2A2622

// 表格
$dark-post-table-background-color = #2A2622

// 强调色 - 琥珀亮（::selection 用）
$dark-accent-color = #E8B765
```

- [ ] **Step 4.2: 切换到深色模式验证**

启动 dev server 后，在浏览器点击导航右侧的深浅切换 toggle，应见：
- 背景变炭（`#1A1816`）
- 文字变暖白（`#F0E9DC`）
- 链接变琥珀亮（`#E8B765`）
- **暂时**部分元素（阅读进度条、selection、focus outline、引用块边框等）可能还是蓝色——这些是 `custom.styl` 里的硬编码值，下一个 task 处理

---

### Task 5: 改写 `custom.styl` Light 模式硬编码色

**Files:**
- Modify: `themes/Chic/source/css/custom.styl`（line 1 - 220 之间，~40 处替换）

- [ ] **Step 5.1: 在 `custom.styl` 顶部（line 1-30 区域）做以下精确替换**

旧 → 新对照表（按出现顺序）：

| 旧值 | 新值 | 出现位置 |
|---|---|---|
| `linear-gradient(90deg, #0071E3, #2997FF)` | `linear-gradient(90deg, #B45309, #D97706)` | line 21 reading-progress light |
| `linear-gradient(90deg, #2997FF, #64B5FF)` | `linear-gradient(90deg, #E8B765, #F5C97D)` | line 27 reading-progress dark |
| `background #F5F5F7` | `background #FFFBEB` | line 39 滚动条轨道 light |
| `background-color #D2D2D7` | `background-color #FAEEE1` | line 41 滚动条 thumb |
| `background-color #86868B` | `background-color #78716C` | line 44 滚动条 thumb hover |

具体做法：用 Edit 工具按精确字符串替换上述 5 处。

- [ ] **Step 5.2: 在 `custom.styl` line 60-130（.post-content 块）做以下替换**

| 旧 | 新 | 说明 |
|---|---|---|
| `color #1D1D1F`（标题处，3 处）| `color #0F172A` | h1-h6、strong、blockquote p |
| `color #0071E3 !important`（标题前缀，2 块共 4 处）| `color #B45309 !important` | h1::before / h2::before / h3::before / h4::before |
| `color #0071E3`（链接） | `color #B45309` | post-content a |
| `color #0077ED`（链接 hover） | `color #92400E` | post-content a:hover |
| `color #BF5AF2`（行内代码） | `color #92400E` | code 紫→琥珀深 |
| `background #FFFFFF`（代码块） | `background #FFFFFF` | 保留（白底） |
| `border 1px solid #D2D2D7`（多处） | `border 1px solid #FAEEE1` | code、table、hr 边框 |
| `border-left 4px solid #0071E3`（引用） | `border-left 4px solid #B45309` | blockquote |
| `border-color #D2D2D7`（table th td） | `border-color #FAEEE1` | 表格边框 |
| `border-top 1px solid #D2D2D7`（hr） | `border-top 1px solid #FAEEE1` | 分隔线 |

具体做法：每一处用 Edit 替换。注意 `color #1D1D1F` 在文件中出现多次，需要带上下文消歧。

- [ ] **Step 5.3: 在 `custom.styl` line 130-220（标题、导航、页脚、标签等）做以下替换**

| 旧 | 新 | 说明 |
|---|---|---|
| `color #1D1D1F`（.post-title） | `color #0F172A` | 文章标题 |
| `color #86868B`（.post-meta、.archive-item-date、.footer） | `color #78716C` | 元信息次级文字 |
| `background rgba(245, 245, 247, 0.8)`（.navbar） | `background rgba(255, 251, 235, 0.85)` | 导航毛玻璃米黄 |
| `border-bottom 1px solid rgba(0, 0, 0, 0.1)`（.navbar） | 保留 | 黑色透明边框继续用 |
| `color #0071E3`（.navbar .menu .active） | `color #B45309` | 当前导航 |
| `border-top 1px solid #D2D2D7`（.footer） | `border-top 1px solid #FAEEE1` | 页脚边框 |
| `color #0071E3`（.paginator a） | `color #B45309` | 分页 |
| `color #0077ED`（.paginator a hover） | `color #92400E` | 分页 hover |
| `background #FFFFFF`（.post-tag） | `background #FFFFFF` | 保留 |
| `color #0071E3`（.post-tag） | `color #B45309` | 标签字色 |
| `border 1px solid #D2D2D7`（.post-tag） | `border 1px solid #FAEEE1` | 标签边框 |
| `background #0071E3`（.post-tag:hover） | `background #B45309` | 标签 hover |
| `border-color #0071E3`（.post-tag:hover） | `border-color #B45309` | 标签 hover 边框 |
| `box-shadow 0 2px 8px rgba(0, 113, 227, 0.3)`（标签 hover, line ~201） | `box-shadow 0 2px 8px rgba(180, 83, 9, 0.3)` | 标签 hover 阴影 |
| `background #FF9500`（::selection 2 处） | `background #B45309` | 选中文字 |
| `outline 3px solid rgba(0, 113, 227, 0.5)`（focus） | `outline 3px solid rgba(180, 83, 9, 0.5)` | 焦点环 |
| `background rgba(0, 113, 227, 0.05)`（.archive-item:hover, line ~378） | `background rgba(180, 83, 9, 0.05)` | 浅模式归档项 hover |
| `box-shadow 0 4px 12px rgba(0, 113, 227, 0.25)`（.post-tag:hover 的 cubic-bezier 覆写, line ~369） | `box-shadow 0 4px 12px rgba(180, 83, 9, 0.25)` | 浅模式标签 hover 增强阴影 |

- [ ] **Step 5.4: 启动 dev server，验证 light 模式所有元素**

```bash
cd /Users/kk/Development/website && hexo clean && hexo server
```

打开 http://localhost:4000/，逐项验证：
- [ ] 阅读进度条滚动时显示琥珀渐变
- [ ] 文章页（点任一篇文章）：标题、链接、代码、引用块、标签、分隔线全部琥珀色
- [ ] 选中一段文字：背景琥珀色
- [ ] Tab 键到链接 / 按钮：focus ring 琥珀色
- [ ] 导航在滚动时仍是米黄毛玻璃，无蓝色残留

---

### Task 6: 改写 `custom.styl` Dark 模式硬编码色

**Files:**
- Modify: `themes/Chic/source/css/custom.styl`（line 220 - 415 区域，~30 处替换）

- [ ] **Step 6.1: 在 `.dark-theme` 块（line 226 起）做以下替换**

| 旧 | 新 | 说明 |
|---|---|---|
| `background #1D1D1F`（dark 滚动条 track） | `background #1A1816` | 暗滚动条 |
| `background-color #424245`（dark 滚动条 thumb） | `background-color #3A352F` | 暗 thumb |
| `background-color #86868B`（dark thumb hover） | `background-color #A89E88` | 暗 thumb hover |
| `background #FF9F0A`（dark ::selection 2 处） | `background #E8B765` | 暗选中 |
| `color #1D1D1F`（dark ::selection on/text） | `color #1A1816` | 暗选中文字 |
| `outline-color rgba(41, 151, 255, 0.5)`（dark focus） | `outline-color rgba(232, 183, 101, 0.5)` | 暗焦点环 |

- [ ] **Step 6.2: 在 `.dark-theme .navbar` 块做以下替换**

| 旧 | 新 |
|---|---|
| `background rgba(29, 29, 31, 0.8)` | `background rgba(26, 24, 22, 0.85)` |
| `border-bottom-color rgba(255, 255, 255, 0.1)` | 保留 |

- [ ] **Step 6.3: 在 `.dark-theme .post-content` 块（line 258-298）做以下替换**

| 旧 | 新 |
|---|---|
| `color #F5F5F7`（多处：标题、strong） | `color #F0E9DC` |
| `color #2997FF !important`（标题前缀） | `color #E8B765 !important` |
| `color #2997FF`（链接） | `color #E8B765` |
| `color #64B5FF`（链接 hover） | `color #F5C97D` |
| `background #2C2C2E`（code、blockquote、table） | `background #2A2622` |
| `color #BF5AF2`（行内代码） | `color #E8B765` |
| `border-color #424245`（code、table） | `border-color #3A352F` |
| `border-left-color #2997FF`（blockquote） | `border-left-color #E8B765` |

- [ ] **Step 6.4: 在 `.dark-theme` 其他元素块（line 300+）做以下替换**

| 旧 | 新 | 元素 |
|---|---|---|
| `color #F5F5F7` | `color #F0E9DC` | .post-title |
| `color #86868B` | `color #A89E88` | .post-meta、.archive-item-date、.footer、.reading-time |
| `border-top-color #424245` | `border-top-color #3A352F` | .footer |
| `color #2997FF` | `color #E8B765` | .navbar .menu .active、.paginator a |
| `color #64B5FF` | `color #F5C97D` | .paginator a hover |
| `background #2C2C2E` | `background #2A2622` | .post-tag |
| `color #2997FF` | `color #E8B765` | .post-tag |
| `border-color #424245` | `border-color #3A352F` | .post-tag |
| `background #2997FF`（tag hover） | `background #E8B765` | .post-tag hover |
| `color #1D1D1F`（tag hover text） | `color #1A1816` | .post-tag hover text |
| `border-color #2997FF`（tag hover） | `border-color #E8B765` | .post-tag hover |
| `box-shadow 0 2px 8px rgba(41, 151, 255, 0.3)` | `box-shadow 0 2px 8px rgba(232, 183, 101, 0.3)` | .dark-theme .post-tag hover shadow |
| `background rgba(41, 151, 255, 0.1)`（.dark-theme .archive-item:hover） | `background rgba(232, 183, 101, 0.1)` | 暗模式归档 hover |

- [ ] **Step 6.5: 启动 dev server，全面验证**

```bash
cd /Users/kk/Development/website && hexo clean && hexo server
```

切换深色模式（点击导航的 toggle 或在 DevTools 强制 `prefers-color-scheme: dark`），验证：
- [ ] 背景炭灰、文字暖白
- [ ] 链接、标签、引用、代码、selection、focus 全部琥珀亮
- [ ] **没有任何蓝色 / 紫色残留**（重要：搜全屏没有 `#0071E3` `#2997FF` `#FF9500` `#BF5AF2`）

---

### Task 7: 全站页面验证（Light + Dark × 5 页）

- [ ] **Step 7.1: 启动 dev server**

```bash
cd /Users/kk/Development/website && hexo clean && hexo server
```

- [ ] **Step 7.2: 在浏览器逐一访问 5 个关键页面 × 2 个模式 = 10 个组合**

页面：
- http://localhost:4000/
- http://localhost:4000/posts/{任一文章 abbrlink}/（建议用最长一篇含代码块 / 引用 / 表格 / 标签的文章）
- http://localhost:4000/archives/
- http://localhost:4000/categories/
- http://localhost:4000/tags/
- http://localhost:4000/about/

每个页面在 light 和 dark 模式下都看一遍。验证项：
- 背景色一致（米黄 / 炭）
- 文字颜色对比足够
- 所有链接是琥珀色
- 标签、引用、代码块、表格、分隔线、滚动条都是新配色
- 阅读进度条滚动时是琥珀渐变
- 没有任何残留的蓝 / 紫 / 灰白

如有遗漏，回到 Task 5 / 6 找对应行修补。

- [ ] **Step 7.3: 移动端窗口验证**

DevTools 切到 iPhone 12 Pro / iPhone SE 视图，再走一遍上面 6 个页面 × light + dark。重点确认：
- 移动导航栏（汉堡菜单）颜色正确
- 文字不溢出、无横向滚动
- 触摸目标尺寸 ≥ 44x44

---

### Task 8: 字体兜底专项验证

- [ ] **Step 8.1: 验证 Latin web font 加载成功状态**

打开 http://localhost:4000/，DevTools → Network → Font 过滤器。刷新页面，应见 5 个 `*.woff2` 文件全部 200 OK，每个 size 与 Task 1.3 一致。

- [ ] **Step 8.2: 验证 web font 全部失败的兜底**

DevTools → Network → 右键任一 woff2 → Block request URL（屏蔽 5 个）→ Disable cache → 刷新页面。

预期表现：
- 中文标题：仍是衬线（macOS 落到 `Songti SC` / Win 落到 `SimSun`）
- 中文正文：仍是无衬线（macOS 落到 `PingFang SC` / Win 落到 `微软雅黑`）
- Latin 标题：从 Cormorant Garamond 落到 `Georgia`（应仍是衬线）
- Latin 正文：从 Inter 落到 `-apple-system` / `Segoe UI`（仍是无衬线）
- 代码块：JetBrains Mono 用户没装 → 落到 `SF Mono` / `Menlo` / `Consolas`
- 没有 FOIT（不可见文字）期，最差是 `display:swap` 在 ~100ms 内完成切换

如果有 Latin 标题变成无衬线 / 文字消失数秒 / 排版跳动严重 → 字体栈有问题，回到 Task 2 检查。

- [ ] **Step 8.3: 解除屏蔽，跑 Lighthouse 无障碍审计**

DevTools → Lighthouse → 只勾 Accessibility → Analyze。

Expected: Score ≥ 95（与改前持平或更高）。如低于 95，看 issue 列表。

---

### Task 9: 提交（需用户确认）

> **⚠️ 在执行下面的 commit 前，先和用户确认是否提交。**

- [ ] **Step 9.1: 查看待提交内容**

```bash
git status
git diff --stat
```

预期 staged 候选：
- `themes/Chic/source/fonts/latin/*.woff2`（5 个新文件）
- `themes/Chic/source/css/font.styl`（重写）
- `themes/Chic/source/css/variable.styl`（重写）
- `themes/Chic/source/css/custom.styl`（替换 70 处）
- `.gitignore`（之前加了 `.superpowers/`）
- `docs/superpowers/specs/2026-05-07-blog-font-color-redesign-design.md`（新）
- `docs/superpowers/plans/2026-05-07-blog-font-color-redesign.md`（新）

- [ ] **Step 9.2: 提交（用户确认后）**

```bash
cd /Users/kk/Development/website
git add themes/Chic/source/fonts/latin/ \
        themes/Chic/source/css/font.styl \
        themes/Chic/source/css/variable.styl \
        themes/Chic/source/css/custom.styl \
        .gitignore \
        docs/superpowers/

git commit -m "$(cat <<'EOF'
新增: Editorial · 琥珀 配色和字体方案

- 配色：从 Apple Blue 切换到米黄宣纸 + 炭黑双模式 + 琥珀强调
- 字体：自托管 Cormorant Garamond + Inter（避开 Google Fonts CDN GFW 问题）
- 跨端兜底：完整 fallback 链覆盖 macOS / iOS / Windows / Android / Linux

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)"
```

- [ ] **Step 9.3: 验证 commit 成功**

```bash
git log -1 --stat
```

Expected: 看到 commit hash 和影响文件列表。

---

### Task 10（可选）：部署到 GitHub Pages

> **⚠️ 部署到 master 分支会立即生效到生产 https://kakarrot.com，必须用户确认。**

- [ ] **Step 10.1: 询问用户是否部署**

如果用户说"部署"才继续。

- [ ] **Step 10.2: 部署**

```bash
cd /Users/kk/Development/website
hexo clean && hexo generate && hexo deploy
```

Expected: 输出 `INFO  Deploy done: git`，无错误。访问 https://kakarrot.com 验证生产环境（CDN 缓存可能延迟几分钟）。

---

## 完工检查表

实施完毕后逐项核对：

- [ ] 5 个 WOFF2 文件存在且为有效 WOFF2（`file` 命令验证）
- [ ] `font.styl` 含 5 个 `@font-face` 声明 + 3 个字体栈变量
- [ ] `variable.styl` 17 个 light token + 17 个 dark token 全部新值
- [ ] `custom.styl` 无任何残留 `#0071E3` `#FF9500` `#0077ED` `#2997FF` `#64B5FF` `#FF9F0A` `#BF5AF2`
- [ ] 5 个页面 × light + dark = 10 个组合视觉一致
- [ ] 移动端 iPhone 视图无溢出
- [ ] 字体屏蔽兜底有效（中文衬线 / 无衬线层次完整）
- [ ] Lighthouse Accessibility ≥ 95
- [ ] 提交记录存在且 message 描述准确

最后一行最后检查命令：

```bash
grep -rE "#0071E3|#FF9500|#0077ED|#2997FF|#64B5FF|#FF9F0A|#BF5AF2" /Users/kk/Development/website/themes/Chic/source/css/
```

Expected: 无输出（所有旧色全部清除）。
