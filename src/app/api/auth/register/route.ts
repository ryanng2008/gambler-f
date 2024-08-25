import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';

export async function POST(request: any) {
    const { username, password } = await request.json();
    //console.log(username)
    //console.log(password)
    try {
        if(password == null || username == null)
            return new Response(JSON.stringify({ error: 'Username or password is null' }), { status: 500 })
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds!
        const newAccount = await sql`
            INSERT INTO users (username, password)
            VALUES (${username}, ${hashedPassword})
            ON CONFLICT (username) DO NOTHING
            RETURNING *;
        `
        if (newAccount.rowCount === 0) {
            // No rows were inserted, which means there was a conflict
            return new Response(JSON.stringify({ error: 'Username already exists' }), { status: 409 });
        }
        
        return new Response(JSON.stringify(newAccount.rows[0]), { status: 201 });
    } catch (error) {
        console.error('Error registering a new account: ', error)
        //return new Response(JSON.stringify({ error: `Error registering a new account: ${error}`}), { status: 500 })
        throw new Error('Failed to post new account. Status: 500')
    }
}