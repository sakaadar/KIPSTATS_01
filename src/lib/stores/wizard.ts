import { writable } from "svelte/store";

export type WizardStep = "API_KEY" | "PROFILE";
export const wizardOpen = writable(false);
export const wizardStep = writable<WizardStep>("API_KEY");

export const WizardOpen = writable(false);

export function openWizardModal(step: WizardStep = "API_KEY") {
    WizardOpen.set(true);
    WizardOpen.set(true);
}

export function closeWizardModal() {
    WizardOpen.set(false);
}