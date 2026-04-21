export default function SettingsPanel({
  zipName,
  setZipName,
  scale,
  setScale,
  loading,
  pageTemplate,
  setPageTemplate,
  previewPage,
  previewZip,
  dirHandle,
  fallbackPath,
  setFallbackPath,
  setDirHandle,
  pickDir,
  supportsFilePicker,
}) {
  return (
    <div className="panel">
      <div className="panel-title">⚙ Output Settings</div>

      <div className="sgrid">
        <div className="field">
          <label>ZIP File Name</label>
          <input
            value={zipName}
            onChange={(e) => setZipName(e.target.value)}
            placeholder="pdf_pages"
          />
          <div className="hint">
            Output: <b>{previewZip}</b>
          </div>
        </div>

        <div className="field">
          <label>Render Quality</label>
          <select
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            disabled={loading}
          >
            <option value={1}>1× Draft</option>
            <option value={2}>2× Standard</option>
            <option value={3}>3× High</option>
            <option value={4}>4× Ultra</option>
          </select>
        </div>

        <div className="field full">
          <label>Page Filename Template</label>
          <input
            value={pageTemplate}
            onChange={(e) => setPageTemplate(e.target.value)}
            placeholder="page_{padded}"
          />
          <div className="hint" style={{ marginTop: 5 }}>
            Insert:&nbsp;
            {["{page}", "{padded}", "{total}"].map((t) => (
              <span
                key={t}
                className="pill"
                onClick={() => setPageTemplate((p) => p + t)}
              >
                {t}
              </span>
            ))}
            &nbsp;· Example: <b>{previewPage}</b>
          </div>
        </div>

        <div className="field full">
          <label>Download Location</label>
          <div className="loc-row">
            <input
              value={dirHandle ? dirHandle.name : fallbackPath}
              onChange={(e) => {
                setFallbackPath(e.target.value);
                setDirHandle(null);
              }}
              placeholder={
                supportsFilePicker
                  ? "Click 'Pick Folder' to choose a save location…"
                  : "Browser Downloads folder (folder picker needs Chrome/Edge)"
              }
              readOnly={!!dirHandle}
              style={{ color: dirHandle ? "#80cc80" : undefined }}
            />
            <button className="pick-btn" onClick={pickDir}>
              📁 Pick Folder
            </button>
          </div>

          {dirHandle && (
            <div className="dir-badge">
              ✓ Files will save directly to: <strong>{dirHandle.name}</strong>
            </div>
          )}

          {!supportsFilePicker && (
            <div className="hint" style={{ marginTop: 5 }}>
              Folder picker requires Chrome or Edge 86+. ZIP will download to your default Downloads folder.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}