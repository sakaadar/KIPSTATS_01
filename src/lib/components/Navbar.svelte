<script>
  import { page } from '$app/stores';

  const navLinks = [
    { href: '/champions', label: 'Champions' },
    { href: '/items', label: 'Items' },
    { href: '/user', label: 'User' }
  ];
</script>

<nav class="navbar">
  <div class="logo">InStats</div>

  <div class="nav-links">
    {#each navLinks as link}
      <a
              href={link.href}
              class="nav-link"
              class:active={$page.url.pathname === link.href}
      >
        {link.label}
      </a>
    {/each}
  </div>
</nav>

<style>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1.5rem;
    border-bottom: 1px solid rgba(60, 89, 130, 0.4);
    color: #f5f5f5;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #60a5fa, #a78bfa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .nav-links {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .nav-link {
    padding: 0.6rem 1.5rem;
    text-decoration: none;
    color: #e5e7eb;
    font-size: 0.9rem;
    border-radius: 6px;
    transition: all 0.2s;
    border: 1px solid transparent;
  }

  .nav-link:hover {
    background: rgba(96, 165, 250, 0.15);
    border-color: rgba(96, 165, 250, 0.3);
  }

  .nav-link.active {
    background: rgba(96, 165, 250, 0.2);
    border-color: rgba(96, 165, 250, 0.5);
    color: #60a5fa;
  }
</style>