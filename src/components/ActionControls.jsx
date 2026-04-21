export default function ActionControls({
  file,
  loading,
  pages,
  dlAll,
  processPDF,
  saveAll,
  reset,
}) {
  return (
    <div className="ctrls">
      <button className="btn btn-y" onClick={processPDF} disabled={!file || loading}>
        {loading && <span className="spin" />}
        {loading ? "Extracting…" : "Extract Pages"}
      </button>

      {pages.length > 0 && (
        <>
          <button className="btn btn-o" onClick={saveAll} disabled={dlAll}>
            {dlAll ? "Saving…" : `↓ Save All as ZIP  (${pages.length} pages)`}
          </button>
          <button className="btn btn-r" onClick={reset}>
            × Reset
          </button>
        </>
      )}
    </div>
  );
}