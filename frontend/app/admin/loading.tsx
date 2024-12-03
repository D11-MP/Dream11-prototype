import React from "react";
import "./loading.css";

export default function Loading() {
  return (
    <div className="bg-white flex items-center justify-center h-screen w-screen">
      <div className="loader"></div>
    </div>
  );
}