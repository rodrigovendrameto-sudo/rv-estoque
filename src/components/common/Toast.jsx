import { CheckCircle2, AlertTriangle, X } from "lucide-react";
import { COLORS } from "../../constants/theme";

export default function Toast({ text, kind = "success", onClose }) {

    if (!text) return null;

    const error = kind === "error";

    return (

        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,

                background: error
                    ? "rgba(217,58,68,.12)"
                    : "rgba(95,191,131,.12)",

                border: `1px solid ${
                    error ? "#7A2A2E" : "#2E5C40"
                }`,

                borderRadius: 10,

                padding: "10px 12px",

                marginBottom: 15
            }}
        >

            {error ? (

                <AlertTriangle
                    size={16}
                    color="#F0797F"
                />

            ) : (

                <CheckCircle2
                    size={16}
                    color="#5FBF83"
                />

            )}

            <span
                style={{
                    flex:1,
                    color:COLORS.TEXT,
                    fontSize:13
                }}
            >

                {text}

            </span>

            <button
                onClick={onClose}
                style={{
                    background:"none",
                    border:"none",
                    cursor:"pointer",
                    color:COLORS.TEXT_SECONDARY
                }}
            >

                <X size={15}/>

            </button>

        </div>

    );

}