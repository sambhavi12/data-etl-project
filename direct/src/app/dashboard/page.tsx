
'use client';

import { mockTasks, mockStats } from '@/lib/mock-data';
import ProfessionalTaskTable from '@/components/dashboard/professional-task-table';
import NotificationDropdown from '@/components/dashboard/notification-dropdown';
import DashboardToast from '@/components/dashboard/dashboard-toast';
import DataPipelineStatus from '@/components/dashboard/data-pipeline-status';
import LiveAuditStream from '@/components/dashboard/live-audit-stream';
import StatCard from '@/components/dashboard/stat-card';

import Link from 'next/link';
import { Search, UserCircle, LayoutGrid, Filter, Plus, X, Zap } from 'lucide-react';
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
        <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans pb-16 selection:bg-emerald-500/30">
            <DashboardToast />

            <div className="max-w-[1600px] mx-auto px-6">

                {/* 1. Header */}
                <header className="sticky top-0 z-40 mb-8 flex items-center justify-between py-6 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl -mx-6 px-6">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-zinc-100 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                                <LayoutGrid size={22} className="text-black" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tighter text-white">Direct.</h1>
                        </div>

                        <div className="hidden md:flex items-center gap-2 bg-[#121215] px-4 py-2 rounded-full border border-white/5 shadow-inner">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            <span className="text-xs font-medium text-zinc-400 font-mono">System v3.0 (Live)</span>
                        </div>

                        <div className="relative group ml-4">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-hover:text-zinc-300 transition-colors" size={16} />
                            <input
                                type="text"
                                placeholder="Search tasks (Cmd+K)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-[#121215] border border-white/5 rounded-full pl-11 pr-12 py-2.5 text-sm text-zinc-300 focus:outline-none focus:border-zinc-700 w-80 transition-all hover:bg-zinc-900 shadow-sm font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <NotificationDropdown />
                        <div className="w-px h-8 bg-white/10"></div>
                        <div className="flex items-center gap-3 cursor-pointer group">
                            <div className="text-right leading-tight">
                                <p className="text-sm font-semibold text-zinc-200 group-hover:text-emerald-400 transition-colors">Shambhavi P.</p>
                                <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-wider">Senior Engineer</p>
                            </div>
                            <div className="p-1 rounded-full border border-white/10 bg-zinc-900 group-hover:border-emerald-500/50 transition-all">
                                <UserCircle size={36} strokeWidth={1.5} className="text-zinc-200" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* 2. Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">

                    {/* Card A (Main): Active Tasks (Spans 2 columns, 2 rows) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="md:col-span-2 md:row-span-2 bento-card p-0 flex flex-col overflow-hidden group"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-white/[0.02]">
                            <h2 className="text-lg font-semibold text-zinc-200 flex items-center gap-2">
                                Execution Queue
                                <span className="text-xs bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono">{displayTasks.length} Active</span>
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
                                <Link href="/submit" className="px-4 py-1.5 bg-zinc-100 text-black rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                    <Plus size={14} /> New Task
                                </Link>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar bg-black/20 p-2">
                            <ProfessionalTaskTable tasks={displayTasks} highlightId={highlightId} />
                        </div>
                    </motion.div>

                    {/* Card B (Stat): Wallet */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <StatCard
                            title="Escrow Vault"
                            value="$5,240.00"
                            trend="+ $1.2k today"
                        />
                    </motion.div>

                    {/* Card C (Stat): Reputation */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <StatCard
                            title="Trust Score"
                            value="98.2%"
                            trend="Top 1% Global"
                        />
                    </motion.div>

                    {/* Card D (Engineering): AI Audit Stream */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.25 }}
                        className="md:col-span-2 bento-card p-1 min-h-[220px]"
                    >
                        <div className="h-full rounded-[20px] overflow-hidden bg-black/40">
                            <LiveAuditStream />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="md:col-span-2 bento-card p-6 flex flex-col justify-center relative overflow-hidden"
                    >
                        {/* Background Glow */}
                        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none" />

                        <div className="flex items-center gap-3 mb-6 relative z-10">
                            <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                <Zap size={20} className="text-blue-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-200 tracking-tight">Infrastructure Health</h3>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Real-time Metrics</p>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <DataPipelineStatus />
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen items-center justify-center bg-[#09090b] text-white font-sans">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                    <p className="text-sm text-zinc-500 animate-pulse font-mono">Initializing Direct OS...</p>
                </div>
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
