import { MetadataRoute } from "next/types";
export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/admin", "/privacy"],
            },
        ],
        sitemap: `https://www.saadenterprises.co/sitemap.xml`,
    };
}