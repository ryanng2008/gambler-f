
import OptionsGallery from '@/app/ui/subsection/optionsGallery'

export default function Page({ params }: { params: {subsection: string} }) {


    // show a galelry of bets
    return (
    <div className="flex flex-col gap-6">
        <div className='HEAD'>
            <h1 className='text-5xl font-semibold'>View options</h1>
        </div>
        <div className='ACTIONBAR bg-gray-500 py-2 text-white'>
            <p>testing</p>
        </div>
        <div>
            <OptionsGallery />
        </div>
    </div>)
}