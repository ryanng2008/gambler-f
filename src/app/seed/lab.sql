/* OPTIONS DONE */

CREATE TYPE optionTypes AS ENUM ('hm', 'ou', 'ptw');
CREATE TABLE IF NOT EXISTS options (
       id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
       heading VARCHAR(255) NOT NULL,
       subheading TEXT NOT NULL DEFAULT '',
       optionType optionTypes NOT NULL DEFAULT 'hm',
       imageLink VARCHAR(255),
       odds INT NOT NULL,
       minBet INT NOT NULL DEFAULT 0,
       maxBet INT NOT NULL DEFAULT 50,
       ouBettingLine DECIMAL(10,2),
       ptwChoices TEXT,
       CONSTRAINT odds_range CHECK (odds >= 0 AND odds <= 100)
);



INSERT INTO options (heading, subheading, optionType, odds, minBet, maxBet, ouBettingLine) VALUES
    ('Oscar So', 'brothers', 'ou', 2, 150, 12.5);

/* USERS DONE */

CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    insecurePassword VARCHAR(255),
    bets TEXT[]
);

INSERT INTO users (username) VALUES
    ('vansh-sureka');

CREATE TABLE IF NOT EXISTS bets (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    bettorUser TEXT,
    optionId TEXT,
    betAmount DECIMAL(10,2),
    payoutRate DECIMAL(10,3),
    active BOOLEAN
);


CREATE TABLE IF NOT EXISTS markets (
    id UUID DEFAULT uuid_generate_v4(),
    code VARCHAR(255) PRIMARY KEY NOT NULL,
    name TEXT,
    subsections TEXT[]
);

CREATE TABLE IF NOT EXISTS subsections (
    code VARCHAR(255) PRIMARY KEY NOT NULL,
    subsectionName TEXT NOT NULL,
    eventDate TEXT,
    eventTime TEXT,
    options TEXT[]
);