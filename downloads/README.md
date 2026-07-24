# downloads/ 講義與資源下載資料夾

工作坊頁面（`workshop.html`）的下載按鈕會連結到「這個資料夾裡的檔案」。
只要把您的 PDF 放進來、**檔名完全對應**下表，網站的下載鈕就會生效。

## 一、講義與 Scanning Protocol（請放入以下 6 個檔案）

| 網頁上的項目 | 請放入的檔名（不可更改） |
|---|---|
| Module 01 講義 — 關節超音波正常表現 | `Module01_Joint_Ultrasound_Handout.pdf` |
| Module 02 講義 — 唾液腺超音波與 JSjS | `Module02_Salivary_Gland_Handout.pdf` |
| Module 03 講義 — 兒童頸部淋巴結 | `Module03_Neck_LN_Handout.pdf` |
| Scanning Protocol — 關節超音波 | `Scanning_Protocol_Joint.pdf` |
| Scanning Protocol — 唾液腺 | `Scanning_Protocol_Salivary.pdf` |
| Scanning Protocol — 頸部淋巴結 | `Scanning_Protocol_NeckLN.pdf` |

## 二、如何上傳（三種方式擇一）

**方式 A — 直接放進資料夾（最簡單）**
把 PDF 拖進這個 `downloads/` 資料夾，檔名照上表命名即可。若您使用桌面版工具，放好後告訴我「檔案放好了」，我可以幫您確認並提交上線。

**方式 B — GitHub 網頁上傳**
1. 前往 repo：`https://github.com/chitengtseng45/chitengtseng45.github.io`
2. 進入 `downloads` 資料夾 → 右上角 **Add file → Upload files**
3. 拖入 PDF（檔名照上表）→ 下方 **Commit changes**
4. 約 1–2 分鐘後 GitHub Pages 會自動更新，下載鈕即生效。

**方式 C — Git 指令**
```bash
# 把 PDF 複製進 downloads/ 後
git add downloads/*.pdf
git commit -m "Add workshop handout PDFs"
git push
```

## 三、注意事項

- **檔名務必完全一致**（含大小寫、底線），否則會出現 404 找不到檔案。
- 建議單檔 < 25 MB；GitHub 對單一檔案上限為 100 MB。
- **版權文獻**：期刊論文（Roth、Collado、Hocevar、Ludwig、Cañas 等）**請勿**放 PDF 進來，頁面已改為連到期刊官方 DOI 連結，符合著作權規範。
- 想新增其他檔案（例如簡報、案例影像 zip），放進來後告訴我項目名稱，我可以幫您加上對應的下載按鈕。

## 四、目前檔案狀態

放入檔案後可在此打勾自我檢查：

- [ ] Module01_Joint_Ultrasound_Handout.pdf
- [ ] Module02_Salivary_Gland_Handout.pdf
- [ ] Module03_Neck_LN_Handout.pdf
- [ ] Scanning_Protocol_Joint.pdf
- [ ] Scanning_Protocol_Salivary.pdf
- [ ] Scanning_Protocol_NeckLN.pdf
