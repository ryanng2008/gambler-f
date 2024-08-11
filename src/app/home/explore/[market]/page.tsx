import { markets } from '@/app/mock-data/data'
import Image from 'next/image'

export default function Page({ params }: { params: {market: string} }) {



    const market = markets.find(m => m.code == params.market) || {code: params.market, name: 'No Title'}
    return(
        <div className='flex flex-col gap-12'>
            <div>
                <h1 className='text-4xl font-semibold'>{market.name}</h1>
            </div>
            <div className='grid grid-cols-2 gap-6'>
                <div className='ONE ITEM bg-gray-300 drop-shadow-xl grid grid-cols-5 rounded-lg overflow-clip items-center'>
                    <div className='col-span-3 flex flex-col gap-2 py-6 pl-6'>
                        <h1 className='text-2xl font-bold'>Lakers vs Warriors</h1>
                        <div className='flex flex-row gap-4'>
                            <p>21 July</p>
                            <div className='w-px bg-[#000000]' />
                            <p>9:30 PM (+8)</p>
                        </div>
                    </div>
                    <div className='col-span-2 h-full'>
                        <img className='w-full h-full object-cover' src="https://www.jsonline.com/gcdn/-mm-/dfff082d1e4931b30569ae37195b6862a6a8ef8a/c=0-361-2915-2008/local/-/media/2018/05/22/USATODAY/USATODAY/636625868623447717-AP-APTOPIX-Heat-Bucks-Basketball-39255807.JPG"/>
                    </div>
                </div>
                <div className='ONE ITEM bg-gray-300 drop-shadow-xl grid grid-cols-3 rounded-lg px-6 py-2 items-center'>
                    <div className='col-span-2 flex flex-col gap-2 py-4'>
                        <h1 className='text-2xl font-bold'>Heat @ Bucks</h1>
                        <div className='flex flex-row gap-4 items-center'>
                            <p>21 July, 2021</p>
                            <div className='w-px h-[80%] bg-black' />
                            <p>9:30 PM (+8)</p>
                        </div>
                    </div>
                    <div className='col-span-1'>
                        <img src="https://www.jsonline.com/gcdn/-mm-/dfff082d1e4931b30569ae37195b6862a6a8ef8a/c=0-361-2915-2008/local/-/media/2018/05/22/USATODAY/USATODAY/636625868623447717-AP-APTOPIX-Heat-Bucks-Basketball-39255807.JPG"/>
                    </div>
                </div>
            </div>
        </div>
    )
}