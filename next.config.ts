import type { NextConfig } from "next";

/**
 * Cloudflare Pages için statik dışa aktarma.
 * `npm run build` → out/ klasörüne saf HTML/CSS/JS üretir.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    // Statik barındırmada Next.js görsel sunucusu yok; görseller önceden
    // optimize edildiği için (public/transformations, Unsplash ?w= parametresi) olduğu gibi sunulur.
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
