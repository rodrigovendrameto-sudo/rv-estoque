import { COLORS, SIZES } from "../constants/theme";

export default function inputStyle() {
  return {
    width: "100%",
    height: SIZES.INPUT_HEIGHT,

    background: COLORS.CARD_2,

    color: COLORS.TEXT,

    border: `1px solid ${COLORS.BORDER}`,

    borderRadius: SIZES.BORDER_RADIUS,

    padding: "0 12px",

    outline: "none",

    transition: "0.2s",

    fontSize: 14,

    boxSizing: "border-box",
  };
}