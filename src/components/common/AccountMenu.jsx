import { useState } from "react";
import {
  MoreVertical,
  Users,
  Store,
  KeyRound,
  LogOut
} from "lucide-react";
import { COLORS } from "../../constants/theme";

export default function AccountMenu({
  isAdmin,
  onUsuarios,
  onEditarLoja,
  onTrocarSenha,
  onSair
}) {

  const [open,setOpen]=useState(false);

  return (

    <div
      style={{
        position:"absolute",
        top:18,
        right:18,
        zIndex:100
      }}
    >

      <button

        onClick={()=>setOpen(!open)}

        style={{

          width:36,

          height:36,

          borderRadius:10,

          background:COLORS.CARD,

          color:COLORS.TEXT,

          border:`1px solid ${COLORS.BORDER}`,

          cursor:"pointer"

        }}

      >

        <MoreVertical size={17}/>

      </button>

      {open && (

        <div

          style={{

            position:"absolute",

            right:0,

            top:42,

            width:180,

            background:COLORS.CARD,

            border:`1px solid ${COLORS.BORDER}`,

            borderRadius:10,

            overflow:"hidden",

            boxShadow:"0 8px 20px rgba(0,0,0,.4)"

          }}

        >

          {isAdmin && (

            <button
              className="menu-item"
              onClick={onUsuarios}
            >

              <Users size={14}/>

              Usuários

            </button>

          )}

          {isAdmin && (

            <button
              className="menu-item"
              onClick={onEditarLoja}
            >

              <Store size={14}/>

              Editar Loja

            </button>

          )}

          <button
            className="menu-item"
            onClick={onTrocarSenha}
          >

            <KeyRound size={14}/>

            Trocar senha

          </button>

          <button
            className="menu-item danger"
            onClick={onSair}
          >

            <LogOut size={14}/>

            Sair

          </button>

        </div>

      )}

    </div>

  );

}