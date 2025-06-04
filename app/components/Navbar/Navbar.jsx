"use client";
import { MenuOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ActiveLink from "./ActiveLink";
import { useAuth } from '@/app/context/AuthContext';
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
    const { user, googleSignIn, logOut, loading } = useAuth();
    
      // Handle logout
  const handleLogOut = async () => {
    try {
      await logOut();
      localStorage.removeItem('skipToken');
      document.cookie = 'skipToken=; path=/; max-age=0';
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      setFormError('Failed to log out');
    }
  };
  return (
    <nav className="w-full bg-black/15   px-8">
      <div className="flex justify-between items-center py-3 px-10">
        {/* Logo Section */}
        <Link href="/" className="flex-shrink-0">
          <div
            className="relative sm:w-24 sm:h-16 overflow-hidden hover:ring-sky-500/70"
            onMouseEnter={() => setIsHoveringLogo(true)}
            onMouseLeave={() => setIsHoveringLogo(false)}
          >
            <Image
              fill
              src="/logo.svg"
              alt="E Clinic Logo"
              className="object-cover"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-6 z-15">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <ActiveLink
                title={label}
                destination={href}
              />
             
            </li>
          ))}

          {user && (
 
        
            <button
              onClick={handleLogOut}
              className="w-full   
          hover:border-green-300 hover:scale-105 text-white py-3 rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md"
            >
              Log Out
            </button>
      
        ) }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;