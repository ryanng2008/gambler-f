import { ActiveBetItem, ResolvedBetItem } from "./betItem";
import { useState } from 'react';


//import { fetchUserBets } from "@/app/lib/data/getData"
export default function BetsDashboard({ loggedIn, bets, options }: { loggedIn: boolean, bets: any[], options: any[] }) { // TYPE THIS LATER
    //const betObjects = await fetchUserBets(username);
    const mergedData = bets.map((bet: any) => {
        // error here?
        const matchingOption = options.find(option => option.id == bet.optionid);
        if(!matchingOption) {
            console.log('no match')
            return {
                ...bet,
                bettingline: 0,
                heading: 'N/A',
                subheading: 'Option not found'
            }
        }
        return {
            ...bet,
            bettingline: matchingOption.bettingline || 0,
            heading: matchingOption.heading || 'Error',
            subheading: matchingOption.subheading || 'Error'
        }
    })
    const [tab, setTab] = useState<'active' | 'resolved'>('active');
    //console.log(mergedData)
    const activeBets: unknown[] = [];
    const resolvedBets: unknown[] = [];
    mergedData.forEach((bet) => {
        if(bet && bet.active ) {
            activeBets.push(bet)
        } else if(bet && !bet.active) {
            resolvedBets.push(bet)
        } else {
            console.log(`Corrupted bet: ${bet}`)
        }
    })

    const activeBetItems = activeBets.map((bet: any) => 
    <ActiveBetItem 
        key={bet.id}
        side={bet.side}  
        bettingline={bet.bettingline}
        wager={bet.betamount}
        heading={bet.heading}
        subheading={bet.subheading}
        payoutrate={bet.payoutrate}      
    />
)
    const resolvedBetItems = resolvedBets.map((bet: any) => 
    <ResolvedBetItem 
        key={bet.id}
        side={bet.side}  
        bettingline={bet.bettingline}
        wager={bet.betamount}
        heading={bet.heading}
        subheading={bet.subheading}
        payoutrate={bet.payoutrate}
        result={bet.result} 
    />
    )
    

    // TO DO: Add the final payout NUMBER to the bet row
    return (
        <>
        {
            (bets.length < 1) // 
            ? <div className="text-center"><p>Loading... or nothing to see here. Try placing a bet first!</p></div>
            : loggedIn
            ? 
             (<div className="flex flex-col gap-4">
                <div className="MENU BAR flex flex-row gap-4 items-center text-gray-800 ml-4 text-lg">
                    <button className={`hover:underline ${tab === 'active' ? 'font-semibold': 'font-normal'}`} onClick={() => setTab('active')}>Active bets</button>
                    <div className="w-px bg-gray-800 h-6"/>
                    <button className={`hover:underline ${tab === 'resolved' ? 'font-semibold': 'font-normal'}`} onClick={() => setTab('resolved')}>Resolved bets</button>
                </div>

                <div className="lg:grid grid-cols-2 flex flex-col gap-4">{(tab === 'active') ? activeBetItems : resolvedBetItems}</div>                
              </div>)
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

{/* <div className="lg:grid grid-cols-2 flex flex-col gap-4">
                <ResolvedBetItem 
                    key={1}
                    side='o'
                    bettingline={1.5}
                    wager={300}
                    heading='Hello'
                    subheading='Yo'
                    payoutrate={1.5}
                    result='l' />
                <ResolvedBetItem 
                    key={1}
                    side='u'
                    bettingline={6.3}
                    wager={300}
                    heading='Hello'
                    subheading='stop it'
                    payoutrate={2.6}
                    result='w' />
                <ActiveBetItem 
                    key={2}
                    side={'u'}  
                    bettingline={3.0}
                    wager={400}
                    heading={'Athan Wong'}
                    subheading={'Total points, rebounds and assists but if I overflow,'}
                    payoutrate={199.2}      
                />
                <ActiveBetItem 
                    key={2}
                    side={'u'}  
                    bettingline={3.0}
                    wager={400}
                    heading={'Athan Wong'}
                    subheading={'Total points, rebounds and assists'}
                    payoutrate={199.2}      
                />
                </div> */}