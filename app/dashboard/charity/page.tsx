// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabaseClient"

// export default function CharityPage() {
//   const [charities, setCharities] = useState<any[]>([])
//   const [selected, setSelected] = useState<string>("")
//   const [percentage, setPercentage] = useState(10)

//   const fetchCharities = async () => {
//     const { data } = await supabase.from("charities").select("*")
//     setCharities(data || [])
//   }

//   useEffect(() => {
//     fetchCharities()
//   }, [])

//   const handleSave = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) return alert("Not logged in")

//     await supabase.from("user_charity").insert({
//       user_id: user.id,
//       charity_id: selected,
//       percentage,
//     })

//     alert("Charity saved!")
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Choose Charity</h1>

//       {/* Charity List */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//         {charities.map((c) => (
//           <div
//             key={c.id}
//             onClick={() => setSelected(c.id)}
//             className={`border p-4 rounded cursor-pointer ${
//               selected === c.id ? "border-black" : ""
//             }`}
//           >
//             <img src={c.image} className="mb-2 rounded" />
//             <h2 className="font-semibold">{c.name}</h2>
//             <p className="text-sm text-gray-600">{c.description}</p>
//           </div>
//         ))}
//       </div>

//       {/* Percentage */}
//       <div className="mb-4">
//         <label>Contribution %:</label>
//         <input
//           type="number"
//           value={percentage}
//           onChange={(e) => setPercentage(Number(e.target.value))}
//           className="border p-2 ml-2 w-20"
//         />
//       </div>

//       <button
//         onClick={handleSave}
//         className="bg-black text-white px-4 py-2"
//       >
//         Save Selection
//       </button>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function CharityPage() {
  const [charities, setCharities] = useState<any[]>([])
  const [selected, setSelected] = useState<string>("")
  const [percentage, setPercentage] = useState(10)

  const fetchCharities = async () => {
    const { data } = await supabase.from("charities").select("*")
    setCharities(data || [])
  }

  const fetchUserCharity = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return

    const { data } = await supabase
      .from("user_charity")
      .select("*")
      .eq("user_id", user.id)
      .single()

    if (data) {
      setSelected(data.charity_id)
      setPercentage(data.percentage)
    }
  }

  useEffect(() => {
    fetchCharities()
    fetchUserCharity()
  }, [])

  const handleSave = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) return alert("Not logged in")

    await supabase.from("user_charity").upsert({
      user_id: user.id,
      charity_id: selected,
      percentage,
    })

    alert("Charity saved!")
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Choose Charity</h1>

      {/* Charity List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {charities.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelected(c.id)}
            className={`border p-4 rounded cursor-pointer transition ${
              selected === c.id
                ? "border-black bg-gray-100"
                : "hover:bg-gray-50"
            }`}
          >
            <img src={c.image} className="mb-2 rounded" />
            <h2 className="font-semibold">{c.name}</h2>
            <p className="text-sm text-gray-600">{c.description}</p>

            {selected === c.id && (
              <p className="text-green-600 mt-2 font-semibold">
                Selected ✅
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Percentage */}
      <div className="mb-4">
        <label className="font-medium">Contribution %:</label>
        <input
          type="number"
          value={percentage}
          onChange={(e) => setPercentage(Number(e.target.value))}
          className="border p-2 ml-2 w-20"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-black text-white px-4 py-2"
      >
        Save Selection
      </button>
    </div>
  )
}