<script>
  import { page } from '$app/stores';

  const navLinks = [
    { href: '/champions', label: 'Champions' },
    { href: '/items', label: 'Items' }
  ];

  let showModal = false;
  let riotKey = '';

  $: currentPath = $page.url.pathname;

  const openModal = () => (showModal = true);
  const closeModal = () => (showModal = false);

  const handleSubmit = () => {
    if (!riotKey.trim()) return;
    console.log("Riot API Key:", riotKey);
    closeModal();
  };
</script>

<nav class="navbar">
  <div class="logo">IntStats</div>

  <div class="nav-links">
    {#each navLinks as link}
      <a
              href={link.href}
              class="nav-link {currentPath === link.href ? 'active' : ''}"
      >
        {link.label}
      </a>
    {/each}

    <button class="nav-link user-btn" on:click|preventDefault={openModal}>
      User
    </button>
  </div>
</nav>

{#if showModal}
  <div class="modal-backdrop" on:click={closeModal}>
    <div
            class="modal-content"
            role="dialog"
            aria-modal="true"
            on:click|stopPropagation
            tabindex="-1"
    >
      <h2>Enter Your Riot API Key</h2>

      <div class="input-group">
        <label for="riot-key">Riot Key</label>
        <input
                id="riot-key"
                type="text"
                bind:value={riotKey}
                placeholder="RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                autofocus
        />
      </div>

      <div class="modal-actions">
        <button class="cancel-btn" on:click={closeModal}>Cancel</button>
        <button class="submit-btn" on:click={handleSubmit}>Enter</button>
      </div>
    </div>
  </div>
{/if}

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
  }

  .nav-links {
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }

  .nav-link {
    padding: 0.55rem 1.25rem;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.9rem;
    text-decoration: none;
    background: none;
    border: 1px solid transparent;
    color: #e5e7eb;
    transition: 150ms ease;
  }

  .nav-link:hover {
    background: rgba(96, 165, 250, 0.12);
    border-color: rgba(96, 165, 250, 0.22);
  }

  .nav-link.active {
    background: rgba(96, 165, 250, 0.2);
    border-color: rgba(96, 165, 250, 0.5);
    color: #60a5fa;
  }

  /* MODAL */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    z-index: 3000;
    animation: fadeIn 0.2s ease;
  }

  .modal-content {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(17, 24, 39, 0.95));
    border: 1px solid rgba(60, 89, 130, 0.5);
    border-radius: 12px;
    padding: 2rem;
    max-width: 480px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
    animation: scaleIn 0.2s ease;
  }

  .modal-content h2 {
    margin-bottom: 1.25rem;
    text-align: center;
    color: #f5f5f5;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1.25rem;
  }

  .input-group label {
    color: #9ca3af;
    font-size: 0.9rem;
  }

  input {
    padding: 0.75rem 1rem;
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(96, 165, 250, 0.3);
    border-radius: 6px;
    color: #f5f5f5;
    font-family: monospace;
    transition: 0.2s ease;
  }

  input:focus {
    outline: none;
    border-color: #60a5fa;
    background: rgba(30, 41, 59, 0.8);
  }

  input::placeholder {
    color: rgba(156, 163, 175, 0.5);
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
  }

  .cancel-btn,
  .submit-btn {
    padding: 0.75rem 1.4rem;
    border-radius: 6px;
    cursor: pointer;
    border: 1px solid transparent;
    font-size: 0.9rem;
    transition: 0.2s ease;
  }

  .cancel-btn {
    background: rgba(107, 114, 128, 0.18);
    border-color: rgba(107, 114, 128, 0.4);
    color: #d1d5db;
  }

  .cancel-btn:hover {
    background: rgba(107, 114, 128, 0.28);
  }

  .submit-btn {
    background: rgba(96, 165, 250, 0.18);
    border-color: rgba(96, 165, 250, 0.5);
    color: #60a5fa;
  }

  .submit-btn:hover {
    background: rgba(96, 165, 250, 0.28);
  }

  /* ANIMATIONS */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from { transform: scale(0.93); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }

</style>