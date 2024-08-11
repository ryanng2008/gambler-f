'use client'
import Option from '@/app/ui/subsection/option'
import { useState } from 'react'
import { options } from '@/app/mock-data/data'
import { OptionType } from '@/app/lib/types'
import { isNull } from 'util'

export default function OptionsGallery() {
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null) // 0 to represent none selected
    const noneSelected = (selectedOptionId === null);
    function handleOpen(optionId: string) {
        if(selectedOptionId === optionId) {
            setSelectedOptionId(null)
        } else {
            setSelectedOptionId(optionId)
        }
        
    }

    // TODO: Make the filter based on Selected
    const OptionsItems = options.map((option: OptionType) => {
        return (
            (noneSelected || selectedOptionId == option.id) 
                ? <Option 
                // visible={option.id === selected || selected === 0} 
                onOpen={handleOpen}
                open={selectedOptionId === option.id} 
                key={option.id}
                optionItem={option}
                /> 
                : <div></div>)

        
    })
    // u might have to pass to Option using context!
    return (
        <div className='OPTIONS GALLERY grid grid-cols-1 md:grid-cols-2 items-start gap-6 mx-6'>
            {OptionsItems}


        </div>


    )
}