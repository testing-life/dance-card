export interface Dance {

    label?: string;
    lead: boolean;
    follow: boolean;

}

export type DanceMap = {
    [key: string]: Dance
}


const Dances: DanceMap = {
        'lindy-hop': {
            lead: false,
            follow: false
        },
        'blues': {
            lead: false,
            follow: false
        },
        'fuston': {
            lead: false,
            follow: false
        },
        'balboa': {
            lead: false,
            follow: false
        },
        'collegiate-shag': {
            lead: false,
            follow: false
        },
        'salsa': {
            lead: false,
            follow: false
        },
        'bachata': {
            lead: false,
            follow: false
        },
        'tango': {
            lead: false,
            follow: false
        },
        'kizomba': {
            lead: false,
            follow: false
        },
        'bal-folk': {
            lead: false,
            follow: false
        }
};



// const dances = new Map<string, DancePosition>(undefined);
// Dances.sort((a:string, b:string): any => a > b).forEach((dance:string) => {
//     dances.set(dance, defaultDancePositionsState);
// });

export default Dances;
