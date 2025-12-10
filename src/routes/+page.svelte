<script lang="ts">
import RoleSelector from "$lib/components/RoleSelector.svelte";
import TestChampionCard from "$lib/components/TestChampionCard.svelte";
import type { Champion, Role } from "$lib/stores/types";
import { demochampions } from '$lib/stores/demo-champions';

  let champions: Champion[] = demochampions;
  let selectedRole: 'All' | Role = 'All';

  $: filteredChampions = 
      selectedRole === 'All'
        ? champions
        : champions.filter((c)=> c.roles.includes(selectedRole as Role));

</script>

<main class="container">
  <section class="section-header">
    <h1>Champion Select</h1>
    <p>Browse and filter champions by role</p>
  </section>

  <RoleSelector
    selected={selectedRole}
    onSelect={(role) => (selectedRole = role)}
  />

  <div class="grid">
    {#each filteredChampions as champs}
      <TestChampionCard champion = {champs} />
    {/each}
  </div>
</main>

<style>
  .container{
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }
  .section-header{
    margin: 0;
    font-size: 1.4rem;
  }
  .section-header p{
    margin: 0.25rem 0 0;
    font-size: 0.85rem;
    color: #9ca3af;
  }
  .grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.2rem;
    align-items: stretch;
  }
</style>
