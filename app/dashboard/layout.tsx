// "use client"

// import Link from "next/link"

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <div className="flex h-screen">
      
//       {/* Sidebar */}
//       <div className="w-64 bg-black text-white p-5">
//         <h1 className="text-xl font-bold mb-6">Golf Charity</h1>

//         <nav className="flex flex-col gap-4">
//           <Link href="/dashboard">Dashboard</Link>
//           <Link href="/dashboard/scores">Scores</Link>
//           <Link href="/dashboard/charity">Charity</Link>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
//         {children}
//       </div>
//     </div>
//   )
// }
"use client"

import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-black text-white p-6 flex flex-col">
        <h1 className="text-2xl font-bold mb-8">Golf Charity</h1>

        <nav className="flex flex-col gap-4 text-lg">
  <Link
    href="/dashboard"
    className="hover:text-gray-300 transition"
  >
    Dashboard
  </Link>

  <Link
    href="/dashboard/scores"
    className="hover:text-gray-300 transition"
  >
    Scores
  </Link>

  <Link
    href="/dashboard/charity"
    className="hover:text-gray-300 transition"
  >
    Charity
  </Link>

  {/* 👇 ADD THIS LINE */}
  <Link
    href="/dashboard/draw"
    className="hover:text-gray-300 transition"
  >
    Draw
  </Link>
</nav>

        {/* Bottom section */}
        <div className="mt-auto pt-10">
          <p className="text-sm text-gray-400">
            © 2026 Golf Charity
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        
        {/* Content Card */}
        <div className="bg-white p-6 rounded-xl shadow-md min-h-full text-black">
          {children}
        </div>

      </div>
    </div>
  )
}