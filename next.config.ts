import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The place photos came out of a Google Docs export and are already once-
    // compressed, so the 75 default visibly softens them a second time. 90 is
    // the only quality the app asks for; Next 16 requires listing it.
    qualities: [90],
  },
};

export default nextConfig;
