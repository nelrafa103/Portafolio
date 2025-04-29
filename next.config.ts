import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    }
};

const withNextIntl = createNextIntlPlugin("./app/request.ts");
export default withNextIntl(nextConfig);
