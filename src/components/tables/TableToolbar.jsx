import { Search, Plus } from "lucide-react";

export default function TableToolbar({
    search,
    setSearch,
    total = 0,
    buttonLabel,
    onButtonClick
}) {

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
                gap: 15,
                flexWrap: "wrap"
            }}
        >

            <div
                style={{
                    position: "relative",
                    flex: 1,
                    minWidth: 250
                }}
            >

                <Search
                    size={18}
                    style={{
                        position: "absolute",
                        left: 12,
                        top: 11,
                        color: "#888"
                    }}
                />

                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: "100%",
                        height: 42,
                        paddingLeft: 40,
                        paddingRight: 15,
                        borderRadius: 10,
                        border: "1px solid #2D3445",
                        background: "#171A21",
                        color: "white",
                        outline: "none",
                        boxSizing: "border-box"
                    }}
                />

            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 15
                }}
            >

                <span
                    style={{
                        color: "#999",
                        fontSize: 13
                    }}
                >

                    {total} registro{total !== 1 ? "s" : ""}

                </span>

                {buttonLabel && (

                    <button
                        onClick={onButtonClick}
                        className="app-btn-primary"
                        style={{
                            width: "auto",
                            padding: "0 18px",
                            display: "flex",
                            alignItems: "center",
                            gap: 8
                        }}
                    >

                        <Plus size={16} />

                        {buttonLabel}

                    </button>

                )}

            </div>

        </div>

    );

}