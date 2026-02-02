
'use client';

import { mockTasks, mockStats } from '@/lib/mock-data';
import ProfessionalTaskTable from '@/components/dashboard/professional-task-table';
import NotificationDropdown from '@/components/dashboard/notification-dropdown';
import DashboardToast from '@/components/dashboard/dashboard-toast';
import DataPipelineStatus from '@/components/dashboard/data-pipeline-status';
import LiveAuditStream from '@/components/dashboard/live-audit-stream';

import Link from 'next/link';
import { Search, UserCircle, LayoutGrid, Filter, Plus, X, Wallet, ShieldCheck, Zap, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function DashboardContent() {
    const searchParams = useSearchParams();
    const submitted = searchParams.get('submitted') === 'true';
    const [filterStatus, setFilterStatus] = useState<'all' | 'verifying'>('all');
    const [searchQuery, setSearchQuery] = useState('');

    let displayTasks = [...mockTasks];
    let highlightId = null;

    if (submitted) {
        const newTask = {
            id: 't-new-001',
            title: 'Refactored Payment Logic (Stripe)',
            category: 'Data Engineering' as const,
            status: 'verifying' as const,
            budget: 1500,
            confidenceScore: 0,
            createdAt: new Date(),
        };
        // @ts-ignore
        displayTasks = [newTask, ...mockTasks];
        highlightId = newTask.id;
    }

    if (filterStatus === 'verifying') {
        displayTasks = displayTasks.filter(t => t.status === 'verifying');
    }

    if (searchQuery) {
        displayTasks = displayTasks.filter(t =>
            t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            t.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return (
        <div className="min-h-screen bg-black text-zinc-100 font-sans pb-16 selection:bg-emerald-500/30">
            <DashboardToast />

            <div className="max-w-[1600px] mx-auto px-6">

                {/* 1. Header */}
                <header className="sticky top-0 z-40 mb-8 flex items-center justify-between py-4 border-b border-white/5 bg-zinc-950/60 backdrop-blur-xl -mx-6 px-6">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center">
                                <LayoutGrid size={20} className="text-black" />
                            </div>
                            <h1 className="text-xl font-bold tracking-tight text-white">Direct.</h1>
                        </div>

                        <div className="hidden md:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-medium text-zinc-400">System v3.0 (Live)</span>
                        </div>

                        <div className="relative group ml-4">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-zinc-300 transition-colors" size={14} />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-zinc-900/50 border border-white/10 rounded-lg pl-9 pr-12 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-700 w-64 transition-all hover:bg-zinc-900/80"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-zinc-600 border border-zinc-800 rounded px-1">⌘K</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <NotificationDropdown />
                        <div className="w-px h-6 bg-white/10"></div>
                        <div className="flex items-center gap-3 cursor-pointer">
                            <div className="text-right leading-tight">
                                <p className="text-sm font-semibold text-zinc-200">Shambhavi P.</p>
                                <p className="text-xs text-zinc-500">Senior Engineer</p>
                            </div>
                            <UserCircle size={32} strokeWidth={1.5} className="text-zinc-200" />
                        </div>
                    </div>
                </header>

                {/* 2. Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* Card A (Main): Active Tasks (Spans 2 columns, 2 rows) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 md:row-span-2 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl flex flex-col"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
                                Execution Queue
                                <span className="text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded-full">{displayTasks.length}</span>
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setFilterStatus(prev => prev === 'all' ? 'verifying' : 'all')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all ${filterStatus === 'verifying'
                                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                                        : 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10'
                                        }`}
                                >
                                    <Filter size={12} />
                                    {filterStatus === 'verifying' ? 'Verifying' : 'Filter'}
                                    {filterStatus === 'verifying' && <X size={10} />}
                                </button>
                                <Link href="/submit" className="px-3 py-1.5 bg-white text-black rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-zinc-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                    <Plus size={14} /> New
                                </Link>
                            </div>
                        </div>

                        <div className="flex-1 overflow-hidden rounded-xl border border-white/5 bg-black/20">
                            <ProfessionalTaskTable tasks={displayTasks} highlightId={highlightId} />
                        </div>
                    </motion.div>

                    {/* Card B (Stat): Wallet */}
                    {/* Card B (Stat): Wallet */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                                <Wallet size={20} className="text-amber-500" />
                            </div>
                            <span className="text-xs font-mono text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded">
                                + $1.2k <ArrowUpRight size={12} />
                            </span>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Escrow Vault</p>
                            <p className="text-3xl font-bold text-white font-mono tracking-tight">$5,240.00</p>
                        </div>
                    </motion.div>

                    {/* Card C (Stat): Reputation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl flex flex-col justify-between"
                    >
                        <div className="flex justify-between items-start">
                            <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                                <ShieldCheck size={20} className="text-emerald-500" />
                            </div>
                            <span className="text-xs font-mono text-emerald-500 flex items-center gap-1 bg-emerald-500/10 px-2 py-1 rounded">
                                99.9% <Check size={12} />
                            </span>
                        </div>
                        <div>
                            <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Trust Score</p>
                            <p className="text-3xl font-bold text-white font-mono tracking-tight">98.2%</p>
                        </div>
                    </motion.div>

                    {/* Card D (Engineering): AI Audit Stream (Spans 2 columns) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="md:col-span-2 rounded-3xl border border-zinc-800 bg-zinc-950 p-1 flex flex-col"
                    >
                        <LiveAuditStream />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl flex flex-col justify-center"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg">
                                <Zap size={20} className="text-blue-500" />
                            </div>
                            <h3 className="font-semibold text-zinc-200">Infrastructure Health</h3>
                        </div>
                        <DataPipelineStatus />
                    </motion.div>

                </div>
            </div>
        </div>
    );
}

// Helper to access icons if FinancialTerminal doesn't export them (we can just import lucide-react directly above)
// I need to update FinancialTerminal to export icons or just import them.
// Let's import icons directly.


export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: '#09090b',
                color: '#fff',
                fontFamily: 'Inter, sans-serif'
            }}>
                Loading Direct OS...
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
