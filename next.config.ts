import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Para Next.js 13 e superior, use remotePatterns
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
      // Adicione outros domínios conforme necessário
      // {
      //   protocol: 'https',
      //   hostname: 'seuservico.com',
      //   pathname: '/imagens/**',
      // },
    ],
    // Se você estiver usando uma versão mais antiga do Next.js (antes da 13),
    // ou se preferir a sintaxe mais simples para domínios inteiros sem granularidade
    // domains: ['avatars.githubusercontent.com', 'outrodominio.com'],
  },
};

export default nextConfig;
