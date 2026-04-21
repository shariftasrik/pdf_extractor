export default function PageGrid({ loading, pages, savePage, getFilename, totalPages }) {
  if (loading && pages.length === 0) {
    return (
      <div className="pgrid">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="sh-card shimmer" />
        ))}
      </div>
    );
  }

  if (!pages.length) return null;

  return (
    <div className="pgrid">
      {pages.map((pg) => (
        <div key={pg.pageNum} className="pcard">
          <div className="pimg">
            <img src={pg.dataUrl} alt={`Page ${pg.pageNum}`} loading="lazy" />
            <div className="pover">
              <button
                className="btn btn-y"
                style={{ fontSize: "10px", padding: "8px 16px" }}
                onClick={() => savePage(pg)}
              >
                ↓ Save PNG
              </button>
            </div>
          </div>

          <div className="pfoot">
            <div>
              <div className="pnum">
                Page {pg.pageNum} / {totalPages}
              </div>
              <div className="pfname">{getFilename(pg.pageNum, totalPages)}.png</div>
            </div>
            <button className="dlbtn" onClick={() => savePage(pg)}>
              ↓
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}