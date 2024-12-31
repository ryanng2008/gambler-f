import { useContext } from "react";
import { useAuth } from "@/app/context/authContext";
import { handleResolveOption, handleResolvePTWOption } from "@/app/lib/api";
import OptionItem, { PTWOptionItem } from "./optionItem";


export default function OptionsDashboard({ options, onRefresh }: { options: any[], onRefresh: () => void }) {
    const { user } = useAuth();
    console.log(options)
    const optionItems = options.map((option) => {
        if(option.optiontype === 'hm' || option.optiontype === 'ou') {
            return (<OptionItem 
                key={option.id}
                option={option}
                onBetClose={handleCloseBet} 
                />)
        } else if(option.optiontype === 'ptw') {
            return (<PTWOptionItem 
                key={option.id}
                option={option}
                onBetClose={handleClosePTWBet}
            />)
        }
    })
    async function handleCloseBet(optionid: string, side: 'o' | 'u' | 'h' | 'm') {
        const closeBet = await handleResolveOption(user, optionid, side);
        if(closeBet.success) {
            console.log('success!')
            onRefresh();
            return { success: true }
        }
        else {
            return { success: false }
        }
    }
    async function handleClosePTWBet(optionid: string, winner: number) {
        const closeBet = await handleResolvePTWOption(user, optionid, winner);
        if(closeBet.success) {
            console.log('success!')
            onRefresh();
            return { success: true }
        }
        else {
            return { success: false }
        }
    }
    return (
        <>
        <div className="lg:grid grid-cols-2 flex flex-col gap-4">
            {/* <BetItem side='o' bettingline={3} wager={45} heading='hey' subheading='hello' payoutrate={3.23}/> */}
            {optionItems}
        </div>
        </>
    )
}

