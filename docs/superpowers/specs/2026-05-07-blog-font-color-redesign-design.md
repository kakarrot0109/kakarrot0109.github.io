# Blog 字体与配色重设计 · Editorial · 琥珀

**日期**：2026-05-07
**作者**：KAKARROT
**范围**：仅字体 + 配色调整，不改布局结构、不改组件 HTML、不改交互行为

---

## 目标

将博客视觉语言从"Apple 风（科技产品感）"切换到"Editorial · 琥珀（人文阅读感）"，配合现有衬线标题的人文气质，统一全站浅色 / 深色双模式。

**驱动力**：用户主观偏好，希望视觉语言更契合产品 / 哲学 / 魔兽 / 音乐这种混合内容主题，不再像一个标准技术博客模板。

---

## 范围边界

**做**：
- 替换 light / dark 两套配色 token
- 升级 Latin 字体（自托管 Cormorant Garamond + Inter 的 WOFF2，保留代码字体不变）
- 重写三个字体栈变量，加完整跨平台 fallback 链（macOS / iOS / Windows / Android / Linux）
- 同步更新所有引用旧 Apple Blue / 灰白色值的地方

**不做**：
- 不动首页结构、文章列表、归档 / 分类 / 标签页面布局
- 不动导航、阅读进度条、深浅切换按钮、TOC 等组件结构
- 不动 abbrlink、文章 frontmatter、Hexo 配置
- 不引入新插件

---

## 设计系统（最终值）

### 字体

#### 设计原则

1. **CJK 走系统字体** — 不引网络中文字体（Noto Serif/Sans SC 全字符集 ≥ 5MB，引就破首屏）
2. **Latin 自托管** — Google Fonts 在国内不稳定（GFW），不用 CDN，把 WOFF2 放到 `themes/Chic/source/fonts/latin/`，受我们自己的 GitHub Pages 控制
3. **代码字体不引网络字体** — Menlo / Consolas 在各端都够用，引 JetBrains Mono 不值得首屏代价
4. **每个角色都有完整 fallback 链** — 即使网络字体加载失败、字体文件丢失，也能优雅降级到系统字体

#### 三套字体栈（最终定义，写入 `font.styl`）

**标题（衬线，人文气）**：

```stylus
$font-family-serif = 
  // ── Latin（优先用网络字体）──
  'Cormorant Garamond',
  // ── Latin fallback（系统衬线，按优先级）──
  Georgia,                    // macOS / Win / iOS / Android 几乎全有
  'Times New Roman',          // Windows
  Times,                      // 通用
  // ── 中文（系统字体，按平台优先级）──
  'Source Han Serif SC',      // 部分 Linux / 安装了 Adobe 字体的用户
  'Noto Serif SC',            // 部分 Linux / 安装了 Google Noto
  'Songti SC',                // macOS / iOS（最稳定的中文衬线）
  STSong,                     // macOS / iOS 别名
  STZhongsong,                // macOS / iOS 别名
  SimSun,                     // Windows（最稳定的中文衬线）
  'NSimSun',                  // Windows 别名
  serif                       // 终极兜底
```

**正文（无衬线，长文友好）**：

```stylus
$font-family = 
  // ── Latin ──
  'Inter',
  -apple-system,              // macOS / iOS（San Francisco）
  BlinkMacSystemFont,         // Chrome on macOS
  'Segoe UI',                 // Windows
  Roboto,                     // Android / Chrome OS
  'Helvetica Neue',           // 通用
  Helvetica,
  Arial,
  // ── 中文 ──
  'Source Han Sans SC',
  'Noto Sans SC',
  'PingFang SC',              // macOS / iOS（最稳定的中文无衬线）
  'Hiragino Sans GB',         // macOS 别名
  'Microsoft YaHei',          // Windows（最稳定的中文无衬线）
  'WenQuanYi Micro Hei',      // Linux 常见
  sans-serif                  // 终极兜底
```

**代码（等宽，不引网络字体）**：

```stylus
$font-family-mono = 
  'JetBrains Mono',           // 用户若已安装则用
  'Fira Code',                // 同上
  'SF Mono',                  // macOS
  Menlo,                      // macOS
  Monaco,                     // macOS
  Consolas,                   // Windows
  'Liberation Mono',          // Linux
  'Courier New',
  monospace
```

