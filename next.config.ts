import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["sui-no-sato.ryuu", "*.sui-no-sato.ryuu"],
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
