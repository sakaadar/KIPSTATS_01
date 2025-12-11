<script lang="ts">
    import type { Champion } from "$lib/stores/types";

    //vi siger til svelte: denne komponent forventer en pro 'champion'
    export let champion: Champion;
</script>

<div class="card">
    <img src={champion.imageUrl} alt={champion.name} />
 

    <div class="card-footer">
        <h2>{champion.name}</h2>
        <p>{champion.title}</p>
    </div>
</div>
<style>
  .card {
    position: relative;
    border-radius: 0.6rem;
    overflow: hidden;
    border: 1px solid rgba(148, 163, 184, 0.4);
    background: #020617;
  /*  aspect-ratio: 2 / 3;  højt kort ligesom LoL */
  }
  .card :hover{
    transform: translateY(-6px);
     box-shadow: 0 20px 45px rgba(0, 0, 0, 0.85);
  }
  .card :hover .card-image{
    transform: scale(1.05);
    filter: brightness(1.05) saturate(1.05);
  }

  .card :hover::before{
    border-color: rgba(251,191,36,0.7);
    box-shadow: 0 0 24px rgba(251,191,36, 0.45);
  }


  .card img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: contain;
    object-position: top center; /* lidt mere fokus på ansigt/overkrop */
  }

  .card-footer {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0.45rem 0.8rem 0.55rem;
    background: linear-gradient(
      to bottom,
      rgba(15, 23, 42, 0.98),
      rgba(15, 23, 42, 0.6),
      rgba(15, 23, 42, 0)
    );
  }

  .card-footer h2 {
    margin: 0;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .card-footer p {
    margin: 0.15rem 0 0;
    font-size: 0.75rem;
    opacity: 0.9;
    transform: none;
  }
</style>