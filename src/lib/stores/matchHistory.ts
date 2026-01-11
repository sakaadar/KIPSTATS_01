export interface Player {
    name: string;
    champion: string;
    kills: number;
    deaths: number;
    assists: number;
    items: number[];
    isYou?: boolean;
}

export interface Match {
    queue: string;
    champion: string;
    result: 'Win' | 'Loss';
    lp: number;
    kills: number;
    deaths: number;
    assists: number;
    cs: number;
    duration: string;
    date: string;
    items: number[];
    blueTeam: Player[];
    redTeam: Player[];
}
