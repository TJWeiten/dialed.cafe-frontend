import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["sui-no-sato.ryuu.network", "*.sui-no-sato.ryuu.network"],
    cacheComponents: true,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
