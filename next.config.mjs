/** @type {import('next').NextConfig} */
const nextConfig = {
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
