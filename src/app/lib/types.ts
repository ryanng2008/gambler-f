export interface OptionType {
    id: string,
    optiontype: 'hm' | 'ou' | 'ptw',
    heading: string,
    subheading: string,
    imagelink: string | '',
    bettingline?: number,
    ptwchoices?: string, // this is the literal string. kept for now because of probable ts errors
    choices: { choice_name: string, odds: number }[], // this is the array_to_json'ed field. there is a distinction because ptw choices is the literal string
    odds: number | -1, // number signifies hit / over for hm / ou
    minbet: number,
    maxbet: number,
}

export interface OptionFormData {
    marketCode: string,
    subsectionCode: string,
    optiontype: 'ou' | 'hm' | 'ptw',
    heading: string,
    subheading: string,
    imagelink?: string | '',
    bettingline?: number,
    odds: number | -1,
    minbet: number,
    maxbet: number,
}

export type OptionFormServer = OptionFormData & {
    ptwchoices: {choice: string, odds: number}[], 
    user: string
}

export interface User {
    username: string,
    id: string,
}


// export interface FlatOptionType {
//     id: string,
//     type: 'hm' | 'ou' | 'ptw',
//     heading: string,
//     subheading: string,
//     imageLink: string | '',
//     bettingLine?: number,
//     choices?: string[]
//     odds: number | -1, // number signifies h / o ; set up for pick the winner in a sec.
//     minBet: number,
//     maxBet: number,
// }