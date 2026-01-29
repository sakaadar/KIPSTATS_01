<script lang="ts">
    import { mockUser } from '$lib/stores/user';
    import '$lib/styles/user.css';

    // DDragon URLs (using latest version)
    const DDRAGON_VERSION = '14.1.1';
    const DDRAGON_BASE = `https://ddragon.leagueoflegends.com/cdn/${DDRAGON_VERSION}`;

    // Filter state
    let selectedFilter: string = 'All';

    // Filtered matches based on selected filter
    $: filteredMatches = selectedFilter === 'All'
        ? mockUser.matches
        : mockUser.matches.filter(match => match.gameMode === selectedFilter);

    function setFilter(filter: string) {
        selectedFilter = filter;
    }

    function getChampionIcon(championId: string): string {
        // Map champion IDs to names (simplified - in production use champion.json)
        const championMap: Record<string, string> = {
            '22': 'Ashe',
            '238': 'Zed',
            '103': 'Ahri',
            '222': 'Jinx',
            '99': 'Lux',
            '157': 'Yasuo',
            '21': 'MissFortune',
            '55': 'Katarina',
            '81': 'Ezreal',
            '112': 'Viktor',
            '4': 'TwistedFate',
            '64': 'LeeSin',
            '134': 'Syndra'
        };
        const champName = championMap[championId] || 'Ashe';
        return `${DDRAGON_BASE}/img/champion/${champName}.png`;
    }

    function getItemIcon(itemId: number): string {
        return `${DDRAGON_BASE}/img/item/${itemId}.png`;
    }

    function getSummonerSpellIcon(spellId: number): string {
        const spellMap: Record<number, string> = {
            4: 'SummonerFlash',
            14: 'SummonerDot',
            7: 'SummonerHeal',
            21: 'SummonerBarrier',
            3: 'SummonerExhaust',
            1: 'SummonerBoost',
            6: 'SummonerHaste',
            12: 'SummonerTeleport',
            11: 'SummonerSmite'
        };
        return `${DDRAGON_BASE}/img/spell/${spellMap[spellId] || 'SummonerFlash'}.png`;
    }

    function getProfileIcon(iconId: number): string {
        return `${DDRAGON_BASE}/img/profileicon/${iconId}.png`;
    }

    // Calculate winrate circle
    function getWinrateCircle(winrate: number) {
        const circumference = 2 * Math.PI * 40; // radius = 40
        const offset = circumference - (winrate / 100) * circumference;
        return { circumference, offset };
    }

    const { circumference, offset } = getWinrateCircle(mockUser.winrate);
</script>

