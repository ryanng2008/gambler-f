export interface OptionType {
    id: string,
    type: 'hm' | 'ou' | 'ptw',
    heading: string,
    desc: string,
    imageLink: string | '',
    properties: {
        bettingLine?: number,
        choices?: string[]
    },
    odds: number | -1, // number signifies h / o ; set up for pick the winner in a sec.
    betRange: [min: number, max: number]
}