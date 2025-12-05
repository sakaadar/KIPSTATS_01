<script lang="ts">
    // Mock item data - replace with real data from DDragon later
    const allItems = [
        { id: 1, name: "Blade of the Ruined King", type: "AD", hasAS: true, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3153.png" },
        { id: 2, name: "Infinity Edge", type: "AD", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3031.png" },
        { id: 3, name: "Rabadon's Deathcap", type: "AP", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3089.png" },
        { id: 4, name: "Guardian Angel", type: "AD", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3026.png" },
        { id: 5, name: "Thornmail", type: "AD", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3075.png" },
        { id: 6, name: "Trinity Force", type: "AD", hasAS: true, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3078.png" },
        { id: 7, name: "Black Cleaver", type: "AD", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3071.png" },
        { id: 8, name: "Morellonomicon", type: "AP", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3165.png" },
        { id: 9, name: "Wit's End", type: "AD", hasAS: true, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3091.png" },
        { id: 10, name: "Runaan's Hurricane", type: "AD", hasAS: true, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3085.png" },
        { id: 11, name: "Zhonya's Hourglass", type: "AP", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3157.png" },
        { id: 12, name: "Dead Man's Plate", type: "AD", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3742.png" },
        { id: 13, name: "Warmog's Armor", type: "AD", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3083.png" },
        { id: 14, name: "Spirit Visage", type: "AD", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3065.png" },
        { id: 15, name: "Bloodthirster", type: "AD", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3072.png" },
        { id: 16, name: "Lich Bane", type: "AP", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3100.png" },
        { id: 17, name: "Nashor's Tooth", type: "AP", hasAS: true, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3115.png" },
        { id: 18, name: "Void Staff", type: "AP", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3135.png" },
        { id: 19, name: "Phantom Dancer", type: "AD", hasAS: true, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/3046.png" },
        { id: 20, name: "Luden's Tempest", type: "AP", hasAS: false, image: "https://ddragon.leagueoflegends.com/cdn/13.24.1/img/item/6653.png" },
    ];

    let selectedType = "All"; // All, AD, or AP
    let showAS = false; // Attack Speed filter
    let selectedItem: any = null;

    $: filteredItems = allItems.filter(item => {
        const typeMatch = selectedType === "All" || item.type === selectedType;
        const asMatch = !showAS || item.hasAS;
        return typeMatch && asMatch;
    });

    function openItemModal({item}: { item: any }) {
        selectedItem = item;
    }

    function closeModal() {
        selectedItem = null;
    }
</script>

<div class="items-page">
    <h1 class="page-title">Items</h1>

    <!-- Item Filters -->
    <div class="item-filters">
        <div class="type-filter">
            <button
                    class="filter-btn"
                    class:active={selectedType === "All"}
                    on:click={() => selectedType = "All"}
            >
                All
            </button>
            <button
                    class="filter-btn ad"
                    class:active={selectedType === "AD"}
                    on:click={() => selectedType = "AD"}
            >
                AD
            </button>
            <button
                    class="filter-btn ap"
                    class:active={selectedType === "AP"}
                    on:click={() => selectedType = "AP"}
            >
                AP
            </button>
        </div>

        <button
                class="as-filter-btn"
                class:active={showAS}
                on:click={() => showAS = !showAS}
        >
            AS
        </button>
    </div>

    <!-- Items Grid -->
    <div class="items-grid">
        {#each filteredItems as item (item.id)}
            <div class="item-card" on:click={() => openItemModal({item : item})}>
                <div class="item-image-wrapper">
                    <img src={item.image} alt={item.name} class="item-image" />
                    <div class="item-overlay">
                        <span class="view-details">View Details</span>
                    </div>
                </div>
                <h3 class="item-name">{item.name}</h3>
            </div>
        {/each}
    </div>
</div>

<!-- Item Detail Modal -->
{#if selectedItem}
    <div class="modal-backdrop" on:click={closeModal}>
        <div class="modal-content" on:click|stopPropagation>
            <button class="close-btn" on:click={closeModal}>×</button>

            <div class="modal-header">
                <img src={selectedItem.image} alt={selectedItem.name} class="modal-item-image" />
                <h2>{selectedItem.name}</h2>
            </div>

            <div class="modal-body">
                <h3>Description</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>

                <h3>Stats</h3>
                <p>+50 Attack Damage<br>+30% Attack Speed<br>+20% Critical Strike Chance</p>

                <h3>Passive</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
        </div>
    </div>
{/if}

<style>
    .items-page {
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

    .item-filters {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        flex-wrap: wrap;
        align-items: center;
    }

    .type-filter {
        display: flex;
        gap: 0.5rem;
        background: rgba(30, 41, 59, 0.4);
        padding: 0.25rem;
        border-radius: 8px;
        border: 1px solid rgba(96, 165, 250, 0.3);
    }

    .filter-btn {
        padding: 0.6rem 1.5rem;
        background: transparent;
        border: none;
        border-radius: 6px;
        color: #e5e7eb;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .filter-btn:hover {
        background: rgba(96, 165, 250, 0.15);
    }

    .filter-btn.active {
        background: rgba(96, 165, 250, 0.3);
        color: #60a5fa;
    }

    .filter-btn.ad.active {
        background: rgba(239, 68, 68, 0.3);
        color: #ef4444;
    }

    .filter-btn.ap.active {
        background: rgba(139, 92, 246, 0.3);
        color: #a78bfa;
    }

    .as-filter-btn {
        padding: 0.6rem 1.5rem;
        background: rgba(96, 165, 250, 0.1);
        border: 1px solid rgba(96, 165, 250, 0.3);
        border-radius: 6px;
        color: #e5e7eb;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s;
    }

    .as-filter-btn:hover {
        background: rgba(96, 165, 250, 0.2);
        border-color: rgba(96, 165, 250, 0.5);
    }

    .as-filter-btn.active {
        background: rgba(34, 197, 94, 0.3);
        border-color: #22c55e;
        color: #22c55e;
    }

    .items-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 1.5rem;
    }

    .item-card {
        cursor: pointer;
        transition: transform 0.2s;
        text-align: center;
    }

    .item-card:hover {
        transform: translateY(-8px);
    }

    .item-image-wrapper {
        position: relative;
        aspect-ratio: 1;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 0.75rem;
        background: rgba(30, 41, 59, 0.6);
        border: 2px solid rgba(96, 165, 250, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .item-image {
        width: 80%;
        height: 80%;
        object-fit: contain;
    }

    .item-overlay {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.8);
        opacity: 0;
        transition: opacity 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .item-card:hover .item-overlay {
        opacity: 1;
    }

    .view-details {
        color: #60a5fa;
        font-weight: 600;
        font-size: 0.9rem;
    }

    .item-name {
        font-size: 0.95rem;
        font-weight: 600;
        margin: 0;
        color: #f5f5f5;
        line-height: 1.3;
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
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2rem;
        border-bottom: 1px solid rgba(60, 89, 130, 0.3);
    }

    .modal-item-image {
        width: 120px;
        height: 120px;
        object-fit: contain;
        margin-bottom: 1rem;
        padding: 1rem;
        background: rgba(30, 41, 59, 0.6);
        border: 2px solid rgba(96, 165, 250, 0.4);
        border-radius: 8px;
    }

    .modal-header h2 {
        margin: 0;
        font-size: 1.6rem;
        color: #f5f5f5;
        text-align: center;
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
        margin: 0;
    }

    @media (max-width: 1200px) {
        .items-grid {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    @media (max-width: 768px) {
        .items-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
        }
    }

    @media (max-width: 480px) {
        .items-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }
</style>