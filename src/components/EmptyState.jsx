export default function EmptyState({ loading, pages, error }) {
  if (loading || pages.length > 0 || error) return null;

  return (
    <div className="empty">
      <div className="empty-i">◻</div>
      <p>Upload a PDF to get started</p>
    </div>
  );
}