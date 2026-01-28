export interface Player {
    name: string;
    champion: string;
    kda: string;
    items: number[];
}

export interface Match {
    queue: string;
    champion: string;
    kda: string;
    result: 'Win' | 'Loss';
    lp: number;
    placement: string;
    items: number[];
    date: string;
    team: Player[];
}
