'use client'
import Link from "next/link"
import { useAuth } from "../context/authContext"

function Page() {
  const { user } = useAuth();
  return (
    <div className="h-[75vh]">
        <div className="h-full my-auto flex flex-col gap-2 justify-center">
            <h1 className="text-7xl font-semibold my-8">What&apos;s up gang!</h1>
            {(user === null) && <Link href='/home/account' className="hover:underline hover:text-gray-600 mx-2 text-2xl">Register or login here (or press the top right button)</Link>}
            {(user !== null) &&
            <>
            <p className="text-2xl mx-2 my-2">Explore bets at the Browse tab, create bet options at the Create tab</p> 
            <p className="text-2xl mx-2 my-2">View your bets and options in the Dashboard (inside the menu burger)</p>
            </>
            }
            
        </div>
    </div>
  )
}

export default Page