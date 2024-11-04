"use server";
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import MarketGallery from '@/app/ui/explore/marketGallery';

export default async function Page() {

  return (
    <div className='CONTAINER flex flex-col gap-8'>
      <div className='HEAD'>
        <h1 className='text-5xl font-semibold'>Browse markets</h1>
      </div>
      {/* <div className='ACTIONBAR flex flex-row justify-between mx-6'>
        <div className='VIEW py-2 px-4 rounded-xl bg-graydark text-whitebkg flex flex-row items-center gap-4 drop-shadow-xl'>
          <p className='text-md '>View mode</p>
          <ChevronDownIcon height={16}/>
        </div>
        <div>
          <MagnifyingGlassIcon height={48} />
        </div>
      </div> */}
      <MarketGallery />
    </div>
  )
}
