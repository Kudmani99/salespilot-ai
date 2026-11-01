"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Send, 
  LayoutDashboard, 
  PenTool, 
  MessageSquare, 
  Menu, 
  X 
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Landing Page", href: "/", icon: Send },
    { name: "Generate Campaign", href: "/generate", icon: PenTool },
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "AI Sales Coach", href: "/coach", icon: MessageSquare },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border-dark bg-bg-dark/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
                <Send className="h-5 w-5 -rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                SalesPilot<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600/15 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.05)]"
                        : "text-gray-400 hover:bg-gray-800/50 hover:text-white border border-transparent"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-gray-400 hover:bg-gray-800 hover:text-white focus:outline-none border border-transparent hover:border-border-dark transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="md:hidden border-b border-border-dark bg-card-dark px-4 py-3 shadow-2xl transition-all duration-300" id="mobile-menu">
          <div className="space-y-1.5 pb-3 pt-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                      : "text-gray-400 hover:bg-gray-800/40 hover:text-white border border-transparent"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
