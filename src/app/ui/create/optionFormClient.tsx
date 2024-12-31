'use client';
import Image from 'next/image';
import { useState, useContext, useReducer } from 'react';
import { OptionFormData } from '@/app/lib/types';
import { useRouter } from 'next/navigation'
import { handleSubmitOption } from '@/app/lib/api';
import { useAuth } from '@/app/context/authContext';
import { TrashIcon, PlusIcon } from "@heroicons/react/20/solid";


export default function OptionFormClient() {
    const { user } = useAuth();
    const router = useRouter();
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
    interface Choice { choice: string, odds: number }
    const [ptwChoices, dispatch] = useReducer(choicesReducer, [{choice: '', odds: 0}]);
    function handleAddChoice() {
        dispatch({type: 'added'});
    }
    function handleChangeChoice(choiceId: number, changedField: 'choice' | 'odds', newValue: string | number) {
        dispatch({type: 'changed', id: choiceId, field: changedField, value: newValue})
    }
    function handleDeleteChoice(choiceId: number) {
        dispatch({type: 'deleted', id: choiceId})
    }
    function choicesReducer(choices: Choice[], action: { type: 'added' | 'changed' | 'deleted', [field: string]: any }) {
        switch(action.type) {
            case 'added':
                return [...choices, {choice: '', odds: 0}]
            case 'changed':
                if(action.field === 'choice') {
                    return choices.map((choice, i) => (action.id === i) ? {choice: action.value, odds: choice.odds} : choice)
                } else if(action.field === 'odds') {
                    const oldTotalOdds = choices.reduce((accumulator, currentChoice) => accumulator + currentChoice.odds, 0)
                    if(oldTotalOdds <= 100) {
                        const newTotalOdds = choices.reduce((accumulator, c, i) => accumulator + ((i === action.id) ? parseInt(action.value) : c.odds), 0)
                        if(newTotalOdds <= 100) {
                            return choices.map((c, i) => (i === action.id) ? {choice: c.choice, odds: parseInt(action.value, 10)} : c)
                        } 
                    }
                }
                break
            case 'deleted':
                return choices.filter((_c, i) => i !== action.id)
        }
        return choices
    }
    const choicesElements = ptwChoices.map((c, i) => 
        <li className='grid grid-cols-4 gap-4' key={i}>
            <div className='col-span-2 CHOICE'>
                <h2 className="text-xs text-graydark pl-[1px] pb-1 font-normal">Choice</h2>
                <input name="choice" type="text" className='max-w-full p-1 rounded-md text-sm bg-white' value={c.choice} onChange={(e) => handleChangeChoice(i, 'choice', e.target.value)} />
            </div>
            <div className='ODDS'>
                <h2 className="text-xs text-graydark pl-[1px] pb-1 font-normal">Odds</h2>
                <input name="odds" type="number" min={0} max={100} className='max-w-full p-1 rounded-md text-sm bg-white' value={c.odds} onChange={(e) => handleChangeChoice(i, 'odds', e.target.value)} />
            </div>
            <div className='DELETE ICON flex justify-end items-end col-span-1'>
                <button onClick={() => handleDeleteChoice(i)}><TrashIcon height={32} /></button>
            </div>
        </li>
    )

    function handleChange(e: any) {
        if(e.target.name === 'max') {
            setForm({
                ...form,
                [e.target.name]: Math.min(e.target.value, 999999999)
            })
        } else if(e.target.name === 'min') {
            setForm({
                ...form,
                [e.target.name]: Math.max(e.target.value, 0)
            })
        } else {
            setForm({
                ...form,
                [e.target.name]: e.target.value
            })
        }
    }
    function handleChangeOdds(e: any) {
        if(e.target.name === "over") {
            setForm({
                ...form,
                odds: (e.target.value <= 100) ? e.target.value : 100
            })
        } else if(e.target.name === "under") {
            const overValue = 100 - e.target.value;
            setForm({
                ...form,
                odds: (overValue <= 100) ? overValue : 100
            })
        } 
    }
    function handleChooseType(e: any) {
        switch(e.target.name) {
            case 'ou':
                break
            case 'hm':
                break
            case 'ptw':
                break
        }
        setForm({...form, optiontype: e.target.name})
    }

    async function onSubmit(form: OptionFormData, choices: {choice: string, odds: number}[]) {
        // SANITIZATION
        let sanitizedForm = form;
        let sanitizedChoices = choices;
        switch(form.optiontype) {
            case 'ou':
                sanitizedChoices = []
                break
            case 'hm':
                sanitizedChoices = []
                sanitizedForm = {
                    ...form,
                    bettingline: 0
                }
                break
            case 'ptw':
                sanitizedForm = {
                    ...form,
                    odds: -1
                }
                break
        }
        await handleSubmitOption(sanitizedForm, sanitizedChoices, user);
    }

    return (
            <div className="FORM CONTENT lg:grid flex flex-col grid-cols-2 gap-8">
                <div className="flex flex-col gap-6">
                    <h2 className="text-xl font-semibold">Categorisation</h2>
                    <div className="CATEGORY DETAILS FORMS sm:grid grid-cols-2 flex flex-col gap-y-12"> 
                        <div className="flex flex-col gap-3 mr-8">
                            <h2 className="text-md font-medium">Category</h2>
                            <input name='marketCode' className="inline py-1 px-2 rounded-lg text-sm outline-gray-100" type="text" placeholder='Dropdown pick an option' value={form.marketCode} onInput={() => {}}/> 
                        </div>
                        <div className="flex flex-col gap-3 mr-8">
                            <h2 className="text-md font-medium">Sub-category</h2>
                            <input name='subsectionCode' className="inline py-1 px-2 rounded-lg text-sm outline-gray-100" type="text" placeholder="Dropdown pick an option" value={form.subsectionCode} onInput={() => {}}/>
                        </div>
                    </div>
                    <h2 className="text-xl font-semibold">Customise</h2>
                    <div className="CUSTOMISE FORMS gap-4 flex flex-col mr-4">
                        <div className="flex sm:flex-row flex-col sm:gap-0 gap-4">
                            <div className="flex flex-col gap-2 mr-8">
                                <h2 className="text-md font-medium">Heading</h2>
                                <input name='heading' className="inline py-1 px-2 rounded-lg text-sm outline-gray-100 md:max-w-[100]" maxLength={15} type="text" placeholder='J. Johnson' value={form.heading} onInput={handleChange}/>
                            </div>
                            <div className="flex flex-col gap-2 mr-8">
                                <h2 className="text-md font-medium">Type of option (dropdown)</h2>
                                <div className='flex flex-row gap-4'>
                                    <button name='ou' onClick={handleChooseType} className={`py-1 px-2 outline outline-gray-700 rounded-md text-sm font-medium hover:scale-105 duration-300 ${(form.optiontype === 'ou') ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>Over/Under</button>
                                    <button name='hm' onClick={handleChooseType} className={`py-1 px-2 outline outline-gray-700 rounded-md text-sm font-medium hover:scale-105 duration-300 ${(form.optiontype === 'hm') ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>Hit/Miss</button>
                                    <button name='ptw' onClick={handleChooseType} className={`py-1 px-2 outline outline-gray-700 rounded-md text-sm font-medium hover:scale-105 duration-300 ${(form.optiontype === 'ptw') ? 'bg-gray-700 text-white' : 'bg-white text-gray-700'}`}>Pick The Winner</button>

                                </div>
                                {/* <input name='optiontype' className="inline py-1 px-2 rounded-lg text-sm outline-gray-100" type="text" placeholder="Dropdown pick an option" value={form.optiontype} onInput={() => {}}/> */}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 mr-8">
                            <h2 className="text-md font-medium">Description (subheading)</h2>
                            <textarea name='subheading' className="inline py-1 px-2 rounded-lg text-sm outline-gray-100" maxLength={40} placeholder='Points + Rebounds + Assists' value={form.subheading} onInput={handleChange} />
                        </div>
                    </div>
                </div>
                <div className="BET TYPE SPECIFIC CONTENT space-y-6 mr-12">
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
                                    <h1 className='text-3xl font-semibold'>{form.heading}</h1>
                                </div>
                                <div className='flex flex-row flex-wrap gap-4 items-center'>
                                    { (form.optiontype === 'ou') && <div className='NUMBER font-semibold text-white bg-gray-700 px-3 py-1 rounded-lg'>
                                        <h1>{form.bettingline!.toString()}</h1>
                                    </div>}
                                    <p className='text-md'>{form.subheading}</p>
                                </div>
                            </div>
                        </button>
                    </div>
                    <h2 className="text-xl font-semibold">Details</h2>
                    <div className="OPTION DETAILS FORMS sm:grid grid-cols-2 flex flex-col gap-8"> 
                        {/* Fields for Hit/Miss & Over/Under */}
                        <div className="space-y-2 flex flex-col">
                            {/* TODO: Make this conditional for Over/Under */}
                            <div className="grid grid-cols-2 justify-between gap-6">
                                <div>
                                    <h3 className="text-md pb-1 font-medium">Minimum bet</h3>
                                    <input name='minbet' className="py-1 px-2 rounded-lg text-sm outline-gray-100 max-w-[80%]" type="number" value={form.minbet} onInput={handleChange} placeholder='0' min={0}/>
                                </div>
                                <div className="">
                                    <h3 className="text-md pb-1 font-medium">Maximum bet</h3>
                                    <input name='maxbet' className="py-1 px-2 rounded-lg text-sm outline-gray-100 max-w-full" value={form.maxbet} onInput={handleChange} type="number" placeholder='100' max={999999999}/>
                                </div>
                            </div>
                            {form.optiontype === 'ou' && (
                            <>
                                <h2>Betting line</h2> 
                                <input value={form.bettingline} onInput={handleChange} name='bettingline' className="py-1 px-2 rounded-lg text-sm outline-gray-100" type="number" placeholder='12.5' />
                            </>)
                            }
                        </div>
                        <div className="space-y-4">
                            <h2 className='font-medium'>Select odds</h2>
                            {
                            (form.optiontype === 'ptw') ?
                            <div className='PTW MENU flex flex-col gap-4'>
                                <ul className='space-y-2'>
                                    {choicesElements}
                                </ul>
                                <button onClick={handleAddChoice} className='bg-graydark rounded-lg flex items-center justify-center py-1 text-white hover:scale-105 duration-300'><PlusIcon height={16}/></button>
                            </div> :
                            <div className="flex flex-col gap-4">
                                <div className='grid grid-cols-3'>
                                    <div className="space-y-1">
                                        <h3>{form.optiontype === 'ou' ? 'Over' : 'Hit'}</h3>
                                        <div className="flex flex-row gap-1">
                                            <input name='over' className="py-1 px-2 mr-1 rounded-lg text-sm outline-gray-100 inline" min={0} max={100} type="number" placeholder='100' value={form.odds} onInput={handleChangeOdds}/>
                                            <p>%</p>
                                        </div>
                                    </div>
                                    <div />
                                    <div className="space-y-1">
                                        <h3>{form.optiontype === 'ou' ? 'Under' : 'Miss'}</h3>
                                        <div className="flex flex-row gap-1">
                                            <input name='under' className="py-1 px-2 mr-1 rounded-lg text-sm outline-gray-100 inline" min={0} max={100} type="number" value={100 - form.odds} onInput={handleChangeOdds} placeholder='100'/>
                                            <p>%</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='grid grid-cols-3 text-center'>
                                    <div>{`${Math.round(overPayoutRate * 10000)/100}%`}</div>
                                    <h2 className='font-medium'>Payout</h2>
                                    <div>{`${Math.round(1/overPayoutRate * 10000)/100}%`}</div>
                                </div>                                
                            </div>
                            }
                        </div>
                        
                    </div>
                    <div className='justify-end flex'>
                        {
                            (user != null) &&
                            <button onClick={async () => {
                                await onSubmit(form, ptwChoices);
                                router.push('/home')
                            }} className='bg-gray-800 text-white font-medium py-2 px-4 rounded-lg'>
                                Create bet
                            </button>
                        }
                    </div>
                </div>
            </div>
    )
}

//"use server";
//if(Number(form.minbet) > Number(form.maxbet)) {
//    setForm(prevForm => ({...form, minbet: prevForm.maxbet, maxbet: prevForm.minbet}))
//    console.log('inside button Activated')
//}

// function handleChangeChoices(e: React.ChangeEvent<HTMLInputElement>, index: number, dispatch: 'add' | 'change' | 'delete') {
//     switch(dispatch) {
//         case 'add':
//             return
//     }
//     switch(e.target.name) {
//         case 'choice':
//             const newPtwChoices = ptwChoices.map((choice, i) => (index === i) ? {choice: e.target.value, odds: choice.odds} : choice)
//             setPtwChoices(newPtwChoices);
//             break
//         case 'odds':
//             const oldTotalOdds = ptwChoices.reduce((accumulator, currentChoice) => accumulator + currentChoice.odds, 0)
//             if(oldTotalOdds < 100) {
//                 const newTotalOdds = ptwChoices.reduce((accumulator, currentChoice, i) => {
//                     return accumulator + ((i === index) ? parseInt(e.target.value) : currentChoice.odds)
//                 }, 0)
//                 if(newTotalOdds < 100) {
//                     const newPtwChoices = ptwChoices.map((choice, i) => (i === index) ? {choice: choice.choice, odds: parseInt(e.target.value)} : choice)
//                     setPtwChoices(newPtwChoices);
//                 }
//             }
//             break
//     }
// }
// function handleAddChoice() {
//     setPtwChoices(oldChoices => [...oldChoices, {choice: '', odds: 0}])
// }

// -----------------------------
// <AbstractOption heading={form.heading} bettingLine={form.bettingline!.toString()} subheading={form.subheading} type={form.optiontype}/>
// const AbstractOption = ({ heading, bettingLine, subheading, type }: {heading: string, bettingLine: string, subheading: string, type: 'ou' | 'hm' | 'ptw'}) => {
//     return (
//     <div className='block'>
//         <button className={` O/U H/M OPTION w-[100%] py-4 px-2 grid grid-cols-5 gap-2 drop-shadow-xl bg-gray-300 rounded-xl text-left`}>
//             <div className='IMAGE col-span-1 mx-auto my-auto'>
//                 <Image 
//                 src='/lepresident.png'
//                 className='rounded-full'
//                 alt=''
//                 height={80}
//                 width={80}/>
//             </div>
//             <div className='col-span-4 grid grid-rows-2 gap-1 items-center overflow-clip'>
//                 <div>
//                     <h1 className='text-3xl font-semibold'>{heading}</h1>
//                 </div>
//                 <div className='flex flex-row flex-wrap gap-4 items-center'>
//                     { (type === 'ou') && <div className='NUMBER font-semibold text-white bg-gray-700 px-3 py-1 rounded-lg'>
//                         <h1>{bettingLine}</h1>
//                     </div>}
//                     <p className='text-md'>{subheading}</p>
//                 </div>
//             </div>
//         </button>
//     </div>)
// }