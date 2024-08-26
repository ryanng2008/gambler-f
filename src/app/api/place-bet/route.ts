import { addBetToUser, postBet } from "@/app/lib/data/setData";


export async function POST(request: any) {
    try {
        const { bettorUser, optionId, betAmount, payoutRate, side } = await request.json();
        // bettorUser: string, optionId: string, betAmount: number, payoutRate: number, side: 'o' | 'u' | 'h' | 'm',
        const data = await postBet(bettorUser, optionId, betAmount, payoutRate, side);
        if(data && data.length > 0) {
            const betId = data[0].id;
            try {
                const appendToUser = await addBetToUser('yannick123', betId);
                return new Response(JSON.stringify(appendToUser), { status: 201 });
            } catch (error) {
                return new Response(JSON.stringify(error), { status: 500 });
            }

        } else {
            return new Response(JSON.stringify('Data does not exist'), { status: 401 });
        }
    } catch (error) {
        console.error(error)
        throw new Error('Error, IDK')
    }
}