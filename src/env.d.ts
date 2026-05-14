type Runtime = import("@astrojs/cloudflare").Runtime<Env>;

declare namespace App {
	interface Locals extends Runtime {
    [x: string]: any;
}
}

/** Merge with `worker-configuration.d.ts` so `env` from `cloudflare:workers` is typed. */
declare namespace Cloudflare {
	interface Env {
    d1_prod: D1Database;
		ASSETS: Fetcher;
		CLOUDFLARE_ACCOUNT_ID: string;
		CLOUDFLARE_D1_DATABASE_ID: string;
		CLOUDFLARE_D1_TOKEN: string;
		LOCAL_DB_PATH: string;
	}
}
