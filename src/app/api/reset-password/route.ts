import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');
    const newpassword = searchParams.get('newpassword');
    const secretkey = searchParams.get('secretkey');
    if(secretkey !== 'nigga') {
        return NextResponse.json({ success: false, message: 'Invalid credentials'})
    }
    const hashedPassword = await bcrypt.hash(newpassword!, 10)
    try {
        const resetPassword = await sql`
            UPDATE users
            SET password = ${newpassword}
            WHERE username = ${username}
        `
        return NextResponse.json({ success: true, message: newpassword})
        //return new Response(JSON.stringify(`Success `), { status: 201 })
    } catch(error) {
        //return new Response(JSON.stringify(`Failed `), { status: 500 })

        return NextResponse.json({ success: false, message: error})
    }
} 