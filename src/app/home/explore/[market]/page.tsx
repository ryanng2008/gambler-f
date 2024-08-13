import { markets, subsections } from '@/app/mock-data/data'
import Image from 'next/image'
import Link from 'next/link'

export default function Page({ params }: { params: {market: string} }) {

    const market = markets.find(m => m.code == params.market) || {code: params.market, name: 'No Title', subsections: []}
    const subsectionItems = market.subsections.map((subsectionCode) => {
        const subsectionObject = subsections.find(s => s.code == subsectionCode);
        return (
            <Link key={subsectionCode} href={`/home/explore/${params.market}/${subsectionCode}`} className='ONE ITEM bg-gray-300 drop-shadow-xl grid grid-cols-5 rounded-lg overflow-clip items-center'>
                    <div className='col-span-3 flex flex-col gap-2 py-6 pl-6'>
                        <h1 className='text-2xl font-bold'>{subsectionObject?.name}</h1>
                        <div className='flex flex-row gap-4'>
                            <p>{subsectionObject?.details.date}</p>
                            <div className='w-px bg-[#000000]' />
                            <p>{subsectionObject?.details.time} (+8)</p>
                        </div>
                    </div>
                    <div className='col-span-2 h-full'>
                        <img className='w-full h-full object-cover' alt='' src="https://www.jsonline.com/gcdn/-mm-/dfff082d1e4931b30569ae37195b6862a6a8ef8a/c=0-361-2915-2008/local/-/media/2018/05/22/USATODAY/USATODAY/636625868623447717-AP-APTOPIX-Heat-Bucks-Basketball-39255807.JPG"/>
                    </div>
                </Link>
        )
    })
    return(
        <div className='flex flex-col gap-12'>
            <div>
                <h1 className='text-4xl font-semibold'>{market.name}</h1>
            </div>
            <div className='grid grid-cols-2 gap-6'>
                {subsectionItems}
            </div>
        </div>
    )
}