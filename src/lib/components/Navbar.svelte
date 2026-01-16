<script lang="ts">
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { get } from 'svelte/store';
  import {
    loadUserSettings,
    saveApiKey,
    saveMyProfile,
    userSettings,
    type Region
  } from '$lib/stores/userSettings';

  let menuOpen: boolean = false;

  const openMenu = (): void => {
    menuOpen = true;
  };

  const closeMenu = (): void => {
    menuOpen = false;
  };

  interface NavLink {
    href: string;
    label: string;
  }

  const navLinks: NavLink[] = [
    { href: '/champions', label: 'Champions' },
    { href: '/items', label: 'Items' },
    { href: '/matchHistory', label: 'Match History' },
    { href: '/ranked', label: 'Ranked Overview' },
    { href: '/tierList', label: 'Champions Tier List' }
  ];


  //wizard state
  type WizardStep = 'API_KEY' | 'PROFILE';
  let showModal: boolean = false;
  let step: WizardStep = 'API_KEY';
  let error = '';

  
  let riotKey: string = '';

  let riotId = '';
  let tagline = '';
  let region: Region = 'EUW1';

  $: currentPath = $page.url.pathname;

  const openModal = (): void => {
    showModal = true;
  };
  const closeModal = (): void => {
    showModal = false;
  };

    function openWizard(): void{
    error: '';
    const s = get(userSettings);
    step = !s.riotApiKey ? 'API_KEY' : (!s.myProfile ? 'PROFILE' : 'PROFILE');
    showModal = true;
  }

  onMount(() => {
    loadUserSettings();

    //auto-open if not confi
   /* const s = $userSettings;
    if(!s.riotApiKey){
      step = 'API_KEY';
      showModal = true;
      return;
    }
    if(!s.myProfile){
      step = 'PROFILE';
      showModal = true;
    } */
  });

  function submitApiKey(): void {
    error = '';
    const key = riotKey.trim();
    

    if(!key){
      error = 'Please enter an API key';
      return;
    }
    if(!key.startsWith('RGAPI-')){
      error = 'Key format looks wrong (must start with RGAPI-).';
      return;
    }

    //call backend to verify
    saveApiKey(key);
    step = 'PROFILE';
  }

  async function submitProfile(): Promise<void> {
    error = '';
    const id = riotId.trim();
    const tag = tagline.trim();

    if(!id || !tag) {
      error = 'Please enter Riot ID and Tagline.';
      return;
    }

    //later: make sure PUUID resolves via backend/core and store it 
    saveMyProfile({ riotId: id, tagline: tag, region});

    showModal = false;
    //redirect to dashboard
    await goto('/');
  }

 /*
  const handleSubmit = (): void => {
    if (!riotKey.trim()) return;
    console.log('Riot API Key:', riotKey);
    closeModal();
  };
  */
</script>

<nav class="navbar">
  <div class="logo">IntStats</div>

  <button
          class="hamburger-btn"
          on:click={openMenu}
          aria-label="Open menu"
  >
    ☰
  </button>
</nav>

{#if menuOpen}
  <div class="sidebar-backdrop" on:click={closeMenu}>
    <aside class="sidebar" on:click|stopPropagation>
      {#each navLinks as link}
        <a
                href={link.href}
                class="sidebar-link {currentPath === link.href ? 'active' : ''}"
                on:click={closeMenu}
        >
          {link.label}
        </a>
      {/each}

      <button
              type="button"
              class="sidebar-link"
              on:click={() => {
          closeMenu();
          openWizard();
        }}
      >
        User
      </button>
    </aside>
  </div>
{/if}

<!-- MODAL (was missing!) -->
{#if showModal}
  <div class="modal-backdrop" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
    {#if step === 'API_KEY'}
      <h2>Enter Riot API Key</h2>

      <div class="input-group">
        <label for="riot-key">API Key</label>
        <input
                id="riot-key"
                type="text"
                bind:value={riotKey}
                placeholder="RGAPI-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        />
      </div>

      {#if error}
       <p class="error-text">{error}</p>
      {/if}

      <div class="modal-actions">
        <button class="cancel-btn" on:click={closeModal}>
          Cancel
        </button>
        <button class="submit-btn" on:click={submitApiKey}>
          Next
        </button>
      </div>
    {:else}
      <h2>Set your profile</h2>

      <div class="input-group">
        <label for="riot-id">Riot ID</label>
        <input id="riot-id" type="text" bind:value={riotId} placeholder="GameName" />
      </div>

      <div class="input-group">
        <label for="tagline">Tagline</label>
        <input id="tagline" type="text" bind:value={tagline} placeholder="USER#000" />
      </div>

      <div class="input-group">
        <label for="region">Region</label>
          <select id="region" bind:value={region}>
            <option value="EUW1">EUW1</option>
            <option value="EUN1">EUN1</option>
            <option value="NA1">NA1</option>
            <option value="KR">KR</option>
            <option value="BR1">BR1</option>
            <option value="JP1">JP1</option>
            <option value="LA1">LA1</option>
            <option value="LA2">LA2</option>
            <option value="OC1">OC1</option>
            <option value="TR1">TR1</option>
            <option value="RU">RU</option>
          </select>
      </div>


      {#if error}
        <p class="error-text">{error}</p>
      {/if}
      <div class="modal-actions">
          <button class="cancel-btn" on:click={closeModal}>Cancel</button>
          <button class="submit-btn" on:click={submitProfile}>Save & and Go to Dashboard</button>
        </div>
      {/if}
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

  .hamburger-btn {
    font-size: 1.4rem;
    background: none;
    border: 1px solid rgba(250, 204, 21, 0.4);
    color: #facc15;
    padding: 0.4rem 0.75rem;
    border-radius: 6px;
    cursor: pointer;
  }

  .hamburger-btn:hover {
    background: rgba(250, 204, 21, 0.15);
  }

  /* BACKDROP */
  .sidebar-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 2500;
  }

  /* SIDEBAR */
  .sidebar {
    position: absolute;
    top: 0;
    right: 0;
    width: 260px;
    height: 100%;
    padding: 1.5rem;
    background: linear-gradient(
            180deg,
            rgba(15, 23, 42, 0.98),
            rgba(17, 24, 39, 0.98)
    );
    border-left: 1px solid rgba(250, 204, 21, 0.4);
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    animation: slideIn 0.25s ease-out;
  }

  .sidebar-link {
    padding: 0.75rem 1rem;
    border-radius: 6px;
    text-align: left;
    background: none;
    border: 1px solid transparent;
    color: #e5e7eb;
    font-size: 0.95rem;
    cursor: pointer;
  }

  .sidebar-link:hover {
    background: rgba(34, 197, 94, 0.15);
    border-color: rgba(34, 197, 94, 0.4);
  }

  .sidebar-link.active {
    background: rgba(250, 204, 21, 0.2);
    border-color: rgba(250, 204, 21, 0.6);
    color: #facc15;
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
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

  .error-text{
    margin-top: 8px;
    color: #c92020;
    font-size: 0.9rem;
    padding: 10px 12px;
  }

  .submit-btn {
    background: rgba(96, 165, 250, 0.18);
    border-color: rgba(96, 165, 250, 0.5);
    color: #60a5fa;
  }

  .submit-btn:hover {
    background: rgba(96, 165, 250, 0.28);
  }

  select{
    padding: 5px 7px;
    color: rgba(24, 129, 31, 0.92);
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.15);
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes scaleIn {
    from { transform: scale(0.93); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
</style>