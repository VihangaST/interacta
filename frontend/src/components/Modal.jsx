function Modal({ show, onClose, children }) {
  if (!show) return null;
  return (
    <div
      className="modal-backdrop"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="modal-content"
        style={{
          background: "#EDEAF5FF",
          width: "40%",
          height: "35%",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "300px",
          textAlign: "center",
        }}
      >
        {children}
        <button
          className="btn btn-secondary w-25"
          style={{ backgroundColor: "#290768FF" }}
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
export default Modal;
