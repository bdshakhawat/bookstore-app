// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "**",
//         port: "",
//         pathname: "/images/**",
//       },
//     ],
//   },
// };

// export default nextConfig;

// ================================================
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Allow ALL HTTPS domains (for production)
      {
        protocol: 'https',
        hostname: '**',
      },
      // Allow localhost (for development)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000', // Or your Next.js port
      },
    ],
  },
};

export default nextConfig;


