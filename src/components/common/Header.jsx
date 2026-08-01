import { ArrowLeft } from "lucide-react";
import { COLORS } from "../../constants/theme";

export default function Header({ title, onBack }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding:"30px 40px"
      }}
    >
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Voltar"
          style={{
            background: COLORS.CARD,
            border: `1px solid ${COLORS.BORDER}`,
            borderRadius: 10,
            width: 34,
            height: 34,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: COLORS.TEXT,
            cursor: "pointer",
          }}
        >
          <ArrowLeft size={17} />
        </button>
      )}

      <h2
        style={{
          fontWeight: 600,
          fontSize: 22,
          color: COLORS.TEXT,
          margin: 0,
          letterSpacing: 0.3,
        }}
      >
        {title}
      </h2>
    </div>
  );
}