export default function PageNamesEditor({
  pages,
  showNames,
  setShowNames,
  pageNames,
  setPageNames,
  getFilename,
  totalPages,
}) {
  if (!pages.length) return null;

  return (
    <div className="names-sec">
      <div className="names-hd">
        <span className="names-lbl">Per-page filenames</span>
        <button className="names-tog" onClick={() => setShowNames((v) => !v)}>
          {showNames ? "▲ Collapse" : "▼ Edit individually"}
        </button>
      </div>

      {showNames && (
        <div className="names-grid">
          {pages.map((pg) => (
            <div key={pg.pageNum} className="nr">
              <span className="nr-lbl">Pg {pg.pageNum}</span>
              <input
                value={pageNames[pg.pageNum] ?? getFilename(pg.pageNum, totalPages)}
                onChange={(e) =>
                  setPageNames((prev) => ({
                    ...prev,
                    [pg.pageNum]: e.target.value,
                  }))
                }
                placeholder={getFilename(pg.pageNum, totalPages)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}