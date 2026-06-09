# 兒科肌肉骨骼超音波教學網 — 上線指南

本資料夾為一個完整的靜態網站。所有檔案都可直接在瀏覽器開啟瀏覽，也可上傳到 GitHub Pages、Netlify 或任何虛擬主機免費上線。

---

## 📁 資料夾結構

```
ultrasound-teaching-site/
├── index.html                  # 首頁
├── about.html                  # 關於講者
├── workshop.html               # 工作坊回顧 + 下載
├── blog.html                   # 衛教文章 + Blogger 連結
├── contact.html                # 聯絡與意見回饋（含表單）
├── articles/
│   ├── joint-ultrasound.html   # Module 01 關節超音波
│   ├── salivary-gland.html     # Module 02 唾液腺
│   └── neck-lymph-node.html    # Module 03 頸部淋巴結
├── css/
│   └── style.css               # 共用樣式（學術正式風格）
├── js/                         # 預留（目前未使用）
├── images/                     # 圖片放置處（請上傳工作坊照片、ultrasound 圖）
├── downloads/                  # PDF 講義與 reference 放置處
└── README-上線指南.md            # 本檔案
```

---

## ✅ 上線前必做的調整（建議 30 分鐘內完成）

依重要性排序：

### 1. 替換 Blogger 連結（blog.html）

打開 `blog.html`，搜尋 `https://www.blogger.com/`，將上方按鈕的 href 改為您實際的 Blogger 主頁網址（例如：`https://drtseng-air.blogspot.com/`）。

另外每篇 blog-card 內 `<a>` 標籤的 `href="#"` 都要改成對應 Blogger 上文章的網址。

### 2. 替換 Email（contact.html）

打開 `contact.html`，將 **兩個地方** 的 `your-email@example.com` 換成您實際的聯絡信箱：
- 上方按鈕的 `mailto:` 連結
- 頁面下方 `<script>` 區塊中的 `RECIPIENT` 變數

### 3. 上傳工作坊照片（workshop.html）

`workshop.html` 中有四個 `[ 照片 X ]` 的虛擬卡片。上傳實際照片到 `images/` 資料夾後，將 `<div class="img-placeholder">...</div>` 換成 `<img src="images/photo1.jpg" alt="描述">`。

### 4. 上傳下載檔案（workshop.html + downloads/）

`workshop.html` 的下載連結指向 `downloads/` 資料夾，但目前裡面是空的。請將您的 PDF 講義、scanning protocol、文獻 PDF 放入該資料夾。檔名要與 HTML 中的 href 對應。

### 5. 替換或補上圖片（三個 article 頁面）

`articles/joint-ultrasound.html`、`salivary-gland.html`、`neck-lymph-node.html` 中皆有 `[ Figure X ]` 的虛擬區塊。上傳實際 ultrasound 影像到 `images/` 後，將：

```html
<div class="fig-placeholder">[ Figure 1 ]<br>...</div>
```

換成：

```html
<img src="../images/figure1.png" alt="Figure 1 描述">
```

注意 article 頁面在 `articles/` 子資料夾，所以路徑要用 `../images/...`。

---

## 🚀 上線方式：GitHub Pages（推薦）

