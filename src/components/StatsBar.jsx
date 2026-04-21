export default function StatsBar({ pages, scale, file, dirHandle }) {
  if (!pages.length) return null;

  const stats = [
    [pages.length, "Pages"],
    [`${scale}×`, "Quality"],
    [`${pages[0]?.width}px`, "Width"],
    [`${(file?.size / 1024 / 1024).toFixed(1)} MB`, "Source"],
    [dirHandle ? dirHandle.name : "Downloads", "Save To"],
  ];

  return (
    <div className="stats">
      {stats.map(([v, k]) => (
        <div key={k}>
          <div className="sv">{v}</div>
          <div className="sk">{k}</div>
        </div>
      ))}
    </div>
  );
}