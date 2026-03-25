// "use client"

// import { useState } from "react"
// import { supabase } from "@/lib/supabaseClient"
// import { generateDrawNumbers } from "@/lib/drawService"

// export default function DrawPage() {
//   const [numbers, setNumbers] = useState<number[]>([])
//   const [result, setResult] = useState<string>("")

//   const runDraw = async () => {
//     const generated = generateDrawNumbers()
//     setNumbers(generated)

//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) return alert("Not logged in")

//     // Save draw
//     await supabase.from("draws").insert({
//       month: new Date().toISOString(),
//       numbers: generated,
//       status: "published",
//     })

//     // Get user scores
//     const { data: scores } = await supabase
//       .from("scores")
//       .select("score")
//       .eq("user_id", user.id)

//     const userScores = scores?.map((s) => s.score) || []

//     // Match logic
//     const matchCount = generated.filter((n) =>
//       userScores.includes(n)
//     ).length

//    if (matchCount === 5) {
//   setResult("🏆 Jackpot Winner! (5 matches)")
// } else if (matchCount === 4) {
//   setResult("🎉 Great! 4 matches")
// } else if (matchCount === 3) {
//   setResult("👍 Good! 3 matches")
// } else if (matchCount > 0) {
//   setResult(`🙂 You matched ${matchCount} numbers`)
// } else {
//   setResult("😢 No matches. Better luck next time!")
// }
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Monthly Draw 🎲</h1>

//       <button
//         onClick={runDraw}
//         className="bg-black text-white px-4 py-2 mb-4"
//       >
//         Run Draw
//       </button>

//       {numbers.length > 0 && (
//         <div className="mb-4">
//           <h2 className="font-semibold">Draw Numbers:</h2>
//           <div className="flex gap-2 mt-2">
//             {numbers.map((n) => (
//               <span
//                 key={n}
//                 className="bg-gray-200 px-3 py-1 rounded"
//               >
//                 {n}
//               </span>
//             ))}
//           </div>
//         </div>
//       )}

//       {result && (
//         <p className="text-lg font-medium">{result}</p>
//       )}
//     </div>
//   )
// }
"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { generateDrawNumbers } from "@/lib/drawService"

export default function DrawPage() {
  const [numbers, setNumbers] = useState<number[]>([])
  const [result, setResult] = useState<string>("")

  const runDraw = async () => {
    const generated = generateDrawNumbers()
    setNumbers(generated)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return alert("Not logged in")

    // ✅ STEP 1: Save draw and get ID
    const { data: drawData, error: drawError } = await supabase
      .from("draws")
      .insert({
        month: new Date().toISOString(),
        numbers: generated,
        status: "published",
      })
      .select()
      .single()

    if (drawError) {
      console.log("DRAW ERROR:", drawError)
      return
    }

    const drawId = drawData.id

    // ✅ STEP 2: Get user scores
    const { data: scores } = await supabase
      .from("scores")
      .select("score")
      .eq("user_id", user.id)

    const userScores = scores?.map((s) => s.score) || []

    // ✅ STEP 3: Match logic
    const matchCount = generated.filter((n) =>
      userScores.includes(n)
    ).length

    // ✅ STEP 4: Save winner (ONLY if 3+ matches)
    if (matchCount >= 3) {
  let prizeType = ""

  if (matchCount === 5) prizeType = "jackpot"
  else if (matchCount === 4) prizeType = "second"
  else if (matchCount === 3) prizeType = "third"

  await supabase.from("winners").insert({
    user_id: user.id,
    draw_id: drawId,
    match_type: matchCount,
    prize_type: prizeType,
    status: "pending",
  })
}

    // ✅ STEP 5: Show result (better UI)
    // if (matchCount === 5) {
    //   setResult("🏆 Jackpot Winner! (5 matches)")
    // } else if (matchCount === 4) {
    //   setResult("🎉 Great! 4 matches")
    // } else if (matchCount === 3) {
    //   setResult("👍 Good! 3 matches")
    // } else if (matchCount > 0) {
    //   setResult(`🙂 You matched ${matchCount} numbers`)
    // } else {
    //   setResult("😢 No matches. Better luck next time!")
    // }
    let prize = ""

if (matchCount === 5) {
  prize = "🏆 Jackpot Winner (40%)"
} else if (matchCount === 4) {
  prize = "🥈 Second Prize (35%)"
} else if (matchCount === 3) {
  prize = "🥉 Third Prize (25%)"
} else if (matchCount > 0) {
  prize = `🙂 You matched ${matchCount} numbers`
} else {
  prize = "😢 No matches. Better luck next time!"
}

setResult(prize)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Monthly Draw 🎲</h1>

      <button
        onClick={runDraw}
        className="bg-black text-white px-4 py-2 mb-4"
      >
        Run Draw
      </button>

      {numbers.length > 0 && (
        <div className="mb-4">
          <h2 className="font-semibold">Draw Numbers:</h2>
          <div className="flex gap-2 mt-2">
            {numbers.map((n) => (
              <span
                key={n}
                className="bg-black text-white px-3 py-1 rounded-full font-semibold"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      )}

      {result && (
        <p className="text-lg font-medium">{result}</p>
      )}
    </div>
  )
}