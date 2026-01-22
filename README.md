# IntStats (KiPStats)

A League of Legends inspired desktop companion app built with **Tauri + SvelteKit**.
The app focuses on a clean UI, a smooth onboarding flow (Riot API key + profile setup), and a future integration with a backend service for analytics and match insights.

> Status: MVP UI/Frontend in progress. Backend integration will be added next.

---

## Tech Stack

- **SvelteKit** (frontend)
- **TypeScript**
- **Tauri** (desktop shell)
- **GSAP** (animations)
- **Vite** (dev tooling)

---

## Project Structure (high level)

- `src/routes/` – SvelteKit pages/routes
- `src/lib/components/` – UI components (Navbar, GuestHome, Dashboard, etc.)
- `src/lib/stores/` – state management (auth, wizard, user settings)
- `src/services/` – service layer (intended place for backend/API integration)
- `src/adapters/` – adapters for transforming/normalizing data (optional layer)
- `src-tauri/` – Tauri (Rust) desktop configuration and build

---

## Prerequisites

- **Node.js** (recommended: latest LTS)
- **Rust toolchain** (for Tauri)
  - Install Rust: https://www.rust-lang.org/tools/install
- **Tauri prerequisites** (platform-specific dependencies)
  - See: https://tauri.app/start/prerequisites/

---

## Getting Started

### 1) Install dependencies

```bash
npm install
# IntStats (KiPStats)

A League of Legends inspired desktop companion app built with **Tauri + SvelteKit**.
The app focuses on a clean UI, a smooth onboarding flow (Riot API key + profile setup), and a future integration with a backend service for analytics and match insights.

> Status: MVP UI/Frontend in progress. Backend integration will be added next.

---

## Tech Stack

- **SvelteKit** (frontend)
- **TypeScript**
- **Tauri** (desktop shell)
- **GSAP** (animations)
- **Vite** (dev tooling)

---

## Project Structure (high level)

- `src/routes/` – SvelteKit pages/routes
- `src/lib/components/` – UI components (Navbar, GuestHome, Dashboard, etc.)
- `src/lib/stores/` – state management (auth, wizard, user settings)
- `src/services/` – service layer (intended place for backend/API integration)
- `src/adapters/` – adapters for transforming/normalizing data (optional layer)
- `src-tauri/` – Tauri (Rust) desktop configuration and build

---

## Prerequisites

- **Node.js** (recommended: latest LTS)
- **Rust toolchain** (for Tauri)
  - Install Rust: https://www.rust-lang.org/tools/install
- **Tauri prerequisites** (platform-specific dependencies)
  - See: https://tauri.app/start/prerequisites/

---

## Getting Started

### 1) Install dependencies

```bash
npm install
### 2) Run in browser (SvelteKit only)
npm run dev

### 3) Run in terminal 
npm run tauri dev

