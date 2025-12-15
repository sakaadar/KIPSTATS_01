<script lang="ts">

    import type { Item} from "$lib/stores/items";
    import '$lib/styles/items.css';

    // Mock item data
    const allItems: Item[] = [
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

    let selectedType = "AD";
    let showAS = false;
    let selectedItem: Item | null = null;

    $: filteredItems = allItems.filter((item: Item) => {
        const typeMatch = selectedType === "All" || item.type === selectedType;
        const asMatch = !showAS || item.hasAS;
        return typeMatch && asMatch;
    });

    function openItemModal(item: Item) {
        selectedItem = item;
    }

    function closeModal() {
        selectedItem = null;
    }

    function toggleADorAP() {
        selectedType = selectedType === "AD" ? "AP" : "AD";
    }

    function handleToggleKeydown(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleADorAP();
        }
    }
</script>

<div class="items-page">
    <h1 class="page-title">Items</h1>

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
                    class="toggle-switch"
                    on:click={toggleADorAP}
                    on:keydown={handleToggleKeydown}
                    aria-label="Toggle between AD and AP items"
            >
                <div class="toggle-track" class:ad={selectedType === "AD"} class:ap={selectedType === "AP"}>
                    <span class="toggle-label ad-label" class:hidden={selectedType === 'AP'}>AD</span>
                    <span class="toggle-label ap-label" class:hidden={selectedType === 'AD'}>AP</span>
                    <div class="toggle-thumb"></div>
                </div>
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

    <div class="items-grid">
        {#each filteredItems as item (item.id)}
            <button class="item-card" on:click={() => openItemModal(item)}>

                <div class="item-image-wrapper">
                    <img src={item.image} alt={item.name} class="item-image" />

                    <div class="item-overlay">
                        <span class="view-details">View Details</span>
                    </div>
                </div>
                <div class="item-name-banner">
                    {item.name}
                </div>

            </button>
        {/each}
    </div>


    {#if selectedItem}
    <div class="modal-backdrop" on:click={closeModal} role="presentation">
        <div class="modal-content" on:click|stopPropagation role="dialog" aria-modal="true" aria-labelledby="modal-title" tabindex="-1">
            <button class="close-btn" on:click={closeModal} aria-label="Close modal">×</button>

            <div class="modal-header">
                <img src={selectedItem.image} alt={selectedItem.name} class="modal-item-image" />
                <h2 id="modal-title">{selectedItem.name}</h2>
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
</div>