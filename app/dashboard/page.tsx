// // export default function DashboardHome() {
// //   return (
// //     <div className="text-black">
// //       <h1 className="text-2xl font-bold">Welcome 👋</h1>
// //       <p className="mt-2">Track your scores, win prizes, and support charity.</p>
// //     </div>
// //   )
// // }
// "use client"

// import { useEffect, useState } from "react"
// import { supabase } from "@/lib/supabaseClient"

// export default function DashboardHome() {
//   const [subscription, setSubscription] = useState<any>(null)

//   const fetchSubscription = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) return

//     const { data } = await supabase
//       .from("subscriptions")
//       .select("*")
//       .eq("user_id", user.id)
//       .single()

//     setSubscription(data)
//   }

//   const activateSubscription = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) return

//     await supabase.from("subscriptions").upsert({
//       user_id: user.id,
//       plan: "monthly",
//       status: "active",
//       renewal_date: new Date(),
//     })

//     fetchSubscription()
//   }

//   useEffect(() => {
//     fetchSubscription()
//   }, [])

//   return (
//     <div>
//       <h1 className="text-2xl font-bold">Welcome 👋</h1>

//       <div className="mt-4 p-4 border rounded">
//         <h2 className="font-semibold mb-2">Subscription</h2>

//         {subscription?.status === "active" ? (
//           <p className="text-green-600">
//             Active ({subscription.plan})
//           </p>
//         ) : (
//           <button
//             onClick={activateSubscription}
//             className="bg-black text-white px-4 py-2"
//           >
//             Activate Subscription
//           </button>
//         )}
//       </div>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function DashboardHome() {
  const [subscription, setSubscription] = useState<any>(null)
    const [winner, setWinner] = useState<any>(null)
//   const fetchSubscription = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) return

//     const { data } = await supabase
//       .from("subscriptions")
//       .select("*")
//       .eq("user_id", user.id)
//       .maybeSingle()

//     setSubscription(data)
//   }
const fetchSubscription = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id)

  setSubscription(data?.[data.length - 1] || null) // 👈 get latest
}
const fetchWinner = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { data } = await supabase
    .from("winners")
    .select("*")
    .eq("user_id", user.id)
    .limit(1)

  setWinner(data?.[0] || null)
}
  // ✅ Activate subscription with plan
//   const activateSubscription = async (plan: string) => {
//      console.log("clicked", plan)
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) return

//     await supabase.from("subscriptions").insert({
//       user_id: user.id,
//       plan,
//       status: "active",
//       renewal_date: new Date(),
//     })

//     fetchSubscription()
//   }
const activateSubscription = async (plan: string) => {
  console.log("clicked", plan)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  const { error } = await supabase.from("subscriptions").insert({
    user_id: user.id,
    plan,
    status: "active",
    renewal_date: new Date(),
  })

  if (error) {
    console.log("ERROR:", error)
    alert("Something went wrong")
    return
  }

  // ✅ force update UI
  setSubscription({
    user_id: user.id,
    plan,
    status: "active",
  })
}

  // ✅ Cancel subscription
//   const cancelSubscription = async () => {
//     const {
//       data: { user },
//     } = await supabase.auth.getUser()

//     if (!user) return

//     await supabase
//       .from("subscriptions")
//       .update({ status: "inactive" })
//       .eq("user_id", user.id)

//     fetchSubscription()
//   }
const cancelSubscription = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return

  await supabase
    .from("subscriptions")
    .update({ status: "inactive" })
    .eq("user_id", user.id)

  // ✅ update UI instantly
  setSubscription(null)
}

  useEffect(() => {
    fetchSubscription()
    fetchWinner()
  }, [])

   return (
  <div>
    <h1 className="text-2xl font-bold">Welcome 👋</h1>

    {/* Subscription */}
    <div className="mt-4 p-4 border rounded">
      <h2 className="font-semibold mb-3">Subscription</h2>

      {subscription?.status === "active" ? (
        <div>
          <p className="text-green-600 mb-2">
            Active ({subscription.plan})
          </p>

          <button
            onClick={cancelSubscription}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancel Subscription
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <button
            onClick={() => activateSubscription("monthly")}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Monthly Plan
          </button>

          <button
            onClick={() => activateSubscription("yearly")}
            className="border px-4 py-2 rounded"
          >
            Yearly Plan
          </button>
        </div>
      )}
    </div>

    {/* 👇 Latest Result (INSIDE same parent) */}
    <div className="mt-6 p-4 border rounded">
      <h2 className="font-semibold mb-2">Latest Result</h2>

      {winner ? (
        <p className="text-green-600">
          You won: {winner.prize_type} prize 🎉
        </p>
      ) : (
        <p>No winnings yet</p>
      )}
    </div>
  </div>
)
}
