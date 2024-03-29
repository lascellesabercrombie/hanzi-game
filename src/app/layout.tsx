import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";

import Navbar from "../components/Navbar"
import ParentWrapper from "../components/ParentWrapper";
import './globals.css'
import { Inter } from "next/font/google";
export const metadata = {
  title: 'Tiangeben',
  description: 'A web app to help practise writing Chinese characters',
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ParentWrapper>
        <body className={`${inter.className} pb-16 bg-red-200 dark:bg-cyan-950 text-cyan-950 dark:text-slate-100`}>
          {children}
          <Navbar />
        </body>
      </ParentWrapper>
    </html>
  )
}
