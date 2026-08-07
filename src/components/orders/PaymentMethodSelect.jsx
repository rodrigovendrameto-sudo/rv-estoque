export default function PaymentMethodSelect({

    value,

    onChange

}) {

    return (

        <div
            style={{
                marginBottom: 20
            }}
        >

            <label
                style={{
                    display: "block",
                    marginBottom: 8,
                    color: "#999",
                    fontSize: 14
                }}
            >

                Forma de Pagamento

            </label>

            <select

                value={value}

                onChange={(e) => onChange(e.target.value)}

                style={{

                    width: "100%",

                    height: 44,

                    borderRadius: 10,

                    border: "1px solid #2D3445",

                    background: "#171A21",

                    color: "white",

                    padding: "0 12px",

                    outline: "none"

                }}

            >

                <option value="PIX">PIX</option>

                <option value="CREDIT">Cartão de Crédito</option>

                <option value="DEBIT">Cartão de Débito</option>

                <option value="CASH">Dinheiro</option>

            </select>

        </div>

    );

}