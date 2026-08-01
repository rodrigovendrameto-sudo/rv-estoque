import { COLORS } from "../../constants/theme";

export default function MenuCard({
  icon,
  title,
  subtitle,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="app-menu-card"
      style={{
        background: COLORS.CARD,
        border: `1px solid ${COLORS.BORDER}`,
        borderLeft: `3px solid ${COLORS.PRIMARY}`,
        borderRadius: 12,
        padding: 14,
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: "rgba(217,58,68,0.15)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 10,
        }}
      >
        {icon}
      </div>

      <p
        style={{
          fontWeight: 600,
          fontSize: 14,
          color: COLORS.TEXT,
          margin: 0,
        }}
      >
        {title}
      </p>

      <p
        style={{
          fontSize: 11,
          color: COLORS.TEXT_SECONDARY,
          marginTop: 4,
          marginBottom: 0,
        }}
      >
        {subtitle}
      </p>
    </div>
  );
}