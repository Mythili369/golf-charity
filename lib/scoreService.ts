// // import { supabase } from "./supabaseClient"

// // export const addScore = async (userId: string, score: number) => {
// //   // get existing scores
// //   const { data: scores } = await supabase
// //     .from("scores")
// //     .select("*")
// //     .eq("user_id", userId)
// //     .order("date", { ascending: true })

// //   // if already 5 → delete oldest
// //   if (scores && scores.length >= 5) {
// //     const oldest = scores[0]
// //     await supabase.from("scores").delete().eq("id", oldest.id)
// //   }

// //   // insert new score
// //   await supabase.from("scores").insert({
// //     user_id: userId,
// //     score,
// //   })
// // }
// import { supabase } from "./supabaseClient"

// export const addScore = async (userId: string, score: number) => {
//   const { data: scores, error: fetchError } = await supabase
//     .from("scores")
//     .select("*")
//     .eq("user_id", userId)
//     .order("date", { ascending: true })

//   console.log("FETCH:", scores, fetchError)

//   if (scores && scores.length >= 5) {
//     const oldest = scores[0]
//     await supabase.from("scores").delete().eq("id", oldest.id)
//   }

//   const { data, error } = await supabase.from("scores").insert({
//     user_id: userId,
//     score,
//   })

//   console.log("INSERT:", data, error)
// }
import { supabase } from "./supabaseClient"

export const addScore = async (userId: string, score: number) => {
  const { data: scores, error: fetchError } = await supabase
    .from("scores")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: true })

  console.log("FETCH:", scores, fetchError)

  if (scores && scores.length >= 5) {
    const oldest = scores[0]
    await supabase.from("scores").delete().eq("id", oldest.id)
  }

  const { data, error } = await supabase.from("scores").insert({
    user_id: userId,
    score,
  })

  console.log("INSERT:", data, error)
}