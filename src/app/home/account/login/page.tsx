'use client';
import { useState } from 'react';
import Image from 'next/image'
import Login from '@/app/ui/account/login'
import Register from '@/app/ui/account/register';



export default function Page() {
    //const [credentials, setCredentials] = useState({ username: '' }); // Make a type for this later when you add password
    const [page, setPage] = useState('register');
    function handleSwitchPage(pageName: string) {
        setPage(pageName);
    }
    
    return (
        <>
        <div className='grid grid-cols-2 items-center'>
            {
                  (page === 'login')
                ? <Login switchPage={handleSwitchPage}/>
                : (page === 'register')
                ? <Register switchPage={handleSwitchPage}/>
                : <div></div>
            }
            <div className='flex justify-center items-center h-[75vh]'>
                <Image 
                className='rounded-lg h-auto'
                src='/asap.jpeg'
                width={380}
                height={140}
                alt=''
                />
            </div>
        </div>
        </>
    )
}