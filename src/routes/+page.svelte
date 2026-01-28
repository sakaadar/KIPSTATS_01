<script lang="ts">
    import { auth } from "$lib/stores/auth";
    import GuestHome from "$lib/components/home/GuestHome.svelte";
    import UserDashboard from "$lib/components/home/UserDashboard.svelte";
</script>

    {#if $auth.user}
      <UserDashboard user={$auth.user} />
    {:else}
      <GuestHome />
    {/if}  
