'use client'
import { useContext } from "react"
import AuthContext from "../context/authContext"
import Link from "next/link"

function Page() {
  const { user } = useContext(AuthContext)
  return (
    <div className="h-[75vh]">
        <div className="h-full my-auto flex flex-col gap-8 justify-center">
            <h1 className="text-7xl font-semibold">What&apos;s up gang!</h1>
            {(user === null) && <Link href='/home/account' className="hover:underline hover:text-gray-600 mx-2 text-2xl">Register or login here (or press the top right button)</Link>}
        </div>
    </div>
  )
}

export default Page