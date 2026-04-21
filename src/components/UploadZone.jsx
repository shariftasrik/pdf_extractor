export default function UploadZone({
  file,
  dragOver,
  setDragOver,
  handleDrop,
  handleFile,
  fileRef,
}) {
  return (
    <div
      className={`drop${dragOver ? " over" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <input
        ref={fileRef}
        type="file"
        accept="application/pdf"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      <div className="drop-icon">📄</div>
      <div className="drop-title">{file ? "Change PDF" : "Drop your PDF here"}</div>
      <div className="drop-sub">{file ? "or click to select another" : "or click to browse"}</div>

      {file && (
        <div className="fbadge">
          ▪ {file.name}
          <span style={{ color: "#6b6558" }}>
            ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </span>
        </div>
      )}
    </div>
  );
}