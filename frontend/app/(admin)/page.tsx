// app/admin/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loading from "../Loading";
import { set } from "mongoose";

export default function AdminUpload() {
  const router = useRouter();

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await handleUpload(formData);
  };

  const handleUpload = async (formData: FormData) => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const res2 = await axios.get("/api/admin/stats");
        if (res2.status === 200) {
          const res3 = await axios.get("/api/admin/combine");
          if (res3.status === 200) {
            setStatus("Upload successful");
            setTimeout(() => router.push("/root"), 2000);
          }
        }
      } else {
        const error = await res.json();
        setStatus(error.message || "Upload failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      setStatus("Error uploading file. Please try again.");
    }
  };

  const handleSampleUpload = async () => {
    try {
      const response = await fetch("/Sample.csv");
      const fileBlob = await response.blob();

      const formData = new FormData();
      formData.append("file", fileBlob, "Sample.csv");

      await handleUpload(formData);
    } catch (err) {
      setStatus("Error uploading sample file. Please try again.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div
      className="h-screen bg-cover bg-center justify-start flex px-16"
      style={{ backgroundImage: `url('/Admin_BG.jpg')` }}
    >
      <div className="flex-col w-96">
        <div className="text-red-600">
          <h2 className="font-bold text-5xl pt-12 pb-40">DreamTeam</h2>
          <h1 className="text-center text-xl font-extrabold text-white mb-4">
            UPLOAD THE CSV FILE TO CONTINUE . . .
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-black bg-opacity-70 rounded-lg shadow-lg w-full max-w-lg mx-auto"
          >
            <div className="mb-4">
              <input
                type="file"
                name="file"
                accept=".csv"
                id="file"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-800 text-white opacity-70 focus:opacity-100"
              />
            </div>

            <div
              className={`mb-6 text-sm font-medium w-full h-full ${
                status.includes("successful") ? " opacity-0 " : "text-gray-300"
              }`}
            >
              {status && <p>{status}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            >
              Upload CSV
            </button>
          </form>
        </div>
        <div className="w-full p-8">
          <h1 className="text-center text-xl font-extrabold text-authButton mb-4 pb-4">
            OR
          </h1>

          <button
            onClick={handleSampleUpload}
            className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          >
            Upload Sample CSV
          </button>
        </div>
      </div>
    </div>
  );
}
