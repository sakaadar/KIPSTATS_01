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
        padding: 0;
        box-sizing: border-box;
    }
    .app-shell{
  width: 100%;
  max-width: 1400px;
  padding: 0;
  box-sizing: border-box;

  border-radius: 16px;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 16px 40px rgba(0,0,0,0.35);

  min-height: auto; /* vigtigt */
}
    @media(max-width: 900px){
        .app-main {
            padding: 0;
        }
        .app-shell{
            padding: 0;
            border-radius: 10px;
        }
    }

</style>
