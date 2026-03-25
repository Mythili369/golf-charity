// "use client"

// import { useState } from "react"
// import { supabase } from "@/lib/supabaseClient"
// import { addScore } from "@/lib/scoreService"

// export default function ScoresPage() {
//   const [score, setScore] = useState("")

//  const handleAdd = async () => {
//   console.log("BUTTON CLICKED")

//   const {
//     data: { user },
//   } = await supabase.auth.getUser()

//   console.log("USER:", user)

//   if (!user) {
//     alert("Not logged in")
//     return
//   }

//   console.log("ADDING SCORE...")

//   await addScore(user.id, Number(score))

//   alert("Score added!")
// }

//   return (
//     <div className="p-10">
//       <h1 className="text-xl mb-4">Add Score</h1>

//       <input
//         type="number"
//         placeholder="Enter score (1-45)"
//         className="border p-2 mr-2"
//         onChange={(e) => setScore(e.target.value)}
//       />

//       <button onClick={handleAdd} className="bg-black text-white px-4 py-2">
//         Add
//       </button>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { addScore } from "@/lib/scoreService"

export default function ScoresPage() {
  const [score, setScore] = useState("")
  const [scores, setScores] = useState<any[]>([])

  const fetchScores = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("scores")
      .select("*")
      .eq("user_id", user.id)
      .order("date", { ascending: false })

    setScores(data || [])
  }

  useEffect(() => {
    fetchScores()
  }, [])

  const handleAdd = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return alert("Not logged in")

    await addScore(user.id, Number(score))
    setScore("")
    fetchScores()
  }

  return (
    <div className="p-10">
      <h1 className="text-xl mb-4">Your Scores</h1>

      <div className="mb-4">
        <input
          type="number"
          placeholder="Enter score"
          className="border p-2 mr-2"
          value={score}
          onChange={(e) => setScore(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-black text-white px-4 py-2"
        >
          Add
        </button>
      </div>

      {/* Score List */}
      <div>
        {scores.length === 0 ? (
          <p>No scores yet</p>
        ) : (
          scores.map((s) => (
            <div
              key={s.id}
              className="border p-2 mb-2 flex justify-between"
            >
              <span>Score: {s.score}</span>
              <span>{s.date}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}