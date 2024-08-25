import { useContext, useEffect, useState } from 'react';
import AuthContext from '@/app/context/authContext';
import { handleLogin } from '@/app/lib/api';



export default function Login({ switchPage }: { switchPage: (pageName: string) => void; }) {
    const { user, setUser } = useContext(AuthContext);
    const [form, setForm] = useState({
        username: '',
        password: ''
    });
    //const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    
    async function onLogin() {
        const loginAccount = await handleLogin(form.username, form.password);
        if(loginAccount.success) {
            //setSuccess(true);
            setMessage('Successfully logged in!')
            setUser(form.username);
        } else {
            setMessage(`${loginAccount.message}`)
        }
    }
    useEffect(() => {
        setMessage('');
    }, [form])
    
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
                        <div className='flex flex-col gap-2'>
                            <input 
                            type="text" 
                            placeholder='Username'
                            className='py-1 px-2 rounded-lg inline text-lg max-w-[300px]'
                            value={form.username} 
                            onChange={e => setForm({...form, username: e.target.value})} 
                            />
                            <input 
                            type="text" 
                            placeholder='Password'
                            className='py-1 px-2 rounded-lg inline text-lg max-w-[300px]'
                            value={form.password} 
                            onChange={e => setForm({...form, password: e.target.value})} 
                            />
                            {message && <p>{message}</p>}
                            <div className='my-2'>
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