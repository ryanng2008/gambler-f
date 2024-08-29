import BetItem from "./betItem";

//import { fetchUserBets } from "@/app/lib/data/getData"
export default function BetsDashboard({ loggedIn, bets, options }: { loggedIn: boolean, bets: any[], options: any[] }) {
    //const betObjects = await fetchUserBets(username);
    const mergedData = bets.map((bet: any) => {
        const matchingOption = options.find(option => option.id === bet.optionid);
        return {
            ...bet,
            bettingline: matchingOption.bettingline || 0,
            heading: matchingOption.heading || 'N/A',
            subheading: matchingOption.subheading || 'N/A'
        }
    })
    const betItems = mergedData.map((bet: any) => 
    <BetItem 
        key={bet.id}
        side={bet.side}  
        bettingline={bet.bettingline}
        wager={bet.betamount}
        heading={bet.heading}
        subheading={bet.subheading}
        payoutrate={bet.payoutrate}      
    />
)
    return (
        <>
        {
            (bets.length < 1)
            ? <div className="text-center"><p>Loading or nothing to see here. Try placing a bet first!</p></div>
            : loggedIn 
            ? <div className="grid grid-cols-2 gap-4">{betItems}</div>
            : <div className="text-center"><p>Nothing to see here. Try logging in!</p></div>
        }
        </>
    )

    // EACH ITEM NEEDS TO SHOW (active bets): 1. option details (heading, desc, bettingline) 2. side 3. bet amount 4. payout 
    // Maybe old bets menu.
    
}



// [
//     {"id":"bbfe41fa-7047-49c6-8df5-3d5d19130bc8","bettoruser":"yannick123","optionid":"458958943fjfdhg","betamount":"500.00","payoutrate":"1.230","active":null,"side":"o"},
//     {"id":"31d03fec-de79-4cf6-a69e-6168f7bbb095","bettoruser":null,"optionid":null,"betamount":null,"payoutrate":null,"active":null,"side":"u"},
//     {"id":"b78e2227-37d3-41e6-9283-56b64ef1878f","bettoruser":"admin","optionid":"65d49ad4-7b88-45d7-a786-05445aba2608","betamount":"908.00","payoutrate":"0.538","active":null,"side":"u"},
//     {"id":"2f77c809-b305-49d5-96d4-8132c2d02d78","bettoruser":"admin","optionid":"a3ffaa6c-f487-4337-9424-bbd19ce40ca6","betamount":"5.00","payoutrate":"15.667","active":null,"side":"o"},
//     {"id":"be3fc1ab-9cbf-41af-bdbb-fcb510e3e18e","bettoruser":"admin","optionid":"c2e99dd2-c356-42a1-87ee-6f609f39133e","betamount":"10.00","payoutrate":"0.587","active":null,"side":"o"},
//     {"id":"69c3e703-6da4-4d93-929e-501903d2dfa9","bettoruser":"admin","optionid":"d5a294e9-3868-4e0a-b79c-17c9c27e0ecd","betamount":"54.00","payoutrate":"1.222","active":null,"side":"o"}
// ]
//bbfe41fa-7047-49c6-8df5-3d5d19130bc8,234,31d03fec-de79-4cf6-a69e-6168f7bbb095,b78e2227-37d3-41e6-9283-56b64ef1878f,2f77c809-b305-49d5-96d4-8132c2d02d78,be3fc1ab-9cbf-41af-bdbb-fcb510e3e18e,69c3e703-6da4-4d93-929e-501903d2dfa9