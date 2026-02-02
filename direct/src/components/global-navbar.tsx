
"use client";
import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Settings, Wallet, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GlobalNavbarProps {
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
}

export default function GlobalNavbar({ searchQuery, onSearchChange }: GlobalNavbarProps) {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

                {/* Left: Brand & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <Menu className="text-zinc-400 md:hidden" size={20} />
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
                        <span className="hidden font-bold tracking-tighter text-white md:block">PROJECT DIRECT</span>
                    </div>
                </div>

                {/* Center: Command Search */}
                <div className="hidden flex-1 justify-center px-8 md:flex">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search tasks, buddies, or audits... (⌘K)"
                            value={searchQuery}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            className="w-full rounded-full border border-zinc-800 bg-zinc-900/50 py-2 pl-10 pr-4 text-sm text-zinc-300 transition-all focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                        />
                    </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <button className="relative rounded-full p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white transition-colors">
                        <Bell size={20} />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-black" />
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setIsProfileOpen(!isProfileOpen)}
                            className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 p-1 pr-3 hover:border-zinc-700 transition-all"
                        >
                            <div className="h-7 w-7 rounded-full bg-zinc-800 flex items-center justify-center">
                                <User size={16} className="text-zinc-400" />
                            </div>
                            <span className="text-sm font-medium text-zinc-300">DataAnalyst_01</span>
                        </button>

                        <AnimatePresence>
                            {isProfileOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/5 bg-zinc-950 p-2 shadow-2xl"
                                >
                                    <div className="px-3 py-2">
                                        <p className="text-[10px] uppercase tracking-widest text-zinc-500">Account</p>
                                    </div>
                                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900">
                                        <Wallet size={16} /> Wallet: $1,240.00
                                    </button>
                                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900">
                                        <Settings size={16} /> Settings
                                    </button>
                                    <div className="my-1 h-px bg-white/5" />
                                    <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-400 hover:bg-red-500/10">
                                        <LogOut size={16} /> Sign Out
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </nav>
    );
}
