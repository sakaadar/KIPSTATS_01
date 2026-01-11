<script lang="ts">
    import '$lib/styles/tierList.css';

    const DDRAGON_VERSION = '14.19.1';

    const regions = ['KR', 'EUW', 'EUNE', 'NA', 'CN'];
    const ranks = ['All Ranks', 'Challenger', 'Diamond', 'Platinum', 'Emerald', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Iron'];

    let selectedRegion = 'KR';
    let selectedRank = 'All Ranks';

    type Tier = 'S' | 'A' | 'B' | 'C';

    const champions = [
        'Ahri', 'Jinx', 'LeeSin', 'Orianna', 'Darius',
        'Ezreal', 'Lux', 'Garen', 'Vayne', 'Teemo',
        'Nasus', 'Tryndamere'
    ];

    const champIcon = (champ: string) =>
        `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${champ}.png`;

    const r = (max: number) => Math.floor(Math.random() * max);

    function generateTierList(region: string, rank: string): Record<Tier, string[]> {
        // deterministic-ish variation per region + rank
        const shuffled = [...champions].sort(() => 0.5 - Math.random());

        return {
            S: shuffled.slice(0, 3),
            A: shuffled.slice(3, 6),
            B: shuffled.slice(6, 9),
            C: shuffled.slice(9, 12)
        };
    }

    $: tierList = generateTierList(selectedRegion, selectedRank);
</script>

<h1 class="title">Champion Tier List</h1>

<div class="controls">
    <div class="control-group">
        <label>Region</label>
        <select bind:value={selectedRegion}>
            {#each regions as r}
                <option value={r}>{r}</option>
            {/each}
        </select>
    </div>

    <div class="control-group">
        <label>Rank</label>
        <select bind:value={selectedRank}>
            {#each ranks as r}
                <option value={r}>{r}</option>
            {/each}
        </select>
    </div>
</div>

<div class="tiers">
    {#each Object.entries(tierList) as [tier, champs]}
        <div class="tier-row tier-{tier}">
            <div class="tier-label">{tier}</div>

            <div class="champions">
                {#each champs as champ}
                    <div class="champ-card">
                        <img
                                class="champ-icon"
                                src={champIcon(champ)}
                                alt={champ}
                        />
                        <span>{champ}</span>
                    </div>
                {/each}
            </div>
        </div>
    {/each}
</div>
