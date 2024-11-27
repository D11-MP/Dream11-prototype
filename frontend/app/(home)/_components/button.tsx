import { StaticImageData } from "next/image"
import React from "react"

interface Props {
    img : StaticImageData,
    text:string
}

const Button : React.FC<Props> = ({img , text})=>{
    return(
        <div className="flex h-[36px] items-center justify-evenly px-2 py-2 custom-btn cursor-pointer" style={{borderRadius:'10px',border:'1px solid gray',backgroundColor:'white',color:'gray'}}>
            {text} <img src={img.src} alt=""/>
        </div>
    )
}

export default Button