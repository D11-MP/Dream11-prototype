import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Chatbot() {
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  async function handleGenerate() {
    try {
      setLoading(true);
      const genAI = new GoogleGenerativeAI(
        "AIzaSyAOxsFCrwyo9m1jrhcg3g-pvO1UzjUbde8"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = "Explain how AI works";

      const result = await model.generateContent("How are you?");
      setResponse(result.response.text());
    } catch (error) {
      console.error("Error generating response:", error);
      setResponse("Failed to generate a response.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Chatbot</h1>
      {/* <input type="text" value={prompt} onChange={()=> {setPrompt}}></input> */}
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? "Generating..." : "Generate Response"}
      </button>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}
