import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://noahjohnson.dev",
  integrations: [mdx(), sitemap(), tailwind(), react()],
  output: "hybrid",
  adapter: cloudflare({
    imageService: "cloudflare",
    platformProxy: {
      enabled: true,
      configPath: "wrangler.toml",
      persist: "./.cache/wrangler/v3",
    },
  }),
});
