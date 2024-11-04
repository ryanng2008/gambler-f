import { addBetToUser, postBet } from "@/app/lib/data/setData";


export async function POST(request: any) {
    try {
        const { bettorUser, optionId, betAmount, payoutRate, side } = await request.json();
        // bettorUser: string, optionId: string, betAmount: number, payoutRate: number, side: 'o' | 'u' | 'h' | 'm',
        const data = await postBet(bettorUser, optionId, betAmount, payoutRate, side);
        if(data === 0) {
            return new Response('No Money', { status: 409 })
        }
        if(data && data.length > 0) {
            const betId = data[0].id;
            try {
                const appendToUser = await addBetToUser(bettorUser, betId, betAmount);
                return new Response(JSON.stringify(appendToUser), { status: 201 });
            } catch (error) {
                return new Response(JSON.stringify(error), { status: 500 });
            }

        } else {
            return new Response(JSON.stringify('It failed for some reason'), { status: 401 });
        }
    } catch (error) {
        console.error(error)
        throw new Error('Error, IDK')
    }
}