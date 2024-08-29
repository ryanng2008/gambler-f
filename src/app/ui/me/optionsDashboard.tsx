import { useContext } from "react";
import AuthContext from "@/app/context/authContext";
import { handleResolveOption } from "@/app/lib/api";
import OptionItem from "./optionItem";


export default function OptionsDashboard({ options, onRefresh }: { options: any[], onRefresh: () => void }) {
    const { user } = useContext(AuthContext);
    console.log(options)
    const optionItems = options.map((option) => {
        return <OptionItem 
        onBetClose={handleCloseBet} 
        key={option.id}
        id={option.id} 
        heading={option.heading} 
        subheading={option.subheading} 
        bettingline={option.bettingline}
        odds={option.odds}
        />
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
    return (
        <>
        <div className="lg:grid grid-cols-2 flex flex-col gap-4">
            {/* <BetItem side='o' bettingline={3} wager={45} heading='hey' subheading='hello' payoutrate={3.23}/> */}
            {optionItems}
        </div>
        </>
    )
}

