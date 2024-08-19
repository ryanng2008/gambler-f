'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { OptionFormData } from '@/app/lib/types';
//import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation'

// type OptionFormSubmitHandler = (form: OptionFormData) => void;

export default function OptionFormClient() {
    const router = useRouter();
    // { onSubmit }: { onSubmit: any }
    //const router = useRouter();
    const [form, setForm] = useState<OptionFormData>({
        marketCode: 'main',
        subsectionCode: '000003',
        heading: '',
        subheading: '',
        optiontype: 'ou',
        minbet: 0,
        maxbet: 0,
        odds: 0,
        imagelink: '',
        bettingline: 0,
    });
    const overPayoutRate = (100 - form.odds) / form.odds;

    function handleChange(e: any) {
        setForm(f => ({
            ...form,
            [e.target.name]: e.target.value
        }))
    }
    function handleChangeOdds(e: any) {
        if(e.target.name === "over") {
            setForm(f => ({
                ...form,
                odds: e.target.value
            }))
        } else if(e.target.name === "under") {
            const underValue = 100 - e.target.value;
            setForm(f => ({
                ...form,
                odds: underValue
            }))
        } else {
            console.log('done')
        }
    }



    const AbstractOption = ({ heading, bettingLine, subheading }: {heading: string, bettingLine: string, subheading: string}) => {
        return (
        <div className='block'>
            <button className={` O/U H/M OPTION w-[100%] py-4 px-2 grid grid-cols-5 gap-2 drop-shadow-xl bg-gray-300 rounded-xl text-left`}>
                <div className='IMAGE col-span-1 mx-auto my-auto'>
                    <Image 
                    src='/lepresident.png'
                    className='rounded-full'
                    alt=''
                    height={80}
                    width={80}/>
                </div>
                <div className='col-span-4 grid grid-rows-2 gap-1 items-center overflow-clip'>
                    <div>
                        <h1 className='text-3xl font-semibold'>{heading}</h1>
                    </div>
                    <div className='flex flex-row flex-wrap gap-4 items-center'>
                        { bettingLine && <div className='NUMBER font-semibold text-white bg-gray-700 px-3 py-1 rounded-lg'>
                            <h1>{bettingLine}</h1>
                        </div>}
                        <p className='text-md'>{subheading}</p>
                    </div>
                </div>
            </button>
        </div>)
    }

    const onSubmit = async (form: OptionFormData) => {
        const fixedForm = (Number(form.minbet) > Number(form.maxbet)) ? {...form, minbet: form.maxbet, maxbet: form.minbet} : form;
        await fetch('/api/submit-option', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(fixedForm)
        })
    }
    return (
            <div className="FORM CONTENT md:grid flex flex-col grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-semibold">Categorisation</h2>
                    <div className="CATEGORY DETAILS FORMS grid grid-cols-2 gap-y-12"> 
                        <div className="flex flex-col gap-3 mr-8">
                            <h2 className="text-md font-normal">Category</h2>
                            <input name='marketCode' className="inline py-1 px-2 rounded-lg text-sm outline-gray-100" type="text" placeholder='Dropdown pick an option' value={form.marketCode} onInput={() => {}}/> 
                        </div>
                        <div className="flex flex-col gap-3 mr-8">
                            <h2 className="text-md font-normal">Sub-category</h2>
                            <input name='subsectionCode' className="inline py-1 px-2 rounded-lg text-sm outline-gray-100" type="text" placeholder="Dropdown pick an option" value={form.subsectionCode} onInput={() => {}}/>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold">Customise</h2>
                    <div className="CUSTOMISE FORMS gap-4 flex flex-col mr-4">
                        <div className="flex flex-row">
                            <div className="flex flex-col gap-2 mr-8">
                                <h2 className="text-md font-normal">Heading</h2>
                                <input name='heading' className="inline py-1 px-2 rounded-lg text-sm outline-gray-100 md:max-w-[100]" maxLength={15} type="text" placeholder='J. Johnson' value={form.heading} onInput={handleChange}/>
                            </div>
                            <div className="flex flex-col gap-3 mr-8">
                                <h2 className="text-md font-normal">Type of option (dropdown)</h2>
                                <input name='optiontype' className="inline py-1 px-2 rounded-lg text-sm outline-gray-100" type="text" placeholder="Dropdown pick an option" value={form.optiontype} onInput={() => {}}/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mr-8">
                            <h2 className="text-md font-normal">Description (subheading)</h2>
                            <textarea name='subheading' className="inline py-1 px-2 rounded-lg text-sm outline-gray-100" maxLength={40} placeholder='Points + Rebounds + Assists' value={form.subheading} onInput={handleChange} />
                        </div>
                    </div>
                    
                </div>
                <div className="BET TYPE SPECIFIC CONTENT space-y-6 mr-12">
                    <AbstractOption heading={form.heading} bettingLine={form.bettingline!.toString()} subheading={form.subheading}/>
                    <h2 className="text-xl font-semibold">Details</h2>
                    <div className="OPTION DETAILS FORMS grid grid-cols-2 gap-8"> 
                        {/* Fields for Hit/Miss & Over/Under */}
                        <div className="space-y-2 flex flex-col">
                            {/* TODO: Make this conditional for Over/Under */}
                            <h2 className="">Betting line</h2> 
                            <input value={form.bettingline} onInput={handleChange} name='bettingline' className="py-1 px-2 rounded-lg text-sm outline-gray-100 " type="number" placeholder='12.5' />
                            <div className="grid grid-cols-2 justify-between gap-6">
                                <div>
                                    <h3 className="text-sm py-2">Minimum bet</h3>
                                    <input name='minbet' className="py-1 px-2 rounded-lg text-sm outline-gray-100 max-w-[80%]" type="number" value={form.minbet} onInput={handleChange} placeholder='0'/>
                                </div>
                                <div className="">
                                    <h3 className="text-sm py-2">Maximum bet</h3>
                                    <input name='maxbet' className="py-1 px-2 rounded-lg text-sm outline-gray-100 max-w-full" value={form.maxbet} onInput={handleChange} type="number" placeholder='100'/>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2>Select odds</h2>
                            <div className="flex flex-col gap-4">
                                <div className='justify-between flex'>
                                    <div className="space-y-1">
                                        <h3>Over</h3>
                                        <div className="flex flex-row">
                                            <input name='over' className="py-1 px-2 mr-1 rounded-lg text-sm outline-gray-100 inline" min={0} max={100} type="number" placeholder='100' value={form.odds} onInput={handleChangeOdds}/>
                                            <p>%</p>
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <h3>Under</h3>
                                        <div className="flex flex-row">
                                            <input name='under' className="py-1 px-2 mr-1 rounded-lg text-sm outline-gray-100 inline" min={0} max={100} type="number" value={100 - form.odds} onInput={handleChangeOdds} placeholder='100'/>
                                            <p>%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between'>
                                    <div>{`${Math.round(overPayoutRate * 10000)/100}%`}</div>
                                    <h2>Payout</h2>
                                    <div>{`${Math.round(1/overPayoutRate * 10000)/100}%`}</div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div className='justify-end flex'>
                        <button onClick={() => {
                            //"use server";
                            //if(Number(form.minbet) > Number(form.maxbet)) {
                            //    setForm(prevForm => ({...form, minbet: prevForm.maxbet, maxbet: prevForm.minbet}))
                            //    console.log('inside button Activated')
                            //}
                            onSubmit(form);
                            router.push('/home')
                        }} className='bg-gray-800 text-white font-medium py-2 px-4 rounded-lg'>
                            Create bet
                        </button>
                    </div>
                </div>
            </div>
    )
}