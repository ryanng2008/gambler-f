'use client'
import Option from '@/app/ui/subsection/option'
import { useState } from 'react'
import { options } from '@/app/mock-data/data'
import { OptionType } from '@/app/lib/types'

export default function OptionsGallery() {
    const [selected, setSelected] = useState<string | 0>(0) // 0 to represent none selected
    function handleOpen(optionId: string) {
        if(selected === optionId) {
            setSelected(0)
        } else {
            setSelected(optionId)
        }
        
    }

    // TODO: Make the filter based on Selected
    const OptionsItems = options.map((option: OptionType) => {
        return (
        <Option 
            visible={option.id === selected || selected === 0} 
            onOpen={handleOpen}
            open={selected === option.id} 
            key={option.id}
            optionItem={option}
            />
        )
    })
    // u might have to pass to Option using context!
    return (
        <div className='OPTIONS GALLERY grid grid-cols-1 md:grid-cols-2 items-start gap-6 mx-6'>
            {OptionsItems}


        </div>


    )
}