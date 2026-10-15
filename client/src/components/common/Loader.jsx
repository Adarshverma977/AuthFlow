function Loader({ message = "Loading...", fullScreen = false }) {
  return (
    <div
      className={`loader - container ${
  fullScreen ? "loader-fullscreen" : ""
} `}
      role="status"
      aria-live="polite"
    >
      <div className="loader-spinner" aria-hidden="true" />

      <p className="loader-message">{message}</p>
    </div>
  );
}

export default Loader;
