<script lang="ts">
//Reusing role type
import type { Role } from '$lib/stores/types';

//Roles to choose from
const roles = ['All', 'Top', 'Jungle', 'Mid', 'Bot', 'Support'] as const;

//The role selected from the +page.svelte
export let selected: 'All' | Role = 'All';

//Callback function, when the user presses a button
export let onSelect: (role: 'All'|Role) => void = () => {};
</script>

<div class="role-bar">
    <p class="label">Select role</p>


    <div class="tabs">
     {#each roles as role}
        <button
          type="button"
          class:selected={role === selected}
          on:click={() => onSelect(role)}
        >

         {role}
        </button>
     {/each}
    </div>
</div>

<style>
    .rolebar{
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        margin-bottom: 0.75rem;
    }
    .label{
        margin: 0;
        font-size: 0.8rem;
        text-transform: uppercase;
        letter-spacing: 0.12rem;
        color: #9ca3af;
    }
    .tabs{
        display: flex;
        flex-wrap: wrap;
        gap: 0.4rem;
    }
    button{
        background: #020617;
        border-radius: 999px;
        border: 1px solid rgba(148,163,184,0.6);
        padding: 0.35rem 0.9rem;
        font-size: 0.8rem;
        color: #e5e7eb;
        cursor: pointer;
         transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease,
            transform 0.1s ease;
    }
    button:hover {
        border-color: #38bdf8;
        transform: translateY(-1px);
    }
    button.selected{
        border-color: #facc15;
        background: radial-gradient(circle at the top, #1e293b, #020617);
        box-shadow: 0 0 10px rgba(250,204,21,0.6);
    }
</style>