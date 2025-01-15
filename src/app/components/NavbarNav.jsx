"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CgMenuHotdog } from "react-icons/cg";

function NavbarNav() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);
  const [isLoading, setIsLoading] = useState(false);


  // Simpan path ke localStorage dan perbarui state aktif
  const handleNavClick = (path) => {
    localStorage.setItem('activePath', path);
    setActivePath(path);
    setIsLoading(true)
  };

  useEffect(() => {
    const savedPath = localStorage.getItem('activePath');
    if (savedPath) {
      setActivePath(savedPath);
    }
  }, []);

  const navLinks = [
    { href: "/menu", label: "Menu", icon: <CgMenuHotdog /> },
    { href: "/table", label: "Table Service", icon: <CgMenuHotdog /> },
    { href: "/reservation", label: "Reservation", icon: <CgMenuHotdog /> },
    { href: "/deliver", label: "Deliver", icon: <CgMenuHotdog /> },
    { href: "/accounting", label: "Accounting", icon: <CgMenuHotdog /> },
  ];

  return (
    <div className='lg:block z-20 fixed top-0 left-0 w-[15rem] hidden shadow-lg'>
      <nav className="sticky gap-4 font-sans flex flex-col h-screen bg-white p-5">
        <h1 className='font-bold text-green-600 text-2xl pb-5 mx-auto'>React Pos</h1>
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} legacyBehavior>
            <a
              onClick={() => handleNavClick(link.href)}
              className={`${
                activePath === link.href ? "bg-green-600 text-white" : "bg-neutral-200"
              } flex items-center gap-2 py-3 px-5 font-semibold rounded-3xl`}
            >
              {link.icon}
              {link.label}
            </a>
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default NavbarNav;
