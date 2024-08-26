import { sql } from '@vercel/postgres';

export async function fetchOptions() {
    try {
        const data = await sql`SELECT * FROM options`;
        console.log('fetch all options completed')
        return data.rows;
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to fetch options data.');
    }
}


// THIS DOESNT WORK
export async function fetchSpecOptions(optionIds: string[]) { // fetch all options from these optionIds
    try {
        const data = await Promise.all(
            optionIds.map(async (optionId) => {
                const optionObject = await sql`
                    SELECT * from options
                    WHERE id = ${optionId};
                    `
                console.log(`Finished fetching option ${optionId}`)
                //console.log(optionObject.rows)
                return optionObject.rows[0];
            })
        )
        return data;
    } catch (error) {
        console.error('Database fetch options from id array error: ', error);
        throw new Error(`Failed to fetch options from ${optionIds}`); 
    }
    //try {
    //    const idString = optionIds.map(id => `'${id}'`).join(',');
    //    const data = await sql`
    //        SELECT * FROM options
    //        WHERE id in (${idString}); 
    //    ` // just use ${optionIds} if it works, to shut up the ts linter
    //    return data.rows;
    //} catch (error) {
    //    console.error('Database error when fetching options from optionIds array', error);
    //    throw new Error('Failed to fetch specific options data.')
    //}
}

export async function fetchOption(optionId: string) {

}

export async function fetchUsers() {
    try {
        const data = await sql`SELECT * FROM users`;
        console.log('fetch all users completed')
        return data.rows;
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to fetch users data.');
    }
}

export async function fetchUserId(id: string) { // fetch one user row from its id

}

export async function fetchUser(username: string) {
    console.log('we touched this')
    try {
        const data = await sql`
            SELECT * FROM users
            WHERE username = ${username}
        `
        console.log(`fetching user ${username} completed`)
        console.log(data.rows[0])
        return data.rows[0];
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error(`Failed to fetch user data using username ${username}.`);
    }
}

export async function fetchBets() {
    try {
        const data = await sql`SELECT * FROM bets`;
        console.log('fetch all bets completed')
        return data.rows;
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to fetch bets data.');
    }
}

export async function fetchSpecBets(ids: string[]) {

}

export async function fetchBet(id: string) {

}

export async function fetchMarkets() {
    try {
        //const initial = await sql`DELETE FROM markets WHERE code = 'main';`
        const data = await sql`SELECT * FROM markets`;
        console.log('fetch all markets COMPLETED')
        //console.log(data.rows)
        return data.rows;
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to fetch markets data.');
    }
}

export async function fetchMarketSubsections(marketCode: string) {
    try {
        const data = await sql`
            SELECT subsections::text[] from markets
            WHERE code = ${marketCode};
        `
        console.log('fetch market subsections COMPLETED')
        //console.log(data.rows)
        return data.rows[0].subsections;
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to fetch market subsections data.');
    }
}
export async function fetchMarket(code: string) {
    try {
        const data = await sql`
            SELECT * FROM markets
            WHERE code = ${code};
        `
        console.log('fetch market with code completed')
        return data.rows[0];
    } catch (error) {
        console.error('Database Market Fetch Error', error)
        throw new Error(`Failed to fetch specific Market data of code ${code}`)
    }
}

export async function fetchSubsectionsObjects(marketCode: string) { // Currently ad hoc method with lots of fetches, very inefficient. Need to find way to fix the template literal reading of sql function
    try {
        const bulkData = await sql`
            SELECT * from subsections
            WHERE code = ANY (
                SELECT unnest(subsections)
                FROM markets
                WHERE code = ${marketCode}
            )
        `
        console.log('Fetching subsections from codes completed.');
        return bulkData.rows;
    } catch (error) {
        console.error('Database fetch subsections from marketCode error: ', error);
        throw new Error(`Failed to fetch subsections from ${marketCode}`); 
        //return Response.json({ message: error })
    }
}

export async function fetchSubsection(code: string) {
    try {
        const data = await sql`
        SELECT * from subsections
        WHERE code = ${code};
        `
        console.log(`Finished fetching subsection ${code}`)
        //console.log(data.rows)
        return data.rows[0];
    }   catch (error) {
        console.error('Database fetch subsection from code error: ', error);
        throw new Error(`Failed to fetch subsections from ${code}`); 
    }
}