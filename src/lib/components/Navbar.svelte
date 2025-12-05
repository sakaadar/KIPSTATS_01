<script>
  import { page } from '$app/stores';

  const navLinks = [
    { href: '/champions', label: 'Champions' },
    { href: '/items', label: 'Items' }
  ];

  let showRiotKeyModal = false;
  let riotKey = '';

  $: currentPath = $page.url.pathname;

  function openRiotKeyModal() {
    showRiotKeyModal = true;
  }

  function closeModal() {
    showRiotKeyModal = false;
  }

  function handleSubmit() {
    if (riotKey.trim()) {
      // Here you can store the key or send it to your backend
      console.log('Riot API Key submitted:', riotKey);
      // For now, just close the modal
      showRiotKeyModal = false;
      // Optionally clear the input or keep it
      // riotKey = '';
    }
  }
</script>

<nav class="navbar">
  <div class="logo">IntStats</div>

  <div class="nav-links">
    {#each navLinks as link}
      <a
              href={link.href}
              class="nav-link"
              class:active={currentPath === link.href}
      >
        {link.label}
      </a>
    {/each}
    <button class="nav-link user-btn" on:click|preventDefault={openRiotKeyModal}>
      User
    </button>
  </div>
</nav>

<!-- Riot Key Modal -->
{#if showRiotKeyModal}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <h2>Enter Your Riot API Key</h2>

      <div class="input-group">
        <label for="riot-key">Riot Key</label>
        <input
                id="riot-key"
                type="text"
                bind:value={riotKey}
                placeholder="RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                class="riot-key-input"
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
    background: none;
    cursor: pointer;
    font-family: inherit;
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

  /* Modal Styles */
  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
    padding: 2rem;
  }

  .modal-content {
    background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(17, 24, 39, 0.95));
    border: 1px solid rgba(60, 89, 130, 0.5);
    border-radius: 12px;
    padding: 2rem;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(10px);
  }

  .modal-content h2 {
    margin: 0 0 1.5rem 0;
    font-size: 1.5rem;
    color: #f5f5f5;
    text-align: center;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  .input-group label {
    color: #9ca3af;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .riot-key-input {
    padding: 0.75rem 1rem;
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(96, 165, 250, 0.3);
    border-radius: 6px;
    color: #f5f5f5;
    font-size: 0.9rem;
    font-family: monospace;
    transition: all 0.2s;
  }

  .riot-key-input:focus {
    outline: none;
    border-color: #60a5fa;
    background: rgba(30, 41, 59, 0.8);
  }

  .riot-key-input::placeholder {
    color: rgba(156, 163, 175, 0.5);
  }

  .modal-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }

  .cancel-btn,
  .submit-btn {
    padding: 0.75rem 1.5rem;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1px solid transparent;
  }

  .cancel-btn {
    background: rgba(107, 114, 128, 0.2);
    border-color: rgba(107, 114, 128, 0.4);
    color: #d1d5db;
  }

  .cancel-btn:hover {
    background: rgba(107, 114, 128, 0.3);
    border-color: rgba(107, 114, 128, 0.6);
  }

  .submit-btn {
    background: rgba(96, 165, 250, 0.2);
    border-color: rgba(96, 165, 250, 0.5);
    color: #60a5fa;
  }

  .submit-btn:hover {
    background: rgba(96, 165, 250, 0.3);
    border-color: #60a5fa;
  }
</style>