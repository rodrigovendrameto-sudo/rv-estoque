export default function StatusBadge({ qty, min }) {

    let label;

    let color;

    let background;

    if(qty===0){

        label="Sem estoque";

        color="#F0797F";

        background="rgba(217,58,68,.15)";

    }

    else if(qty<min){

        label="Estoque baixo";

        color="#E2A33D";

        background="rgba(226,163,61,.15)";

    }

    else{

        label="OK";

        color="#5FBF83";

        background="rgba(95,191,131,.15)";

    }

    return(

        <span
            style={{

                background,

                color,

                padding:"4px 8px",

                borderRadius:6,

                fontSize:11,

                fontWeight:600

            }}
        >

            {label}

        </span>

    );

}