### 步驟 1：註冊 GitHub 帳號（如果還沒有的話）
1. 前往 [github.com](https://github.com/) 註冊。
2. 建議使用您的英文名 + 姓做為帳號（例如 `chitengtseng`）。這會成為您網站網址的一部分。

### 步驟 2：建立一個 repository（儲存庫）
1. 登入 GitHub 後，點右上角 `+` → `New repository`。
2. Repository name：**`<您的帳號>.github.io`**（例如：`chitengtseng.github.io`）。
   - ⚠️ 名稱一定要是 `帳號.github.io`，這樣 GitHub Pages 才會自動啟用網址 `https://帳號.github.io`。
3. 設為 **Public**。
4. 不要勾選 "Add a README file"。
5. 點 `Create repository`。

### 步驟 3：上傳網站檔案
最簡單的方式（不用 git command line）：

1. 在新建立的 repository 頁面，點 `uploading an existing file`（或 `Add file` → `Upload files`）。
2. 把 `ultrasound-teaching-site/` 資料夾**內部所有檔案與子資料夾**直接拖到網頁上（不要連 `ultrasound-teaching-site` 這層資料夾一起拖）。
3. 等檔案全部上傳完成（綠色勾號）。
4. 滑到最下方，commit message 隨意填（例如「初版上線」），點綠色按鈕 `Commit changes`。

### 步驟 4：啟用 GitHub Pages（通常會自動啟用）
1. 在 repository 頁面點 `Settings`（齒輪圖示）。
2. 左側選 `Pages`。
3. Source 區應該已經是 `Deploy from a branch`、`main` branch、`/ (root)` 資料夾。如果不是，請手動設定。
4. 點 `Save`。
5. 等 1–3 分鐘，回到 Settings → Pages，會看到綠色框框寫：
   `Your site is live at https://您的帳號.github.io/`

完成！您的網站已經上線。

### 步驟 5：日後更新
任何時候要更新內容（修改文字、新增文章、上傳照片），都可以：
- 直接在 GitHub 網頁上點檔案 → 鉛筆圖示 → 編輯 → commit。
- 或重新使用 `Add file` → `Upload files` 上傳新檔案覆蓋舊的。

更新後 1–2 分鐘內網站就會自動重新部署。

---

## 🎨 進階：綁定自己的網域

如果您想用自己的 `.com` 或 `.tw` 網址（例如 `drtseng-ultrasound.com`），步驟：

1. 在網域註冊商（例如 GoDaddy、Namecheap、Gandi、PChome 等）購買網域。
2. 在網域註冊商的 DNS 設定加入：
   - 4 條 A 記錄指向 GitHub Pages 的 IP（185.199.108.153 / 185.199.109.153 / 185.199.110.153 / 185.199.111.153）
   - 1 條 CNAME 指向 `您的帳號.github.io`
3. 在 GitHub repository 的 Settings → Pages → Custom domain 填入您的網域。
4. 啟用 Enforce HTTPS（建議）。

詳細步驟可參考：[GitHub 官方文件](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

## 🔧 進階：表單後端（讓 contact.html 直接寄信給您）

目前的聯絡表單會開啟使用者電腦的 email 程式（mailto:）。如果想要使用者直接送信到您的信箱（不必開 outlook），可以使用免費服務：

- **[Formspree](https://formspree.io/)** — 免費 50 封/月。把 `<form>` 的 action 換成 Formspree 提供的 URL 即可。
- **[Web3Forms](https://web3forms.com/)** — 免費，無限信件。
- **[Google Forms](https://docs.google.com/forms/)** — 把網站連結改成 Google Form 也是一個簡單方案。

---

## 💡 後續擴充建議

當網站上線後，建議以下擴充方向：

1. **新增更多教學模組**：例如「Echo-guided injection 實作教學」、「兒童下肢骨折超音波」、「Power Doppler 細部設定」等。
2. **加入影片**：在 article 頁面嵌入 YouTube 不公開影片（unlisted），讓學員看到實際掃描手勢。
3. **新增 FAQ 頁面**：整理工作坊學員最常問的問題。
4. **訂閱電子報**：使用 Mailchimp 或 Substack 收集 email，定期推送新文章與工作坊資訊。
5. **多語版本**：未來如要面向國際同道，可建立英文版頁面 (`/en/...`)。
6. **互動 quiz**：使用簡單 JavaScript 做影像判讀測驗，讓學員自我評量。

---

## 🆘 遇到問題？

- HTML/CSS 顯示異常 → 用 Chrome 開發者工具 (F12) 看 Console 錯誤訊息。
- 上傳 GitHub 後 404 → 確認檔案大小寫與 HTML 中的 href 完全相符（GitHub Pages 區分大小寫）。
- 表單按下沒反應 → 確認 contact.html 中 RECIPIENT 變數已替換為實際 email。

任何技術問題都可以再來找我協助修正。

---

**主筆人**: 曾吉騰 醫師 (Chi-Teng Tseng, MD-MPH)
**版本**: v1.0 · 2026 初版
**License**: 內容版權所屬主筆人；網站結構與設計可自由修改使用。
