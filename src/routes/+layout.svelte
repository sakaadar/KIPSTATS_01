<script lang="ts">
    import '../app.css';
    import Navbar from "$lib/components/Navbar.svelte";
</script>
<div class="app-root">
    <Navbar/>

    <main class="app-main">
        <div class="app-shell">
            <slot /> <!-- Sites is getting rendered here fx. match.history.svelte-->
        </div>
    </main>
</div>

<style>
    :global(body){
        margin: 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        background:
                radial-gradient(
                        circle at top,
                        rgba(34, 197, 94, 0.08),
                        transparent 60%
                ),
                #0b1220;

        color: var(--text-main);
    }
    .app-root{
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }
    .app-main{
        flex: 1;
        display: flex;
        justify-content: center;
        padding: 1rem 1.5rem;
        box-sizing: border-box;
    }
    .app-shell{
        width: 100%;
        max-width: 1400px;
        min-height: calc(100vh - 4.5rem);
        padding: 1.5rem 1.75rem 1.75rem;
        box-sizing: border-box;

        border-radius: 12px;
        background:
                linear-gradient(
                        135deg,
                        rgba(15, 23, 42, 0.98),
                        rgba(17, 24, 39, 0.98)
                );

        border: 1px solid var(--border-gold);

        box-shadow:
                0 18px 45px rgba(15, 23, 42, 0.9),
                0 0 0 1px rgba(250, 204, 21, 0.15);
    }
    @media(max-width: 900px){
        .app-main {
            padding: 0.5rem;
        }
        .app-shell{
            padding: 1rem 1.1rem 1.25rem;
            border-radius: 10px;
        }
    }

</style>
