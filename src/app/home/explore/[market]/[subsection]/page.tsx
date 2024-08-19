'use server';
import { postSubsection } from '@/app/lib/api/setData';
import OptionsGalleryWrapper from '@/app/ui/subsection/optionsGalleryWrapper';
import { unstable_noStore } from 'next/cache';

export default async function Page({ params }: { params: {subsection: string} }) {
    unstable_noStore();
    // show a galelry of bets
    return (
    <div className="flex flex-col gap-12"> {/* gap-6 */} 
    {/* Add the title of subsection */}
        <div className='HEAD'>
            <h1 className='text-5xl font-semibold'>View options</h1>
            <h1 className='text-large font-normal'></h1>
        </div>
        {/* <div className='ACTIONBAR bg-gray-500 py-2 text-white'>
            <p>testing</p>
        </div> */}
        <div>
            <OptionsGalleryWrapper
            subsectionCode={params.subsection}
            />
        </div>
    </div>)
}