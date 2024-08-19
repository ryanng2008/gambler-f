import { fetchMarket, fetchSubsectionsObjects } from '@/app/lib/api/getData'
//import Image from 'next/image'
import SubsectionGallery from '@/app/ui/market/subsectionGallery';

export default async function Page({ params }: { params: {market: string} }) {
    //const market2 = await fetchMarket(params.market);
    //console.log(market2);
    //const subsections2 = await fetchSpecSubsections();

    //const market = markets.find(m => m.code == params.market) || {code: params.market, name: 'No Title', subsections: []}
    return (
        <SubsectionGallery marketCode={params.market} />
    )
    
}