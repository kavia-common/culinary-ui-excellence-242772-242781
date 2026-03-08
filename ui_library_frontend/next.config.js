/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    /**
     * Proxy API requests during development/preview so the UI can call `/api/...`
     * without requiring browser-accessible env vars.
     *
     * - If NEXT_PUBLIC_BACKEND_URL is set, use it.
     * - Otherwise default to local backend dev port.
     *
     * Note: This is a server-side rewrite; it is safe to use non-public env vars too,
     * but we keep it aligned with existing NEXT_PUBLIC_BACKEND_URL convention.
     */
    const backend =
      process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/+$/, "") ?? "http://127.0.0.1:3001";

    return [
      {
        source: "/api/:path*",
        destination: `${backend}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
