import { writable } from "svelte/store";

export type AuthUser = {
    id: string;
    name: string;
};

type AuthState = {
    user: AuthUser | null;
    loading: boolean;
}

const initial: AuthState = { user: null, loading: false};

export const auth = writable<AuthState>(initial);

export function setUser(user: AuthUser | null) {
    auth.update((s) => ({ ...s, user}));
}

export function logout(){
    auth.set(initial);
}