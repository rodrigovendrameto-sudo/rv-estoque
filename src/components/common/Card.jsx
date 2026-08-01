import { COLORS } from "../../constants/theme";

export default function Card({children}){

    return(

        <div
            style={{
                background:COLORS.CARD,
                border:`1px solid ${COLORS.BORDER}`,
                borderRadius:14,
                padding:18
            }}
        >

            {children}

        </div>

    );

}