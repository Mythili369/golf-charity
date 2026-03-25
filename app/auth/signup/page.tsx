"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Signup successful")
      router.push("/auth/login")
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">Signup</h1>

      <input
        placeholder="Email"
        className="border p-2 block mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 block mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleSignup}
        className="bg-black text-white px-4 py-2"
      >
        Signup
      </button>
    </div>
  )
}