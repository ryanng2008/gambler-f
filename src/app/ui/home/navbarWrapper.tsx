'use server';
import AuthContext from "@/app/context/authContext";
import { fetchUser } from "@/app/lib/api/getData";
import { useContext } from "react";
import Navbar from './navbar'

interface User {
    id: string,
    username: string,
    password: string
    balance: number
}

export default async function NavbarWrapper() {
    const username = useContext(AuthContext);
    const userObject = await fetchUser(username);
    return (
        <Navbar balance={userObject.balance || 0}/>
    )
}