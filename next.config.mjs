/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "fesjnciriccizjovoyim.supabase.co",
                protocol: "https",
                port: "",
            }
        ]
    },
};
export default nextConfig;  