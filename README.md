# 📄 PDF → Pages (PDF Extractor)

Extract every page of a PDF as high-quality PNG images — with full control over naming, quality, and export.

---

## 🚀 For Users

### ✨ What this app does

- Upload any PDF file
- Extract each page as a PNG image
- Customize file names (e.g. `page_001.png`)
- Download all pages as a ZIP
- Preview pages before downloading

---

### 🧑‍💻 How to use

1. Upload your PDF (drag & drop or click)
2. Choose settings:
   - **Render Quality** (1x–4x)
   - **File Naming Format**
3. Click **"Extract Pages"**
4. Download:
   - Individual pages, or
   - All pages as a ZIP

---

### 🧠 File naming tips

You can use:

- `{page}` → page number (1, 2, 3…)
- `{padded}` → 001, 002, 003…
- `{total}` → total pages

Example:
page_{padded}
→ page_001.png


---

### 📁 Download behavior

- Default: files download to your browser’s **Downloads folder**
- Chrome/Edge: you can pick a custom folder

---

## 🛠️ For Developers

### ⚙️ Tech Stack

- React (Vite)
- Tailwind CSS v4
- pdfjs-dist (PDF rendering)
- JSZip (ZIP creation)

---
