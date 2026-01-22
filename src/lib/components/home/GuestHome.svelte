<script lang="ts">
  import { onMount } from "svelte";
  import gsap from "gsap";
  import ScrollTrigger from "gsap/ScrollTrigger";
  import { openWizardModal } from "$lib/stores/wizard";

  gsap.registerPlugin(ScrollTrigger);

  let root: HTMLElement;
  let titleEl: HTMLHeadingElement;
  let subtitleEl: HTMLParagraphElement;
  let ctaEl: HTMLDivElement;
  let featuresEl: HTMLDivElement;

  const features = [
    { title: "Champion Insights", desc: "See what you win on, and why.", icon: "⚡" },
    { title: "Role Trends", desc: "Track performance by role over time.", icon: "🧭" },
    { title: "Build Patterns", desc: "Spot item/rune trends that work for you.", icon: "🛡️" },
    { title: "Review Faster", desc: "Save time with clear, actionable stats.", icon: "🚀" }
  ];

  function openApiKeyWizard() {
    openWizardModal("API_KEY"); // <-- tving API_KEY
  }

  onMount(() => {
    const ctx = gsap.context(() => {
      // title spans stagger
      const parts = titleEl?.querySelectorAll(".t-part");
      if (parts?.length) {
        gsap.from(parts, {
          y: 90,
          opacity: 0,
          duration: 1,
          stagger: 0.18,
          ease: "power4.out",
          delay: 0.2
        });
      }

      if (subtitleEl) {
        gsap.from(subtitleEl, {
          y: 24,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.7
        });
      }

      if (ctaEl) {
        gsap.from(ctaEl.children, {
          scale: 0.92,
          opacity: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "back.out(1.6)",
          delay: 1.05
        });
      }

      if (featuresEl) {
        gsap.from(featuresEl.children, {
          scrollTrigger: {
            trigger: featuresEl,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          y: 60,
          opacity: 0,
          duration: 0.75,
          stagger: 0.16,
          ease: "power3.out"
        });
      }
    }, root);

    return () => ctx.revert();
  });
</script>

<section class="wrap" bind:this={root}>
  <!-- HERO -->
  <section class="hero">
    <div class="hero__bg" aria-hidden="true"></div>
    <div class="hero__glow hero__glow--a" aria-hidden="true"></div>
    <div class="hero__glow hero__glow--b" aria-hidden="true"></div>

    <div class="hero__content">
      <div class="badge">
        <span class="badge__dot">◆</span>
        <span>IntStats • Desktop Companion</span>
      </div>

      <h1 class="title" bind:this={titleEl}>
        <span class="t-part">Track</span>
        <span class="t-part">performance.</span>
        <span class="t-part accent">Improve</span>
        <span class="t-part">faster.</span>
      </h1>

      <p class="subtitle" bind:this={subtitleEl}>
        Champion-first dashboard. Plug in your API key and get personal insights instantly.
      </p>

      <div class="cta" bind:this={ctaEl}>
        <button class="btn btn--primary" type="button" on:click={openApiKeyWizard}>
          Set API Key →
        </button>
        <button class="btn btn--ghost" type="button" on:click={() => console.log("demo")}>
          Watch Demo
        </button>
      </div>
    </div>
  </section>

  <!-- FEATURES -->
  <section class="features">
    <h2 class="h2">
      Why you’ll <span class="accent">love</span> it
    </h2>

    <div class="grid" bind:this={featuresEl}>
      {#each features as f}
        <article class="card">
          <div class="icon">{f.icon}</div>
          <h3>{f.title}</h3>
          <p>{f.desc}</p>
        </article>
      {/each}
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="final">
    <div class="final__inner">
      <h2 class="h2 big">
        Ready to set up your <span class="accent">profile</span>?
      </h2>
      <p class="muted">Start by adding your Riot API key — then we’ll guide you through Riot ID + region.</p>

      <button class="btn btn--primary bigBtn" type="button" on:click={openApiKeyWizard}>
        Add API Key →
      </button>
    </div>
  </section>
</section>

<style>
  /* --- Base --- */
  .wrap {
    max-width: 1200px;
    margin: 0 auto;
    padding: 22px 22px 60px;
    color: rgba(255,255,255,0.92);
  }

  /* --- Hero --- */
  .hero {
    position: relative;
    border-radius: 26px;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.08);
    background: rgba(255,255,255,0.03);
    padding: 46px 34px;
    min-height: 420px;
    display: flex;
    align-items: center;
  }

  /* Champion background (sæt din egen her) */
  .hero__bg {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(90deg, rgba(11,18,32,0.95), rgba(11,18,32,0.65), rgba(11,18,32,0.95)),
      url("/images/champion-hero.jpg"); /* <-- læg et billede i static/images/ */
    background-size: cover;
    background-position: center;
    filter: saturate(1.05) contrast(1.05);
    transform: scale(1.02);
  }

  .hero__glow {
    position: absolute;
    width: 420px;
    height: 420px;
    border-radius: 999px;
    filter: blur(60px);
    opacity: 0.35;
    pointer-events: none;
  }
  .hero__glow--a { left: -120px; top: -90px; background: rgba(120, 255, 200, 0.30); }
  .hero__glow--b { right: -120px; bottom: -110px; background: rgba(80, 160, 255, 0.28); }

  .hero__content { position: relative; z-index: 2; max-width: 760px; }

  .badge {
    display: inline-flex;
    gap: 10px;
    align-items: center;
    padding: 9px 14px;
    border-radius: 999px;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.12);
    font-size: 12px;
    margin-bottom: 16px;
  }
  .badge__dot { opacity: 0.8; }

  .title {
    margin: 0 0 12px;
    font-size: 58px;
    line-height: 1.02;
    letter-spacing: -0.9px;
    font-weight: 800;
  }
  .title .t-part { display: inline-block; margin-right: 10px; }

  .accent {
    background: linear-gradient(90deg, rgba(120,255,200,0.95), rgba(80,160,255,0.95));
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }

  .subtitle {
    margin: 0 0 22px;
    font-size: 18px;
    opacity: 0.82;
    max-width: 64ch;
  }

  .cta {
    display: flex;
    gap: 12px;
    align-items: center;
    flex-wrap: wrap;
  }

  .btn {
    height: 46px;
    padding: 0 16px;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.08);
    color: inherit;
    cursor: pointer;
    transition: transform 160ms ease, background 160ms ease;
  }
  .btn:hover { transform: translateY(-2px); background: rgba(255,255,255,0.10); }

  .btn--primary {
    background: rgba(255,255,255,0.14);
    border-color: rgba(255,255,255,0.18);
  }
  .btn--ghost {
    background: rgba(255,255,255,0.06);
  }

  /* --- Features --- */
  .features { margin-top: 28px; }
  .h2 {
    font-size: 34px;
    margin: 0 0 14px;
    font-weight: 750;
    letter-spacing: -0.5px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 14px;
  }

  .card {
    border-radius: 18px;
    padding: 18px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .icon {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.10);
    margin-bottom: 10px;
    font-size: 18px;
  }

  .card h3 { margin: 0 0 6px; font-size: 16px; }
  .card p { margin: 0; opacity: 0.75; font-size: 13px; line-height: 1.4; }

  /* --- Final CTA --- */
  .final { margin-top: 22px; }
  .final__inner {
    border-radius: 22px;
    padding: 26px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    text-align: center;
  }

  .muted { opacity: 0.75; margin: 8px auto 16px; max-width: 70ch; }

  .big { font-size: 40px; }
  .bigBtn { height: 52px; padding: 0 20px; border-radius: 16px; font-weight: 650; }

  @media (max-width: 1100px) {
    .grid { grid-template-columns: repeat(2, 1fr); }
    .title { font-size: 46px; }
  }

  @media (max-width: 700px) {
    .grid { grid-template-columns: 1fr; }
    .hero { padding: 30px 20px; }
    .title { font-size: 36px; }
  }
</style>
