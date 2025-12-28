<script lang="ts">
    import '$lib/styles/tierList.css';

    const DDRAGON_VERSION = '14.19.1';

    type Tier = 'S' | 'A' | 'B' | 'C';

    const tierList: Record<Tier, string[]> = {
        S: ['Ahri', 'Jinx', 'LeeSin'],
        A: ['Orianna', 'Darius', 'Ezreal'],
        B: ['Lux', 'Garen', 'Vayne'],
        C: ['Teemo', 'Nasus', 'Tryndamere']
    };

    const champIcon = (champ: string) =>
        `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}/img/champion/${champ}.png`;
</script>

<h1 class="title">Champion Tier List</h1>

<div class="tiers">
    {#each Object.entries(tierList) as [tier, champs]}
        <div class="tier-row tier-{tier}">
            <div class="tier-label">{tier}</div>

            <div class="champions">
                {#each champs as champ}
                    <img
                            class="champ-icon"
                            src={champIcon(champ)}
                            alt={champ}
                            title={champ}
                    />
                {/each}
            </div>
        </div>
    {/each}
</div>
