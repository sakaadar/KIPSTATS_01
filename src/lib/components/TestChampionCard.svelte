<script lang="ts">
    import type { Champion } from "$lib/stores/types";

    //vi siger til svelte: denne komponent forventer en pro 'champion'
    export let champion: Champion;
</script>

<div class="card">
    <div
        class="card-image"
        style={`background-image: url(${champion.imageUrl});`}
    ></div>

    <div class="card-footer">
        <h2>{champion.name}</h2>
        <p>{champion.title}</p>
    </div>
</div>
<style>
    .card{
        display: flex;
        flex-direction: column;
        border-radius: 0.6rem;
        overflow: hidden;
        background: #020617;
        border: 1px solid rgba(148, 163, 184, 0.5);
        height: 260px;
    }
    .card-image{
        flex: 1;
        background-size: cover;
        background-position: center;
    }
    .card-footer{
        padding: 0.5rem 0.7rem;
        background: rgba(15,23,42,0.95)
    }
    .card-footer h2{
        margin: 0 0 0.15rem;
        font-size: 0.95rem;
    }
    .card-footer p{
        margin: 0;
        font-size: 0.8rem;
        color: #9ca3af;
    }
</style>