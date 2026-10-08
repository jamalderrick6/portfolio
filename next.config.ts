import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  // Off on purpose: every page is prerendered from a fixed list, and keeping
  // `params` outside <Suspense> lets unknown /work/[slug] URLs return a real 404.
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
