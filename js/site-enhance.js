/* ============================================================
   site-enhance.js
   兒科肌肉骨骼超音波教學網 — 手機體驗強化 + 電腦版/手機版切換
   ------------------------------------------------------------
   功能：
   1. 右下角浮動「電腦版 / 手機版」切換鈕（仿 Blogger），記憶在瀏覽器
   2. 手機版：頂部選單收成漢堡選單（不再遮住內容）
   3. 手機版：目錄收合（預設收起，點一下展開）
   4. 手機版：寬表格可左右滑動（內容不再被切掉）
   5. 錨點連結加上捲動偏移（點目錄不會被固定選單擋住）

   本檔自帶所有 CSS，不會動到 css/style.css。
   使用：在每個 .html 的 </body> 前加入一行：
     <script src="/js/site-enhance.js"></script>
   ============================================================ */
(function () {
  "use strict";

  var STORE_KEY = "siteViewMode";        // "mobile" | "desktop"
  var DESKTOP_WIDTH = "1080";            // 強制電腦版時的虛擬寬度

  /* ---------- 1. viewport 依記憶設定 ---------- */
  function getViewport() {
    var vp = document.querySelector('meta[name="viewport"]');
    if (!vp) {
      vp = document.createElement("meta");
      vp.setAttribute("name", "viewport");
      document.head.appendChild(vp);
    }
    return vp;
  }

  function readMode() {
    try { return localStorage.getItem(STORE_KEY) || "mobile"; }
    catch (e) { return "mobile"; }
  }

  function applyMode(mode) {
    var vp = getViewport();
    if (mode === "desktop") {
      vp.setAttribute("content", "width=" + DESKTOP_WIDTH);
      document.documentElement.classList.add("force-desktop");
    } else {
      vp.setAttribute("content", "width=device-width, initial-scale=1.0");
      document.documentElement.classList.remove("force-desktop");
    }
    try { localStorage.setItem(STORE_KEY, mode); } catch (e) {}
    updateToggleLabel(mode);
  }

  /* ---------- 2. 注入自帶 CSS ---------- */
  function injectCSS() {
    var css = ""
    + ".view-toggle-btn{position:fixed;right:14px;bottom:14px;z-index:9999;"
    + "display:none;align-items:center;gap:.4em;padding:.55rem .9rem;"
    + "font-family:inherit;font-size:.9rem;font-weight:600;line-height:1;"
    + "color:#fff;background:#0e2748;border:1px solid #b08a3e;border-radius:999px;"
    + "box-shadow:0 3px 10px rgba(14,39,72,.35);cursor:pointer;}"
    + ".view-toggle-btn:hover{background:#1a3d6e;}"
    + ".show-view-toggle .view-toggle-btn{display:inline-flex;}"

    + ".nav-toggle{display:none;background:transparent;border:1px solid rgba(255,255,255,.5);"
    + "color:#fff;font-size:1.4rem;line-height:1;padding:.25rem .6rem;border-radius:6px;"
    + "cursor:pointer;}"

    + "@media (max-width:760px){"
    +   ".nav-toggle{display:inline-block;}"
    +   "nav.main-nav{display:none;flex-basis:100%;flex-direction:column;gap:.15rem;margin-top:.5rem;}"
    +   "nav.main-nav.open{display:flex;}"
    +   "nav.main-nav a{padding:.6rem .5rem;border-radius:6px;border-bottom:1px solid rgba(255,255,255,.08);}"

    +   "aside.toc .toc-toggle{cursor:pointer;position:relative;padding-right:1.4em;}"
    +   "aside.toc .toc-toggle::after{content:'\\25BE';position:absolute;right:.2em;top:0;"
    +     "transition:transform .18s ease;}"
    +   "aside.toc:not(.toc-open) .toc-toggle::after{transform:rotate(-90deg);}"
    +   "aside.toc:not(.toc-open) ul{display:none;}"
    +   "aside.toc.toc-open ul{display:block;}"

    +   ".table-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch;"
    +     "border:1px solid #d8d3c5;border-radius:4px;margin:1.5rem 0;}"
    +   ".table-scroll table.scoring{margin:0;min-width:560px;}"
    +   "figure.fig{overflow-x:auto;}"

    +   "img,table{max-width:100%;}"
    + "}"

    + "[id]{scroll-margin-top:90px;}"

    + "@media (min-width:1000px){aside.toc ul{display:block !important;}}";

    var style = document.createElement("style");
    style.id = "site-enhance-css";
    style.textContent = css;
    document.head.appendChild(style);
  }

  /* ---------- 3. 漢堡選單 ---------- */
  function buildHamburger() {
    var inner = document.querySelector(".topbar-inner");
    var nav = document.querySelector("nav.main-nav");
    if (!inner || !nav || inner.querySelector(".nav-toggle")) return;

    var btn = document.createElement("button");
    btn.className = "nav-toggle";
    btn.setAttribute("aria-label", "開啟選單");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = "&#9776;"; // ☰
    inner.insertBefore(btn, nav);

    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 4. 目錄收合 ---------- */
  function buildTOC() {
    var toc = document.querySelector("aside.toc");
    if (!toc) return;
    var head = toc.querySelector("h4");
    if (!head) return;
    head.classList.add("toc-toggle");
    head.setAttribute("role", "button");
    head.addEventListener("click", function () {
      toc.classList.toggle("toc-open");
    });
    if (window.screen && window.screen.width > 820) {
      toc.classList.add("toc-open");
    }
  }

  /* ---------- 5. 表格包裹可滑動容器 ---------- */
  function wrapTables() {
    document.querySelectorAll("table.scoring").forEach(function (t) {
      if (t.parentElement && t.parentElement.classList.contains("table-scroll")) return;
      var wrap = document.createElement("div");
      wrap.className = "table-scroll";
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    });
  }

  /* ---------- 6. 浮動切換鈕 ---------- */
  var toggleBtn = null;
  function updateToggleLabel(mode) {
    if (!toggleBtn) return;
    toggleBtn.innerHTML = (mode === "desktop")
      ? "&#128241; 手機版"   // 📱
      : "&#128421; 電腦版";  // 🖥
    toggleBtn.setAttribute("aria-label",
      mode === "desktop" ? "切換回手機版" : "切換到電腦版");
  }

  function buildToggle() {
    toggleBtn = document.createElement("button");
    toggleBtn.className = "view-toggle-btn";
    toggleBtn.type = "button";
    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener("click", function () {
      // 以目前實際狀態為準（即使瀏覽器封鎖 localStorage 也能正常切換）
      var isDesktop = document.documentElement.classList.contains("force-desktop");
      applyMode(isDesktop ? "mobile" : "desktop");
      var nav = document.querySelector("nav.main-nav");
      if (nav) nav.classList.remove("open");
    });

    if (window.screen && window.screen.width <= 820) {
      document.documentElement.classList.add("show-view-toggle");
    }
    updateToggleLabel(readMode());
  }

  /* ---------- 啟動 ---------- */
  applyMode(readMode());
  injectCSS();
  buildHamburger();
  buildTOC();
  wrapTables();
  buildToggle();
})();
