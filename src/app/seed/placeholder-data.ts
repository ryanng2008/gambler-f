// CREATE TABLE IF NOT EXISTS options (
//     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//     heading VARCHAR(255) NOT NULL,
//     subheading TEXT NOT NULL DEFAULT '',
//     optionType optionTypes NOT NULL DEFAULT 'hm',
//     imageLink VARCHAR(255),
//     odds INT NOT NULL,
//     minBet INT NOT NULL DEFAULT 0,
//     maxBet INT NOT NULL DEFAULT 50,
//     ouBettingLine DECIMAL(10,2),
//     ptwChoices TEXT,
//     CONSTRAINT odds_range CHECK (odds >= 0 AND odds <= 100)
// );


export const options = [
    {
        heading: 'John F. Kennedy',
        subheading: 'bullets dodged',
        optionType: 'hm',
        imageLink: 'example_image_1.jpg',
        odds: 50,
        minBet: 10,
        maxBet: 100,
        ouBettingLine: 2.5
    },
    {
        heading: 'Example Heading 2',
        subheading: 'Example Subheading 2',
        optionType: 'ou',
        imageLink: 'example_image_2.jpg',
        odds: 70,
        minBet: 5,
        maxBet: 50,
        ouBettingLine: 1.5
    },
    {
        heading: 'Example Heading 3',
        subheading: 'Example Subheading 3',
        optionType: 'ou',
        imageLink: 'example_image_3.jpg',
        odds: 80,
        minBet: 20,
        maxBet: 200,
        ouBettingLine: 45.4
    },
    {
        heading: 'Example Heading 4',
        subheading: 'Example Subheading 4',
        optionType: 'hm',
        imageLink: 'example_image_4.jpg',
        odds: 60,
        minBet: 15,
        maxBet: 150,
        ouBettingLine: 3.0
    },
    {
        heading: 'Example Heading 5',
        subheading: 'Example Subheading 5',
        optionType: 'ou',
        imageLink: 'example_image_5.jpg',
        odds: 75,
        minBet: 8,
        maxBet: 80,
        ouBettingLine: 2.0
    },
    {
        heading: 'Example Heading 6',
        subheading: 'Example Subheading 6',
        optionType: 'hm',
        imageLink: 'example_image_6.jpg',
        odds: 55,
        minBet: 12,
        maxBet: 120,
        ouBettingLine: 2.0
    }
];

export const users = [
        {
            username: 'alice',
            insecurePassword: 'password123',
            bets: ['Bet1', 'Bet2']
        },
        {
            username: 'bob',
            insecurePassword: 'ilovecats',
            bets: ['Bet3']
        },
        {
            username: 'charlie',
            insecurePassword: 'charlie123',
            bets: ['Bet4', 'Bet5', 'Bet6']
        },
        {
            username: 'diana',
            insecurePassword: 'diana@123',
            bets: ['Bet7']
        },
        {
            username: 'eve',
            insecurePassword: 'password1234',
            bets: ['Bet8', 'Bet9']
        },
        {
            username: 'frank',
            insecurePassword: 'frankie',
            bets: ['Bet10']
        }
];

export const bets = [
    {
        bettorUser: 'alice',
        optionId: '7327a988-8ac9-40f8-a000-02db3132822f',
        betAmount: 50.25,
        payoutRate: 2.345,
        active: true
    },
    {
        bettorUser: 'bob',
        optionId: '02ad517e-78a4-4235-89e4-47f3e883f995',
        betAmount: 30.75,
        payoutRate: 1.987,
        active: false
    },
    {
        bettorUser: 'charlie',
        optionId: 'b5b0b323-e5b5-45c5-b034-d3246e10269f',
        betAmount: 100.00,
        payoutRate: 0.314,
        active: true
    },
    {
        bettorUser: 'diana',
        optionId: 'b0f612f4-e39d-4403-a67e-48778720a6ba',
        betAmount: 75.50,
        payoutRate: 1.718,
        active: true
    },
    {
        bettorUser: 'eve',
        optionId: 'd04e28e0-708f-4717-b7c1-af710193f073',
        betAmount: 40.00,
        payoutRate: 0.618,
        active: false
    },
    {
        bettorUser: 'frank',
        optionId: 'f3c56a1c-b752-4df2-b8ff-e47c29ece712',
        betAmount: 90.75,
        payoutRate: 0.222,
        active: true
    }
];

export const markets = [
    {
        code: 'main',
        name: 'The Marketplace',
        subsections: ['000000', '000001', '000002', '000003']
    }
];

export const subsections = [
    {
        code: "000000",
        name: "Basketball game tomorrow",
        date: "2024-01-15",
        time: "10:00 AM",
        options: ["7327a988-8ac9-40f8-a000-02db3132822f", "02ad517e-78a4-4235-89e4-47f3e883f995", "b5b0b323-e5b5-45c5-b034-d3246e10269f"]
    },
    {
        code: "000001",
        name: "Miscellaneous",
        date: "",
        time: "",
        options: []
    },
    {
        code: "000002",
        name: "France vs USA",
        date: "2024-03-10",
        time: "1:00 PM",
        options: []
    },
    {
        code: "000003",
        name: "Cardboard Academy",
        date: "",
        time: "",
        options: []
    },
];
