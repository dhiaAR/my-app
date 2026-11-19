"use client";

import { useRef } from "react";
import Link from "next/link";

function MailIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m4 7 8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      className="h-4 w-4"
    >
      <path
        d="m7 3 3 4-2 2a15 15 0 0 0 7 7l2-2 4 3-1 3c-.2.7-.9 1.1-1.6 1A19 19 0 0 1 3 5.6c-.1-.7.3-1.4 1-1.6L7 3Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MobileMenu() {
  const menuRef = useRef(null);

  function closeMenu() {
    if (menuRef.current) {
      menuRef.current.open = false;
    }
  }

  return (
    <details ref={menuRef} className="relative shrink-0 lg:hidden">
      <summary className="flex cursor-pointer list-none items-center gap-2 rounded-full border border-red-300 bg-white/60 px-4 py-2.5 text-sm font-semibold text-red-900 transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700">
        <span>Menu</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className="h-4 w-4"
        >
          <path
            d="M3 5.5h14M3 10h14M3 14.5h14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </summary>
      <div
        onClick={closeMenu}
        className="absolute right-0 top-full mt-3 w-72 max-w-[calc(100vw-2rem)] rounded-2xl border border-red-100 bg-white p-2 text-stone-800 shadow-xl shadow-red-950/20"
      >
        <Link
          href="/"
          className="block rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-600"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="block rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-600"
        >
          About Us
        </Link>
        <Link
          href="/contact"
          className="block rounded-xl px-4 py-3 text-sm font-semibold transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-2 focus-visible:outline-red-600"
        >
          Contact Us
        </Link>
        <div className="my-2 border-t border-red-100" />
        <a
          href="mailto:testtesttestesttest@gmail.com"
          className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-600"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-700">
            <MailIcon />
          </span>
          <span className="min-w-0">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Email
            </span>
            <span className="block break-all text-sm font-medium text-stone-800">
              testtesttestesttest@gmail.com
            </span>
          </span>
        </a>
        <a
          href="tel:+21699999999"
          className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-red-50 focus-visible:outline-2 focus-visible:outline-red-600"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-700">
            <PhoneIcon />
          </span>
          <span>
            <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
              Phone
            </span>
            <span className="block text-sm font-medium text-stone-800">
              +216 99999999
            </span>
          </span>
        </a>
      </div>
    </details>
  );
}
