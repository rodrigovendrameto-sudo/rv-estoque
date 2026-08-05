import Label from "../ui/Label";
import inputStyle from "../../styles/inputStyle";

export default function ProductSelect({

  products = [],

  value,

  onChange,

  label = "Produto"

}) {

  return (

    <div style={{ marginBottom: 18 }}>

      <Label>

        {label}

      </Label>

      <select

        style={inputStyle()}

        value={value}

        onChange={(e) => onChange(e.target.value)}

      >

        <option value="">

          Selecione um produto...

        </option>

        {

          products.map((product) => (

            <option

              key={product.id}

              value={product.id}

            >

              {product.code} - {product.name}

            </option>

          ))

        }

      </select>

    </div>

  );

}