<script lang="ts">
    import '$lib/styles/ranked.css';

    const DDRAGON_VERSION = '14.19.1';

    const regions = ['KR', 'EUW', 'EUNE', 'NA', 'CN'];
    const tiers = ['Challenger', 'Grandmaster', 'Master', 'Diamond', 'Emerald', 'Platinum', 'Gold', 'Silver', 'Bronze', 'Iron' ];

    let selectedRegion = 'KR';
    let selectedTier = 'Challenger';

    const emblemUrl = (tier: string) =>
        `https://ddragon.leagueoflegends.com/cdn/img/ranked-emblems/Emblem_${tier}.png`;

    const champions = ['Darius', 'Ahri', 'Jinx', 'LeeSin', 'Orianna'];

    const r = (max: number) => Math.floor(Math.random() * max);

    function generateLeaderboard(region: string, tier: string) {
        return Array.from({ length: 15 }, (_, i) => ({
            rank: i + 1,
            summoner: `${region}_${tier}_${i + 1}`,
            champion: champions[r(champions.length)],
            lp: 1200 - i * 18 + r(10),
            wins: 300 + r(200),
            losses: 150 + r(120)
        }));
    }

    $: leaderboard = generateLeaderboard(selectedRegion, selectedTier);
</script>

<h1 class="title">Ranked Leaderboard</h1>

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
        <select bind:value={selectedTier}>
            {#each tiers as t}
                <option value={t}>{t}</option>
            {/each}
        </select>
    </div>
</div>

<div class="leaderboard-card">
    <div class="leaderboard-header">
        <img src={emblemUrl(selectedTier)} alt={selectedTier} />
        <div>
            <h2>{selectedTier}</h2>
            <span class="region">{selectedRegion} Server</span>
        </div>
    </div>

    <table class="leaderboard">
        <thead>
        <tr>
            <th>#</th>
            <th>Summoner</th>
            <th>Main</th>
            <th>LP</th>
            <th>Winrate</th>
        </tr>
        </thead>

        <tbody>
        {#each leaderboard as p}
            <tr>
                <td class="rank">{p.rank}</td>
                <td class="name">{p.summoner}</td>
                <td>
                    <img
                            class="champion-icon"
                            src={`https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${p.champion}.png`}
                            alt={p.champion}
                    />
                </td>
                <td class="lp">{p.lp}</td>
                <td class="wr">
                    {Math.round((p.wins / (p.wins + p.losses)) * 100)}%
                </td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
