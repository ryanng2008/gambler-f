import { fetchMarketSubsections, fetchSubsectionsObjects, fetchUserBets } from "@/app/lib/data/getData";
import { addBetToUser, addSubToMarket, postBet, postSubsection } from "@/app/lib/data/setData";
import { unstable_noStore } from "next/cache";


// export async function POST(request: any) {
//     try {
//         const form = await request.json();
//         // bettorUser: string, optionId: string, betAmount: number, payoutRate: number, side: 'o' | 'u' | 'h' | 'm',
//         const data = await postBet(form.username, form.optionid, form.betamount, form.payoutrate, form.side);
//         if(data && data.length > 0) {
//             const betId = data[0].id;
//             try {
//                 const appendToUser = await addBetToUser('yannick123', betId);
//                 return new Response(JSON.stringify(appendToUser), { status: 201 });
//             } catch (error) {
//                 return new Response(JSON.stringify(error), { status: 500 });
//             }

//         } else {
//             return new Response(JSON.stringify('Data does not exist'), { status: 401 });
//         }
//     } catch (error) {
//         console.error(error)
//         throw new Error('Error, IDK')
//     }
    
//     //const data = await fetchSubsectionsObjects('main');
//     //const data = await addSubToMarket('main', '696969');
//     //const data = await postSubsection('313314','Please Tell Me This Works 2', ['h2ey', 'h2i']);
    
//     //bettorUser: string, optionId: string, betAmount: number, payoutRate: number, side: 'o' | 'u' | 'h' | 'm',
//     //return Response.json(data);
// }

export async function GET() {
    unstable_noStore();
    try {
        const result = await fetchUserBets('yannick123');
        return Response.json(result);
    } catch (error) {
        return Response.json(error)
    }
}