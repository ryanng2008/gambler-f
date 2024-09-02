import { sql } from "@vercel/postgres";

export async function resolveOptions(username: string, optionid: string, outcome: 'o' | 'u' | 'h' | 'm', secretkey: string) {
    if(secretkey !== 'nigga') {
        return { success: false, message: 'Invalid secret key'}
    }
    // Step 1: Locate Option, make sure username matches
    try {
        const optionData = await sql`
            SELECT * 
            FROM options
            WHERE id = ${optionid} AND creator = ${username}
        `
        if(optionData.rows.length < 1) {
            throw new Error('This option does not exist, or the user does not have credentials to resolve it.')
        }
        const betsData = await sql`
            SELECT * 
            FROM bets
            WHERE optionid = ${optionid}
        `
        const sides = (optionData.rows[0].optiontype === 'hm') ? ['h', 'm'] : ['o', 'u'];
        const failedBets: any[] = [];
        betsData.rows.forEach(async (bet) => {
            if(bet.side === outcome && sides.includes(outcome)) { // second check j to be safe ig
                const totalReturn = bet.betamount * (bet.payoutrate + 1);
                const resolveAdd = await sql`
                    UPDATE users
                    SET balance = balance + ${totalReturn}, 
                        escrow = escrow - ${bet.betamount} 
                    WHERE username = ${bet.bettoruser}
                `
                if(resolveAdd) {
                    console.log(`made ${bet} transaction`)
                    const markAsResolved = await sql`
                        UPDATE bets 
                        SET active = false
                        WHERE id = ${bet.id}
                    `
                    const manageEscrow = await sql`
                        UPDATE users
                        SET balance = balance + CASE WHEN escrow < 0 THEN escrow ELSE 0 END,
                            escrow = CASE WHEN escrow < 0 THEN 0 ELSE escrow END
                        WHERE username = ${bet.bettoruser}
                    `
                    // prolly dont need handling
                } else {
                    console.log(`failed to make ${bet} transaction`)
                    failedBets.push(bet)
                }
                
                // logic to add his money
            } else if(sides.includes(bet.side)) {
                const resolveDeduct = await sql`
                    UPDATE users
                    SET escrow = escrow - ${bet.betamount}
                    WHERE username = ${bet.bettoruser}
                `
                if(!resolveDeduct) {
                    failedBets.push(bet)
                }
                // logic to remove money
                // if it's in but isn't equal to outcome, then must be  -- then deduct money from escrow balance
                // need to do a check, if it's OU must only compare O and U
            } else {
                failedBets.push(bet);
            }
            // Make some handling for creating a new row in resolvedBets
        })
        
        const markAsClosed = await sql`
            UPDATE options
            SET closed = true
            WHERE id = ${optionid} AND creator = ${username};
        `


        return { success: true, message: 'the forEach is done', failedBets: failedBets}

    } catch(error) {
        console.error(error)
        return { success: false, message: 'Error in resolving the option'}
        throw new Error('Error in resolving the option... idk')
    }

    // Retrieve the bets on that option ID

    // run For loop - check which side, then adjust users money based on it

    // need some sort of logging system - maybe make resolvedBets table
}