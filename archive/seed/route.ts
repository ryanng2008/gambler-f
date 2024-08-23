import { db } from '@vercel/postgres'
import bcrypt from 'bcrypt';
import { options, users, bets, markets, subsections } from '@/app/seed/placeholder-data'

const client = await db.connect();

async function seedOptions() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // await client.sql`
    // CREATE TYPE OPTIONTYPES AS ENUM('hm', 'ou', 'ptw');
    // CREATE TABLE IF NOT EXISTS options (
    //    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    //    heading VARCHAR(255) NOT NULL,
    //    subheading TEXT NOT NULL DEFAULT '',
    //    optiontype OPTIONTYPES NOT NULL DEFAULT 'hm',
    //    imageLink VARCHAR(255),
    //    odds INT NOT NULL,
    //    minBet INT NOT NULL DEFAULT 0,
    //    maxBet INT NOT NULL DEFAULT 50,
    //    bettingLine DECIMAL(10,2),
    //    choices TEXT,
    //    CONSTRAINT odds_range CHECK (odds >= 0 AND odds <= 100)
    // );
    // `;
    const insertedOptions = await Promise.all(
        options.map(async (option) => {
            return client.sql`
            INSERT INTO options (heading, subheading, optiontype, odds, minbet, maxbet, bettingLine) VALUES
                (${option.heading}, ${option.subheading}, ${option.optionType}, ${option.odds}, ${option.minBet}, ${option.maxBet}, ${option.ouBettingLine});
            `
        })
    )
    return insertedOptions;

}

async function seedUsers() {
    await client.sql`
    CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    insecurePassword VARCHAR(255),
    bets TEXT[]);  
    `
    
    const insertedUsers = await Promise.all(
        users.map(async (user) => {
            //const formattedBets = `{${user.bets.map(bet => `"${bet}"`).join(',')}}`;
            return client.sql`
            INSERT INTO users (username, bets) VALUES
                (${user.username}, ARRAY[${`${user.bets}`}])  
            ` // This ARRAY constructor is fucked up.
        })
    );
}

async function seedBets() {
    await client.sql`
    CREATE TABLE IF NOT EXISTS bets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    bettorUser TEXT,
    optionId TEXT,
    betAmount DECIMAL(10,2) NOT NULL DEFAULT 1,
    payoutRate DECIMAL(10,3) NOT NULL DEFAULT 0,
    active BOOLEAN);
    `
    const insertedBets = await Promise.all(
        bets.map(async (bet) => {
            return client.sql`
            INSERT INTO bets (bettorUser, optionId, betAmount, payoutRate, active) VALUES
                (${bet.bettorUser}, ${bet.optionId}, ${bet.betAmount}, ${bet.payoutRate}, ${bet.active});
            `
        })
    )
    return insertedBets;
    //(${bet.bettorUser}, ${bet.optionId}, ${bet.betAmount}, ${bet.payoutRate}, ${bet.active});
}

async function seedMarkets() {
    await client.sql`
    CREATE TABLE IF NOT EXISTS markets (
    id UUID DEFAULT uuid_generate_v4(),
    code VARCHAR(255) PRIMARY KEY NOT NULL,
    name TEXT,
    subsections TEXT[]);
    `
    const insertedMarkets = await Promise.all(
        markets.map(async (market) => {
            return client.sql`
            INSERT INTO markets (code, name, subsections) VALUES
                (${market.code}, ${market.name}, ${`${market.subsections}`}]);
            `
        })
    )
    return insertedMarkets;
}

async function seedSubsections() {
    await client.sql`
    CREATE TABLE IF NOT EXISTS subsections (
    code VARCHAR(255) PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    date TEXT,
    time TEXT,
    options TEXT[]);
    `
    const insertedSubsections = await Promise.all(
        subsections.map(async (subsection) => {
            return client.sql`
            INSERT INTO subsections (code, name, date, time, options) VALUES
                (${subsection.code}, ${subsection.name}, ${subsection.date}, ${subsection.time}, ARRAY[${`${subsection.options}`}]);
            `
        })
    )
    return insertedSubsections;
}

export async function GET() {
    // try {
    //     await client.sql`BEGIN`;   
    //     await seedOptions();
    //     //await seedUsers();
    //     //await seedBets();
    //     //await seedSubsections();
    //     //await seedMarkets();
    //     await client.sql`COMMIT`;
        
    //     return Response.json({ message: 'Database seeded successfully' });
    // } catch (error) {
    //     await client.sql`ROLLBACK`;
    //     return Response.json({ error }, { status: 500 });
    // }
    return Response.json({ message: 'What do you want?' });
}