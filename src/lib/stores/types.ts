export type Role = 'Top' | 'Jungle' | 'Mid' | 'Bot' | 'Support';

export type Champion={
    id: string;
    name: string;
    title: string;
    imageUrl: string;
    roles: Role[];
};