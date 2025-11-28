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

document.ready(
  // toggleTheme function.
  // this script shouldn't be changed.
  () => {
    var _Blog = window._Blog || {};
    const currentTheme =
      window.localStorage && window.localStorage.getItem("theme");
    const isDark = currentTheme === "dark";
    const pagebody = document.getElementsByTagName("body")[0];
    if (isDark) {
      document.getElementById("switch_default").checked = true;
      // mobile
      document.getElementById("mobile-toggle-theme").innerText = "· Dark";
    } else {
      document.getElementById("switch_default").checked = false;
      // mobile
      document.getElementById("mobile-toggle-theme").innerText = "· Light";
    }
    _Blog.toggleTheme = function () {
      if (isDark) {
        pagebody.classList.add("dark-theme");
        // mobile
        document.getElementById("mobile-toggle-theme").innerText = "· Dark";
      } else {
        pagebody.classList.remove("dark-theme");
        // mobile
        document.getElementById("mobile-toggle-theme").innerText = "· Light";
      }
      document
        .getElementsByClassName("toggleBtn")[0]
        .addEventListener("click", () => {
          if (pagebody.classList.contains("dark-theme")) {
            pagebody.classList.remove("dark-theme");
          } else {
            pagebody.classList.add("dark-theme");
          }
          window.localStorage &&
            window.localStorage.setItem(
              "theme",
              document.body.classList.contains("dark-theme") ? "dark" : "light"
            );
        });
      // moblie
      document
        .getElementById("mobile-toggle-theme")
        .addEventListener("click", () => {
          if (pagebody.classList.contains("dark-theme")) {
            pagebody.classList.remove("dark-theme");
            // mobile
            document.getElementById("mobile-toggle-theme").innerText =
              "· Light";
          } else {
            pagebody.classList.add("dark-theme");
            // mobile
            document.getElementById("mobile-toggle-theme").innerText = "· Dark";
          }
          window.localStorage &&
            window.localStorage.setItem(
              "theme",
              document.body.classList.contains("dark-theme") ? "dark" : "light"
            );
        });
    };
    _Blog.toggleTheme();

    // 代码复制功能
    _Blog.initCodeCopy = function () {
      const highlights = document.querySelectorAll("figure.highlight");
      highlights.forEach((highlight) => {
        if (highlight.querySelector(".code-header")) return;

        // 1. Create Header
        const header = document.createElement("div");
        header.className = "code-header";

        // 2. Filename (from figcaption)
        const figcaption = highlight.querySelector("figcaption");
        let filename = "";
        if (figcaption) {
          filename = figcaption.innerText.trim();
          figcaption.style.display = "none";
        }

        const fileSpan = document.createElement("span");
        fileSpan.className = "code-filename";

        if (filename) {
          fileSpan.textContent = filename;
        }
        header.appendChild(fileSpan);

        // 3. Language & Copy
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
        if (lang === "plain" || lang === "text") lang = "TEXT";
        else lang = lang.toUpperCase();

        const langSpan = document.createElement("span");
        langSpan.className = "code-lang";
        langSpan.textContent = lang;

        const copyBtn = document.createElement("button");
        copyBtn.className = "code-copy-btn";
        const copyIcon = `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
        const checkIcon = `<svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
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
            copyBtn.innerHTML = copyIcon;
            setTimeout(() => {
              copyBtn.innerHTML = copyIcon;
            }, 2000);
          }
        });

        controls.appendChild(copyBtn);
        controls.appendChild(langSpan);
        header.appendChild(controls);

        // 4. Wrap Table
        const wrapper = document.createElement("div");
        wrapper.className = "code-wrapper";
        const table = highlight.querySelector("table");
        if (table) {
          wrapper.appendChild(table);
        }

        // Clear and append
        // highlight.innerHTML = ''; // Be careful not to lose other things if any
        // But we moved table. figcaption is hidden.
        // Let's just append header and wrapper.
        // But we need to remove the old table from highlight if it wasn't moved (appendChild moves it).

        // Insert Header at top
        highlight.insertBefore(header, highlight.firstChild);
        // Append Wrapper at bottom (or after header)
        highlight.appendChild(wrapper);
      });
    };
    _Blog.initCodeCopy();

    // ready function.
  }
);
