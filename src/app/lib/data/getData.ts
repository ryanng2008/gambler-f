import { sql } from '@vercel/postgres';

export async function fetchOptions() {
    try {
        const data = await sql`
        SELECT *, array_to_json(ptwchoices) AS choices
        FROM options 
        WHERE closed = false`;
        console.log('fetch all options completed')
        return data.rows;
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to fetch options data.');
    }
}




// THIS DOESNT WORK EFFICIENTLY - use internal variable method like before!
export async function fetchSpecOptions(optionIds: string[]) { // fetch all options from these optionIds
    try {
        const data = await Promise.all(
            optionIds.map((optionId) => {
                const optionObject = sql`
                    SELECT * from options
                    WHERE id = ${optionId};
                    `.then(optionObject => {
                        console.log(`Finished fetching option ${optionId}`);
                        return optionObject.rows[0];
                    })
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

export async function fetchSubsectionOptions(subsectionCode: string) {
    try {
        const bulkData = await sql`
            SELECT * from options
            WHERE code = ANY (
                SELECT unnest(options)
                FROM subsections
                WHERE code = ${subsectionCode}
            )
        `
        console.log('Fetching subsections from codes completed.');
        return bulkData.rows;
    } catch (error) {
        console.error('Database fetch subsections from marketCode error: ', error);
        return [];
        // throw new Error(`Failed to fetch subsections from ${marketCode}`); 
        //return Response.json({ message: error })
    }
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
    //console.log('we touched this')
    try {
        const data = await sql`
            SELECT * FROM users
            WHERE username = ${username}
        `
        //console.log(`fetching user ${username} completed`)
        //console.log(data.rows[0])
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
            SELECT subsections from markets
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

export async function fetchUserBets(username: string) {
    try {
        const data = await sql`
        SELECT * 
        FROM bets
        WHERE id::text = ANY (
            SELECT unnest(bets) 
            FROM users
            WHERE username = ${username}
            )
        ORDER BY created_at DESC;
        ` //AND active = true
        const verifiedBets = data.rows.filter((bet) => bet.bettoruser === username);
        console.log(verifiedBets)
        return verifiedBets;
    } catch(error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to fetch bets of a user')
    }
}

export async function fetchUserBetsOptions(username: string) {
    try {
        const data = await sql`
        SELECT *, array_to_json(ptwchoices) AS choices
        from options
        WHERE id::text = ANY (
            SELECT optionid 
            FROM bets
            WHERE id::text = ANY (
                SELECT unnest(bets) 
                FROM users
                WHERE username = ${username}
            )
        )
        `
        return data.rows;
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Failed to fetch options of a user\'s bets')
    }
}

export async function fetchUserOptions(username: string) {
    try {
        const data = await sql`
        SELECT *, array_to_json(ptwchoices) AS choices
        FROM options
        WHERE creator = ${username}
        AND closed = false;
        `
        return data.rows
    } catch(error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch user\'s options')
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
        return {}
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
        return [];
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