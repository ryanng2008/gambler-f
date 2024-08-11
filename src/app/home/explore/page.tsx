import React from 'react'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { markets } from '@/app/mock-data/data'
import Link from 'next/link'

function Page() {
  return (
    <div className='CONTAINER flex flex-col gap-8'>
      <div className='HEAD'>
        <h1 className='text-5xl font-semibold'>Browse markets</h1>
      </div>
      <div className='ACTIONBAR flex flex-row justify-between mx-6'>
        <div className='VIEW py-2 px-4 rounded-xl bg-graydark text-whitebkg flex flex-row items-center gap-4 drop-shadow-xl'>
          <p className='text-md '>View mode</p>
          <ChevronDownIcon height={16}/>
        </div>
        <div>
          <MagnifyingGlassIcon height={48} />
        </div>
      </div>
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
              <p className='text-sm'>{market.options.toLocaleString()} options</p>
            </Link>
          )
        })}
        
      </div>
    </div>
  )
}

export default Page