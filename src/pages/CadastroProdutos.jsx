import { useState } from "react";
import { criarProduto } from "../services/productsService";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Label from "../components/ui/Label";
import inputStyle from "../styles/inputStyle";

const TIPOS = [
  "Suplemento",
  "Vitaminas",
  "Acessórios",
  "Alimentos",
  "Outros",
];

export default function CadastroProdutos() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [tipo, setTipo] = useState(TIPOS[0]);
  const navigate = useNavigate();

  async function cadastrarProduto() {
    if (!code.trim() || !name.trim()) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await criarProduto({
        code,
        name,
        tipo,
        qty: 0,
        min: 0,
      });

      alert("Produto cadastrado com sucesso!");

      setCode("");
      setName("");
      setTipo(TIPOS[0]);

    } catch (error) {
      alert(error.message);
    }
  }

   return (
        <div
            style={{
                minHeight:"100vh",
                background:"#0F1115"
            }}
        >

            <Header

                title="Cadastrar produtos"

                onBack={()=>navigate("/")}

            />

        <div
            style={{
                width:"100%",
                maxWidth:760,
                margin:"0 auto",
                padding:"20px"
            }}
        >
                
                <div style={{marginBottom:14}}>

                    <Label>
                        Código do produto
                    </Label>

                    <input
                        style={inputStyle()}
                        placeholder="Ex: PT-008"
                        value={code}
                        onChange={(e)=>setCode(e.target.value)}
                    />

                </div>

                <div style={{marginBottom:14}}>

                    <Label>
                        Nome do produto
                    </Label>

                    <input
                        style={inputStyle()}
                        placeholder="Ex: Ômega 3"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                    />

                </div>

                <div style={{marginBottom:20}}>
                    <Label>
                        Tipo
                    </Label>

                    <select
                        style={inputStyle()}
                        value={tipo}
                        onChange={(e)=>setTipo(e.target.value)}
                    >

                        {TIPOS.map((t)=>(
                            <option
                                key={t}
                                value={t}
                            >

                                {t}

                            </option>

                        ))}
                      
                    </select>
                    
                    <button
                        className="app-btn-primary"
                        onClick={cadastrarProduto}
                        style={{
                            marginTop: 15
                        }}
                    >
                        Cadastrar produto
                    </button>

                </div>

            </div>

        </div>

    );
}