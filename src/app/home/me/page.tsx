import { getRandomImage } from "@/app/lib/utils"
import Link from "next/link";

export default function Page() {
    const imageUrl = getRandomImage();
    return (
        <div className='CONTAINER flex flex-col gap-8'>
        <div className="BODY lg:grid grid-cols-2 lg:gap-8 flex flex-col">
            <div className="flex flex-col">
                <h1 className='text-5xl font-semibold my-8'>My Stuff</h1>
                <Link href='/home/me/my-bets'>
                    <div className='bg-gray-300 text-gray-800 my-2 text-2xl font-medium py-4 rounded-2xl hover:scale-[101%] duration-300 cursor-pointer flex px-4'>
                        <h1>My placed bets</h1>   
                    </div>
                </Link>
                <Link href='/home/me/my-options'>
                    <div className='bg-gray-300 text-gray-800 my-2 text-2xl font-medium py-4 rounded-2xl hover:scale-[101%] duration-300 cursor-pointer flex px-4'>
                        <h1>My created options</h1>   
                    </div>
                </Link>
            </div>
            <div className='md:flex hidden justify-center items-center h-[75vh]'>
                <img 
                className='rounded-lg h-[95%] w-auto'
                src={imageUrl}
                alt=''
                />
            </div>
        </div>
        </div>
    )
}