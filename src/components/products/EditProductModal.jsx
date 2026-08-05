import { useEffect, useState } from "react";

import Modal from "../common/Modal";
import ProductForm from "./ProductForm";

import { atualizarProduto } from "../../services/productsService";

export default function EditProductModal({

    open,

    product,

    onClose,

    onSuccess

}){

    const [code,setCode]=useState("");

    const [name,setName]=useState("");

    const [tipo,setTipo]=useState("Suplemento");

    useEffect(()=>{

        if(product){

            setCode(product.code);

            setName(product.name);

            setTipo(product.tipo);

        }

    },[product]);

    async function salvar(){

        if(!code.trim() || !name.trim()){

            alert("Preencha todos os campos.");

            return;

        }

        try{

            await atualizarProduto(product.id,{

                code,

                name,

                tipo

            });

            alert("Produto atualizado com sucesso!");

            onSuccess();

            onClose();

        }

        catch(error){

            alert(error.message);

        }

    }

    return(

        <Modal

            open={open}

            title="Editar Produto"

            onClose={onClose}

            width={650}

        >

            <ProductForm

                code={code}
                setCode={setCode}

                name={name}
                setName={setName}

                tipo={tipo}
                setTipo={setTipo}

                onSubmit={salvar}

                buttonLabel="Salvar alterações"

            />

        </Modal>

    );

}