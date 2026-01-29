export const DDRAGON_VERSION = '14.19.1';

export const regions = ['KR', 'EUW', 'EUNE', 'NA', 'CN'];
export const ranks = ['All Ranks', 'Challenger', 'Master', 'Diamond', 'Emerald', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Iron'];
export const roles = ['All Roles', 'Top', 'Jungle', 'Mid', 'ADC', 'Support'];

export type Tier = 'S+' | 'S' | 'A' | 'B' | 'C' | 'D';

export interface ChampionData {
    name: string;
    winRate: number;
    pickRate: number;
    banRate: number;
    games: number;
}

export const champions = [
    'Ahri', 'Akali', 'Ashe', 'Blitzcrank', 'Caitlyn',
    'Darius', 'Draven', 'Ezreal', 'Garen', 'Graves',
    'Irelia', 'Janna', 'Jax', 'Jinx', 'Katarina',
    'Kayn', 'LeeSin', 'Lux', 'Malphite', 'MasterYi',
    'MissFortune', 'Morgana', 'Nasus', 'Nautilus', 'Orianna',
    'Pyke', 'Riven', 'Sejuani', 'Senna', 'Shen',
    'Shyvana', 'Sivir', 'Sona', 'Soraka', 'Syndra',
    'Talon', 'Teemo', 'Thresh', 'Tristana', 'Tryndamere',
    'TwistedFate', 'Urgot', 'Varus', 'Vayne', 'Veigar',
    'Velkoz', 'Vi', 'Viktor', 'Vladimir', 'Warwick',
    'Xayah', 'Xerath', 'Yasuo', 'Yone', 'Yuumi',
    'Zed', 'Ziggs', 'Zilean', 'Zoe', 'Zyra'
];

export function getChampionIcon(champ: string): string {
    return `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${champ}.png`;
}

export function generateChampionData(
    champ: string,
    region: string,
    rank: string,
    role: string
): ChampionData {
    // Generate pseudo-random but deterministic stats based on champion + filters
    const seed = (
        champ.charCodeAt(0) +
        region.charCodeAt(0) +
        rank.charCodeAt(0) +
        role.charCodeAt(0)
    ) % 100;

    return {
        name: champ,
        winRate: 48 + (seed % 10),
        pickRate: 2 + (seed % 15),
        banRate: 1 + (seed % 20),
        games: 1000 + (seed * 100)
    };
}

export function generateTierList(
    region: string,
    rank: string,
    role: string
): Record<Tier, ChampionData[]> {
    // Generate stats for all champions
    const championsWithData = champions.map(champ =>
        generateChampionData(champ, region, rank, role)
    );

    // Sort by win rate + pick rate combined score
    const sorted = championsWithData.sort((a, b) => {
        const scoreA = (a.winRate * 0.7) + (a.pickRate * 0.3);
        const scoreB = (b.winRate * 0.7) + (b.pickRate * 0.3);
        return scoreB - scoreA;
    });

    // Distribute champions across tiers
    const tierSizes = {
        'S+': 6,
        'S': 8,
        'A': 12,
        'B': 14,
        'C': 12,
        'D': 8
    };

    let index = 0;
    const tiers: Record<Tier, ChampionData[]> = {
        'S+': [],
        'S': [],
        'A': [],
        'B': [],
        'C': [],
        'D': []
    };

    for (const [tier, size] of Object.entries(tierSizes)) {
        tiers[tier as Tier] = sorted.slice(index, index + size);
        index += size;
    }

    return tiers;
}