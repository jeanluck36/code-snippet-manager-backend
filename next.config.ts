import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    "plugins": [
    [
      "babel-plugin-styled-components",
      {
        "ssr": true,
        "displayName": true
      }
    ]
  ]
};

export default nextConfig;
