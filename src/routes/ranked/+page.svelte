<script lang="ts">
    import '$lib/styles/ranked.css';

    const DDRAGON_VERSION = '14.19.1';

    const ranks = [
        {
            queue: 'Ranked Solo/Duo',
            tier: 'Platinum',
            division: 'II',
            lp: 64,
            wins: 132,
            losses: 118,
            emblem: 'Platinum'
        },
        {
            queue: 'Ranked Flex',
            tier: 'Gold',
            division: 'I',
            lp: 21,
            wins: 54,
            losses: 47,
            emblem: 'Gold'
        }
    ];

    const emblemUrl = (tier: string) =>
        `https://ddragon.leagueoflegends.com/cdn/img/ranked-emblems/Emblem_${tier}.png`;
</script>

<h1 class="title">Ranked Overview</h1>

<div class="ranked-container">
    {#each ranks as rank}
        <div class="rank-card">
            <img class="emblem" src={emblemUrl(rank.emblem)} alt={rank.tier} />

            <div class="info">
                <h2>{rank.queue}</h2>
                <p class="tier">{rank.tier} {rank.division}</p>
                <p class="lp">{rank.lp} LP</p>
                <p class="wl">{rank.wins}W / {rank.losses}L</p>
            </div>
        </div>
    {/each}
</div>
