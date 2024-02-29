export default function ErrorBox({ title, message, onConfirm }) {
  return (
    <div className="error">
      <h2>{title}</h2>
      <p>{message}</p>
      {message && (
        <div id="confirmation-actions">
          <button onClick={onConfirm} className="button">
            Okay
          </button>
        </div>
      )}
    </div>
  );
}
