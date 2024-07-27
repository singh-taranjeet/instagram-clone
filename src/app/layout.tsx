import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import ReactQueryProvider from "./components/ReactQueryProvider";
import { ApolloClientProvider } from "./components/ApolloClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <div className="flex">
            <Navbar></Navbar>
            <div className="flex-1">{children}</div>
            <Footer></Footer>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
