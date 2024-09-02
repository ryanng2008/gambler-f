import { useState } from "react";
import Image from 'next/image'

export default function OptionItem({ id, heading='No Heading', subheading='', bettingline, odds, onBetClose }: { id: string, heading: string, subheading: string, bettingline: number, odds: number, onBetClose: (optionid: string, side: 'o' | 'u' | 'h' | 'm') => Promise<any> }) {
    const [selected, setSelected] = useState<'o' | 'u' | null>(null);
    const [open, setOpen] = useState(false);
    const [resolved, setResolved] = useState(false);
    const [message, setMessage] = useState('');
    const [hidden, setHidden] = useState(false);
    const adjustedLength = (odds < 30) ? [30, 100-odds] : (odds > 70) ? [odds, 30] : [odds, 100-odds];
    const handleOptionCloseClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setHidden(true);
        setMessage('');
        if(selected == null) {
            return;
        }
        try {
            const result = await onBetClose(id, selected);
            if(result.success) {
                setResolved(true);
                setMessage('Success!');
                setHidden(false);
            } else {
                setMessage('Failed');
            }
        }  catch(error) {
            console.error(error);
        }
         // Call your original function with the necessary parameters
    };
    return (
        <div className="flex flex-col gap-2 rounded-lg bg-gray-300 py-6 px-12 drop-shadow-lg">
            <div className=" flex flex-row justify-between">
                <div className="HEADING DETAILS flex flex-col justify-center gap-3 mr-4">
                <h1 className="font-medium text-2xl">{heading}</h1>
                <div><div className='NUMBER inline font-semibold text-lg text-white px-3 py-1 bg-gray-700 rounded-lg'>{bettingline}</div></div>
                <p className="overflow-hidden">{subheading}</p>
                </div>
                <div className="ODDS DETAILS flex flex-col gap-2 items-end justify-center">
                {/* <h1 className="font-medium text-2xl text-right">Odds</h1> */}
                <div className="flex gap-4 items-center">
                    <p>Over</p>
                    <div style={{width: `${2*adjustedLength[0]}px`}}
                         className={`items-center rounded-lg bg-gray-700 text-white text-sm py-2 px-4`}>
                        <p>{odds}%</p>
                    </div>
                </div>
                <div className="flex gap-4 items-center">
                    <p>Under</p>
                    <div style={{width: `${2*adjustedLength[1]}px`}}
                        className='items-center rounded-lg bg-white border-2 border-gray-700 text-gray-700 text-sm py-2 px-4'>
                        <p>{100-odds}%</p>
                    </div>
                </div>
                </div>
            </div>
            <div className='text-center pt-6'>{message}</div>
            {open && (
                <><div className="h-px bg-black w-full my-2"/>
            <div className={`flex-col flex gap-2 ${resolved && 'hidden'}`}>
                <h1 className="text-2xl font-medium">Close bet</h1>
                {

                <div className="flex flex-col">
                    <div className="flex justify-between py-2">
                    <div className="flex gap-4 items-center">
                        <h1 className="text-lg font-medium">Result</h1>
                        <button className={`rounded-md ${selected === 'o' ? 'bg-gray-700 text-white' : ' text-gray-700 bg-white border'} border-gray-700 py-1 px-3`} onClick={() => setSelected((selected !== 'o') ? 'o' : null)}>Over</button>
                        <button className={`rounded-md ${selected === 'u' ? 'bg-gray-700 text-white' : ' text-gray-700 bg-white border'} border-gray-700 py-1 px-3`} onClick={() => setSelected((selected !== 'u') ? 'u' : null )}>Under</button>
                    </div>
                    <button className={`bg-gray-700 text-white px-6 py-1 rounded-md ${hidden}`} onClick={handleOptionCloseClick}>
                        Close bet
                    </button>
                    </div>
                    <div className="text-end">
                    {message && message}
                    </div>
                </div>
                }
                
            </div></>)}
            <div className="flex justify-end">
                <button onClick={() => setOpen(!open)}>
                    {open ?
                    <img src='/svg/retract.svg' alt='Retract' width={24} /> :
                    <img src='/svg/expand.svg' alt='Expand' width={24}  />}
                </button>
                
            </div>
        </div>
        
    )
}