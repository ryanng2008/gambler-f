import Image from 'next/image'
import { useState, forwardRef, DragEvent, EventHandler } from 'react'
import {
    Slider as BaseSlider,
    SliderProps,
  } from '@mui/base/Slider';
import { OptionType } from '@/app/lib/types'
import clsx from 'clsx'




// TODO: Put all slider in separate function, abstract and move all the state stuff. 

function BetSlider({ onChange, value, range, step }: 
    {onChange: any,  //EventHandler<React.ChangeEvent<HTMLButtonElement>> to shut up onChange
     value: number,
     range: [min: number, max: number],
     step: number
    }) {
    const Slider = forwardRef(function Slider(
        props: SliderProps,
        ref: React.ForwardedRef<HTMLSpanElement>,
    ){return (
        <BaseSlider
          {...props}
          ref={ref}
        />);
    })

    const SliderValueLabel = ({ children }: { children: React.ReactElement}) => {
        return <span className="relative top-[-24px] text-black">{children}
        </span>;
    }
    const [betAmount, setBetAmount] = useState<number>(0);
    function handleChangeBet(e: any) {
        setBetAmount(e.target.value);
    }
    
    return (
        <div className='space-y-1'>
            <Slider 
                min={range[0]}
                max={range[1]}
                step={step}
                getAriaValueText={(value) => value.toString()}
                onChange={handleChangeBet}
                value={betAmount}
                valueLabelFormat={x => {return x}}
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
                <div className='justify-between flex flex-row'>
                    <p>{range[0]}</p>
                    <p>{range[1]}</p>
                </div>
        </div>
    )
}

export default function Option({ open, onOpen, visible, optionItem }: { open: boolean, onOpen: any, visible: boolean, optionItem: OptionType }) {
    // const [selected, setSelected] = useState(false); // pull this up to PAGE which will select selected component
    const [selectedSide, setSelectedSide] = useState<string>('0');
    const [betAmount, setBetAmount] = useState<number>(0);

    function handleSelectSide(side: string) {
        if(side == selectedSide) {
            setSelectedSide('0');
        } else {
            setSelectedSide(side);
        }
    }
    function handleChangeBet(e: any) {

        setBetAmount(e.target.value);
    }
    //if(!visible) {
    //    return <div></div>
    //}

    // Possibly handle that in optionsGallery instead. 

    
    return (
        <div className='BIG PARENT flex flex-col gap-0 bg-gray-300 rounded-xl duration-300 ease-in'>
            <div 
                className={`O/U H/M OPTION py-4 px-2 grid grid-cols-5 gap-2 drop-shadow-xl bg-gray-300 rounded-xl`}
                onClick={() => onOpen(optionItem.id)}>
                <div className='IMAGE col-span-1 mx-auto my-auto'>
                    <Image 
                    src={optionItem.imageLink}
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
                            <h1>{optionItem.properties.bettingLine}</h1>
                        </div>
                        <p className='text-md'>{optionItem.desc}</p>
                    </div>
                </div>
            </div>
            <div className={`overflow-hidden duration-1000 ease-in-out ${open ? 'max-h-[600px]' : 'max-h-0'}`}>
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
                                        <p className='text-md inline font-semibold'>66%</p>
                                        <p className='text-sm inline'>33</p>
                                    </div>
                                </button>
                                <button 
                                className={`RIGHT SIDE bg-black text-white w-[50%] items-center flex justify-start border-green-300 rounded-r-lg ${selectedSide === 'right' && 'border-[3px]'}`}
                                onClick={() => handleSelectSide('right')}
                                >
                                    <div className='flex flex-col mx-3 text-left'>
                                        <p className='text-md inline font-semibold'>66%</p>
                                        <p className='text-sm  inline'>33</p>
                                    </div>
                                </button>
                            </div>
                            <h2>Over</h2>
                        </div>
                    </div>
                    <div className='space-y-4 flex flex-col'>
                        <h1 className='font-semibold text-lg pb-3'>Stake</h1>
                        <BetSlider 
                            onChange={handleChangeBet}
                            value={betAmount}
                            range={optionItem.betRange}
                            step={1}
                        />
                        
                    </div>
                </div>
            </div>
        </div>
        
    )
}

{/* <Slider 
min={0}
max={50}
step={1}
getAriaValueText={(v) => v.toString()}
onChange={handleChangeBet}
value={betAmount}
valueLabelFormat={x => {return x}}
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
    mark: {
        className: 'text-black *Active'
    }
  }}
/> */}