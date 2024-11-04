

export function ActiveBetItem({ side, bettingline, wager, heading, subheading, payoutrate }: { side: string, bettingline: number, wager: number, heading: string, subheading: string, payoutrate: number}) {
    const sideString = (side === 'o') ? 'Over' : (side === 'u') ? 'Under' : (side === 'h') ? 'Hit' : (side === 'm') ? 'Miss' : '';
    const payoutNum = payoutrate * wager;
    return (
        <div>
            <div className="rounded-lg bg-gray-300 py-5 px-8 flex flex-col gap-2 drop-shadow-md">
                <div className="O/U MONEYLINE WAGER flex flex-row justify-between">
                <div className="flex gap-4 items-center">
                    <h1 className="text-xl font-medium">{sideString}</h1>
                    <div className='NUMBER font-semibold text-md text-white bg-gray-700 px-3 py-1 rounded-lg'>
                        <h1>{bettingline}</h1>
                    </div>
                </div>
                <div className='MONEY py-2 my-auto tracking-wide px-6 font-bold bg-greenfaded text-greendark  drop-shadow-lg rounded-xl hidden md:block'>
                    <p>${wager}</p>
                </div>
                </div>
                <div className="HEADING SUBHEADING flex flex-row gap-8 justify-between">
                <div className="space-y-2">
                    <h1 className="font-semibold text-3xl">{heading}</h1>
                    <p className="text-lg">{subheading}</p>
                </div>
                <div className="flex flex-col justify-end">
                    <div className="">
                        <div className="bg-gray-200 rounded-md px-4 py-1 flex gap-8 drop-shadow-sm items-center">
                            <h1 className="font-medium text-lg">Payout</h1>
                            <div className='flex gap-[2px] justify-center'>
                                <h1 className=' font-normal text-lg'>${payoutNum}</h1>
                            </div>
                        </div>
                    </div>
                    {/* <div className="bg-gray-200 rounded-md px-4 py-1 flex gap-8 justify-between items-center drop-shadow-sm">
                        <h1 className="font-medium text-lg">Odds</h1>
                        <h2 className="font-normal text-lg">2:1</h2>
                    </div> */}
                </div>
                </div>
            </div>
        </div>
        
    )
}

export function ResolvedBetItem({ side, bettingline, wager, heading, subheading, payoutrate, result }: { side: string, bettingline: number, wager: number, heading: string, subheading: string, payoutrate: number, result: 'w' | 'l' | null}) {
    const sideString = (side === 'o') ? 'Over' : (side === 'u') ? 'Under' : (side === 'h') ? 'Hit' : (side === 'm') ? 'Miss' : '';
    //const payoutNum = payoutrate * wager;
    const absPL = (result === 'w') ? ((payoutrate - 1) * wager) : (result === 'l') ? (wager) : 'N/A'

    // TODO
    // - Change color based on profit/loss
    return (
        <div className="rounded-lg bg-gray-300 py-5 px-8 flex flex-col gap-2 drop-shadow-md">
            <div className="O/U MONEYLINE P/L flex flex-row justify-between">
                <div className="flex gap-4 items-center">
                    <h1 className="text-xl font-medium">{sideString}</h1>
                    <div className='NUMBER font-semibold text-md text-white bg-gray-700 px-3 py-1 rounded-lg'>
                        <h1>{bettingline}</h1>
                    </div>
                </div>
                <div className={`MONEY py-2 my-auto tracking-wide px-6 font-bold ${(result === 'w') ? ' bg-greensage text-white' : 'bg-[#c56464] text-white'}   drop-shadow-lg rounded-xl hidden md:block`}>
                    <p>{`${(result === 'l') ? '-' : (result === 'w') ? '+' : ''}\$${absPL}`}</p>
                </div>
            </div>
            <div className="HEADING SUBHEADING flex flex-row gap-5 justify-between">
                <div className="space-y-2">
                    <h1 className="font-semibold text-3xl">{heading}</h1>
                    <p className="text-lg">{subheading}</p>
                </div>
                <div className="grid grid-rows-2">
                    <div></div>
                    <div className="bg-gray-200 rounded-md px-4 py-1 flex gap-8 drop-shadow-sm items-center">
                        <h1 className="font-medium text-lg">Wager</h1>
                        <div className='flex gap-[2px] justify-center'>
                            <h1 className=' font-normal text-lg'>${wager}</h1>
                        </div>
                    </div>
                    {/* <div className="bg-gray-200 rounded-md px-4 py-1 flex gap-8 justify-between items-center drop-shadow-sm">
                        <h1 className="font-medium text-lg">Odds</h1>
                        <h2 className="font-normal text-lg">2:1</h2>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

