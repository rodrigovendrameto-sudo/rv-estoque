import Modal from "./Modal";

export default function ConfirmDialog({
  open,
  title = "Confirmação",
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  loading = false,
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onCancel}
      width={450}
    >
      <p
        style={{
          color: "#D1D5DB",
          lineHeight: 1.6,
          marginBottom: 25,
          fontSize: 15,
        }}
      >
        {message}
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 10,
        }}
      >
        <button
          onClick={onCancel}
          disabled={loading}
          style={{
            height: 42,
            padding: "0 18px",
            borderRadius: 10,
            border: "1px solid #3A4152",
            background: "transparent",
            color: "white",
            cursor: "pointer",
          }}
        >
          {cancelLabel}
        </button>

        <button
          onClick={onConfirm}
          disabled={loading}
          style={{
            height: 42,
            padding: "0 18px",
            borderRadius: 10,
            border: "none",
            background: "#C62828",
            color: "white",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {loading ? "Excluindo..." : confirmLabel}
        </button>
      </div>
    </Modal>
  );
}