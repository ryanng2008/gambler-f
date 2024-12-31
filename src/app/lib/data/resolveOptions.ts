import { sql } from "@vercel/postgres";

export async function resolveOption(username: string, optionid: string, outcome: 'o' | 'u' | 'h' | 'm', secretkey: string) {
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
            return { success: false, message: 'Invalid credentials to resolve this option'}
            // throw new Error('This option does not exist, or the user does not have credentials to resolve it.')
        }
        if(['hm', 'ou'].includes(optionData.rows[0].optiontype)) {
            return { success: false, message: 'This is not Over/Under or Hit/Miss option'}
        }
        const sides = (optionData.rows[0].optiontype === 'hm') ? ['h', 'm'] : ['o', 'u'];
        const betsData = await sql`
            SELECT * 
            FROM bets
            WHERE optionid = ${optionid}
        `
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
                        SET active = false,
                            result = 'w'
                        WHERE id = ${bet.id}
                    `
                    // prolly dont need handling
                } else {
                    console.log(`failed to make ${bet} transaction`)
                    failedBets.push(bet)
                }
                
                // logic to add his money
            } else if(sides.includes(bet.side)) { // why is this if? --> if it's in but isn't equal to outcome, then must be  --
                const resolveDeduct = await sql`
                    UPDATE users
                    SET escrow = escrow - ${bet.betamount}
                    WHERE username = ${bet.bettoruser}
                `
                if(resolveDeduct) {
                    console.log(`made ${bet} transaction`)
                    const markAsResolved = await sql`
                        UPDATE bets 
                        SET active = false,
                            result = 'l'
                        WHERE id = ${bet.id}
                    `
                    // prolly dont need handling
                } else {
                    console.log(`failed to make ${bet} transaction`)
                    failedBets.push(bet)
                }
                // logic to remove money
                // if it's in but isn't equal to outcome, then must be  -- then deduct money from escrow balance
                // need to do a check, if it's OU must only compare O and U
            } else {
                failedBets.push(bet);
            }
            const manageEscrow = await sql`
                        UPDATE users
                        SET balance = balance + CASE WHEN escrow < 0 THEN escrow ELSE 0 END,
                            escrow = CASE WHEN escrow < 0 THEN 0 ELSE escrow END
                        WHERE username = ${bet.bettoruser}
                    ` // this is to fix negative escrows
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
    }

    // Retrieve the bets on that option ID
    // run For loop - check which side, then adjust users money based on it
    // need some sort of logging system - maybe make resolvedBets table
}

export async function resolvePTWOption(username: string, optionid: string, outcome: number, secretkey: string) {
    if(secretkey !== 'nigga') {
        return { success: false, message: 'Invalid secret key'}
    } 
    try {
        // content here2
        const optionData = await sql`
            SELECT * 
            FROM options
            WHERE id = ${optionid} AND creator = ${username}
        `
        if(optionData.rows.length < 1) {
            return { success: false, message: 'Invalid credentials to resolve this option'}
        }
        if(optionData.rows[0].optiontype !== 'ptw') {
            return { success: false, message: 'This is not a Pick The Winner option'}
        }
        const betsData = await sql`
            SELECT * 
            FROM bets
            WHERE optionid = ${optionid}
        `
        const failedBets: any[] = [];
        betsData.rows.forEach(async (bet) => {
            if(!Number.isInteger(bet.winner)) {
                failedBets.push(bet)
                return
            }
            if(bet.winner === outcome) {
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
                        SET active = false,
                            result = 'w'
                        WHERE id = ${bet.id}
                    `
                } else {
                    console.log(`failed to make ${bet} transaction`)
                    failedBets.push(bet)
                }
                
                // logic to add his money
            } else {
                const resolveDeduct = await sql`
                    UPDATE users
                    SET escrow = escrow - ${bet.betamount}
                    WHERE username = ${bet.bettoruser}
                `
                if(resolveDeduct) {
                    console.log(`made ${bet} transaction`)
                    const markAsResolved = await sql`
                        UPDATE bets 
                        SET active = false,
                            result = 'l'
                        WHERE id = ${bet.id}
                    `
                    // prolly dont need handling
                } else {
                    console.log(`failed to make ${bet} transaction`)
                    failedBets.push(bet)
                }
                // logic to remove money
                // if it's in but isn't equal to outcome, then must be  -- then deduct money from escrow balance
                // need to do a check, if it's OU must only compare O and U
            }
            const manageEscrow = await sql`
                UPDATE users
                SET balance = balance + CASE WHEN escrow < 0 THEN escrow ELSE 0 END,
                    escrow = CASE WHEN escrow < 0 THEN 0 ELSE escrow END
                WHERE username = ${bet.bettoruser}
            ` // this is to fix negative escrows
        })

        const markAsClosed = await sql`
            UPDATE options
            SET closed = true
            WHERE id = ${optionid} AND creator = ${username};
        `
        return { success: true, message: 'the forEach is done', failedBets: failedBets }
    } catch (error) {
        console.error(error);
        return { success: false, message: 'Error in resolving the option'}
    }
    // Step 1: Locate option -- make sure username is the creator
    // Step 2: Retrieve all the bets on that option, process:
    // - use the same logic as above. if win (same sides), calculate return & ... if lose, just subtract amnt from escrow
    // mark bet as resolved at the end
    // manage escrow
    // mark option as resolved
}