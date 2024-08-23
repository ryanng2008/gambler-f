import jwt from 'jsonwebtoken';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

const secret = 'cardboard_academy_f1';

const generateToken = (user: any) => {
    return jwt.sign({ userId: user.id, username: user.username }, secret, {
      expiresIn: '1h',
    });
  };
  
export async function GET(request: NextRequest) {
    console.log('test')
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get('username');
    //const { usernameInput } = request.json();
    if (!username) {
        return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }
    try {
        const userCheck = await sql`
        SELECT EXISTS(SELECT 1 FROM users WHERE username = ${username}) 
    `
        const exists = userCheck.rows[0].exists;
        return NextResponse.json({ exists });
    } catch (error) {
        console.error('What? ', error)
    }
}

export async function GET_PASSWORD(request: any) {
    const { username, password } = request.body;
    const userQuery = await sql`
        SELECT * from users
        WHERE username = ${username}
        LIMIT 1;
    `;
    
    const userData = userQuery.rows[0]; // | userQuery.rows depending on what data looks like.
    if (userData && (await bcrypt.compare(password, userData.password))) {
        const token = generateToken(userData)
        return new Response(JSON.stringify(token), { status: 200 });
    } else {
        return new Response('Invalid Credentials', { status: 401 });
    }
}