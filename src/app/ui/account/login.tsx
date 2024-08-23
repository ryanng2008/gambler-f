import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/app/context/authContext';



export default function Login({ switchPage }: { switchPage: (pageName: string) => void; }) {
    const { user, setUser } = useContext(AuthContext);
    const [input, setInput] = useState('');
    const [message, setMessage] = useState('');
    async function onLogin() { 
        await fetch(`/api/auth/login?username=${encodeURIComponent(input)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json())
        .then(data => {
            if(data.exists) {
                setUser(input); // when you fix, it wil\
                setMessage(`Successfully logged in as ${input} (until you refresh or leave the page)`)
                //console.log(`Successfully logged in as ${input} - user Context: ${user}`)
            } else {
                setMessage(`Login failed - try to register an account instead`)
            }
        })
        .catch(error => console.error('Failed to Login (in onSubmit handler): ', error))
    }
    useEffect(() => {
        setMessage('');
    }, [input])
    return (
        <>
            {
                (user != null) ?
                (<div>
                    <p>{message ? message : 'Nothing to see here (try refreshing?)'}</p>
                </div>)
                : 
                (<div className="CONTAINER flex flex-col gap-6">
                    <div className="HEAD">
                        <h1 className="text-4xl font-semibold">Log in</h1>
                    </div>
                    <div className="BODY gap-4 justify-start">
                        <div className='flex flex-col gap-4'>
                            <div>
                                <input 
                                type="text" 
                                placeholder='Username'
                                className='py-1 px-2 rounded-lg inline '
                                value={input} 
                                onChange={e => setInput(e.target.value)} 
                                // setCredentials({...credentials, username: e.target.value})
                                />
                            </div>
                            {message && <p>{message}</p>}
                            <div className=''>
                                <button onClick={() => onLogin()} className='inline py-1 px-4 bg-gray-600 text-white text-large font-medium rounded-lg'>
                                    Log in
                                </button>
                            </div>
                            <div className='flex items-center'>
                                <button 
                                className='py-1 hover:underline hover:text-gray-500 rounded-lg' 
                                onClick={() => switchPage('register')}
                                >Don&apos;t have an account?</button>
                            </div>
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}