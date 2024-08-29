import { fetchUserOptions } from "@/app/lib/data/getData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');
    try {
        const options = await fetchUserOptions(username || '');
        return NextResponse.json({ options })
    } catch (error) {
        return new Response(JSON.stringify(`Failed, ${error} `), { status: 501 })
        //throw new Error('Fetching from user bets API FAiled')
    }

}