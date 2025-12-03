<script>
    const links = [
        {href: '/', label: "Meta" },
        {href: '/game-modes', label: "Game Modes" },
        {href: '/champions', label: "Champions" },
        {href: '/leaderboard', label: "Leaderboard" }
    ]
</script>

<nav class="navbar">
  <div class="logo">InStats</div>

  <div class="links">
    {#each links as link}
      <a href={link.href}>{link.label}</a>
    {/each}
  </div>
</nav>

<style>
    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem 1.5rem;
        border-bottom: 1px solid #333;
        color: #f5f5f5;
    }
    .links{
        display: flex;
        gap: 1rem;
        font-size: 0.9rem;
    }
    .links a{
        text-decoration: none;
        color: inherit;
        opacity: 0.8;
    }
    .links a:hover, .links a:focus{
        opacity: 1;
        text-decoration: underline;
    }
</style>