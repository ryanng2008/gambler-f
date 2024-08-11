import { OptionType } from '@/app/lib/types'
export const markets = [
    {code: "nba", name: "National Basketball Association", options: 100},
    {code: "nfl", name: "NFL", options: 23003430},
    {code: "rc-sports-day", name: "Athletics Carnival", options: 31}

]

export const subsections = [
    {
        code: "lakers-warriors-10485", 
        name: "Lakers vs Warriors", 
        details: {
            date: '',
            time: ''
        },
        options: [
            '000000',
            '000001',
            '000002'
        ]
    }
]

export const options: OptionType[] = [
    {
        id: '000000',
        type: 'hm',
        heading: 'C. Foley',
        desc: 'hey',
        imageLink: '/lepresident.png',
        properties: {
            bettingLine: 42.5
        },
        odds: 43,
        betRange: [20, 40]
    }
]

