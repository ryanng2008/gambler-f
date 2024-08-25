import AuthContext from "@/app/context/authContext";
import { handleRegister } from "@/app/lib/api";
import { useState, useContext } from "react";

export default function Register({ switchPage }: { switchPage: (pageName: string) => void}) {
    const { user, setUser } = useContext(AuthContext);
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('');
    async function onRegister() {
        //console.log('PASSWORD')
        //console.log(form.password)
        const registerAccount = await handleRegister(form.username, form.password);
        if(registerAccount.success) {
            setSuccess(true);
            setUser(form.username)
            setMessage('Success!')
        } else {
            setMessage(`${registerAccount.message}`)
        }
    }

    return (
        <div className="CONTAINER flex flex-col gap-6">
            <div className="HEAD">
                <h1 className="text-4xl font-semibold">Register</h1>
            </div>
            {
                (success)
                ? 
                <div className="flex flex-col gap-2">
                    <p>{message}</p>
                    <button className='py-1 hover:underline hover:text-gray-500 rounded-lg' onClick={() => switchPage('login')}>Login</button>
                </div> 
                : 
                <div className="BODY gap-4 justify-start">
                    <div className='flex flex-col gap-2'>
                        <input 
                        type="text" 
                        placeholder='Username'
                        className='py-1 px-2 rounded-lg inline text-lg max-w-[300px]'
                        value={form.username} 
                        onChange={e => setForm({...form, username: e.target.value})} 
                        // setCredentials({...credentials, username: e.target.value})
                        />
                        <input 
                        type="text" 
                        placeholder='Password'
                        className='py-1 px-2 rounded-lg inline text-lg max-w-[300px]'
                        value={form.password} 
                        onChange={e => setForm({...form, password: e.target.value})} 
                        // setCredentials({...credentials, username: e.target.value})
                        />
                        {message && <p>{message}</p>}
                        <div className='my-2'>
                            <button onClick={() => onRegister()} className='inline py-1 px-4 bg-gray-600 text-white text-large font-medium rounded-lg'>
                                Register
                            </button>
                        </div>
                        <div className='flex items-center'>
                            <button 
                            className='py-1 hover:underline hover:text-gray-500 rounded-lg' 
                            onClick={() => switchPage('login')}
                            >Have an account already?</button>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    )
}