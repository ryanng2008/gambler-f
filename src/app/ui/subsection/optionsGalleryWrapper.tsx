'use server';
import { fetchOptions, fetchSpecOptions, fetchSubsection } from '@/app/lib/data/getData';
import OptionsGalleryClient from './optionsGalleryClient'; 
import { unstable_noStore as noStore } from 'next/cache';
import { OptionType } from '@/app/lib/types';
import { QueryResultRow } from '@vercel/postgres';

export default async function OptionsGalleryWrapper({ subsectionCode }: { subsectionCode: string}) {
    noStore();
    //const subsection = await fetchSubsection(subsectionCode);
    //const subsectionOptionIds = subsection?.options;
    //console.log(subsectionOptionIds)
    //console.log('SUBSECTION OPTION IDs')
    //const optionsData: any = await fetchSpecOptions(subsectionOptionIds);
    const optionsData: QueryResultRow[] = await fetchOptions();

    return (
        <OptionsGalleryClient optionsData={optionsData} />
    )
}
