'use client';
import BetsDashboard from "@/app/ui/me/betsDashboard";
import { useAuth } from "@/app/context/authContext";
import { useContext, useEffect, useState } from "react";
//import { fetchUserBets, fetchUserBetsOptions } from "@/app/lib/data/getData";
import { fetchUserBetsAPI } from "@/app/lib/api";
import { unstable_noStore } from "next/cache";

export default function Page() {
    unstable_noStore();
    const { user } = useAuth();
    const [betObjects, setBetObjects] = useState<any[]>([]);
    // console.log('bets')
    // console.log(betObjects)
    const [bettedOptions, setBettedOptions] = useState<any[]>([]);
    // console.log('options')
    // console.log(bettedOptions)
    // const getUserBetData = async () => {
    //     const data = await fetchUserBetsAPI(user);
    //     setBetObjects(data.bets)
    //     setBettedOptions(data.options);
    // }

    async function getUserBets(username: string) {
        try {
            const userBetData = await fetchUserBetsAPI(username);
            setBetObjects(userBetData.bets);
            setBettedOptions(userBetData.options);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getUserBets(user)
    }, [user]);
    return (
        <div className="flex flex-col gap-8">
            <h1 className='text-5xl font-semibold'>My bets</h1>
            <BetsDashboard loggedIn={user} bets={betObjects} options={bettedOptions} />
        </div>
    )
}