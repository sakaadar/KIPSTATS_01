<script lang="ts">
    type Champion = {
        id: number;
        name: string;
        role: string;
        image: string;
    };

    // Mock champion data - replace with real data from DDragon later
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

    const roles = ["All", "Top", "Jungle", "Mid", "ADC", "Support"];
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
                    class:active={selectedRole === role}
                    on:click={() => selectedRole = role}
            >
                {role}
            </button>
        {/each}
    </div>

    <!-- Champions Grid -->
    <div class="champions-grid">
        {#each filteredChampions as champion (champion.id)}
            <div class="champion-card" on:click={() => openChampionModal(champion)}>
                <div class="champion-image-wrapper">
                    <img src={champion.image} alt={champion.name} class="champion-image" />
                    <div class="champion-overlay">
                        <span class="view-details">View Details</span>
                    </div>
                </div>
                <h3 class="champion-name">{champion.name}</h3>
                <span class="champion-role">{champion.role}</span>
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

<style>
    .champions-page {
        width: 100%;
    }

    .page-title {
        font-size: 2rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        background: linear-gradient(135deg, #60a5fa, #a78bfa);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    .role-filter {
        display: flex;
        gap: 0.75rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
    }

    .role-btn {
        padding: 0.6rem 1.5rem;
        background: rgba(96, 165, 250, 0.1);
        border: 1px solid rgba(96, 165, 250, 0.3);
        border-radius: 6px;
        color: #e5e7eb;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .role-btn:hover {
        background: rgba(96, 165, 250, 0.2);
        border-color: rgba(96, 165, 250, 0.5);
    }

    .role-btn.active {
        background: rgba(96, 165, 250, 0.3);
        border-color: #60a5fa;
        color: #60a5fa;
    }

    .champions-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
    }

    .champion-card {
        cursor: pointer;
        transition: transform 0.2s;
    }

    .champion-card:hover {
        transform: translateY(-8px);
    }

    .champion-image-wrapper {
        position: relative;
        aspect-ratio: 3/4;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 0.75rem;
        background: rgba(30, 41, 59, 0.6);
        border: 2px solid rgba(96, 165, 250, 0.3);
    }

    .champion-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
    }

    .champion-overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.9), transparent 50%);
        opacity: 0;
        transition: opacity 0.3s;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 1rem;
    }

    .champion-card:hover .champion-overlay {
        opacity: 1;
    }

    .view-details {
        color: #60a5fa;
        font-weight: 600;
        font-size: 0.9rem;
    }

    .champion-name {
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 0.25rem 0;
        color: #f5f5f5;
    }

    .champion-role {
        font-size: 0.85rem;
        color: #9ca3af;
    }

    /* Modal Styles */
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        padding: 2rem;
    }

    .modal-content {
        background: linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(17, 24, 39, 0.98));
        border: 1px solid rgba(60, 89, 130, 0.5);
        border-radius: 12px;
        max-width: 600px;
        width: 100%;
        max-height: 80vh;
        overflow-y: auto;
        position: relative;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
    }

    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(239, 68, 68, 0.2);
        border: 1px solid rgba(239, 68, 68, 0.4);
        color: #ef4444;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
        z-index: 10;
    }

    .close-btn:hover {
        background: rgba(239, 68, 68, 0.3);
        transform: scale(1.1);
    }

    .modal-header {
        position: relative;
        height: 300px;
        border-radius: 12px 12px 0 0;
        overflow: hidden;
    }

    .modal-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center top;
    }

    .modal-title-section {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1.5rem;
        background: linear-gradient(to top, rgba(0,0,0,0.95), transparent);
    }

    .modal-title-section h2 {
        margin: 0 0 0.5rem 0;
        font-size: 1.8rem;
        color: #f5f5f5;
    }

    .modal-role {
        color: #60a5fa;
        font-size: 0.9rem;
        font-weight: 600;
    }

    .modal-body {
        padding: 2rem;
    }

    .modal-body h3 {
        color: #60a5fa;
        margin: 1.5rem 0 0.75rem 0;
        font-size: 1.1rem;
    }

    .modal-body h3:first-child {
        margin-top: 0;
    }

    .modal-body p {
        color: #d1d5db;
        line-height: 1.6;
        margin: 0 0 0.75rem 0;
    }

    .modal-body p strong {
        color: #60a5fa;
    }

    @media (max-width: 1200px) {
        .champions-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 768px) {
        .champions-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
    }

    @media (max-width: 480px) {
        .champions-grid {
            grid-template-columns: 1fr;
        }
    }
</style>