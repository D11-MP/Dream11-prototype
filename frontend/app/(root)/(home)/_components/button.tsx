import { StaticImageData } from "next/image"
import React from "react"
import Image from 'next/image'

interface Props {
    img : StaticImageData,
    text:string
}

const Button : React.FC<Props> = ({img , text})=>{
    return(
        <div className="flex justify-evenly px-2 py-2 custom-btn" style={{borderRadius:'10px',border:'1px solid gray',backgroundColor:'white',color:'gray'}}>
            {text} <Image width={20} height={20} src={img.src} alt=""/>
        </div>
    )
}

export default Button