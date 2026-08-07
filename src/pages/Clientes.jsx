import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/common/Header";
import DataTable from "../components/tables/DataTable";
import TableToolbar from "../components/tables/TableToolbar";
import ConfirmDialog from "../components/common/ConfirmDialog";
import Modal from "../components/common/Modal";
import ClientForm from "../components/clients/ClientForm";

import {
    listarClientes,
    atualizarCliente,
    excluirCliente
} from "../services/clientsService";

export default function Clientes() {

    const navigate = useNavigate();

    const [clientes, setClientes] = useState([]);

    const [search, setSearch] = useState("");

    const [selectedClient, setSelectedClient] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

    const clientesFiltrados = useMemo(() => {

        const termo = search.toLowerCase();

        return clientes.filter((cliente) =>

            cliente.name.toLowerCase().includes(termo) ||

            (cliente.phone || "").toLowerCase().includes(termo) ||

            (cliente.document || "").toLowerCase().includes(termo)

        );

    }, [clientes, search]);

    const columns = [

        {
            key: "name",
            label: "Nome"
        },

        {
            key: "document",
            label: "CPF"
        },

        {
            key: "phone",
            label: "Celular"
        },

        {
            key: "last_purchase",
            label: "Última Compra"
        }

    ];

    async function salvarEdicao(clienteAtualizado) {

        try {

            await atualizarCliente(

                clienteAtualizado.id,

                clienteAtualizado

            );

            setShowModal(false);

            carregarClientes();

        }

        catch (error) {

            alert(error.message);

        }

    }

    async function confirmarExclusao() {

        try {

            await excluirCliente(selectedClient.id);

            setShowDeleteDialog(false);

            carregarClientes();

        }

        catch (error) {

            alert(error.message);

        }

    }

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#0F1115"
            }}
        >

            <Header

                title="Clientes"

                onBack={() => navigate("/")}

            />

            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    padding: 20
                }}
            >

                <TableToolbar

                    search={search}

                    setSearch={setSearch}

                    total={clientesFiltrados.length}

                    buttonLabel="Novo Cliente"

                    onButtonClick={() => navigate("/cadastro-clientes")}

                />

                <DataTable

                    columns={columns}

                    data={clientesFiltrados}

                    onEdit={(cliente) => {

                        setSelectedClient(cliente);

                        setShowModal(true);

                    }}

                    onDelete={(cliente) => {

                        setSelectedClient(cliente);

                        setShowDeleteDialog(true);

                    }}

                />

            </div>

            <Modal

                open={showModal}

                title="Editar Cliente"

                onClose={() => setShowModal(false)}

            >

                {

                    selectedClient && (

                        <ClientForm

                            client={selectedClient}

                            onSave={salvarEdicao}

                            onCancel={() => setShowModal(false)}

                        />

                    )

                }

            </Modal>

            <ConfirmDialog

                open={showDeleteDialog}

                title="Excluir Cliente"

                message={`Deseja excluir "${selectedClient?.name}"?`}

                onCancel={() => setShowDeleteDialog(false)}

                onConfirm={confirmarExclusao}

            />

        </div>

    );

}