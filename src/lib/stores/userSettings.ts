import { json } from "@sveltejs/kit";
import { parse } from "svelte/compiler";
import { writable, get } from "svelte/store";

export type Region = 'EUW1' | 'EUN1' | 'NA1' | 'KR' | 'BR1' | 'JP1' | 'LA1' | 'LA2' | 'OC1' | 'TR1' | 'RU';

export interface MyProfile {
    riotId: string;
    tagline: string;
    region: Region;
    puuid?: string; //Later when backend supports it
}

interface UserSettingsState {
    riotApiKey: string | null;
    myProfile: MyProfile | null;
}

const STORAGE_KEY = 'kips_user_settings_v1';

export const userSettings = writable<UserSettingsState>({
    riotApiKey: null,
    myProfile: null
});


export function loadUserSettings(): void {
    try {
        const raw = sessionStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw) as UserSettingsState;
        userSettings.set({
            riotApiKey: parsed.riotApiKey ?? null,
            myProfile: parsed.myProfile ?? null
        });
    }catch {

    }
}

function persist(): void {
    const state = get(userSettings);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function saveApiKey(key: string): void{
    userSettings.update((s) => ({...s, riotApiKey: key}));
    persist();
}

export function saveMyProfile(profile: MyProfile): void{
    userSettings.update((s) => ({...s, myProfile: profile}));
    persist();
}

export function clearUserSettings(): void{
    userSettings.set({ riotApiKey: null, myProfile: null});
    persist();
}
