// declaraction of document.ready() function.
(function () {
  var ie = !!(window.attachEvent && !window.opera);
  var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && RegExp.$1 < 525;
  var fn = [];
  var run = function () {
    for (var i = 0; i < fn.length; i++) fn[i]();
  };
  var d = document;
  d.ready = function (f) {
    if (!ie && !wk && d.addEventListener)
      return d.addEventListener("DOMContentLoaded", f, false);
    if (fn.push(f) > 1) return;
    if (ie)
      (function () {
        try {
          d.documentElement.doScroll("left");
          run();
        } catch (err) {
          setTimeout(arguments.callee, 0);
        }
      })();
    else if (wk)
      var t = setInterval(function () {
        if (/^(loaded|complete)$/.test(d.readyState)) clearInterval(t), run();
      }, 0);
  };
})();

document.ready(() => {
  var _Blog = window._Blog || {};
  const pagebody = document.body;

  // ==============================
  // 主题切换功能
  // ==============================
  _Blog.initTheme = function () {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;

    // 初始化开关状态
    const switchEl = document.getElementById("switch_default");
    const mobileToggle = document.getElementById("mobile-toggle-theme");

    if (switchEl) switchEl.checked = isDark;
    if (mobileToggle) mobileToggle.innerText = isDark ? "· Dark" : "· Light";

    // 切换函数
    function toggleTheme() {
      const isDarkNow = pagebody.classList.contains("dark-theme");
      pagebody.classList.toggle("dark-theme");
      const newTheme = isDarkNow ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      if (mobileToggle) mobileToggle.innerText = newTheme === "dark" ? "· Dark" : "· Light";
    }

    // 桌面端切换
    const toggleBtn = document.querySelector(".toggleBtn");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleTheme);
    }

    // 移动端切换
    if (mobileToggle) {
      mobileToggle.addEventListener("click", toggleTheme);
    }

    // 监听系统主题变化
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      if (!localStorage.getItem("theme")) {
        pagebody.classList.toggle("dark-theme", e.matches);
        if (switchEl) switchEl.checked = e.matches;
        if (mobileToggle) mobileToggle.innerText = e.matches ? "· Dark" : "· Light";
      }
    });
  };

  // ==============================
  // 阅读进度条
  // ==============================
  _Blog.initReadingProgress = function () {
    const progressBar = document.getElementById("reading-progress");
    const article = document.querySelector(".post-content");
    if (!progressBar || !article) return;

    function updateProgress() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;
      progressBar.style.width = progress + "%";
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  };

  // ==============================
  // 导航栏滚动效果
  // ==============================
  _Blog.initNavbarScroll = function () {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    function updateNavbar() {
      if (window.scrollY > 10) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }

    window.addEventListener("scroll", updateNavbar, { passive: true });
    updateNavbar();
  };

  // ==============================
  // 代码复制功能
  // ==============================
  _Blog.initCodeCopy = function () {
    const highlights = document.querySelectorAll("figure.highlight");
    highlights.forEach((highlight) => {
      if (highlight.querySelector(".code-header")) return;

      const header = document.createElement("div");
      header.className = "code-header";

      const figcaption = highlight.querySelector("figcaption");
      let filename = "";
      if (figcaption) {
        filename = figcaption.innerText.trim();
        figcaption.style.display = "none";
      }

      const fileSpan = document.createElement("span");
      fileSpan.className = "code-filename";
      if (filename) fileSpan.textContent = filename;
      header.appendChild(fileSpan);

      const controls = document.createElement("div");
      controls.className = "code-controls";

      let lang = "";
      highlight.classList.forEach((cls) => {
        if (cls === "highlight") return;
        if (cls.startsWith("language-")) {
          lang = cls.replace("language-", "");
        } else if (!lang) {
          lang = cls;
        }
      });
      lang = lang === "plain" || lang === "text" ? "TEXT" : lang.toUpperCase();

      const langSpan = document.createElement("span");
      langSpan.className = "code-lang";
      langSpan.textContent = lang;

      const copyBtn = document.createElement("button");
      copyBtn.className = "code-copy-btn";
      const copyIcon = `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
      const checkIcon = `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      copyBtn.innerHTML = copyIcon;

      copyBtn.addEventListener("click", async () => {
        const codeElement = highlight.querySelector(".code pre");
        if (!codeElement) return;
        const code = codeElement.innerText;

        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(code);
          } else {
            const textArea = document.createElement("textarea");
            textArea.value = code;
            textArea.style.position = "fixed";
            textArea.style.left = "-999999px";
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);
          }
          copyBtn.innerHTML = checkIcon;
          copyBtn.classList.add("copied");
          setTimeout(() => {
            copyBtn.innerHTML = copyIcon;
            copyBtn.classList.remove("copied");
          }, 2000);
        } catch (err) {
          console.error("Copy failed", err);
        }
      });

      controls.appendChild(copyBtn);
      controls.appendChild(langSpan);
      header.appendChild(controls);

      const wrapper = document.createElement("div");
      wrapper.className = "code-wrapper";
      const table = highlight.querySelector("table");
      if (table) wrapper.appendChild(table);

      highlight.insertBefore(header, highlight.firstChild);
      highlight.appendChild(wrapper);
    });
  };

  // ==============================
  // 图片灯箱功能
  // ==============================
  _Blog.initImageLightbox = function () {
    const images = document.querySelectorAll(".post-content img");
    if (!images.length) return;

    // 创建灯箱容器
    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.innerHTML = '<img src="" alt=""><span class="lightbox-close">&times;</span>';
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector("img");

    images.forEach((img) => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";
        lightbox.classList.add("active");
        document.body.style.overflow = "hidden";
      });
    });

    // 点击关闭
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
      }
    });

    // ESC键关闭
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        lightbox.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  };

  // ==============================
  // 移动端TOC抽屉
  // ==============================
  _Blog.initMobileToc = function () {
    const btn = document.getElementById("mobile-toc-btn");
    const drawer = document.getElementById("mobile-toc-drawer");
    const overlay = document.getElementById("drawer-overlay");
    const closeBtn = document.getElementById("drawer-close");

    if (!btn || !drawer) return;

    function openDrawer() {
      drawer.classList.add("active");
      if (overlay) overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    }

    function closeDrawer() {
      drawer.classList.remove("active");
      if (overlay) overlay.classList.remove("active");
      document.body.style.overflow = "";
    }

    btn.addEventListener("click", openDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);

    // 点击目录链接后关闭抽屉
    drawer.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        setTimeout(closeDrawer, 100);
      });
    });

    // 监听tocbot更新后重新绑定链接
    const observer = new MutationObserver(() => {
      drawer.querySelectorAll("a").forEach((a) => {
        a.removeEventListener("click", closeDrawer);
        a.addEventListener("click", () => {
          setTimeout(closeDrawer, 100);
        });
      });
    });

    const drawerContent = drawer.querySelector(".drawer-content");
    if (drawerContent) {
      observer.observe(drawerContent, { childList: true, subtree: true });
    }
  };

  // 初始化所有功能
  _Blog.initTheme();
  _Blog.initReadingProgress();
  _Blog.initNavbarScroll();
  _Blog.initCodeCopy();
  _Blog.initImageLightbox();
  _Blog.initMobileToc();
});
