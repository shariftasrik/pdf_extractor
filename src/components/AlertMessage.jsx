export default function AlertMessage({ type, message }) {
  if (!message) return null;

  return (
    <div className={`alert ${type === "error" ? "alert-err" : "alert-ok"}`}>
      {type === "error" ? "⚠" : "ℹ"} {message}
    </div>
  );
}