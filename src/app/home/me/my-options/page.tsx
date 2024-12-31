'use client'
import { useAuth } from "@/app/context/authContext";
import { fetchUserOptionsAPI } from "@/app/lib/api";
import OptionsDashboard from "@/app/ui/me/optionsDashboard";
import { useEffect, useContext, useState } from "react";

export default function Page() {
    const { user } = useAuth()
    const [optionObjects, setOptionObjects] = useState<any[]>([]);
    const [refresh, setRefresh] = useState(false);
    async function getUserOptions(username: string) {
        try {
            const userOptionData = await fetchUserOptionsAPI(username);//fetchUserBetsAPI(username);
            setOptionObjects(userOptionData);
        } catch (error) {
            console.error(error)
        }
    }
    function refreshOptions() {
        setRefresh(!refresh);
    }
    useEffect(() => {
        getUserOptions(user)
    }, [user, refresh]);
    return (
    <div className="flex flex-col gap-8">
        <h1 className='text-5xl font-semibold my-8'>My options</h1> 
        <OptionsDashboard options={optionObjects} onRefresh={refreshOptions}/>   
    </div>
    )
}