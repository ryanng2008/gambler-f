'use client'
import { OptionType } from '@/app/lib/types'
import { PTWOptionItem } from '@/app/ui/me/optionItem'
import { PickTheWinnerOption } from '@/app/ui/subsection/option'


const Page = () => {
    const optionItem: OptionType = {
        id: 'skgfhkjhdfggf',
        optiontype: 'ptw',
        heading: 'Pick the Winner',
        subheading: 'To win the 2024 Phillippines presidential election',
        imagelink: '',
        choices: [
            {choice_name: 'John Kennedy', odds: 25},
            {choice_name: 'Alex Caruso', odds: 30},
            {choice_name: 'Josh Giddey', odds: 45},
        ],
        minbet: 5,
        maxbet: 100,
        odds: -1
    }
    async function handleCloseBet(optionid: string, winner: number) {
        return { success: false }
    }
    return (
        <div className='lg:grid grid-cols-2 flex flex-col gap-4'>
            <PTWOptionItem option={optionItem} onBetClose={handleCloseBet} />
        </div>
        // <div className='grid grid-cols-2 gap-6'>
        //     <PickTheWinnerOption open={true} onOpen={() => {}} optionItem={optionItem} balance={3.5} />
        //     <PickTheWinnerOption open={true} onOpen={() => {}} optionItem={optionItem} balance={3.5} />
        // </div>
    )
}


export default Page


