"use client"
import { useState, useEffect } from "react"
import data from "@/uploads/output.json"
export default function Home() {
  const matchDay = data[0].matchDate;
  const matchTime = new Date(2024, 11, 2, 11, 5, 0, 0);
  console.log(matchTime);
  // Toogle state
  const [isToggleOn, setIsToggleOn] = useState<boolean>(true);
  const toggleValue = () => {
    setIsToggleOn(!isToggleOn);
  }
  // send mail function
  const [result, setResult] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const sendEmail = () =>{
    setLoading(true)
    fetch('/api/emails', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => setResult(data))
    .catch(error => setResult(error))
    .finally(() => setLoading(false))
  }
  //dubeugging
  const currentTime = new Date();
  const targetTime = new Date(matchTime);
  targetTime.setMinutes(matchTime.getMinutes() - 30);
  
  console.log("current time: ", currentTime);
  console.log("target time: ", targetTime);
  //match condition function
  const matchConditionMet = () =>{
    const currentTime = new Date();
    const targetTime = new Date(matchTime);
    targetTime.setMinutes(matchTime.getMinutes() - 30);
    if(
    //   @ts-ignore
      (matchDay[1] == matchTime.getDate() || matchDay[0] + matchDay[1] == matchTime.getDate()) &&
      (currentTime >= targetTime && currentTime < matchTime) && 
      (isToggleOn)
    )
    {
      console.log("match conditions met"); 
      return true;
    }
    return false;
  };
  //calling it to send email
  useEffect( ()=> {
    const checkConditions = () =>{
      if(matchConditionMet() && !emailSent){
        sendEmail();
        setEmailSent(true);
      }
    };
    const intervalId = setInterval(checkConditions, 60000);
    return () => clearInterval(intervalId);
  }, [emailSent]);
  return (
    <div className="p-4 flex flex-col items-center">
        <p className="text-xl font-semibold mb-4">Do you wish to receive emails from us?</p>
        <button 
          onClick={toggleValue}
          className="bg-[#ef4444] text-white p-2 rounded"
        >
          {isToggleOn ? "No" : "Yes"}
        </button>
    </div>
  )
}