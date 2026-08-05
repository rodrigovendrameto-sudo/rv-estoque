import { X } from "lucide-react";

export default function Modal({
  open,
  title,
  children,
  onClose,
  width = 500,
}) {

  if (!open) return null;

  return (

    <div
      style={overlayStyle}
      onClick={onClose}
    >

      <div
        style={{
          ...modalStyle,
          maxWidth: width,
        }}
        onClick={(e) => e.stopPropagation()}
      >

        <div style={headerStyle}>

          <h2 style={titleStyle}>
            {title}
          </h2>

          <button
            onClick={onClose}
            style={closeButton}
          >
            <X size={18} />
          </button>

        </div>

        <div style={contentStyle}>
          {children}
        </div>

      </div>

    </div>

  );

}

const overlayStyle = {

  position: "fixed",

  inset: 0,

  background: "rgba(0,0,0,.65)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  padding: 20,

  zIndex: 9999,

};

const modalStyle = {

  width: "100%",

  background: "#171A21",

  border: "1px solid #2D3445",

  borderRadius: 14,

  overflow: "hidden",

  boxShadow: "0 12px 40px rgba(0,0,0,.45)",

};

const headerStyle = {

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",

  padding: "18px 22px",

  borderBottom: "1px solid #2D3445",

};

const titleStyle = {

  margin: 0,

  color: "white",

  fontSize: 20,

  fontWeight: 600,

};

const closeButton = {

  width: 36,

  height: 36,

  border: "none",

  borderRadius: 8,

  cursor: "pointer",

  background: "transparent",

  color: "white",

};

const contentStyle = {

  padding: 22,

};