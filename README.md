# Project Script Reference

This repository utilizes a high-performance modern web stack powered by **Astro**, **Bun**, **Tailwind CSS v4**, **Drizzle ORM**, and **Cloudflare Wrangler**.

Below is a detailed guide to the scripts available in the `package.json` file.

---

## 🚀 Development & Core Commands

| Command | Script | Description |
| :--- | :--- | :--- |
| `bun run dev` | `astro dev` | Starts the local development server with hot-module reloading (HMR) for real-time previewing. |
| `bun run sync` | `astro sync` | Generates TypeScript types for your Astro content collections and environment variables. |
| `bun run astro` | `astro` | A CLI passthrough enabling the execution of arbitrary Astro commands directly (e.g., `bun run astro --help`). |

---

## 📦 Build & Preview Pipelines

| Command | Script | Description |
| :--- | :--- | :--- |
| `bun run build` | `astro check && astro build && bun run build:tailwind && bun run build:postcss` | The core **production build pipeline**. It runs TypeScript/Astro type checks, compiles the static/SSR build, and post-processes your styles. |
| `bun run preview` | `astro build && astro preview` | Performs a production build and immediately spins up a local server to preview the exact output before deployment. |

---

## 🎨 Stylesheet Compilation

| Command | Script | Description |
| :--- | :--- | :--- |
| `bun run build:tailwind` | `bun x @tailwindcss/cli -i src/styles/global.css -o dist/global.css --minify` | Compiles Tailwind v4 utility classes via the Tailwind CLI. Takes the input file, processes it, and outputs a heavily optimized and minified stylesheet to `dist/`. |
| `bun run build:postcss` | `postcss dist/global.css -o dist/global.css` | Runs PostCSS over the compiled Tailwind CSS file to apply additional vendor prefixes or targeted transforms, modifying the file in-place. |

---

## ☁️ Cloudflare Environment (Wrangler)

| Command | Script | Description |
| :--- | :--- | :--- |
| `bun run login` | `wrangler login` | Authenticates your local development terminal with your Cloudflare account. |
| `bun run generate-types` | `wrangler types` | Generates TypeScript definitions for your Cloudflare bindings (D1, KV, Hyperdrive, etc.). |
| `bun run cf-typegen` | `bunx wrangler types` | An alternate alias utilizing `bunx` to safely regenerate Cloudflare binding types. |
| `bun run deploy` | `astro build && wrangler deploy` | Compiles a fresh production build of your application and instantly deploys it to Cloudflare Pages/Workers. |

---

## 🗄️ Database Management (Drizzle ORM)

### 💻 Local Environment

* **`bun run db:generate`** (`bunx drizzle-kit generate`)  
  Scans your schema definition files and generates the structural SQL migration files required for schema tracking.
* **`bun run db:migrate`** (`bunx drizzle-kit migrate`)  
  Applies all pending local SQL migrations to your development or local instance database.
* **`bun run db:push`** (`bun drizzle-kit push`)  
  Directly syncs and overrides your local database structural state with your TypeScript schema. Best used for rapid prototyping without generating migration files.

### 🌐 Production Environment

* **`bun run db:generate:prod`** (`NODE_ENV=production bun drizzle-kit generate`)  
  Generates SQL migration sequences using configuration contexts tailored specifically for production schemas.
* **`bun run db:migrate:prod`** (`NODE_ENV=production drizzle-kit migrate`)  
  Executes outstanding SQL migrations against your live production database environment.
* **`bun run db:push:prod`** (`NODE_ENV=production bun drizzle-kit push`)  
  Directly forces schema updates to your production environment database. *Warning: Use with extreme caution as this bypasses safety checks.*

### 🛠️ Utilities

* **`bun run studio`** (`bunx drizzle-kit studio --port 4984`)  
  Spins up Drizzle's browser-based database management GUI on port `4984` to inspect and modify data rows.
* **`bun run db:check`** (`bun drizzle-kit check`)  
  Performs data structural integrity checks to verify your current TypeScript schema file is fully in sync with your migration generation logs.

---

## 🔧 Maintenance

* **`bun run browserslist`** (`bunx update-browserslist-db@latest`)  
  Updates your local `caniuse-lite` target database, ensuring CSS autoprefixing and bundling configurations target accurate vendor browser versions.
