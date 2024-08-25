import { postOption } from '@/app/lib/data/setData'
import { OptionFormData } from '@/app/lib/types';
import { sql } from '@vercel/postgres';

export async function POST(request: any) {
    try {
        const form = await request.json();
        const insertedOption = await sql`
            INSERT INTO options (heading, subheading, optiontype, bettingline, imagelink, odds, minbet, maxbet) VALUES
                (${form.heading}, ${form.subheading}, ${form.optiontype}, ${form.bettingline}, ${form.imagelink}, ${form.odds}, ${form.minbet}, ${form.maxbet});
        `
        console.log('Finished posting option')
        return new Response(JSON.stringify(insertedOption), { status: 201 });
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failed to post option. Status: 500');
    }
}