'use client' 
import Image from 'next/image'
import Link from 'next/link';
import AuthContext from '@/app/context/authContext';
import { useContext, useEffect, useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon as OutlineUser } from '@heroicons/react/24/outline';
import { fetchUserBalance } from '@/app/lib/api';

export default function Navbar() {
    const { user, setUser } = useContext(AuthContext);
    const [balance, setBalance] = useState<number>(0);
    const [open, setOpen] = useState(false);
    //console.log('user:')
    //console.log(user);
    const links = [
        {name: 'Browse', href: '/home/explore'},
        {name: 'Create', href: '/home/create'}
    ]
    async function fetchBalance(userString: string) {
        try {
            const balanceData = await fetchUserBalance(userString);
            setBalance(balanceData);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        console.log('SELLING THAT RERUN')
        fetchBalance(user);
    }, [user])


    return (
        <div className="navbar grid grid-cols-3 justify-center items-center justiFFy-between bg-[#98A869] rounded-3xl text-white my-6 px-[5%] py-2 drop-shadow-xl">
                <div className='flex gap-4'>
                <Link href="/home">
                    <Image 
                    src="/lebron.png" 
                    alt='Lebron'
                    className='sm:block hidden justify-start'
                    width={64} 
                    height={64} />
                </Link>
                <div className='my-auto flex flex-row gap-1 md:px-12 px-2'>
                    {user 
                    ? (<>
                    <p>Logged in as</p>
                    <p className='font-semibold'>{user}</p>
                    </>
                    ) : <p>Not logged in</p>
                    }
                </div>
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
                    {user != null && <div className='MONEY py-2 my-auto tracking-wide px-6 font-bold bg-greendark text-greenfaded drop-shadow-lg rounded-xl hidden md:block'>
                        <p>{`$${balance.toLocaleString()}`}</p>
                    </div>}
                    {/* <Link href='/home/account/'>
                    {
                        (user == null) 
                        ? <OutlineUser className='h-12 hover:scale-105 duration-300'/> 
                        : <UserCircleIcon className='h-12 hover:scale-105 duration-300' />
                    }
                    </Link> */}
                    {
                        (user == null)
                        ? <Link href='/home/account/'><UserCircleIcon className='h-12 hover:scale-105 duration-300'/> </Link>
                        : <div>
                            <div>
                                <button className='flex' onClick={() => setOpen(!open)}>
                                <Image 
                                src="/menu.svg"
                                alt="Menu Button"
                                className='drop-shadow-lg'
                                width={64}
                                height={64}
                                />
                                </button>
                            </div>
                            <div className={`absolute w-[64px] ${open ? '' : 'hidden'} duration-500`}> {/*origin-top-right flex justify-end bg-gray-300 p-4 */}
                                <div className='ml-[-64px] bg-greenfaded bgX-gray-200 text-black border border-greendark rounded-md flex flex-col'>
                                    <Link onClick={() => setOpen(false)} href='/home/me' className=' hover:bg-greendark hover:text-greenfaded text-greendark font-semibold px-4 py-3'>Dashboard</Link>
                                    <Link onClick={() => setOpen(false)} href='/home/account' className=' hover:bg-greendark hover:text-greenfaded text-greendark font-semibold px-4 py-3'>Account</Link>
                                </div>
                            </div>
                          </div>
                    }
                    
                </div>
            </div>
    )
}