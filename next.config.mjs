/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  swcMinify: true, // Enable SWC minification for improved performance
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  images: {
    unoptimized: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "**",
      },
      // {
      //   protocol: "https",
      //   hostname: "via.placeholder.com",
      //   port: "",
      //   pathname: "**",
      // },
      // {
      //   protocol: "https",
      //   hostname: "res.cloudinary.com",
      // },
      // // add host name loremflickr.com
      // {
      //   protocol: "https",
      //   hostname: "loremflickr.com",
      // },
    ],
  },
};

export default nextConfig;
