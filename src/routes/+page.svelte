<script lang="ts">
  import TestChampionCard from "$lib/components/TestChampionCard.svelte";
  import type { Champion } from "$lib/stores/types";

  const demoChamp: Champion[] = [
    {id: 'ahri',
    name: 'Ahri', 
    title: 'The Nine-Tailed Fox',
    imageUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ahri_0.jpg'},
    {id: 'akali', 
    name: 'Akali', 
    title: 'The Rogue Assassin',
    imageUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Akali_0.jpg'},
    {id: 'alistar',
     name: 'Alistar',
     title: 'THe Minortaur',
     imageUrl: 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Alistar_0.jpg'}
  ];

</script>

<main class="container">
  <h1>IntStats DashBoard</h1>
  <div class="grid">
    {#each demoChamp as champs}
      <TestChampionCard champion = {champs} />
    {/each}
  </div>
</main>

<style>
  .container{
    display: flex;
    flex-direction: column;
    gap: 0,75rem;
  }
  .grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1.2rem;
    align-items: stretch;
  }
</style>
