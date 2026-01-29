export interface Match {
    date: string;
    champion: string;
    championId: string;
    kills: number;
    deaths: number;
    assists: number;
    kda: number;
    result: 'Win' | 'Loss';
    gameMode: string;
    duration: string;
    items: number[]; // Item IDs from DDragon
    spells: number[]; // Summoner spell IDs
}

export interface ChampionStat {
    championId: string;
    championName: string;
    games: number;
    wins: number;
    losses: number;
    winrate: number;
    kda: number;
}

export interface User {
    name: string;
    tag: string;
    region: string;
    level: number;
    profileIconId: number;
    rank: string;
    tier: string;
    division: string;
    lp: number;
    wins: number;
    losses: number;
    winrate: number;
    overallKDA: number;
    topChampions: ChampionStat[];
    matches: Match[];
}

export const mockUser: User = {
    name: 'Nvy',
    tag: '#3006',
    region: 'EUW',
    level: 199,
    profileIconId: 5,
    rank: 'BRONZE II',
    tier: 'BRONZE',
    division: 'II',
    lp: 45,
    wins: 16,
    losses: 14,
    winrate: 53,
    overallKDA: 2.8,
    topChampions: [
        {
            championId: '22',
            championName: 'Ashe',
            games: 5,
            wins: 3,
            losses: 2,
            winrate: 60,
            kda: 4.5
        },
        {
            championId: '238',
            championName: 'Zed',
            games: 4,
            wins: 2,
            losses: 2,
            winrate: 50,
            kda: 3.2
        },
        {
            championId: '103',
            championName: 'Ahri',
            games: 3,
            wins: 2,
            losses: 1,
            winrate: 67,
            kda: 4.8
        }
    ],
    matches: [
        {
            date: '04 Nov',
            champion: 'Ashe',
            championId: '22',
            kills: 8,
            deaths: 17,
            assists: 45,
            kda: 3.1,
            result: 'Win',
            gameMode: 'ARAM',
            duration: '30:41',
            items: [3031, 3094, 3006, 3036, 3033, 3139],
            spells: [4, 14]
        },
        {
            date: '03 Nov',
            champion: 'Jinx',
            championId: '222',
            kills: 11,
            deaths: 4,
            assists: 7,
            kda: 4.5,
            result: 'Win',
            gameMode: 'Ranked',
            duration: '32:18',
            items: [3031, 3087, 3006, 3036, 3046, 3139],
            spells: [4, 7]
        },
        {
            date: '02 Nov',
            champion: 'Zed',
            championId: '238',
            kills: 15,
            deaths: 8,
            assists: 39,
            kda: 6.8,
            result: 'Win',
            gameMode: 'ARAM',
            duration: '23:12',
            items: [3142, 6676, 3814, 3156, 6694, 3158],
            spells: [4, 14]
        },
        {
            date: '02 Nov',
            champion: 'Ahri',
            championId: '103',
            kills: 10,
            deaths: 10,
            assists: 26,
            kda: 3.6,
            result: 'Loss',
            gameMode: 'ARAM',
            duration: '17:26',
            items: [3089, 3020, 6653, 3135, 3165, 3157],
            spells: [4, 14]
        },
        {
            date: '02 Nov',
            champion: 'Yasuo',
            championId: '157',
            kills: 8,
            deaths: 7,
            assists: 12,
            kda: 2.9,
            result: 'Loss',
            gameMode: 'Ranked',
            duration: '28:42',
            items: [3031, 6673, 3006, 3046, 3036, 3139],
            spells: [4, 14]
        },
        {
            date: '01 Nov',
            champion: 'Jinx',
            championId: '222',
            kills: 12,
            deaths: 5,
            assists: 18,
            kda: 6.0,
            result: 'Win',
            gameMode: 'Normal',
            duration: '28:15',
            items: [3031, 3087, 3006, 3036, 3046, 3139],
            spells: [4, 7]
        },
        {
            date: '01 Nov',
            champion: 'Lux',
            championId: '99',
            kills: 7,
            deaths: 12,
            assists: 32,
            kda: 3.3,
            result: 'Win',
            gameMode: 'ARAM',
            duration: '25:48',
            items: [6653, 3020, 3135, 3089, 3165, 3157],
            spells: [4, 14]
        },
        {
            date: '31 Oct',
            champion: 'Twisted Fate',
            championId: '4',
            kills: 6,
            deaths: 5,
            assists: 14,
            kda: 4.0,
            result: 'Win',
            gameMode: 'Ranked',
            duration: '31:05',
            items: [3089, 3020, 3135, 3165, 3157, 3041],
            spells: [4, 12]
        },
        {
            date: '31 Oct',
            champion: 'Yasuo',
            championId: '157',
            kills: 18,
            deaths: 14,
            assists: 22,
            kda: 2.9,
            result: 'Loss',
            gameMode: 'Normal',
            duration: '32:17',
            items: [3031, 6673, 3006, 3046, 3036, 3139],
            spells: [4, 14]
        },
        {
            date: '31 Oct',
            champion: 'Ashe',
            championId: '22',
            kills: 9,
            deaths: 8,
            assists: 28,
            kda: 4.6,
            result: 'Win',
            gameMode: 'ARAM',
            duration: '27:33',
            items: [3031, 3094, 3006, 3036, 3033, 3139],
            spells: [4, 14]
        },
        {
            date: '30 Oct',
            champion: 'Miss Fortune',
            championId: '21',
            kills: 14,
            deaths: 6,
            assists: 25,
            kda: 6.5,
            result: 'Win',
            gameMode: 'ARAM',
            duration: '22:45',
            items: [6676, 3094, 3006, 3036, 3033, 3139],
            spells: [4, 7]
        },
        {
            date: '30 Oct',
            champion: 'Lee Sin',
            championId: '64',
            kills: 7,
            deaths: 8,
            assists: 9,
            kda: 2.0,
            result: 'Loss',
            gameMode: 'Ranked',
            duration: '26:33',
            items: [3142, 6694, 3074, 3053, 3065, 3158],
            spells: [4, 11]
        },
        {
            date: '30 Oct',
            champion: 'Zed',
            championId: '238',
            kills: 11,
            deaths: 11,
            assists: 15,
            kda: 2.4,
            result: 'Loss',
            gameMode: 'Normal',
            duration: '29:12',
            items: [3142, 6676, 3814, 3156, 6694, 3158],
            spells: [4, 14]
        },
        {
            date: '29 Oct',
            champion: 'Ahri',
            championId: '103',
            kills: 13,
            deaths: 7,
            assists: 34,
            kda: 6.7,
            result: 'Win',
            gameMode: 'ARAM',
            duration: '26:58',
            items: [3089, 3020, 6653, 3135, 3165, 3157],
            spells: [4, 14]
        },
        {
            date: '29 Oct',
            champion: 'Katarina',
            championId: '55',
            kills: 16,
            deaths: 9,
            assists: 21,
            kda: 4.1,
            result: 'Win',
            gameMode: 'Normal',
            duration: '24:37',
            items: [3152, 3020, 3135, 3089, 3165, 3157],
            spells: [4, 14]
        },
        {
            date: '28 Oct',
            champion: 'Ezreal',
            championId: '81',
            kills: 10,
            deaths: 13,
            assists: 27,
            kda: 2.8,
            result: 'Loss',
            gameMode: 'ARAM',
            duration: '31:22',
            items: [3004, 3508, 3006, 3036, 3033, 3139],
            spells: [4, 7]
        },
        {
            date: '28 Oct',
            champion: 'Ashe',
            championId: '22',
            kills: 6,
            deaths: 9,
            assists: 38,
            kda: 4.9,
            result: 'Win',
            gameMode: 'ARAM',
            duration: '28:44',
            items: [3031, 3094, 3006, 3036, 3033, 3139],
            spells: [4, 7]
        },
        {
            date: '27 Oct',
            champion: 'Viktor',
            championId: '112',
            kills: 8,
            deaths: 14,
            assists: 29,
            kda: 2.6,
            result: 'Loss',
            gameMode: 'Ranked',
            duration: '33:15',
            items: [3089, 3020, 3135, 6653, 3165, 3157],
            spells: [4, 14]
        },
        {
            date: '27 Oct',
            champion: 'Zed',
            championId: '238',
            kills: 19,
            deaths: 8,
            assists: 16,
            kda: 4.4,
            result: 'Win',
            gameMode: 'Normal',
            duration: '25:11',
            items: [3142, 6676, 3814, 3156, 6694, 3158],
            spells: [4, 14]
        },
        {
            date: '26 Oct',
            champion: 'Syndra',
            championId: '134',
            kills: 9,
            deaths: 6,
            assists: 11,
            kda: 3.3,
            result: 'Win',
            gameMode: 'Ranked',
            duration: '29:47',
            items: [3089, 3020, 3135, 6653, 3165, 3157],
            spells: [4, 14]
        }
    ]
};