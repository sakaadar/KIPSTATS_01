<script>
  import { page } from "$app/stores";

    const links = [
        {href: '/', label: "Meta" },
        {href: '/game-modes', label: "Game Modes" },
        {href: '/champions', label: "Champions" },
        {href: '/leaderboard', label: "Leaderboard" }
    ];

     $: currentPath = $page.url.pathname;
</script>

<nav class="navbar">
 <div class="navbar-inner">
  <div class="logo">IntStats</div>

  <div class="links">
   {#each links as link}
   <a 
     href={link.href}
     class:selected={
        currentPath === link.href ||
        (link.href !== "/" && currentPath.startsWith(link.href))
     }
     >
     {link.label}
    </a>
    {/each}
  </div>
</div>
</nav>

<style>
    .navbar {
        position: sticky;
        top: 0;
        z-index: 20;
        background: 
                linear-gradient(
                    135deg,
                    rgba(15, 23, 42, 0.98),
                    rgba(17, 24, 39, 0.98)
                );
        box-shadow: 0 12px 30px rgba(15,23, 42, 0.7);
    }
    .navbar-inner{
        max-width: 1600px;
        margin: 0 auto;
        padding: 0.9rem 1.75rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
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