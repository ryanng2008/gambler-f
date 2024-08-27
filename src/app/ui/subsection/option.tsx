import Image from 'next/image'
import { useState, forwardRef, useContext } from 'react'
import {
    Slider as BaseSlider,
    SliderProps,
  } from '@mui/base/Slider';
import AuthContext from '@/app/context/authContext';
import { OptionType } from '@/app/lib/types'
import { reduceRatio } from '@/app/lib/utils'
import { placeBet } from '@/app/lib/api';

const Slider = forwardRef(function Slider(
        props: SliderProps,
        ref: React.ForwardedRef<HTMLSpanElement>,
    ){return (
        <BaseSlider
          {...props}
          ref={ref}
        />);
    })

function BetSlider({ onChange, value, range, step }: 
    {onChange: any,  //EventHandler<React.ChangeEvent<HTMLButtonElement>> to shut up onChange
     value: number,
     range: [min: number, max: number]
     step: number
    }) {
    const SliderValueLabel = ({ children }: { children: React.ReactElement}) => {
        return <span className="relative top-[-24px] text-black">{children}
        </span>;
    }    
    return (
        <div className='space-y-1 py-3'>
            <Slider 
                min={range[0] ? range[0] : 0}
                max={range[1] ? range[1] : 100}
                step={1}
                getAriaValueText={(value) => value.toString()}
                onChange={onChange}
                value={value}
                slots={{
                    valueLabel: SliderValueLabel
                }}
                slotProps={{
                    thumb: {
                      className:
                        'ring-cyan-500 dark:ring-cyan-400 ring-2 w-4 h-4 -mt-1 -ml-2 flex items-center justify-center bg-white rounded-full shadow absolute',
                    },
                    root: { className: 'w-full relative inline-block h-2 cursor-pointer' },
                    rail: {
                      className:
                        'bg-slate-100 dark:bg-slate-700 h-2 w-full rounded-full block absolute',
                    },
                    track: {
                      className: 'bg-cyan-500 dark:bg-cyan-400 h-2 absolute rounded-full',
                    },
                  }}
                />
                <div className='justify-between flex flex-row font-semibold'>
                    <p>{range[0]}</p>
                    <p>{range[1]}</p>
                </div>
        </div>
    )
}

