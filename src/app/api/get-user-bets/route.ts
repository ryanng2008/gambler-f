import { fetchUserBets, fetchUserBetsOptions } from "@/app/lib/data/getData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');
    try {
        const userBetsData = await fetchUserBets(username || '');
        if(userBetsData) {
            const userOptionsData = await fetchUserBetsOptions(username || '');
            return NextResponse.json({ 
                bets: userBetsData,
                options: userOptionsData
            })
        } else {
            throw new Error('User\'s bet data doesn\'t exist');
        }
    } catch (error) {
        return new Response(JSON.stringify(`Failed, ${error} `), { status: 501 })
        //throw new Error('Fetching from user bets API FAiled')
    }

}