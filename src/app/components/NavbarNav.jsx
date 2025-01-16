"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CgMenuHotdog } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";

function NavbarNav() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Simpan path ke localStorage dan perbarui state aktif
  const handleNavClick = (path) => {
    localStorage.setItem("activePath", path);
    setActivePath(path);
  };

  useEffect(() => {
    const savedPath = localStorage.getItem("activePath");
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

  // Fungsi untuk toggle collapse
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      {/* Sidebar Navigation */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen bg-white shadow-lg transition-transform duration-300 lg:translate-x-0 ${
          isCollapsed ? "-translate-x-full" : "translate-x-0"
        } lg:w-[15rem]`}
      >
        <nav className="flex flex-col h-full p-5 gap-4 font-sans">
          <h1 className="font-bold text-green-600 text-2xl pb-5 mx-auto">
            React Pos
          </h1>
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} legacyBehavior>
              <a
                onClick={() => handleNavClick(link.href)}
                className={`${
                  activePath === link.href
                    ? "bg-green-600 text-white"
                    : "bg-neutral-200 hover:bg-neutral-300"
                } flex items-center gap-2 py-3 px-5 font-semibold rounded-3xl`}
              >
                {link.icon}
                {link.label}
              </a>
            </Link>
          ))}
          <button
            onClick={toggleCollapse}
            className="fixed top-7 right-[-25px] z-30 p-3 bg-green-600 text-white rounded-full shadow-lg lg:hidden">
            <IoIosArrowForward />
          </button>
        </nav>
      </div>
    </div>
  );
}

export default NavbarNav;
