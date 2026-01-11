<script lang="ts">
    import '$lib/styles/matchHistory.css';

    const DDRAGON_VERSION = '14.19.1';

    const champIcon = (champ: string) =>
        `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${champ}.png`;

    const itemIcon = (id: number) =>
        `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/item/${id}.png`;

    let expanded: number | null = null;

    const champions = ['Darius', 'Ahri', 'Jinx', 'LeeSin', 'Orianna', 'Thresh', 'Garen'];
    const itemPools = [
        [3071, 3111, 3053, 3742, 3065, 3047],
        [6672, 3006, 3031, 3094, 3085, 1038],
        [6655, 3020, 3165, 3157, 3089, 1058]
    ];

    const r = (max: number) => Math.floor(Math.random() * max);

    const mockMatches = Array.from({ length: 12 }, (_, i) => {
        const win = Math.random() > 0.5;

        const player = (name: string, you = false) => ({
            name,
            champion: champions[r(champions.length)],
            kills: r(12),
            deaths: r(9),
            assists: r(18),
            items: itemPools[r(itemPools.length)],
            isYou: you
        });

        return {
            queue: i % 2 ? 'Ranked Solo/Duo' : 'Normal Draft',
            champion: 'Darius',
            result: win ? 'Win' : 'Loss',
            lp: win ? +21 : -19,
            kills: r(10),
            deaths: r(8),
            assists: r(14),
            cs: 170 + r(90),
            duration: `${28 + r(15)}m`,
            date: `${1 + r(6)}d ago`,
            items: itemPools[r(itemPools.length)],
            blueTeam: Array.from({ length: 5 }, (_, p) =>
                player(p === 0 ? 'You' : `Blue${p}`, p === 0)
            ),
            redTeam: Array.from({ length: 5 }, (_, p) =>
                player(`Red${p}`)
            )
        };
    });

    function toggle(i: number) {
        expanded = expanded === i ? null : i;
    }
</script>

<h1 class="title">Match History</h1>

<ol class="match-list">
    {#each mockMatches as match, i}
        <li class="match {match.result.toLowerCase()}">
            <button class="match-row" on:click={() => toggle(i)}>
                <div class="summary">
                    <img class="champion-icon" src={champIcon(match.champion)} />

                    <div class="stats">
                        <span class="result">{match.result}</span>
                        <span class="queue">{match.queue}</span>
                        <span class="kda">
                            {match.kills}/{match.deaths}/{match.assists}
                        </span>
                        <span class="cs">{match.cs} CS</span>
                        <span class="duration">{match.duration}</span>
                    </div>

                    <div class="items">
                        {#each match.items as id}
                            <img class="item-slot" src={itemIcon(id)} />
                        {/each}
                    </div>

                    <div class="right">
                        <span class="lp">{match.lp > 0 ? `+${match.lp}` : match.lp} LP</span>
                        <span class="date">{match.date}</span>
                        <span class="arrow">{expanded === i ? '▲' : '▼'}</span>
                    </div>
                </div>
            </button>

            {#if expanded === i}
                <div class="expanded">
                    <div class="teams">
                        <ul class="team blue">
                            {#each match.blueTeam as p}
                                <li class:you={p.isYou}>
                                    <img src={champIcon(p.champion)} />
                                    <span>{p.name}</span>
                                    <span>{p.kills}/{p.deaths}/{p.assists}</span>
                                </li>
                            {/each}
                        </ul>

                        <ul class="team red">
                            {#each match.redTeam as p}
                                <li>
                                    <img src={champIcon(p.champion)} />
                                    <span>{p.name}</span>
                                    <span>{p.kills}/{p.deaths}/{p.assists}</span>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/if}
        </li>
    {/each}
</ol>
