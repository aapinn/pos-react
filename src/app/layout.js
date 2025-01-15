// app/layout.js
"use client"
import { usePathname } from 'next/navigation'; // Import usePathname
import NavbarNav from '../app/components/NavbarNav'; // Import NavbarNav
import localFont from "next/font/local";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});



export default function RootLayout({ children }) {
  const pathname = usePathname(); // Ambil pathname saat ini

  // Tentukan kapan NavbarNav harus muncul (misalnya hanya muncul di path "/menu" dan "/dashboard")
  const showNavbar = pathname.includes('/menu') || pathname.includes('/table') || pathname.includes('/reservation') || pathname.includes('/reservation') || pathname.includes('/deliver') || pathname.includes('/accounting') ;

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex font-sans`}>
        {showNavbar && <NavbarNav />} {/* Navbar hanya muncul jika kondisi terpenuhi */}
          <div className="flex-grow">
            {children} {/* Render children */}
          </div>
      </body>
    </html>
  );
}
