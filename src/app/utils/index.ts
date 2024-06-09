// app/getQueryClient.jsx
import { QueryClient } from "@tanstack/react-query";
import { cache, useEffect, useState } from "react";

export const baseUrl =
  typeof window === "undefined"
    ? "http://localhost:3000/"
    : window?.location?.href;

export const queries = {
  fetchUsers: () => {
    return fetch(`${baseUrl}api/users`).then((res) => res.json());
  },
  fetchPosts: async (pageParam: any) => {
    const res = await fetch(
      `${baseUrl}api/posts?page=${pageParam.pageParam}`
    ).then((r) => r.json());

    return res;
  },
};

// export const breakPoints = {
//   xs: 420,
//   ls: 482,
//   sm: 640,
//   md: 768,
//   lg: 1024,
//   xl: 1280,
//   "2xl": 1536,
// };

// function getDeviceScreen() {
//   try {
//     return window.innerWidth;
//   } catch (error) {
//     return 0;
//   }
// }

// export function useScreenSize() {
//   const [innerWidth, setInnerWidth] = useState(getDeviceScreen);

//   useEffect(() => {
//     function onResize() {
//       setInnerWidth(getDeviceScreen());
//     }
//     onResize();
//     window.addEventListener("resize", onResize);

//     return () => {
//       window.removeEventListener("resize", onResize);
//     };
//   }, []);

//   return innerWidth;
// }
