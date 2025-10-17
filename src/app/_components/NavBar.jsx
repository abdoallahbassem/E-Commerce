"use client";
import { CartContext } from "@/context/cartContext";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { usePathname } from "next/navigation"; 

export default function NavBar() {
  const { numOfCart } = useContext(CartContext);
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); 

  function logOut() {
    signOut({ callbackUrl: "/login" });
  }

  const navLinks = [
    { href: "/", label: "home" },
    { href: "/products", label: "products" },
    { href: "/categories", label: "categories" },
    { href: "/brands", label: "brands" },
    { href: "/allorders", label: "all orders" },
  ];

  return (
    <div className="py-6 bg-green-600">
      <div className="w-[90%] mx-auto flex flex-wrap px-3 justify-between items-center">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link
            href="/"
            className=" text-3xl font-bold text-white flex items-center gap-1"
          >
            <i className="fa-solid fa-cart-shopping"></i> fresh cart
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white text-3xl focus:outline-none"
          >
            <i className="fa-solid fa-bars"></i>
          </button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full lg:flex lg:items-center lg:w-auto`}
        >
          <ul className="flex flex-col lg:flex-row gap-6 mt-4 lg:mt-0 items-center text-[20px] text-white">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${
                    pathname === link.href
                      ? "border-b-2 border-white font-bold" // 👈 هنا الاكتيف ستايل
                      : "opacity-80 hover:opacity-100"
                  } transition-all duration-300`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
              <li>
                <Link href="/cart" className="relative">
                  <i className="fas fa-cart-shopping text-2xl"></i>
                  {numOfCart > 0 && (
                    <span className="absolute -top-3 -right-3 bg-red-600 rounded-full px-2 py-0.5 text-sm">
                      {numOfCart}
                    </span>
                  )}
                </Link>
              </li>
            

            <li>
              <Link href="/wishList">
                <span className="relative">
                  <i className="fa-solid fa-clipboard-list text-3xl">
                    <i className="fa-solid fa-heart absolute text-[19px] end-[-2px] bottom-[-7px] text-red-600"></i>
                  </i>
                </span>
              </Link>
            </li>

            {session ? (
              <li onClick={logOut} className="cursor-pointer text-xl">
                sign out <i className="fa-solid fa-right-to-bracket"></i>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    href="/register"
                    className={`text-[20px] ${
                      pathname === "/register" ? "border-b-2 border-white font-bold" : ""
                    }`}
                  >
                    register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className={`text-[20px] ${
                      pathname === "/login" ? "border-b-2 border-white font-bold" : ""
                    }`}
                  >
                    login
                  </Link>
                </li>
                <li className="flex gap-4 text-2xl">
                  <i className="fab fa-facebook"></i>
                  <i className="fab fa-instagram"></i>
                  <i className="fab fa-twitter"></i>
                  <i className="fab fa-linkedin"></i>
                  <i className="fab fa-youtube"></i>
                  <i className="fab fa-tiktok"></i>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
