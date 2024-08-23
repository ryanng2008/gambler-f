'use client';
import { useContext } from 'react';
import AuthContext from '@/app/context/authContext';
import { useRouter } from 'next/navigation'

export default function Page() {
    const { user, setUser } = useContext(AuthContext);
    const router = useRouter();
    return (
        <div>
            <button onClick={() => {
                setUser(null)
                router.push('/');
            }} className='inline py-2 px-4 bg-gray-600 text-white text-large font-medium rounded-lg'>
                Log out
            </button>
        </div>)
}