export default function Option({ open, onOpen, optionItem }: { open: boolean, onOpen: any, optionItem: OptionType }) {
    // const [selected, setSelected] = useState(false); // pull this up to PAGE which will select selected component
    const { user, setUser } = useContext(AuthContext);
    const [selectedSide, setSelectedSide] = useState<'left' | 'right' | '0'>('0');
    const [betAmount, setBetAmount] = useState<number>(0);
    const overPayoutRate = (100/ optionItem.odds) - 1;
    const truePayoutRate = selectedSide === 'left' ? overPayoutRate : (selectedSide === 'right' ? 1/overPayoutRate : 0);
    const payoutPercent = selectedSide === 'left' ? Math.round(overPayoutRate * 1000)/10 : Math.round(1/overPayoutRate * 1000)/10;
    const oddsRatio = (selectedSide === 'left') ? reduceRatio(optionItem.odds, 100 - optionItem.odds) : ((selectedSide === 'right') ? reduceRatio(100 - optionItem.odds, optionItem.odds) : '0:0');
    const leftLength = optionItem.odds > 80 ? 80 : optionItem.odds;
    const [success, setSuccess] = useState(false);
    function handleSelectSide(side: 'left' | 'right') {
        if(side == selectedSide) {
            setSelectedSide('0');
        } else {
            setSelectedSide(side);
        }
    }
    function handleChangeBet(e: any) {
        setBetAmount(e.target.value);
    }
    async function onSubmit() {
        // TODO: CONVERT "over" into "o", etc
        // bettorUser: string, optionId: string, betAmount: number, payoutRate: number, side: 'o' | 'u' | 'h' | 'm',
        const side = (selectedSide === 'right') ? 'u' : 'o';
        const betPlacement = await placeBet(user, optionItem.id, betAmount, truePayoutRate, side);
        if(betPlacement.success) {
            console.log('Success!')
            setSuccess(true);
        } else {
            console.log('Failed')
        }
    }
    //if(!visible) {
    //    return <div></div>
    //}

    // Possibly handle that in optionsGallery instead. 

    const Card = ({ title, bigContent }: {title: string, bigContent: string }) => {
        return (
            <div className='bg-gray-200 min-w-[110px] flex flex-col px-3 pt-3 pb-4 gap-1 justify-center text-center rounded-md'>
                <h2 className='font-semibold text-sm'>{title}</h2>
                <h1 className=' font-extralight text-4xl'>{bigContent}</h1>
            </div>
        )
    }
    return (
        <div className='BIG PARENT flex flex-col gap-0 bg-gray-300 rounded-xl duration-300 ease-in'>
            <button 
                className={`O/U H/M OPTION py-4 px-2 grid grid-cols-5 gap-2 drop-shadow-xl bg-gray-300 rounded-xl text-left`}
                onClick={() => onOpen(optionItem.id)}>
                <div className='IMAGE col-span-1 mx-auto my-auto'>
                    <Image 
                    src='/lepresident.png'
                    className='rounded-full'
                    alt=''
                    height={80}
                    width={80}/>
                </div>
                <div className='col-span-4 grid grid-rows-2 gap-1 items-center'>
                    <div>
                        <h1 className='text-3xl font-semibold'>{optionItem.heading}</h1>
                    </div>
                    <div className='flex flex-row flex-wrap gap-4 items-center'>
                        <div className='NUMBER font-semibold text-white bg-gray-700 px-3 py-1 rounded-lg'>
                            <h1>{optionItem.bettingline}</h1>
                        </div>
                        <p className='text-md'>{optionItem.subheading}</p>
                    </div>
                </div>
            </button>
            <div className={`overflow-hidden duration-1000 ease-in-out ${open ? 'max-h-[600px]' : 'max-h-0'}`}>
                {
                    success 
                    ?
                    <div className='text-center mx-auto my-12'><p className=''>Success!</p></div> 
                    : 
                    <div className='px-8 py-6 flex flex-col gap-4'>
                        <div className='space-y-4'>
                        <h1 className='font-semibold text-lg'>Pick a side</h1>
                        <div className='BAR CONTAINER bg-blue-300 rounded-lg p-4 flex flex-row justify-between items-center gap-4'>
                            <h2>Under</h2>
                            <div className='BAR min-h-[64px] bg-red-400 w-full rounded-lg flex flex-row'>
                                <button 
                                className={`LEFT SIDE bg-white w-[50%] items-center flex justify-end rounded-l-lg border-green-300 ${selectedSide === 'left' && 'border-[3px]'}`}
                                onClick={() => handleSelectSide('left')}>
                                    <div className='flex flex-col mx-3 text-right'>
                                        <p className='text-md inline font-semibold'>{`${optionItem.odds !== -1 && optionItem.odds}%`}</p>
                                        <p className='text-sm inline'>33</p>
                                    </div>
                                </button>
                                <button 
                                className={`RIGHT SIDE bg-black text-white w-[50%] items-center flex justify-start border-green-300 rounded-r-lg ${selectedSide === 'right' && 'border-[3px]'}`}
                                onClick={() => handleSelectSide('right')}
                                >
                                    <div className='flex flex-col mx-3 text-left'>
                                        <p className='text-md inline font-semibold'>{`${optionItem.odds !== -1 && (100 - optionItem.odds)}%`}</p>
                                        <p className='text-sm  inline'>45</p>
                                    </div>
                                </button>
                            </div>
                            <h2>Over</h2>
                        </div>
                        </div>
                        <div className='space-y-4 flex flex-col'>
                        <h1 className='font-semibold text-lg'>Stake</h1>
                        <div className='space-y-1'>
                            
                            <BetSlider 
                            onChange={handleChangeBet}
                            value={Number(betAmount)}
                            range={[Number(optionItem.minbet), Number(optionItem.maxbet)]}
                            step={1}
                            />
                        </div>
                        <div className='flex justify-between gap-4 mx-4'>
                            <Card title='Odds' bigContent={oddsRatio}/>
                            <Card title='Payout %' bigContent={(selectedSide === 'left' || selectedSide === 'right') ? `${payoutPercent}%` : 'N/A'}/>
                            {/* <Card title='Win Profit' bigContent={`$${Math.round(betAmount * truePayoutRate * 100) / 100}`}/> */}
                            <div className='bg-gray-200 min-w-[110px] flex flex-col px-3 pt-3 pb-4 gap-1 justify-center text-center rounded-md'>
                                <h2 className='font-semibold text-sm'>Win Profit</h2>
                                <div className='flex gap-[2px] justify-center'>
                                    <h2 className='text-lg mb-1 self-end'>$</h2>
                                    <h1 className=' font-extralight text-4xl'>{Math.round(betAmount * truePayoutRate * 100) / 100}</h1>
                                </div>
                                
                            </div>
                        </div>
                        </div>
                        <div className='SUBMIT BUTTON mx-4 text-right my-2'>
                        <button 
                            className='bg-gray-600 text-white py-2 px-4 font-medium rounded-lg'
                            onClick={onSubmit}
                            ><p>Place bet</p></button>
                        </div>
                    </div>
                }
                
            </div>
        </div>
        
    )
}