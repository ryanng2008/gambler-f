import { sql } from '@vercel/postgres';
import { QueryResult } from '@vercel/postgres';

export async function postSubsection(code: string, name: string, options: string[]) {
    try {
        const insertedSubsection = await sql`
            INSERT INTO subsections (code, name, options)
            VALUES (${code}, ${name}, ARRAY[${options[0]}])
            ON CONFLICT (code) DO NOTHING;
        `;
        console.log('done posting')
        return insertedSubsection;
        // WHEN IMPLEMENTING: (return_value).rowCount < 1 ? Failed to insert (potentially already exists)

    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to post subsection.')
    }
}
export async function addSubToMarket(marketCode: string, subsectionCode: string) {
    try {
        const addedSub = await sql`
            UPDATE markets
            SET subsections = array_append(subsections, ${subsectionCode})
            WHERE code = ${marketCode};
        `
        console.log(`Added subsection ${subsectionCode} to market ${marketCode}.`)
        return addedSub;
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error(`Failed to add subsection to market.`)
    }
}

export async function postOption(heading: string, subheading: string, optiontype: string, bettingline: number, imagelink: string, odds=50, minbet=0, maxbet=0) {
    try {
        const insertedOption = await sql`
            INSERT INTO options (heading, subheading, optiontype, bettingline, imagelink, odds, minbet, maxbet) VALUES
                (${heading}, ${subheading}, ${optiontype}, ${bettingline}, ${imagelink}, ${odds}, ${minbet}, ${maxbet});
        `
        console.log('Finished posting option')
        return insertedOption;
    } catch (error) {
        console.error('Database Error: ', error);
        throw new Error('Failed to post option.');
    }
}

export async function postBet(bettorUser: string, optionId: string, betAmount: number, payoutRate: number, side: 'o' | 'u' | 'h' | 'm',) {
    try {
        const postedBet = await sql`
            INSERT INTO bets (bettoruser, optionid, betamount, payoutrate, side) VALUES
            (${bettorUser}, ${optionId}, ${betAmount}, ${payoutRate}, ${side})
            RETURNING *;
        `
        console.log(`Posted bet from ${optionId} by ${bettorUser}`)
        return postedBet.rows;
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error(`Failed to add subsection to market.`)
    }
}

export async function addBetToUser(username: string, betId: string, betAmount: number) {
    try {
        const addedBet = await sql`
            UPDATE users
            SET bets = array_append(bets, ${betId}),
                balance = COALESCE(balance, 0) - ${betAmount},
                escrow = COALESCE(escrow, 0) + ${betAmount}
            WHERE username = ${username};
        `
        console.log(`Added bet ${betId} to user ${username}.`)
        return addedBet;
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error(`Failed to add subsection to market.`)
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