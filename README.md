# 🌌 TGEEA 性別議題星系圖

> 用 D3.js 將台灣性別平等教育協會（TGEEA）的議題脈絡，視覺化為一張可互動的「宇宙星系圖」，讓議題之間的交織關係一目了然。

![License](https://img.shields.io/badge/license-MIT-purple)
![D3.js](https://img.shields.io/badge/D3.js-v7-blue)
![RWD](https://img.shields.io/badge/RWD-mobile%20friendly-green)

---

## ✨ 功能特色

- **35 個議題節點**，橫跨 7 大分類：性別認同、教育推廣、性別暴力、身體自主、家庭多元、法律政策、社會文化
- **55 條連線**，線條粗細代表議題關聯強度
- 點擊任一節點 → 高亮其所有關聯，其餘淡出
- 分類圖例篩選，可單獨聚焦某類議題
- 搜尋框輸入關鍵字，視角自動飛過去並聚焦
- 拖曳節點重排、滾輪/雙指縮放
- 手機、平板、桌機全裝置自適應（RWD）
- 手機版圖例收折為下拉選單，觸控操作流暢

---

## 🖥️ 線上 Demo

> 推上 GitHub 後，至 **Settings → Pages → Branch: main / root** 啟用，
> 即可透過以下網址存取（請替換為你的帳號）：
>
> `https://<你的GitHub帳號>.github.io/<repo名稱>/`

---

## 📁 檔案結構

```
tgeea-galaxy/
├── index.html   # 主頁面骨架（僅 HTML，無任何內嵌樣式或腳本）
├── style.css    # 所有樣式，含 RWD media queries
├── app.js       # D3.js 資料、模擬、互動邏輯
└── README.md    # 本文件
```

三個檔案**互相獨立**，職責清楚：
- `index.html` 只負責結構與引用
- `style.css` 只負責外觀與響應式排版
- `app.js` 只負責資料與行為

---

## 🚀 本機執行

由於瀏覽器的安全限制，直接雙擊 `index.html` 可能無法正常載入外部的 `.css` 和 `.js` 檔案。  
建議使用任一方式啟動本機伺服器：

**方法一：VS Code（推薦）**
安裝 [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) 擴充套件，右鍵 `index.html` → **Open with Live Server**。

**方法二：Python（無需安裝任何套件）**
```bash
# Python 3
python -m http.server 8080

# 開啟瀏覽器造訪
http://localhost:8080
```

**方法三：Node.js**
```bash
npx serve .
```

---

## 📦 部署到 GitHub Pages（免費公開網站）

```bash
# 1. 在 GitHub 建立新 repository（例如：tgeea-galaxy）

# 2. 初始化並推送
git init
git add .
git commit -m "feat: 初始化 TGEEA 星系圖"
git branch -M main
git remote add origin https://github.com/<你的帳號>/tgeea-galaxy.git
git push -u origin main

# 3. 到 GitHub 網頁：
#    Settings → Pages → Source → Deploy from a branch
#    Branch: main  /  Folder: / (root)
#    Save

# 幾分鐘後即可在以下網址存取：
# https://<你的帳號>.github.io/tgeea-galaxy/
```

---

## 🛠️ 技術架構

| 項目 | 說明 |
|------|------|
| [D3.js v7](https://d3js.org) | 資料視覺化核心，force simulation、zoom、drag |
| Vanilla JS | 零框架、零打包工具，直接在瀏覽器執行 |
| CSS Grid + Flexbox | Header 的響應式佈局 |
| CSS Media Queries | 三段斷點：桌機 > 960px / 平板 600–959px / 手機 < 600px |
| Pointer Events API | D3 drag 原生支援滑鼠與觸控，不需額外函式庫 |

### 資料設計

```js
// 每個節點包含：
{ id, cat, size, hub?, desc }

// 每條連線包含：
{ source, target, weight }  // weight 1–5，影響連線粗細與節點間距
```

---

## 🎨 如何修改資料

開啟 `app.js`，在檔案頂部找到 `nodes` 與 `links` 陣列：

```js
// 新增一個議題節點
{ id: "你的議題",  cat: "社會文化",  size: 14,  desc: "議題說明。" },

// 新增一條連線（weight 1–5，數字越大連結越強）
{ source: "你的議題",  target: "交織性",  weight: 3 },
```

7 大分類與顏色定義在 `categories` 物件，可自由調整色碼。

---

## 🤝 如何貢獻

歡迎任何形式的貢獻！

1. Fork 此 repository
2. 建立功能分支：`git checkout -b feat/你的功能`
3. 提交變更：`git commit -m "feat: 新增 OO 功能"`
4. 推送分支：`git push origin feat/你的功能`
5. 開一個 Pull Request，說明你做了什麼

**特別歡迎以下貢獻：**
- 補充更多 TGEEA 議題節點與連線
- 新增點擊節點後連結到 TGEEA 網站相關文章的功能
- 改善無障礙（a11y）體驗
- 翻譯為英文版（英語國際推廣用）
- 加入動態資料載入（從 JSON 或 API 讀取）

---

## 📄 授權

本專案採用 [MIT License](LICENSE)。

資料內容來源：[台灣性別平等教育協會（TGEEA）](https://tgeea.org.tw/)，  
視覺化為獨立創作，並非 TGEEA 官方出品。

---

## 🙏 致謝

- [台灣性別平等教育協會（TGEEA）](https://tgeea.org.tw/) — 多年來推動性別平等教育的工作，是這個視覺化的靈感來源
- [D3.js](https://github.com/d3/d3) by Mike Bostock — 把資料變成生命的魔法工具

---

<p align="center">
  Made with 💜 · 讓議題被看見，讓交織被理解
</p>
