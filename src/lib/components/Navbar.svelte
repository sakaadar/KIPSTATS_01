<script>
    const links = [
        {href: '/', label: "Meta" },
        {href: '/game-modes', label: "Game Modes" },
        {href: '/champions', label: "Champions" },
        {href: '/leaderboard', label: "Leaderboard" }
    ]
</script>

<nav class="navbar">
  <div class="logo">IntStats</div>

  <div class="links">
    {#each links as link}
      <a href={link.href}>{link.label}</a>
    {/each}
  </div>
</nav>

<style>
    .navbar {
        height: 45px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2.5rem;
        border-bottom: 1px solid #333;
    }
    .links{
        display: flex;
        gap: 5rem;
        font-size: 0.9rem;
    }
    .links a{
        text-decoration: solid;
        color: inherit;
        opacity: 0.5;
    }
    .links a:hover, .links a:focus{
        opacity: 1;
        text-decoration: none;
    }
</style>