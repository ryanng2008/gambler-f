"use server";
import clsx from 'clsx'
//import { markets }  from '@/app/mock-data/data'
import Link from 'next/link'
import { fetchMarkets } from '@/app/lib/data/getData';
import { unstable_noStore as noStore } from 'next/cache';


export default async function MarketGallery() {
    noStore();
    const markets = await fetchMarkets();
    //console.log(markets)
    return (
        <div className='GALLERY mx-4 grid grid-cols-3 gap-6 my-2'>
        {markets.map((market) => {
          return (
            <Link key={market.code} href={`/home/explore/${market.code}`} className='bg-gradient-to-br from-gray-100 to-gray-300 ONE BOX  py-6 justify-center px-6 outline outline-2 outline-graydark drop-shadow-lg rounded-md flex flex-wrap flex-col gap-2'>
              <h1 className={clsx(
                'font-semibold break-all ',
                {
                  'text-4xl': market.name.length <= 10,
                  'text-3xl': market.name.length > 10 && market.name.length <= 20, 
                  'text-2xl': market.name.length > 20
                })}>
              {market.name}
              </h1>
              <p className='text-sm'>Some number of options</p> 
              {/* {market.options.toLocaleString()} */}
            </Link>
          )
        })}
        
      </div>
    )
}