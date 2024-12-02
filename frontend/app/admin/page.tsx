// app/admin/page.tsx
'use client'
import { useState } from 'react'
import {useRouter} from 'next/navigation'
<<<<<<< HEAD
=======
import axios from 'axios';
>>>>>>> b4c26f6c9c13a3bd92bc42a5755687e995326603

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
<<<<<<< HEAD
        setStatus('Upload successful')
        router.push("/");
=======
        const res = await axios.get('/api/admin/stats');
        if(res.status === 200){
          setStatus('Upload successful')
          router.push("/");
        }
>>>>>>> b4c26f6c9c13a3bd92bc42a5755687e995326603
      } else {
        const error = await res.json()
        setStatus(error.message || 'Upload failed')
      }
    } catch (err) {
      setStatus('Error uploading file')
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin CSV Upload</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="file" 
          name="file" 
          accept=".csv"
          className="mb-4 block w-full max-w-xs"
        />
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Upload CSV
        </button>
      </form>
      {status && (
        <p className={`mt-4 ${status.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
          {status}
        </p>
      )}
    </main>
  )
}