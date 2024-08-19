export interface OptionType {
    id: string,
    optiontype: 'hm' | 'ou' | 'ptw',
    heading: string,
    desc: string,
    imagelink: string | '',
    bettingline?: number,
    choices?: string[],
    odds: number | -1, // number signifies h / o ; set up for pick the winner in a sec.
    minbet: number,
    maxet: number,

}

export interface OptionFormData {
    marketCode: string,
    subsectionCode: string,
    optiontype: 'ou' | 'hm' | 'ptw',
    heading: string,
    desc: string,
    imagelink?: string | '',
    bettingline?: number,
    choices?: string[], 
    odds: number | -1,
    minbet: number,
    maxbet: number,
}




export interface FlatOptionType {
    id: string,
    type: 'hm' | 'ou' | 'ptw',
    heading: string,
    desc: string,
    imageLink: string | '',
    bettingLine?: number,
    choices?: string[]
    odds: number | -1, // number signifies h / o ; set up for pick the winner in a sec.
    minBet: number,
    maxBet: number,
}