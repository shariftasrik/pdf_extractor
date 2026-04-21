import { useState, useRef, useCallback, useEffect } from "react";
import JSZip from "jszip";
import pdfjsLib from "./lib/pdf";
import { buildPageFilename } from "./utils/buildPageFilename";

import Header from "./components/Header";
import AlertMessage from "./components/AlertMessage";
import UploadZone from "./components/UploadZone";
import SettingsPanel from "./components/SettingsPanel";
import ActionControls from "./components/ActionControls";
import ProgressBar from "./components/ProgressBar";
import StatsBar from "./components/StatsBar";
import PageNamesEditor from "./components/PageNamesEditor";
import PageGrid from "./components/PageGrid";
import EmptyState from "./components/EmptyState";
import Footer from "./components/Footer";

const supportsFilePicker =
  typeof window !== "undefined" && "showDirectoryPicker" in window;

export default function App() {
  const [file, setFile] = useState(null);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [scale, setScale] = useState(2);
  const [totalPages, setTotalPages] = useState(0);
  const [dlAll, setDlAll] = useState(false);

  const [zipName, setZipName] = useState("pdf_pages");
  const [pageTemplate, setPageTemplate] = useState("page_{padded}");
  const [pageNames, setPageNames] = useState({});
  const [showNames, setShowNames] = useState(false);

  const [dirHandle, setDirHandle] = useState(null);
  const [fallbackPath, setFallbackPath] = useState("");

  const fileRef = useRef(null);

  useEffect(() => {
    setPageNames({});
  }, [pageTemplate]);

  useEffect(() => {
    if (file) {
      setZipName(
        file.name.replace(/\.pdf$/i, "").replace(/\s+/g, "_") || "pdf_pages"
      );
    }
  }, [file]);

  const getFilename = useCallback(
    (pageNum, total) => {
      return (
        pageNames[pageNum] ||
        buildPageFilename(pageTemplate, pageNum, total || totalPages)
      );
    },
    [pageNames, pageTemplate, totalPages]
  );

  const handleFile = useCallback((f) => {
    if (!f || f.type !== "application/pdf") {
      setError("Please upload a valid PDF file.");
      return;
    }

    setFile(f);
    setPages([]);
    setError(null);
    setInfo(null);
    setProgress(0);
    setTotalPages(0);
    setPageNames({});
    setShowNames(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      handleFile(e.dataTransfer.files[0]);
    },
    [handleFile]
  );

  const pickDir = async () => {
    if (!supportsFilePicker) {
      setInfo(
        "Folder picker requires Chrome or Edge 86+. Files will go to your Downloads folder instead."
      );
      return;
    }

    try {
      const h = await window.showDirectoryPicker({ mode: "readwrite" });
      setDirHandle(h);
      setFallbackPath("");
      setInfo(`Folder selected: "${h.name}"`);
    } catch (e) {
      if (e.name !== "AbortError") {
        setError("Could not access folder: " + e.message);
      }
    }
  };

  const processPDF = useCallback(async () => {
    if (!file) return;

    setLoading(true);
    setPages([]);
    setError(null);
    setInfo(null);
    setProgress(0);
    setPageNames({});
    setShowNames(false);

    try {
      const buf = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: buf }).promise;
      const n = pdf.numPages;

      setTotalPages(n);

      const result = [];

      for (let i = 1; i <= n; i++) {
        const pg = await pdf.getPage(i);
        const vp = pg.getViewport({ scale });

        const cv = document.createElement("canvas");
        cv.width = vp.width;
        cv.height = vp.height;

        await pg.render({
          canvasContext: cv.getContext("2d"),
          viewport: vp,
        }).promise;

        result.push({
          pageNum: i,
          dataUrl: cv.toDataURL("image/png"),
          width: vp.width,
          height: vp.height,
        });

        setProgress(Math.round((i / n) * 100));
        setPages([...result]);
      }
    } catch (e) {
      setError("Failed to process PDF: " + e.message);
    } finally {
      setLoading(false);
    }
  }, [file, scale]);

  const savePage = async (page) => {
    const fname = getFilename(page.pageNum, totalPages) + ".png";

    if (dirHandle) {
      try {
        const fh = await dirHandle.getFileHandle(fname, { create: true });
        const w = await fh.createWritable();
        await w.write(await (await fetch(page.dataUrl)).blob());
        await w.close();
        setInfo(`Saved: ${fname} → ${dirHandle.name}/`);
        return;
      } catch (e) {
        setError("Save failed: " + e.message);
        return;
      }
    }

    const a = document.createElement("a");
    a.href = page.dataUrl;
    a.download = fname;
    a.click();
  };

  const saveAll = async () => {
    if (!pages.length) return;

    setDlAll(true);
    setError(null);
    setInfo(null);

    try {
      const zip = new JSZip();
      const finalZip = (zipName.trim() || "pdf_pages").replace(/\.zip$/i, "") + ".zip";

      pages.forEach((p) => {
        const fname = getFilename(p.pageNum, totalPages) + ".png";
        zip.file(fname, p.dataUrl.split(",")[1], { base64: true });
      });

      const blob = await zip.generateAsync({ type: "blob" });

      if (dirHandle) {
        try {
          const fh = await dirHandle.getFileHandle(finalZip, { create: true });
          const w = await fh.createWritable();
          await w.write(blob);
          await w.close();
          setInfo(`✓ Saved "${finalZip}" → ${dirHandle.name}/`);
          setDlAll(false);
          return;
        } catch (e) {
          setError("Folder save failed: " + e.message);
          setDlAll(false);
          return;
        }
      }

      const a = document.createElement("a");
      const url = URL.createObjectURL(blob);
      a.href = url;
      a.download = finalZip;
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setInfo(`✓ "${finalZip}" sent to your Downloads folder.`);
    } catch (e) {
      setError("Download failed: " + e.message);
    } finally {
      setDlAll(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPages([]);
    setError(null);
    setInfo(null);
    setProgress(0);
    setTotalPages(0);
    setPageNames({});
    setZipName("pdf_pages");
    setShowNames(false);

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const previewPage = buildPageFilename(pageTemplate, 1, totalPages || 5) + ".png";
  const previewZip = (zipName.trim() || "pdf_pages").replace(/\.zip$/i, "") + ".zip";

  return (
    <div className="app">
      <div className="bg-grid" />
      <div className="bg-glow" />

      <div className="wrap">
        <Header />

        <AlertMessage type="error" message={error} />
        <AlertMessage type="info" message={info} />

        <UploadZone
          file={file}
          dragOver={dragOver}
          setDragOver={setDragOver}
          handleDrop={handleDrop}
          handleFile={handleFile}
          fileRef={fileRef}
        />

        <SettingsPanel
          zipName={zipName}
          setZipName={setZipName}
          scale={scale}
          setScale={setScale}
          loading={loading}
          pageTemplate={pageTemplate}
          setPageTemplate={setPageTemplate}
          previewPage={previewPage}
          previewZip={previewZip}
          dirHandle={dirHandle}
          fallbackPath={fallbackPath}
          setFallbackPath={setFallbackPath}
          setDirHandle={setDirHandle}
          pickDir={pickDir}
          supportsFilePicker={supportsFilePicker}
        />

        <ActionControls
          file={file}
          loading={loading}
          pages={pages}
          dlAll={dlAll}
          processPDF={processPDF}
          saveAll={saveAll}
          reset={reset}
        />

        <ProgressBar loading={loading} progress={progress} />

        <StatsBar pages={pages} scale={scale} file={file} dirHandle={dirHandle} />

        <PageNamesEditor
          pages={pages}
          showNames={showNames}
          setShowNames={setShowNames}
          pageNames={pageNames}
          setPageNames={setPageNames}
          getFilename={getFilename}
          totalPages={totalPages}
        />

        <PageGrid
          loading={loading}
          pages={pages}
          savePage={savePage}
          getFilename={getFilename}
          totalPages={totalPages}
        />

        <EmptyState loading={loading} pages={pages} error={error} />

        <Footer />
      </div>
    </div>
  );
}