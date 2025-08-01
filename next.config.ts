import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // O protocolo da URL da imagem
        hostname: "avatars.githubusercontent.com", // O domínio de onde as imagens virão
        port: "", // Opcional: Se houver uma porta específica, caso contrário, deixe vazio
        pathname: "**", // Opcional: Para permitir qualquer caminho dentro desse domínio
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "**",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

export default nextConfig;
