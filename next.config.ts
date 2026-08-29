import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Art filenames under /piggy are content-stable — a re-exported layer
        // or cover gets a new name. Next serves /public with max-age=0.
        source: "/piggy/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
