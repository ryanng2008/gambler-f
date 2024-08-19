"use server";
import Link from 'next/link'
import { markets, subsections } from '../../../../trash/mock-data/data'
import { fetchMarket, fetchMarketSubsections, fetchSpecOptions, fetchSubsectionsObjects } from '@/app/lib/api/getData'
import { unstable_noStore as noStore } from 'next/cache';


export default async function SubsectionGallery({ marketCode }: { marketCode: string }) {
    noStore();
    const marketObject = await fetchMarket(marketCode);
    //console.log(`done fetching market ${marketCode}`)
    //console.log(marketObject)
    const subsectionCodes = await fetchMarketSubsections(marketCode); // this is working
    const subsectionObjects = await fetchSubsectionsObjects(subsectionCodes); // this is ad hoc with multiple queries
    
    const subItems = subsectionObjects.map((subsectionObject) => { // maybe u can move the fetches into here.
        return (
            <Link key={subsectionObject.code} href={`/home/explore/${marketCode}/${subsectionObject.code}`} className='ONE ITEM bg-gray-300 drop-shadow-xl grid grid-cols-5 rounded-lg overflow-clip items-center'>
                    <div className='col-span-3 flex flex-col gap-2 py-6 pl-6'>
                        <h1 className='text-2xl font-semibold'>{subsectionObject?.name}</h1>
                        <div className='flex flex-row gap-4'>
                            <p>{subsectionObject?.date || 'No Date'}</p>
                            <div className='w-px bg-[#000000]' />
                            <p>{subsectionObject?.time || 'No Time'} (+8)</p>
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
                <h1 className='text-4xl font-semibold'>{marketObject.name}</h1> 
            </div>
            <div className='grid grid-cols-2 gap-6'>
                {subItems}
            </div>
        </div>
    )    
}


    //const subsectionItems = subsectionCodes.map((subsectionCode: string) => {
    //    const subsectionObject = subsections.find(s => s.code == subsectionCode);
    //    return (
    //        <Link key={subsectionCode} href={`/home/explore/${marketCode}/${subsectionCode}`} className='ONE ITEM bg-gray-300 drop-shadow-xl grid grid-cols-5 rounded-lg overflow-clip items-center'>
    //                <div className='col-span-3 flex flex-col gap-2 py-6 pl-6'>
    //                    <h1 className='text-2xl font-bold'>{subsectionObject?.name}</h1>
    //                    <div className='flex flex-row gap-4'>
    //                        <p>{subsectionObject?.date}</p>
    //                        <div className='w-px bg-[#000000]' />
    //                        <p>{subsectionObject?.time} (+8)</p>
    //                    </div>
    //                </div>
    //                <div className='col-span-2 h-full'>
    //                    <img className='w-full h-full object-cover' alt='' src="https://www.jsonline.com/gcdn/-mm-/dfff082d1e4931b30569ae37195b6862a6a8ef8a/c=0-361-2915-2008/local/-/media/2018/05/22/USATODAY/USATODAY/636625868623447717-AP-APTOPIX-Heat-Bucks-Basketball-39255807.JPG"/>
    //                </div>
    //            </Link>
    //    )
    //})