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
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2.5rem;
        background: linear-gradient(to bottom, #5b61c8, #4b51b3);
        border-bottom: 1px solid #333;
    }
    .links{
        display: flex;
        gap: 5rem;
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