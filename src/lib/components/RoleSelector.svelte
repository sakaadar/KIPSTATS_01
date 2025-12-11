<script lang="ts">
//Reusing role type
import type { Role } from '$lib/stores/types';

//The role selected from the +page.svelte
export let selected: 'All' | Role = 'All';
//Callback function, when the user presses a button
export let onSelect: (role: 'All' | Role) => void;

type RoleButton = {
    id: 'All' | Role;
    label: string;
    icon?: string;
};

  const roles: RoleButton[] = [
    {
      id: 'All',
      label: 'All',
      // evt. et generisk grid-ikon, eller bare lad icon være tom
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/ban-ring-component.svg'
    },
    {
      id: 'Top',
      label: 'Top',
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-top.svg'
    },
    {
      id: 'Jungle',
      label: 'Jungle',
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-jungle.svg'
    },
    {
      id: 'Mid',
      label: 'Mid',
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-middle.svg'
    },
    {
      id: 'Bot',
      label: 'Bot',
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-bottom.svg'
    },
    {
      id: 'Support',
      label: 'Support',
      icon: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-utility.svg'
    }
  ];
</script>

<div class="role-selector">
    <p class="selection-label">Select role</p>


    <div class="role-row">
     {#each roles as role}
        <button
          type="button"
          class:selected={role.id === selected}
          on:click={() => onSelect(role.id)}
        >
          {#if role.icon}
           <img src={role.icon} alt={role.label} />
          {/if}
          <span>{role.label}</span>
        </button>
     {/each}
    </div>
</div>

<style>
 .role-selector {
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  .selection-label {
    font-size: 0.8rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(209, 213, 219, 0.75);
    margin-bottom: 0.75rem;
  }

  .role-row {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.4rem 0.95rem;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: rgba(15, 23, 42, 0.6);
    color: #e5e7eb;
    font-size: 0.85rem;
    cursor: pointer;
    transition:
      box-shadow 0.15s ease,
      transform 0.1s ease,
      border-color 0.15s ease;
  }

  button img {
    width: 18px;
    height: 18px;
    display: block;
  }

  button:hover {
    background: rgba(15, 23, 42, 0.8);
    box-shadow: 0 0 0 1px rgba(250, 204, 21, 0.35);
    transform: translateY(-1px);
  }

  button.selected {
    border-color: #facc15;
    box-shadow:
      0 0 0 1px rgba(250, 204, 21, 0.7),
      0 0 12px rgba(250, 204, 21, 0.5);
    background: radial-gradient(circle at top, #facc15, #f59e0b 45%, #020617 100%);
  }

  button.selected span {
    font-weight: 600;
  }
</style>