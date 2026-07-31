import {ArrowLeft} from "lucide-react";
export default function Header({title,onBack}){return <div style={{display:"flex",alignItems:"center",gap:10,padding:"16px 18px 12px"}}>{onBack&&<button onClick={onBack} style={{width:34,height:34,borderRadius:10,cursor:"pointer"}}><ArrowLeft size={17}/></button>}<h2 style={{margin:0,fontSize:20,fontWeight:600}}>{title}</h2></div>;}
