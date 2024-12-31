import { useState } from "react";
import Image from 'next/image'
import { OptionType } from "@/app/lib/types";
import clsx from "clsx";
import PTWDropdown from "./ptwDropdown";

export default function OptionItem({ option, onBetClose }: { option: OptionType, onBetClose: (optionid: string, side: 'o' | 'u' | 'h' | 'm') => Promise<{ success: boolean }> }) {
    const type = option.optiontype;
    const odds = option.odds;
    const [selected, setSelected] = useState<'o' | 'u' | null>(null);
    const [open, setOpen] = useState(false);
    const [resolved, setResolved] = useState(false);
    const [message, setMessage] = useState('');
    const adjustedLength = (odds < 30) ? [30, 100-odds] : (odds > 70) ? [odds, 30] : [odds, 100-odds];
    const handleOptionCloseClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if(selected == null) {
            return;
        }
        setMessage('Closing... do not refresh the page');
        try {
            const result = await onBetClose(option.id, selected);
            if(result.success) {
                setResolved(true);
                setMessage('Success!');
            } else {
                setMessage('Failed');
            }
        }  catch(error) {
            console.error(error);
        }
    };
    return (
        <div>
        <div className="flex flex-col gap-2 rounded-lg bg-gray-300 py-6 px-12 drop-shadow-lg">
            <div className=" flex flex-row justify-between mb-2">
                <div className="HEADING DETAILS flex flex-col gap-3 mr-4">
                <h1 className="font-medium text-2xl">{option.heading}</h1>
                {(type === 'ou') && <div><div className='NUMBER inline font-semibold text-lg text-white px-3 py-1 bg-gray-700 rounded-lg'>{option.bettingline}</div></div>}
                <p className="overflow-hidden">{option.subheading}</p>
                </div>
                <div className="ODDS DETAILS flex flex-col gap-2 items-end justify-center">
                {/* <h1 className="font-medium text-2xl text-right">Odds</h1> */}
                <div className="flex gap-4 items-center">
                    <p>{(type === 'ou') ? 'Over' : 'Hit' }</p>
                    <div style={{width: `${2*adjustedLength[0]}px`}}
                         className={`items-center rounded-lg bg-gray-700 text-white text-sm py-2 px-4 overflow-clip`}>
                        <p>{Math.trunc(option.odds)}%</p>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <p>{(type === 'ou') ? 'Under' : 'Miss' }</p>
                    <div style={{width: `${2*adjustedLength[1]}px`}}
                        className='items-center rounded-lg bg-white border-2 border-gray-700 text-gray-700 text-sm py-2 px-4 overflow-clip'>
                        <p>{100-Math.trunc(option.odds)}%</p>
                    </div>
                </div>
                </div>
            </div>
            {open && (
                <>
                <div className="h-px bg-black w-full my-2" />
                <div className={`flex-col flex gap-2`}>
                    <h1 className="text-2xl font-medium">Close bet</h1>
                    {
                    (message) 
                    ? <div className='text-center pt-6'>{message}</div>
                    : <div className="flex flex-col">
                        <div className="flex justify-between py-2">
                            <div className="flex gap-4 items-center">
                            <h1 className="text-lg font-medium">Result</h1>
                            <button className={`rounded-md ${selected === 'o' ? 'bg-gray-700 text-white' : ' text-gray-700 bg-white border'} border-gray-700 py-1 px-3`} onClick={() => setSelected((selected !== 'o') ? 'o' : null)}>{(type === 'ou') ? 'Over' : 'Hit' }</button>
                            <button className={`rounded-md ${selected === 'u' ? 'bg-gray-700 text-white' : ' text-gray-700 bg-white border'} border-gray-700 py-1 px-3`} onClick={() => setSelected((selected !== 'u') ? 'u' : null )}>{(type === 'ou') ? 'Under' : 'Miss' }</button>
                            </div>
                            <button className={`bg-gray-700 text-white px-6 py-1 rounded-md ${resolved && 'hidden'}`} onClick={handleOptionCloseClick}>
                            Close bet
                            </button>
                        </div>
                    </div>
                    }
                </div>
                </>)}
            <div className="flex justify-end">
                <button onClick={() => setOpen(!open)}>
                    {open ?
                    <img src='/svg/retract.svg' alt='Retract' width={24} /> :
                    <img src='/svg/expand.svg' alt='Expand' width={24}  />}
                </button>
                
            </div>
        </div>
        </div>
    )
}

