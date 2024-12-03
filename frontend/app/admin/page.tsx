// app/admin/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios';
import Loading from './Loading';

export default function AdminUpload() {

    const router = useRouter();

    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        await handleUpload(formData);
        
    }
    const handleUpload = async (formData: FormData) => {
        try {
            setLoading(true)
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
                        // setTimeout(() => router.push("/"), 2000 ) 
                    }
                }
            } else {
                const error = await res.json()
                setStatus(error.message || 'Upload failed')
                setLoading(false)
            }
        } catch (err) {
            setStatus('Error uploading file')
        }
    }

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
    }
    {if (loading) return <Loading />}
    return (
        <main className="p-8 bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <div className='flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-6'>
                <h1 className="text-3xl font-extrabold text-gray-800 mb-8">Admin CSV Upload</h1>

                <form onSubmit={handleSubmit} className="bg-white p-6  w-full max-w-lg">
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
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                            />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
                        >
                        Upload CSV
                    </button>
                </form>
                <h1 className="text-center my-2">OR</h1>
                <button onClick={handleSampleUpload}
                    type="submit"
                    className="w-96 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
                    >
                    Upload Sample CSV
                </button>
            </div>

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