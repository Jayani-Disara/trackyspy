"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import UserModal from "./UserModel";

const Navbar = () => {
  const [isMounted, setIsMounted] = useState(false); // Ensure client-only rendering
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  useEffect(() => {
    // Mark as mounted to avoid hydration errors
    setIsMounted(true);
  }, []);

  const openUserModal = () => setIsUserModalOpen(true);
  const closeUserModal = () => setIsUserModalOpen(false);

  // Avoid rendering dynamic client-specific content during SSR
  if (!isMounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full bg-black">
      <nav className="nav flex justify-between items-center px-6 md:px-20 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-1">
          <Image
            src="/assets/icons/logo.svg"
            width={27}
            height={27}
            alt="logo"
          />
          <p className="nav-logo">
            <span className="text-white">Tracky</span>
            <span className="text-red-500">Spy</span>
          </p>
        </a>

        {/* Navigation Icons */}
        <div className="flex items-center gap-16">      

          {/* User Icon */}
          <button onClick={openUserModal} className="focus:outline-none">
            <Image
              src="/assets/icons/user.svg"
              alt="user"
              width={28}
              height={28}
              className="object-contain cursor-pointer"
            />
          </button>
        </div>
      </nav>

      {/* User Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <UserModal onClose={closeUserModal} />
        </div>
      )}
    </header>
  );
};

export default Navbar;
