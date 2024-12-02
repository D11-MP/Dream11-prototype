// app/admin/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';

export default function AdminUpload() {

    const router = useRouter();

    const [status, setStatus] = useState('')

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)

        try {
            const res = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            })
            if (res.ok) {
                const res2 = await axios.get("/api/admin/stats");
                if (res2.status === 200) {
                    const res3 = await axios.get("api/admin/combine");
                    console.log(res3)
                    if (res3.status === 200) {
                        setStatus('Upload successful')
                        router.push("/");
                    }
                }
            } else {
                const error = await res.json()
                setStatus(error.message || 'Upload failed')
            }
        } catch (err) {
            setStatus('Error uploading file')
        }
    }

    return (
        <main className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Admin CSV Upload</h1>

            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
                <div className="mb-6">
                    <label
                        htmlFor="file"
                        className="block text-lg font-semibold text-gray-700 mb-2"
                    >
                        Select CSV File
                    </label>
                    <input
                        type="file"
                        name="file"
                        accept=".csv"
                        id="file"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                >
                    Upload CSV
                </button>
            </form>

            {status && (
                <p
                    className={`mt-6 text-xl ${status.includes('successful') ? 'text-green-600' : 'text-red-600'}`}
                >
                    {status}
                </p>
            )}
        </main>

    )
}