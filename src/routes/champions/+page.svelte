<script lang="ts">
    import type {Champion, Role} from "$lib/stores/champions";
    import '$lib/styles/champions.css';


    // Mock champion data
    const allChampions: Champion[] = [
        { id: 1, name: "Aatrox", role: "Top", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg" },
        { id: 2, name: "Ahri", role: "Mid", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ahri_0.jpg" },
        { id: 3, name: "Akali", role: "Mid", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Akali_0.jpg" },
        { id: 4, name: "Alistar", role: "Support", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Alistar_0.jpg" },
        { id: 5, name: "Amumu", role: "Jungle", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Amumu_0.jpg" },
        { id: 6, name: "Ashe", role: "ADC", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ashe_0.jpg" },
        { id: 7, name: "Blitzcrank", role: "Support", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Blitzcrank_0.jpg" },
        { id: 8, name: "Darius", role: "Top", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Darius_0.jpg" },
        { id: 9, name: "Ezreal", role: "ADC", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Ezreal_0.jpg" },
        { id: 10, name: "Garen", role: "Top", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Garen_0.jpg" },
        { id: 11, name: "Jinx", role: "ADC", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Jinx_0.jpg" },
        { id: 12, name: "Lee Sin", role: "Jungle", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/LeeSin_0.jpg" },
        { id: 13, name: "Lux", role: "Mid", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Lux_0.jpg" },
        { id: 14, name: "Master Yi", role: "Jungle", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/MasterYi_0.jpg" },
        { id: 15, name: "Yasuo", role: "Mid", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Yasuo_0.jpg" },
        { id: 16, name: "Zed", role: "Mid", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Zed_0.jpg" },
        { id: 17, name: "Thresh", role: "Support", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Thresh_0.jpg" },
        { id: 18, name: "Vayne", role: "ADC", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Vayne_0.jpg" },
        { id: 19, name: "Vi", role: "Jungle", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Vi_0.jpg" },
        { id: 20, name: "Fiora", role: "Top", image: "https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Fiora_0.jpg" },
    ];

    const roles: Role[] = [
        { name: "All" },
        { name: "Top", icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-top.svg" },
        { name: "Jungle", icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-jungle.svg" },
        { name: "Mid", icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-middle.svg" },
        { name: "ADC", icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-bottom.svg" },
        { name: "Support", icon: "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-champ-select/global/default/svg/position-utility.svg" }
    ];

    let selectedRole = "All";
    let selectedChampion: Champion | null = null;

    $: filteredChampions = selectedRole === "All"
        ? allChampions
        : allChampions.filter(champ => champ.role === selectedRole);

    function openChampionModal(champion: Champion) {
        selectedChampion = champion;
    }

    function closeModal() {
        selectedChampion = null;
    }
</script>

<div class="champions-page">
    <h1 class="page-title">Champions</h1>

    <!-- Role Filter -->
    <div class="role-filter">
        {#each roles as role}
            <button
                    class="role-btn"
                    class:active={selectedRole === role.name}
                    on:click={() => selectedRole = role.name}
                    title={role.name}
            >
                {#if role.icon}
                    <img src={role.icon} alt={role.name} class="role-icon" />
                {:else}
                    {role.name}
                {/if}
            </button>
        {/each}
    </div>

    <!-- Champions Grid -->
    <div class="champions-grid">
        {#each filteredChampions as champion (champion.id)}
            <div class="champion-card" on:click={() => openChampionModal(champion)}>
                <div class="champion-image-wrapper">
                    <div class="champion-name-overlay">{champion.name}</div>
                    <img src={champion.image} alt={champion.name} class="champion-image" />
                    <div class="champion-overlay">
                        <span class="view-details">View Details</span>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>

<!-- Champion Detail Modal -->
{#if selectedChampion}
    <div class="modal-backdrop" on:click={closeModal}>
        <div class="modal-content" on:click|stopPropagation>
            <button class="close-btn" on:click={closeModal}>×</button>

            <div class="modal-header">
                <img src={selectedChampion.image} alt={selectedChampion.name} class="modal-image" />
                <div class="modal-title-section">
                    <h2>{selectedChampion.name}</h2>
                    <span class="modal-role">{selectedChampion.role}</span>
                </div>
            </div>

            <div class="modal-body">
                <h3>Description</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>

                <h3>Abilities</h3>
                <p><strong>Passive:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.</p>
                <p><strong>Q:</strong> Sed porttitor lectus nibh. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.</p>
                <p><strong>W:</strong> Proin eget tortor risus. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.</p>
                <p><strong>E:</strong> Curabitur aliquet quam id dui posuere blandit. Pellentesque in ipsum id orci porta dapibus.</p>
                <p><strong>R:</strong> Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Nulla quis lorem ut libero malesuada feugiat.</p>
            </div>
        </div>
    </div>
{/if}

