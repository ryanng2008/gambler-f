import { fetchUser } from "@/app/lib/data/getData";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');
    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }
    try {
        const userObject = await fetchUser(username);
        return NextResponse.json(userObject);
    } catch (error) {
        console.error('Likely not logged in ', error)
        return NextResponse.json({ message: `Error from API route /user: ${error}`})
    }
}