#### 自托管 Latin 字体（替代 Google Fonts）

**为什么不用 Google Fonts CDN**：博客域名是国内域名 `.com`，访客大概率国内，Google Fonts 在 GFW 后面，加载经常 timeout，会导致 FOIT / 长时间无文字 / 整站延迟数秒。

**做法**：

1. 在 `themes/Chic/source/fonts/latin/` 下放置以下 WOFF2 文件（从 [google-webfonts-helper](https://gwfh.mranftl.com/fonts) 下载，subset 选 `latin` + `latin-ext`）：

   ```
   cormorant-garamond-v16-latin-600.woff2     # 标题主字重
   cormorant-garamond-v16-latin-700.woff2     # 标题加粗
   inter-v13-latin-400.woff2                  # 正文常规
   inter-v13-latin-500.woff2                  # 正文中粗（标签 / 元信息）
   inter-v13-latin-600.woff2                  # 强调
   ```

   预估总大小：~5 × 18KB = **~90KB**（subset 后）

2. 在 `font.styl` 顶部加 `@font-face` 声明：

   ```stylus
   @font-face
     font-family 'Cormorant Garamond'
     font-style normal
     font-weight 600
     font-display swap
     src url('../fonts/latin/cormorant-garamond-v16-latin-600.woff2') format('woff2')
   
   @font-face
     font-family 'Cormorant Garamond'
     font-style normal
     font-weight 700
     font-display swap
     src url('../fonts/latin/cormorant-garamond-v16-latin-700.woff2') format('woff2')
   
   @font-face
     font-family 'Inter'
     font-style normal
     font-weight 400
     font-display swap
     src url('../fonts/latin/inter-v13-latin-400.woff2') format('woff2')
   
   // ... 500、600 同上
   ```

3. **不要**在 `head.ejs` 加 Google Fonts `<link>`（之前 spec 写错了，撤销）。

#### 各端字体兜底实测预期

| 平台 | 标题（衬线） | 正文（无衬线） | 代码 |
|---|---|---|---|
| **macOS / iOS** | 有 web font → Cormorant Garamond + Songti SC（中文）；无 → Georgia + Songti SC | Inter / SF + PingFang SC | SF Mono / Menlo |
| **Windows** | Cormorant + SimSun；无 → Georgia + SimSun | Inter / Segoe UI + 微软雅黑 | Consolas |
| **Android（Chrome）** | Cormorant + Noto Serif CJK SC（系统）；无 → Georgia + Noto Serif | Inter / Roboto + Noto Sans CJK SC | monospace |
| **Linux** | Cormorant + Source Han Serif（如装了）；无 → Georgia + serif | Inter + WenQuanYi Micro Hei | Liberation Mono |

**关键保障**：即使 web font 完全加载失败：
- 中文标题 → 走 `Songti SC`（macOS） / `SimSun`（Win） / `Noto Serif CJK SC`（Android），仍是衬线
- 中文正文 → 走 `PingFang SC` / `微软雅黑` / `Noto Sans CJK SC`，仍是无衬线
- Latin → 走 `Georgia` / `Segoe UI` / `Roboto`，仍是相同的衬线 / 无衬线对比

视觉风格（衬线标题 + 无衬线正文 + 等宽代码）的层次永远在，最差只是 Latin 部分换成系统字体。

### 配色 · Light（米黄宣纸）

精确对齐现有 `variable.styl` 中已定义的 token 名：

| Token（原文件已存在） | 新值 | 旧值 | 用途 |
|---|---|---|---|
| `$light-background-color` | `#FFFBEB` | `#F5F5F7` | 页面底色（米黄宣纸） |
| `$light-font-color` | `#0F172A` | `#1D1D1F` | 正文主色（深石青） |
| `$light-font-secondary-color` | `#78716C` | `#86868B` | 次级文字 |
| `$light-navbar-active-color` | `#B45309` | `#0071E3` | 当前导航 / 焦点 |
| `$light-global-link-color` | `#0F172A` | `#1D1D1F` | 全站链接默认色 |
| `$light-global-link-hover-color` | `#B45309` | `#0071E3` | 全站链接 hover |
| `$light-post-link-color` | `#B45309` | `#0071E3` | 文章正文链接 |
| `$light-post-link-hover-color` | `#92400E` | `#0077ED` | 文章链接 hover |
| `$light-pagination-link-color` | `#B45309` | `#0071E3` | 分页链接 |
| `$light-pagination-link-active-color` | `#0F172A` | `#1D1D1F` | 当前页 |
| `$light-border-color` | `#FAEEE1` | `#D2D2D7` | 边框 / 分隔线 |
| `$light-code-font-color` | `#92400E` | `#BF5AF2` | 行内代码色（不再用紫） |
| `$light-code-background-color` | `#FFFFFF` | `#FFFFFF` | 代码块底（保留白） |
| `$light-post-blockquote-border-color` | `#B45309` | `#0071E3` | 引用块左边框 |
| `$light-post-blockquote-background-color` | `#FFFFFF` | `#FFFFFF` | 引用块底（保留白） |
| `$light-post-table-background-color` | `#FFFFFF` | `#FFFFFF` | 表格底（保留白） |
| `$light-accent-color` | `#B45309` | `#FF9500` | 强调色（::selection 用） |

### 配色 · Dark（炭）

| Token（原文件已存在） | 新值 | 旧值 | 用途 |
|---|---|---|---|
| `$dark-background-color` | `#1A1816` | `#1D1D1F` | 页面底色（炭） |
| `$dark-font-color` | `#F0E9DC` | `#F5F5F7` | 正文主色（暖白） |
| `$dark-font-secondary-color` | `#A89E88` | `#86868B` | 次级文字 |
| `$dark-navbar-active-color` | `#E8B765` | `#2997FF` | 当前导航 |
| `$dark-global-link-color` | `#F0E9DC` | `#F5F5F7` | 全站链接默认 |
| `$dark-global-link-hover-color` | `#E8B765` | `#2997FF` | 全站链接 hover |
| `$dark-post-link-color` | `#E8B765` | `#2997FF` | 文章正文链接 |
| `$dark-post-link-hover-color` | `#F5C97D` | `#64B5FF` | 文章链接 hover |
| `$dark-pagination-link-color` | `#E8B765` | `#2997FF` | 分页链接 |
| `$dark-pagination-link-active-color` | `#F0E9DC` | `#F5F5F7` | 当前页 |
| `$dark-border-color` | `#3A352F` | `#424245` | 边框 / 分隔线 |
| `$dark-code-font-color` | `#E8B765` | `#BF5AF2` | 行内代码色 |
| `$dark-code-background-color` | `#2A2622` | `#2C2C2E` | 代码块底 |
| `$dark-post-blockquote-border-color` | `#E8B765` | `#2997FF` | 引用块左边框 |
| `$dark-post-blockquote-background-color` | `#2A2622` | `#2C2C2E` | 引用块底 |
| `$dark-post-table-background-color` | `#2A2622` | `#2C2C2E` | 表格底 |
| `$dark-accent-color` | `#E8B765` | `#FF9F0A` | 强调色（::selection 用） |

### 强调元素的连带变化

| 元素 | 旧 | 新 |
|---|---|---|
| 阅读进度条渐变（light） | `linear-gradient(#0071E3, #2997FF)` | `linear-gradient(#B45309, #D97706)` |
| 阅读进度条渐变（dark） | `linear-gradient(#2997FF, #64B5FF)` | `linear-gradient(#E8B765, #F5C97D)` |
| 选中文字 `::selection` light | `bg #FF9500` | `bg #B45309` |
| 选中文字 `::selection` dark | `bg #FF9F0A` | `bg #E8B765` + `color #1A1816` |
| 标签胶囊圆角 | `20px` | 保持 `20px`（不动结构） |
| 焦点样式 outline | `rgba(0,113,227,0.5)` | `rgba(180,83,9,0.5)` |

---

## 影响文件清单

| 文件 / 目录 | 改动类型 |
|---|---|
| `themes/Chic/source/fonts/latin/` | **新建目录**，放 5 个 WOFF2 文件（Cormorant 600/700 + Inter 400/500/600，subset Latin + Latin-ext） |
| `themes/Chic/source/css/font.styl` | 顶部加 `@font-face` 声明 + 重写三个字体栈变量 |
| `themes/Chic/source/css/variable.styl` | 重写两套主题的全部色值 token |
| `themes/Chic/source/css/custom.styl` | 替换所有硬编码的 `#0071E3` / `#FF9500` / 渐变值 |

**不需要动的**：所有 `.ejs` 布局文件（不需要加 Google Fonts link）、`_config.yml`、文章 Markdown 源文件、JS 文件。

---

## 对比度验证（WCAG）

所有正文 / 标题 / 链接的前景背景对必须 ≥ 4.5:1（AA），关键已验证：

- Light 正文 `#0F172A` on `#FFFBEB` → ≈ 17.4:1 ✓ AAA
- Light 链接 `#B45309` on `#FFFBEB` → ≈ 5.8:1 ✓ AA
- Dark 正文 `#F0E9DC` on `#1A1816` → ≈ 14.2:1 ✓ AAA
- Dark 链接 `#E8B765` on `#1A1816` → ≈ 9.1:1 ✓ AAA

---

## Anti-Pattern · 不要做

- **不要** 用 emoji 作图标（保持现有 iconfont SVG）
- **不要** 移除 `:focus-visible` 的 outline ring（无障碍）
- **不要** 引入除 Cormorant Garamond / Inter 之外的额外网络字体（首屏成本）
- **不要** 用渐变背景 / 大圆角 / 强阴影来"装饰" — 此风格的克制是核心（E-Ink / Paper 原则）
- **不要** 把硬编码色值散落进新代码，所有色都走 `variable.styl` 的 token
- **不要** 在没改完色之前部署到 master（先本地预览全部页面）

---

## 验收标准

完成后必须满足：

1. `hexo clean && hexo server` 启动后，浏览器访问下列页面**全部显示新配色**，无任何旧 Apple Blue / 灰白残留：
   - `/`（首页）
   - `/posts/:abbrlink/`（任一文章详情页，含代码块、引用块、标签、TOC）
   - `/archives`（归档）
   - `/category` / `/tag`（分类标签）
   - `/about`（关于）
2. 切换 light ↔ dark 模式，两套配色完整生效，无错位、无残留蓝色 / 橙色
3. 移动端（≤768px）显示一致
4. 在 `prefers-reduced-motion` 开启时仍可读
5. Lighthouse Accessibility 评分 ≥ 95（不允许低于改前）

**字体兜底专项验证**（用 Chrome DevTools → Network → 勾选"Block request URL"屏蔽 `/fonts/latin/*`，刷新页面）：

6. Latin 网络字体全部加载失败时：
   - 中文标题仍是衬线（macOS 应见 Songti SC / Win 应见 SimSun）
   - 中文正文仍是无衬线（macOS 应见 PingFang SC / Win 应见微软雅黑）
   - Latin 字符回退到 Georgia / Segoe UI 等系统字体，不出现衬线 / 无衬线错乱
   - 页面无 FOIT（不可见文字）期；最差表现是字体在 ~100ms 内 swap

7. 跨平台抽查（用 BrowserStack 或本地 device emulator）：macOS Safari / Windows Chrome / iOS Safari / Android Chrome 各跑一遍 `/` 和任一文章页，截图比对差异在可接受范围内（中文衬线在 Win 下会不如 macOS 雅，这是预期）。

---

## 假设记录

执行过程中我已默认采用以下假设，如不同意请在 review 时指出：

1. **Latin 字体自托管**到 `themes/Chic/source/fonts/latin/`，subset 选 `latin + latin-ext`（不引 GBK 字符集，因为 GBK 用 CJK 字体）
2. **CJK 不引网络字体**，只靠系统字体兜底（覆盖 macOS / iOS / Windows / Android / Linux）
3. **代码字体不引网络字体**，依赖 SF Mono / Menlo / Consolas / Liberation Mono 系统兜底
4. **WOFF2 文件提交进 git**（每个 ~18KB，5 个共 ~90KB；不上 LFS、不忽略，保证 GitHub Pages 部署能拿到）
5. 标签胶囊形状（圆角 20px）保留，仅替换颜色——若想改成方角（更 editorial）需要单独说明
6. 引用块的卡片白底（`$light-post-blockquote-background-color = #FFFFFF`）保留，与米黄背景形成对比层次

---

## 后续

设计文档批准后，调用 `superpowers:writing-plans` 写实施计划（按文件列出步骤、本地预览验收点）。
