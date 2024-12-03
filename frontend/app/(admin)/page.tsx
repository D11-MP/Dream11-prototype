// app/admin/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function AdminUpload() {
  const router = useRouter();

  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const res2 = await axios.get("/api/admin/stats");
        if (res2.status === 200) {
          const res3 = await axios.get("api/admin/combine");
          console.log(res3);
          if (res3.status === 200) {
            setStatus("Upload successful");
            router.push("/root");
          }
        }
      } else {
        const error = await res.json();
        setStatus(error.message || "Upload failed");
      }
    } catch (err) {
      setStatus("Error uploading file");
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex px-16"
      style={{ backgroundImage: `url('/Admin_BG.jpg')` }}
    >
      <div className="text-red-600">
        <h2 className="font-bold text-5xl pt-12 pb-40">DreamTeam</h2>
        <h1 className="text-center text-xl font-extrabold text-white mb-4">
          UPLOAD THE CSV FILE TO CONTINUE . . .
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-black bg-opacity-70 rounded-lg shadow-lg w-full max-w-lg mx-auto"
        >
          <div className="mb-6">
            <input
              type="file"
              name="file"
              accept=".csv"
              id="file"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-gray-800 text-white opacity-70 focus:opacity-100"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          >
            Upload CSV
          </button>
        </form>

        {status && (
          <p
            className={`mt-6 text-lg font-semibold ${
              status.includes("successful") ? " opacity-0 " : "text-white"
            }`}
          >
            {status} . . .
          </p>
        )}
      </div>
    </div>
  );
}
