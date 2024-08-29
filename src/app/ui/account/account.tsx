// This component for account settings
'use client';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/app/context/authContext';
import { useRouter } from 'next/navigation'
import { fetchUserBalance } from '@/app/lib/api';

export default function Account() {
    const { user, setUser } = useContext(AuthContext);
    const [balance, setBalance] = useState<number | null>(null);
    async function fetchBalance(userString: string) {
        try {
            const balanceData = await fetchUserBalance(userString);
            setBalance(balanceData);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        //console.log('RERUN FETCH BALANCE')
        fetchBalance(user);
    })
    const router = useRouter();
    return (
        <div className='space-y-4 '>
            <div>
                <p>Successfully logged in as <strong>{user}</strong> (until you refresh or leave the page)</p>
            </div>
            <div className='flex gap-2'>
                <p>Balance: </p>
                <p>${balance}</p>
            </div>
            <button onClick={() => {
                setUser(null)
                router.push('/');
            }} className='inline py-2 px-4 bg-gray-600 text-white text-large font-medium rounded-lg'>
                Log out
            </button>
        </div>)
}