"use client"

import Image, { StaticImageData } from "next/image";
import soft from '../assets/soft.webp'
import dry from '../assets/sunny.webp'
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import action1 from '@/public/action1.png'
import action2 from '@/public/action2.png'
import action3 from '@/public/action3.png'
import action4 from '@/public/action4.png'
import action5 from '@/public/action5.png'
import action6 from '@/public/action6.png'
export default function Commentator({close,open}:{close:(value:boolean)=>void,open:boolean}){
    
  const [mascot , setMascot] = useState<number>(0);
  const [commentary , setCommentary] = useState<string>('');
  const [speech , setSpeech ]= useState<string>('');
  const [index , setIndex] = useState<number>(0);
  const [talking , setTalking] = useState<boolean>(false);
  const firstRender = useRef(true);
  const textRef = useRef<HTMLDivElement | null>(null);
  const firstRef = useRef(true);
  const mascotImg:StaticImageData[] = [action6,action4,action2,action1,action3,action5];
  
  const pitchMap:any = {
    //this mapping will change based on the response received from the api
  'dry':dry,
  'soft':soft
  }

  const demo = {
    //this is the demo of the api response for the weather
  weather:'wet',
  condition:'soft'
  }

  useEffect(()=>{
    const Interval = setInterval(()=>{
      if(talking){
        const newMascot = mascot===mascotImg.length-1 ? 0 : mascot+1;
        setMascot(newMascot);
      }
    },75);
    return (()=>{
      clearInterval(Interval)
    })
  },[mascot,talking])

  useEffect(()=>{
    async function getGenText() {
      const response = await axios.post('http://localhost:3000/api/ai' , { weather: demo.weather,condition: demo.condition,},
        {
            headers: {
              'Content-Type': 'application/json',
            }
        }
      )
      setCommentary(response.data.data);
      setTalking(true);
      // console.log(Date.now())
    }
    if(firstRef.current){ 
      firstRef.current = false;
      return;
    }
    getGenText();
  },[])

  useEffect(()=>{
    const Interval = setInterval(()=>{
      if(commentary[index]!==undefined){
        setSpeech((speech)=>speech+commentary[index])
        setIndex((index)=>index+1)
      }
    },60)
    return ()=>{
      clearInterval(Interval)
    }
  },[speech , index , commentary])

  useEffect(()=>{
      if ("speechSynthesis" in window) {    
        var speak = new SpeechSynthesisUtterance(commentary);
        speak.onend = function(){
          if(firstRender.current){
              firstRender.current = false;
              return;
          }
          setTalking(false);
        }
        speechSynthesis.speak(speak);
      } else {
        alert("Your browser does not support Text-to-Speech.");
      }
  },[commentary])

  useEffect(()=>{
    if (textRef.current) textRef.current.scrollTop = textRef.current.scrollHeight;
  },[speech])

return (
    <>
      <div className="fixed glassmorphism z-[-1]"
      style={{width:'100vw',height:'100vh',pointerEvents:'none'}}></div>  

      <div style={{width:'80vw' , height:'80vh' , boxShadow:'5px 5px 35px gray'}} className="relative ">

        <button className="absolute right-2 top-2 text-xl font-bold px-4 py-2 text-white" 
        style={{zIndex:'100',borderTopRightRadius:'0.0rem',borderBottomLeftRadius:'0.0rem'}} onClick={()=>{
          if("speechSynthesis" in window) speechSynthesis.cancel();
          close(false)}}>X</button>

        <div className="mascot-box absolute flex items-center w-full justify-center" style={{bottom:'0px',zIndex:'2'}}>
            {mascotImg.length>0 && mascotImg[mascot] && <Image src={mascotImg[mascot].src} alt="" width={250} height={250}/>}

            <div ref={textRef} className="bg-gray-200 commentary-box w-1/2 p-5 rounded-lg text-black mr-20 overflow-y-auto"
            style={{height:'fit-content'  , maxHeight:'15vh'}}>  
                {commentary===''?'...':speech}
            </div>
        </div>

        <div className="bg-pitch-image z-0 rounded-lg" style={{width:'60vw',height:'60vh'}}>
            <Image src={pitchMap[demo.condition].src} alt="" layout="fill" className="rounded-lg brightness-75 "/>
        </div>
      </div>

    </>
  );

}