export function PTWOptionItem({ option, onBetClose }: { option: OptionType, onBetClose: (optionid: string, winner: number) => Promise<{ success: boolean }>}) {
    const [selected, setSelected] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const [resolved, setResolved] = useState(false);
    const [message, setMessage] = useState('');
    const handleOptionClose = async () => {
        if(selected == null) {
            return;
        }
        setMessage('Closing... do not refresh the page');
        try {
            const result = await onBetClose(option.id, selected);
            if(result.success) {
                setResolved(true);
                setMessage('Success!');
            } else {
                setMessage('Failed');
            }
        }  catch(error) {
            console.error(error);
        }
    }
    function getLength(odds: number) {
        return (odds < 30) ? 'minimum' : (odds > 70) ? 'maximum' : odds;
    }
    const sides = option.choices.map((choice, i) => {
        return (<li key={i} className={clsx(
            'items-center rounded-lg text-xs py-2 px-4 overflow-clip grid grid-cols-4 justify-between',
            i%2 ? 'bg-gray-700 text-white' : 'bg-white border-2 border-gray-700 text-gray-700'
        )}>
            <div className="col-span-3 max-h-4 overflow-scroll no-scrollbar whitespace-nowrap"><p>{choice.choice_name}</p></div>
            <div className="text-right justify-right">{`${choice.odds}%`}</div>
        </li>)
    })
    return (
        <div>
        <div className="flex flex-col gap-4 rounded-lg bg-gray-300 py-6 px-12 drop-shadow-lg">
            <div className="md:grid flex flex-col grid-cols-5 justify-between">
                <div className="HEADING DETAILS col-span-3 flex flex-col gap-1 mr-4">
                <h1 className="font-semibold text-2xl">{option.heading}</h1>
                <p className="overflow-hidden">{option.subheading}</p>
                </div>
                <div className="ODDS DETAILS col-span-2 flex flex-col gap-2 items-end justify-center h-[100px]">
                    <ul className="INFO CONTAINER no-scrollbar my-1 w-full flex flex-col overflow-y-scroll gap-2 bg-slate-200 text-white rounded-md outline outline-2 outline-white py-2 px-2">
                        {sides}
                    </ul>
                {/* <h1 className="font-medium text-2xl text-right">Odds</h1> */}
                </div>
            </div>
            {open && (
                <>
                <div className="h-px bg-black w-full my-2" />
                <div className={`flex-col flex gap-2`}>
                    <h1 className="text-2xl font-medium">Close bet</h1>
                    {
                    (message) 
                    ? <div className='text-center pt-6'>{message}</div>
                    : <div className="flex flex-col">
                        <div className="flex justify-between py-2">
                            <div className="flex gap-4 items-center">
                            <h1 className="text-lg font-medium">Result</h1>
                            <PTWDropdown selectedIndex={selected} options={option.choices} onSelect={setSelected} />
                            </div>
                            <button className={`bg-gray-700 text-white px-6 py-1 rounded-md ${resolved && 'hidden'}`} onClick={handleOptionClose}>
                            Close bet
                            </button>
                        </div>
                    </div>
                    }
                </div>
                </>)}
            <div className="flex justify-end">
                <button onClick={() => setOpen(!open)}>
                    {open ?
                    <img src='/svg/retract.svg' alt='Retract' width={24} /> :
                    <img src='/svg/expand.svg' alt='Expand' width={24}  />}
                </button>
                
            </div>
        </div>
        </div>
    )
}