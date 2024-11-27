import { StaticImageData } from "next/image"
import React from "react"
import Image from "next/image"

interface Props {
    img : StaticImageData,
    text:string
}

const Button : React.FC<Props> = ({img , text})=>{
    return(
        <div className="flex h-[36px] items-center justify-evenly px-2 py-2 custom-btn cursor-pointer" style={{borderRadius:'10px',border:'1px solid gray',backgroundColor:'white',color:'gray'}}>
            {text} <Image src={img.src} width={20} height={20} alt=""/>
        </div>
    )
}

export default Button