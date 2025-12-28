<script lang="ts">
    import '$lib/styles/matchHistory.css';
    import type { Match, Player } from '$lib/stores/matchHistory';

    const DDRAGON_VERSION = '14.19.1';

    const champIcon = (champ: string) =>
        `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${champ}.png`;

    const itemIcon = (id: number) =>
        `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/item/${id}.png`;

    let expanded: number | null = null;

    const mockMatches: Match[] = Array.from({ length: 20 }, (_, i) => ({
        queue: 'Solo/Duo',
        champion: 'Darius',
        kda: '6 / 9 / 0',
        result: i % 2 === 0 ? 'Loss' : 'Win',
        lp: i % 2 === 0 ? -24 : +21,
        placement: '9th',
        items: [3071, 3111, 3053, 3742, 3065, 3047],
        date: '4d ago',
        team: Array.from({ length: 10 }, (_, p) => ({
            name: `Player${p + 1}`,
            champion: ['Darius', 'Ahri', 'Jinx', 'LeeSin', 'Orianna'][p % 5],
            kda: `${Math.floor(Math.random() * 10)} / ${Math.floor(Math.random() * 8)} / ${Math.floor(Math.random() * 12)}`,
            items: [3071, 3111, 3053, 3742, 3065, 3047]
        }))
    }));

    function toggle(i: number) {
        expanded = expanded === i ? null : i;
    }
</script>

<h1 class="title">Match History</h1>

<ol class="match-list">
    {#each mockMatches as match, i}
        <li class="match {match.result.toLowerCase()}">
            <button class="match-row" on:click={() => toggle(i)}>
                <div class="left">
                    <img
                            class="champion-icon"
                            src={champIcon(match.champion)}
                            alt={match.champion}
                    />

                    <div class="info">
                        <span class="queue">{match.queue}</span>
                        <span class="date">{match.date}</span>
                        <span class="kda">{match.kda} <small>KDA</small></span>
                        <span class="tag">Very bad Team</span>
                    </div>
                </div>

                <div class="items">
                    {#each match.items as id}
                        <img class="item-slot" src={itemIcon(id)} alt="item" />
                    {/each}
                </div>

                <div class="right">
                    <span class="lp">{match.lp} LP</span>
                    <span class="place">{match.placement}</span>
                    <span class="arrow">{expanded === i ? '▲' : '▼'}</span>
                </div>
            </button>

            {#if expanded === i}
                <div class="expanded">
                    <h4>All Players</h4>
                    <ul class="team">
                        {#each match.team as p}
                            <li>
                                <img
                                        class="champion-icon small"
                                        src={champIcon(p.champion)}
                                        alt={p.champion}
                                />

                                <span>{p.name}</span>
                                <span class="kda">{p.kda}</span>

                                <span class="items">
                  {#each p.items as id}
                    <img class="item-slot small" src={itemIcon(id)} alt="item" />
                  {/each}
                </span>
                            </li>
                        {/each}
                    </ul>
                </div>
            {/if}
        </li>
    {/each}
</ol>
