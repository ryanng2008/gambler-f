import { OptionFormServer } from '@/app/lib/types';
import { sql } from '@vercel/postgres';

export async function POST(request: any) {
    try {
        const form: OptionFormServer = await request.json();
        // console.log(form)
        const insertedOption = await sql`
            INSERT INTO options (heading, subheading, optiontype, bettingline, imagelink, odds, minbet, maxbet, creator) 
            VALUES (${form.heading}, ${form.subheading}, ${form.optiontype}, ${form.bettingline}, ${form.imagelink}, ${form.odds}, ${form.minbet}, ${form.maxbet}, ${form.user})
            RETURNING id;
        `
        if(!insertedOption.rows[0]) {
            throw new Error('Failed to post option');
        }
        const ptwChoices: {choice: string, odds: number}[] = form.ptwchoices || [];
        const appendedChoices = await Promise.all(
            ptwChoices.map(choice => {
                sql`
                    UPDATE options
                    SET ptwchoices = ptwchoices || ARRAY[ROW(${choice.choice}, ${choice.odds})::choice_arr]
                    WHERE id = ${insertedOption.rows[0].id}
                `.then(result => {return result})
            })
        ).then(() => console.log('Finished appending choices'))
        
        return new Response(JSON.stringify({ insertedOption, appendedChoices }), { status: 201 });
    } catch (error) {
        console.error('Database Error: ', error);
        return new Response(JSON.stringify({ message: 'Failed to post option:', error}), { status: 500})
    }
}