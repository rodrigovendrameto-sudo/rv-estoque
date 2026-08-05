import Label from "../ui/Label";
import inputStyle from "../../styles/inputStyle";

const TIPOS = [
  "Suplemento",
  "Vitaminas",
  "Acessórios",
  "Alimentos",
  "Outros",
];

export default function ProductForm({
  code,
  setCode,
  name,
  setName,
  tipo,
  setTipo,
  onSubmit,
  buttonLabel = "Salvar",
  loading = false,
}) {
  return (
    <div>

      <div style={{ marginBottom: 18 }}>

        <Label>Código do produto</Label>

        <input
          style={inputStyle()}
          placeholder="Ex: PT-001"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

      </div>

      <div style={{ marginBottom: 18 }}>

        <Label>Nome do produto</Label>

        <input
          style={inputStyle()}
          placeholder="Ex: Creatina 300g"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

      </div>

      <div style={{ marginBottom: 25 }}>

        <Label>Tipo</Label>

        <select
          style={inputStyle()}
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        >
          {TIPOS.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      <button
        className="app-btn-primary"
        onClick={onSubmit}
        disabled={loading}
      >
        {loading ? "Salvando..." : buttonLabel}
      </button>

    </div>
  );
}