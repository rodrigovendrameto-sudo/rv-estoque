import { useEffect, useState } from "react";

import Label from "../ui/Label";
import inputStyle from "../../styles/inputStyle";

import { listarClientes } from "../../services/clientsService";

export default function ClientSelect({

    value,

    onChange

}) {

    const [clientes, setClientes] = useState([]);

    useEffect(() => {

        carregarClientes();

    }, []);

    async function carregarClientes() {

        try {

            const data = await listarClientes();

            setClientes(data);

        }

        catch (error) {

            alert(error.message);

        }

    }

    return (

        <div>

            <Label>

                Cliente

            </Label>

            <select

                style={inputStyle()}

                value={value?.id || ""}

                onChange={(e)=>{

                    const cliente = clientes.find(

                        c => c.id === Number(e.target.value)

                    );

                    onChange(cliente || null);

                }}

            >

                <option value="">

                    Selecione um cliente

                </option>

                {

                    clientes.map(cliente=>(

                        <option

                            key={cliente.id}

                            value={cliente.id}

                        >

                            {cliente.name}

                        </option>

                    ))

                }

            </select>

        </div>

    );

}