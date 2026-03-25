"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { generateDrawNumbers } from "@/lib/drawService"

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([])
  const [scores, setScores] = useState<any[]>([])
  const [drawNumbers, setDrawNumbers] = useState<number[]>([])

  const fetchData = async () => {
    const { data: usersData } = await supabase.from("profiles").select("*")
    const { data: scoresData } = await supabase.from("scores").select("*")

    setUsers(usersData || [])
    setScores(scoresData || [])
  }

  useEffect(() => {
    fetchData()
  }, [])

  const runDraw = async () => {
    const numbers = generateDrawNumbers()
    setDrawNumbers(numbers)

    await supabase.from("draws").insert({
      month: new Date().toISOString(),
      numbers,
      status: "published",
    })

    alert("Draw executed!")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Admin Panel ⚙️</h1>

      {/* Run Draw */}
      <div className="mb-6">
        <button
          onClick={runDraw}
          className="bg-black text-white px-4 py-2"
        >
          Run Monthly Draw
        </button>

        {drawNumbers.length > 0 && (
          <div className="mt-2 flex gap-2">
            {drawNumbers.map((n) => (
             <span
  key={n}
  className="bg-gray-200 text-black px-3 py-1 rounded font-semibold"
>
  {n}
</span>
            ))}
          </div>
        )}
      </div>

      {/* Users */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Users</h2>
        {users.map((u) => (
          <div key={u.id} className="border p-2 mb-2">
            {u.name} | Admin: {u.is_admin ? "Yes" : "No"}
          </div>
        ))}
      </div>

      {/* Scores */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Scores</h2>
        {scores.map((s) => (
          <div key={s.id} className="border p-2 mb-2">
            User: {s.user_id} | Score: {s.score}
          </div>
        ))}
      </div>
    </div>
  )
}