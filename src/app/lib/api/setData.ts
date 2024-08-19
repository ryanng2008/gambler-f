import { sql } from '@vercel/postgres';

export async function postSubsection(code: string, name: string, options: string[]) {
    try {
        const insertedSubsection = await sql`
            INSERT INTO subsections (code, name, options)
            VALUES (${code}, ${name} ${``}::text[])
            ON CONFLICT (code) DO NOTHING;
        `;
        console.log('done posting')
        return insertedSubsection;

    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to post subsection.')
    }
}

export async function postOption(heading: string, desc: string, optiontype: string, bettingline: number, imagelink: string, odds=50, minbet=0, maxbet=0) {
    try {
        const insertedOption = await sql`
            INSERT INTO options (heading, subheading, optiontype, bettingline, imagelink, odds, minbet, maxbet) VALUES
                (${heading}, ${desc}, ${optiontype}, ${bettingline}, ${imagelink}, ${odds}, ${minbet}, ${maxbet});
        `
        console.log('Finished posting option')
        return insertedOption;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failed to post option.');
    }
}



// SAMPLE FOR text?
// --------------------------------------------------------------------------------

// async function insertOptions() {
//   const optionsArray = ['option1', 'option2', 'option3'];

//   const query = `
//     INSERT INTO your_table_name (your_text_array_column)
//     VALUES ($1::text[])
//   `;

//   const params = [optionsArray];
  
//   await sql.query(query, params);
// }

// async function insertOptions() {
//     const optionsArray = ['option1', 'option2', 'option3'];
  
//     await sql`INSERT INTO your_table_name (your_text_array_column) VALUES (${optionsArray})`;
//   }