<section class="user-dashboard">
    <!-- Profile Header -->
    <header class="profile-header">
        <div class="profile-icon-container">
            <img
                    src={getProfileIcon(mockUser.profileIconId)}
                    alt="Profile Icon"
                    class="profile-icon"
            />
            <div class="profile-level">{mockUser.level}</div>
        </div>

        <div class="profile-info">
            <h1 class="summoner-name">
                {mockUser.name}
                <span class="summoner-tag">{mockUser.tag}</span>
                <span class="region-badge">{mockUser.region}</span>
            </h1>
            <button class="update-btn">🔄 Update now</button>
        </div>
    </header>

    <!-- Navigation Tabs -->
    <nav class="nav-tabs">
        <button class="tab active">Overview</button>
        <button class="tab">Ranked</button>
        <button class="tab">Champions</button>
        <button class="tab">ARAM</button>
        <button class="tab">Live</button>
    </nav>

    <!-- Main Dashboard Content -->
    <div class="dashboard-content">
        <!-- Left Sidebar -->
        <aside class="left-sidebar">
            <!-- Ranked Card -->
            <div class="ranked-card">
                <div class="ranked-header">
                    <span>🏆</span>
                    <h3>Ranked Solo</h3>
                </div>

                <div class="rank-display">
                    <div class="rank-icon">
                        {mockUser.tier[0]}
                    </div>
                    <div class="rank-details">
                        <div class="rank-tier">{mockUser.rank}</div>
                        <div class="rank-lp">{mockUser.lp} LP</div>
                        <div class="rank-record">
                            {mockUser.wins}W - {mockUser.losses}L ({mockUser.winrate}%)
                        </div>
                    </div>
                </div>

                <div class="ladder-rank">
                    <span>LADDER RANK</span>
                    <span class="rank-number">1,282,758th (86.32%)</span>
                </div>
            </div>

            <!-- Top Champions Card -->
            <div class="champions-card">
                <h4>Top Champions (Last 30 Games)</h4>
                {#each mockUser.topChampions as champ}
                    <div class="champion-stat">
                        <img
                                src={getChampionIcon(champ.championId)}
                                alt={champ.championName}
                                class="champion-icon"
                        />
                        <div class="champion-info">
                            <div class="champion-name">{champ.championName}</div>
                            <div class="champion-stats">
                                <span class="champion-winrate">{champ.winrate}%</span>
                                <span class="champion-games">{champ.wins}W-{champ.losses}L</span>
                                <span class="champion-kda">{champ.kda} KDA</span>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        </aside>

        <!-- Right Content -->
        <main class="right-content">
            <!-- Performance Summary -->
            <section class="performance-summary">
                <h3>📊 Last 30 Games Performance</h3>
                <div class="performance-grid">
                    <div class="winrate-display">
                        <div class="winrate-circle">
                            <svg viewBox="0 0 100 100">
                                <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#1e293b"
                                        stroke-width="8"
                                />
                                <circle
                                        cx="50"
                                        cy="50"
                                        r="40"
                                        fill="none"
                                        stroke="#60a5fa"
                                        stroke-width="8"
                                        stroke-dasharray={circumference}
                                        stroke-dashoffset={offset}
                                        stroke-linecap="round"
                                />
                            </svg>
                            <div class="winrate-text">{mockUser.winrate}%</div>
                        </div>
                        <div class="winrate-label">
                            {mockUser.wins}W - {mockUser.losses}L
                        </div>
                    </div>

                    <div style="text-align: center; color: #9ca3af;">
                        <div style="font-size: 0.875rem; margin-bottom: 0.5rem;">Win Rate</div>
                        <div style="font-size: 1.5rem; font-weight: 700; color: #60a5fa;">
                            {mockUser.wins}/{mockUser.wins + mockUser.losses}
                        </div>
                    </div>

                    <div class="kda-display">
                        <div class="kda-label">KDA</div>
                        <div class="kda-value">{mockUser.overallKDA}</div>
                        <div class="kda-breakdown">10.7 / 11.2 · 21.1</div>
                    </div>
                </div>
            </section>

            <!-- Match History -->
            <section class="match-history">
                <div class="match-history-header">
                    <h3>Match History</h3>
                    <div class="filter-buttons">
                        <button
                                class="filter-btn {selectedFilter === 'All' ? 'active' : ''}"
                                on:click={() => setFilter('All')}
                        >
                            All
                        </button>
                        <button
                                class="filter-btn {selectedFilter === 'Ranked' ? 'active' : ''}"
                                on:click={() => setFilter('Ranked')}
                        >
                            Ranked
                        </button>
                        <button
                                class="filter-btn {selectedFilter === 'ARAM' ? 'active' : ''}"
                                on:click={() => setFilter('ARAM')}
                        >
                            ARAM
                        </button>
                        <button
                                class="filter-btn {selectedFilter === 'Normal' ? 'active' : ''}"
                                on:click={() => setFilter('Normal')}
                        >
                            Normal
                        </button>
                    </div>
                </div>

                {#each filteredMatches as match}
                    <div class="match-card {match.result.toLowerCase()}">
                        <!-- Date & Result -->
                        <div class="match-date-section">
                            <div class="match-date">{match.date}</div>
                            <div class="match-result">{match.result}</div>
                            <div class="match-mode">{match.gameMode}</div>
                        </div>

                        <!-- Champion & Spells -->
                        <div class="match-champion">
                            <img
                                    src={getChampionIcon(match.championId)}
                                    alt={match.champion}
                                    class="champion-portrait"
                            />
                            <div class="match-spells">
                                {#each match.spells as spell}
                                    <img
                                            src={getSummonerSpellIcon(spell)}
                                            alt="Spell"
                                            class="spell-icon"
                                    />
                                {/each}
                            </div>
                        </div>

                        <!-- Stats -->
                        <div class="match-stats-section">
                            <div class="match-kda">
                                {match.kills} / {match.deaths} / {match.assists}
                            </div>
                            <div class="match-kda-ratio">{match.kda} KDA</div>
                            <div class="match-duration">{match.duration}</div>
                        </div>

                        <!-- Items -->
                        <div class="match-items">
                            {#each match.items as item}
                                <img
                                        src={getItemIcon(item)}
                                        alt="Item"
                                        class="item-icon"
                                />
                            {/each}
                            <div class="item-icon"></div>
                        </div>

                        <!-- Result Badge -->
                        <div class="match-result-badge">
                            <div class="result-text">
                                {match.result === 'Win' ? '1 win' : '0 loss'}
                            </div>
                        </div>
                    </div>
                {/each}
            </section>
        </main>
    </div>
</section>