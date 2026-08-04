const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:4000";

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/projetos/:path*",
        destination: `${BACKEND_URL}/projetos/:path*`,
      },
    ];
  },
};

export default nextConfig;
