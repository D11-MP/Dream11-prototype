"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Data } from "@/types/index";

// Define the shape of the context data
interface GlobalContextProps {
  final2: Data[];
  setFinal2: React.Dispatch<React.SetStateAction<Data[]>>;
  totalPredictedPoints: number;
  setTotalPredictedPoints: React.Dispatch<React.SetStateAction<number>>;
//   setFinal2: React.Dispatch<React.SetStateAction<Data[]>>;
}

// Create the context
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// Create a provider component
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [final2, setFinal2] = useState<Data[]>([]);
  const [totalPredictedPoints, setTotalPredictedPoints] = useState<number>(0);

  return (
    <GlobalContext.Provider value={{ final2, setFinal2, totalPredictedPoints, setTotalPredictedPoints }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = (): GlobalContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};