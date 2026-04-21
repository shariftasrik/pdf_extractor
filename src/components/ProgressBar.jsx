export default function ProgressBar({ loading, progress }) {
  if (!loading) return null;

  return (
    <div className="prog-wrap">
      <div className="prog-lbl">
        <span>Rendering pages</span>
        <span>{progress}%</span>
      </div>
      <div className="prog-bar">
        <div className="prog-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}