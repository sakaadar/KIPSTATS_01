<script lang="ts">
    import type { Item } from "$lib/stores/items";
    import "$lib/styles/items.css";

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

    let selectedType: "All" | "AD" | "AP" = "All";
    let showAS = false;

    let expandedItems = new Set<number>();
    let fabOpen = false;

    $: filteredItems = allItems.filter(item => {
        const typeMatch = selectedType === "All" || item.type === selectedType;
        const asMatch = !showAS || item.hasAS;
        return typeMatch && asMatch;
    });

    function toggleItem(id: number): void {
        expandedItems.has(id) ? expandedItems.delete(id) : expandedItems.add(id);
        expandedItems = new Set(expandedItems);
    }

    function setType(type: "All" | "AD" | "AP"): void {
        selectedType = type;
    }
</script>

<div class="items-page">
    <h1 class="page-title">Items</h1>

    <ol class="items-list">
        {#each filteredItems as item (item.id)}
            <li class="item-row">
                <img src={item.image} alt={item.name} class="item-row-image" />

                <button
                        class="item-row-name"
                        on:click={() => toggleItem(item.id)}
                        aria-expanded={expandedItems.has(item.id)}
                >
                    <span>{item.name}</span>
                    <span class="chevron">{expandedItems.has(item.id) ? "▲" : "▼"}</span>
                </button>

                {#if expandedItems.has(item.id)}
                    <div class="item-details">
                        <h4>Description</h4>
                        <p>Lorem ipsum dolor sit amet.</p>

                        <h4>Stats</h4>
                        <p>+50 AD<br />+30% AS</p>
                    </div>
                {/if}
            </li>
        {/each}
    </ol>

    <div class="fab-container">
        {#if fabOpen}
            <div class="fab-options">
                <button
                        class="fab-option"
                        class:active={selectedType === "All" && !showAS}
                        on:click={() => { selectedType = "All"; showAS = false; }}
                >🧩</button>

                <button
                        class="fab-option"
                        class:active={selectedType === "AD"}
                        on:click={() => { setType("AD"); showAS = false; }}
                >⚔️</button>

                <button
                        class="fab-option"
                        class:active={selectedType === "AP"}
                        on:click={() => { setType("AP"); showAS = false; }}
                >🔮</button>

                <button
                        class="fab-option"
                        class:active={showAS}
                        on:click={() => showAS = !showAS}
                >⚡</button>
            </div>
        {/if}

        <button class="fab-main" on:click={() => fabOpen = !fabOpen}>
            {fabOpen ? "×" : "☰"}
        </button>
    </div>
</div>
