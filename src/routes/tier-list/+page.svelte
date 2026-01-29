<script lang="ts">
    import '$lib/styles/tierList.css';
    import '$lib/stores/tierList';
    import {generateTierList, ranks, regions, roles, getChampionIcon} from "$lib/stores/tierList";

    let selectedRegion = 'KR';
    let selectedRank = 'All Ranks';
    let selectedRole = 'All Roles';

    $: tierList = generateTierList(selectedRegion, selectedRank, selectedRole);
    $: totalChampions = Object.values(tierList).flat().length;
</script>

<div class="tier-list-container">
    <div class="header">
        <div class="header-content">
            <h1 class="title">Champion Tier List</h1>
            <p class="subtitle">Patch 14.19 • {totalChampions} Champions</p>
        </div>
    </div>

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

        <div class="control-group">
            <label>Role</label>
            <select bind:value={selectedRole}>
                {#each roles as r}
                    <option value={r}>{r}</option>
                {/each}
            </select>
        </div>
    </div>

    <div class="legend">
        <div class="legend-item">
            <span class="legend-label">Win Rate</span>
            <span class="legend-desc">Champion win rate percentage</span>
        </div>
        <div class="legend-item">
            <span class="legend-label">Pick Rate</span>
            <span class="legend-desc">How often champion is picked</span>
        </div>
        <div class="legend-item">
            <span class="legend-label">Ban Rate</span>
            <span class="legend-desc">How often champion is banned</span>
        </div>
    </div>

    <div class="tiers">
        {#each Object.entries(tierList) as [tier, champs]}
            <div class="tier-row tier-{tier.replace('+', 'plus')}">
                <div class="tier-label-section">
                    <div class="tier-label">{tier}</div>
                    <div class="tier-count">{champs.length}</div>
                </div>

                <div class="champions">
                    {#each champs as champ}
                        <div class="champ-card">
                            <div class="champ-icon-wrapper">
                                <img
                                        class="champ-icon"
                                        src={getChampionIcon(champ.name)}
                                        alt={champ.name}
                                />
                                <div class="champ-overlay">
                                    <div class="stat">
                                        <span class="stat-label">WR</span>
                                        <span class="stat-value">{champ.winRate}%</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-label">PR</span>
                                        <span class="stat-value">{champ.pickRate}%</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-label">BR</span>
                                        <span class="stat-value">{champ.banRate}%</span>
                                    </div>
                                </div>
                            </div>
                            <span class="champ-name">{champ.name}</span>
                            <div class="champ-quick-stats">
                                <span class="quick-wr" class:high-wr={champ.winRate >= 52}>
                                    {champ.winRate}%
                                </span>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/each}
    </div>
</div>