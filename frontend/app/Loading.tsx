import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="bg-black flex items-center justify-center h-screen w-screen">
      <div className="loader"></div>
    </div>
  );
}
