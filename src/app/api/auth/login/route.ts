import jwt from 'jsonwebtoken';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { getUTCDateTime } from '@/app/lib/utils';
//import { NextRequest, NextResponse } from 'next/server';

const secret = 'cardboard_academy_f1';

const generateToken = (user: any) => {
    return jwt.sign({ userId: user.id, username: user.username }, secret, {
      expiresIn: '1h',
    });
  };
  
//export async function oldGetblblbl(request: NextRequest) {
//    console.log('test')
//    const searchParams = request.nextUrl.searchParams;
//    const username = searchParams.get('username');
//    //const { usernameInput } = request.json();
//    if (!username) {
//        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
//    }
//    try {
//        const userCheck = await sql`
//        SELECT EXISTS(SELECT 1 FROM users WHERE username = ${username}) 
//    `
//        const exists = userCheck.rows[0].exists;
//        return NextResponse.json({ exists });
//    } catch (error) {
//        console.error('What? ', error)
//    }
//}



export async function POST(request: any) {
    const { username, password } = await request.json();
    const userQuery = await sql`
        SELECT * from users
        WHERE username = ${username}
        LIMIT 1;
    ` 
    const userData = userQuery.rows[0]; // | userQuery.rows depending on what data looks like.
    if (userData && (await bcrypt.compare(password, userData.password))) {
        const currentTime = getUTCDateTime();
        try  {
            const loginUpdate = await sql`
            UPDATE users
            SET lastlogin = ${currentTime}
            WHERE username = ${username}
            `
        } catch (error) {
            return new Response(JSON.stringify('Login success - but failed to update last login'), { status: 200 })
        }
        //const token = generateToken(userData)
        return new Response(JSON.stringify('Login success'), { status: 200 }); //JSON.stringify(token)
    } else {
        return new Response(JSON.stringify('Invalid Credentials'), { status: 401 });
    }
}