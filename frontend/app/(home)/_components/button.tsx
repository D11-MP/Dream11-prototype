import { StaticImageData } from "next/image"
import React from "react"

interface Props {
    img : StaticImageData,
    text:string
}

const Button : React.FC<Props> = ({img , text})=>{
    return(
        <div className="flex justify-evenly px-2 py-2" style={{borderRadius:'10px',border:'1px solid gray',backgroundColor:'white',color:'gray',width:'100px'}}>
            {text} <img src={img.src} alt=""/>
        </div>
    )
}

export default Button