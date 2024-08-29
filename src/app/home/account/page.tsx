'use client';
import { useState, useContext, useEffect } from 'react';
import Image from 'next/image'
import Login from '@/app/ui/account/login'
import Register from '@/app/ui/account/register';
import AuthContext from '@/app/context/authContext';
import Account from '@/app/ui/account/account';
import { getRandomImage } from '@/app/lib/utils';



export default function Page() {
    //const [credentials, setCredentials] = useState({ username: '' }); // Make a type for this later when you add password
    const { user, setUser } = useContext(AuthContext);
    const [page, setPage] = useState('login');
    function handleSwitchPage(pageName: string) {
        setPage(pageName);
    }
    useEffect(() => {
        if(user != null) {
            setPage('logout');
        }
    }, [user])
    const imageUrl = getRandomImage();
    //console.log(imageUrl)

    return (
        <>
        <div className='grid grid-cols-2 items-center'>
            {
                  (page === 'login')
                ? <Login switchPage={handleSwitchPage}/>
                : (page === 'register')
                ? <Register switchPage={handleSwitchPage}/>
                : (page === 'logout') 
                ? <Account />
                : <div>Loading...</div>
            }
            <div className='flex justify-center items-center h-[75vh]'>
                <img 
                className='rounded-lg h-[95%] w-auto'
                src={imageUrl}
                alt=''
                />
            </div>
        </div>
        </>
    )
}