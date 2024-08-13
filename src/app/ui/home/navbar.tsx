import Image from 'next/image'
import Link from 'next/link';
import clsx from 'clsx';


export default function Navbar() {

    const links = [
        {name: 'Browse', href: '/home/explore'},
        {name: 'Create', href: '/home/create'}
    ]

    const cash = 100
    return (
        <div className="navbar grid grid-cols-3 justify-center items-center justiFFy-between bg-[#98A869] rounded-3xl text-white my-6 px-[5%] py-2 drop-shadow-xl overflow-hidden">
                <div className='flex'>
                <Link href="/home">
                    <Image 
                    src="/lebron.png" 
                    alt='Lebron'
                    className='sm:block hidden justify-start'
                    width={64} 
                    height={64} />
                </Link>
                </div>
                <div className='BUTTONS flex flex-row md:gap-12 gap-4 justify-center drop-shadow-lg'>
                    {links.map((link) => {
                    return(<Link 
                    key={link.name}
                    href={link.href}
                    className='bg-greenfaded hover:bg-greendark hover:text-greenfaded duration-300 border-[0.0625rem] border-greendark text-greendark font-semibold rounded-2xl py-2 md:px-12 sm:px-8 px-4'>
                    <p>{link.name}</p>
                    </Link>)
                    })}
                </div>
                <div className='OTHER ITEMS flex flex-row gap-12 justify-end'>
                    <div className='MONEY py-2 my-auto tracking-wide px-6 font-bold bg-greendark text-greenfaded drop-shadow-lg rounded-xl hidden md:block'>
                        <p>{`$${cash.toLocaleString()}`}</p>
                    </div>
                    <Image 
                    src="/menu.svg"
                    alt="Menu Button"
                    className='drop-shadow-lg'
                    width={64}
                    height={64}
                    />
                </div>
            </div>
    )
}