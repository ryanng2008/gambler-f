'use client';
import { RegularOption, PickTheWinnerOption } from '@/app/ui/subsection/option'
import { useEffect, useState } from 'react'
//import { options, subsections } from '../../../../trash/mock-data/data'
import { OptionType } from '@/app/lib/types'
import { fetchUserBalance } from '@/app/lib/api';
import { useAuth } from '@/app/context/authContext';


export default function OptionsGalleryClient({ optionsData } : { optionsData: OptionType[] /*Should be OptionsType[] when fixed*/}) { 
    /* { subsectionCode="none",  }: {subsectionCode: string } */
    //const subsection = await fetchSubsection(subsectionCode); //subsections.find(s => s.code === subsectionCode);
    //const subsectionOptionsIds = subsection?.options;
    const { user } = useAuth();
    const [balance, setBalance] = useState<number | null>(null); // maybe merge this in the future, into another context variable
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const noneSelected = (selectedOptionId === null);
    function handleOpen(optionId: string) {
        setSelectedOptionId(prevId => prevId === optionId ? null : optionId);
    }
    async function fetchBalance(username: string) {
        try {
            const balanceData = await fetchUserBalance(username);
            setBalance(balanceData || null);
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        console.log('fetch balance')
        fetchBalance(user);
    }, [user])
    //const optionsData = options.filter(option => subsectionOptionsIds?.includes(option.id))

    const leftOptionsItems: React.ReactNode[] = [];
    const rightOptionsItems: React.ReactNode[]  = [];
    optionsData.forEach((option: OptionType, index: number) => {
        const optionItem = (
            (noneSelected || selectedOptionId == option.id) 
            ? (
                (option.optiontype === 'ptw') 
                ? <PickTheWinnerOption 
                open={selectedOptionId === option.id}
                onOpen={handleOpen}
                optionItem={option}
                key={option.id}
                balance={balance || 0}
                />
                : <RegularOption 
                onOpen={handleOpen}
                open={selectedOptionId === option.id} 
                key={option.id}
                optionItem={option}
                balance={balance || 0}
                type={option.optiontype}
                /> 
            )
            : <div key={option.id} className='O/U H/M OPTION py-4 px-2 grid grid-cols-5 gap-2 drop-shadow-xl bg-gray-300 rounded-xl text-left h-[112px]'/>)
        if(index % 2 === 0) {
            leftOptionsItems.push(optionItem)
        } else {
            rightOptionsItems.push(optionItem)
        }
    })
    return (
        <div className='OPTIONS GALLERY lg:grid grid-cols-2 flex flex-col gap-6 mx-6'>
            {/* {optionsItems} */}
            <div className='LEFT flex flex-col gap-6'>
                {leftOptionsItems}
            </div>
            <div className='RIGHT flex flex-col gap-6'>
                {rightOptionsItems}
            </div>
        </div>


    )
}

 // const optionsItems = optionsData.map((option: OptionType) => {
    //     return (
    //         (noneSelected || selectedOptionId == option.id) 
    //             ? <Option 
    //             // visible={option.id === selected || selected === 0} 
    //             onOpen={handleOpen}
    //             open={selectedOptionId === option.id} 
    //             key={option.id}
    //             optionItem={option}
    //             /> 
    //             : <div className='O/U H/M OPTION py-4 px-2 grid grid-cols-5 gap-2 drop-shadow-xl bg-gray-300 rounded-xl text-left'>
    //             <div className='IMAGE col-span-1 mx-auto my-auto h-[80px]'>
    //                 <Image 
    //                 src='/lepresident.png'
    //                 className='rounded-full'
    //                 alt=''
    //                 height={80}
    //                 width={80}/>
    //             </div>
                
    //               </div>)

        
    // })
    // u might have to pass to Option using context!