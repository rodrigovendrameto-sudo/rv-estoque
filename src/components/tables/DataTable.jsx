import { Pencil, Trash2 } from "lucide-react";

export default function DataTable({
  columns = [],
  data = [],
  onEdit,
  onDelete,
}) {
  if (!data.length) {
    return (
      <div className="data-table-container">
        <div className="table-empty">
          Nenhum registro encontrado.
        </div>
      </div>
    );
  }

  return (
    <div className="data-table-container">
      <table className="data-table">

        <thead>
          <tr>

            {columns.map((column) => (
              <th key={column.key}>
                {column.label}
              </th>
            ))}

            {(onEdit || onDelete) && (
              <th style={{ width: 120, textAlign: "center" }}>
                Ações
              </th>
            )}

          </tr>
        </thead>

        <tbody>

          {data.map((row) => (

            <tr key={row.id}>

              {columns.map((column) => (

                <td key={column.key}>

                  {column.render

                      ? column.render(row)

                      : row[column.key]

                  }

                </td>

              ))}

              {(onEdit || onDelete) && (

                <td>

                  <div className="table-actions">

                    {onEdit && (

                      <button
                        className="table-icon-button"
                        onClick={() => onEdit(row)}
                        title="Editar"
                      >

                        <Pencil size={17} />

                      </button>

                    )}

                    {onDelete && (

                      <button
                        className="table-icon-button delete"
                        onClick={() => onDelete(row)}
                        title="Excluir"
                      >

                        <Trash2 size={17} />

                      </button>

                    )}

                  </div>

                </td>

              )}

            </tr>

          ))}

        </tbody>

      </table>
    </div>
  );
}