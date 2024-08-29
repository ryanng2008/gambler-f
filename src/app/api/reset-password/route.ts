import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');
    const newpassword = searchParams.get('newpassword');
    const secretkey = searchParams.get('secretkey');
    if(secretkey !== 'nigga') {
        return { success: false, message: 'Invalid credentials'}
    }
    const hashedPassword = await bcrypt.hash(newpassword!, 10)
    try {
        const resetPassword = await sql`
            UPDATE users
            SET password = ${newpassword}
            WHERE username = ${username}
        `
        return { success: true, message: newpassword}
    } catch(error) {
        return { success: false, message: error}
    }
} 