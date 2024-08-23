import bcrypt from 'bcrypt';
import { sql } from '@vercel/postgres';

export default async function POST(request: any) {
    const { username, password } = request.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds!
        const newAccount = await sql`
            INSERT INTO users (username, password)
            VALUES (${username}, ${hashedPassword})
            ON CONFLICT (username) DO NOTHING;
        `
        return new Response(JSON.stringify(newAccount), { status: 201 });
    } catch (error) {
        console.error('Error registering a new account: ', error)
        throw new Error('Failed to post new account. Status: 500')
    }
}