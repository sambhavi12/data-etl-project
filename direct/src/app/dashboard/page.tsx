
'use client';

import { mockTasks, mockStats } from '@/lib/mock-data';
import ProfessionalTaskTable from '@/components/dashboard/professional-task-table';
import DashboardToast from '@/components/dashboard/dashboard-toast';
import DataPipelineStatus from '@/components/dashboard/data-pipeline-status';
import LiveAuditStream from '@/components/dashboard/live-audit-stream';
import StatCard from '@/components/dashboard/stat-card';
import GlobalNavbar from '@/components/global-navbar';
import { useDemoSimulator } from '@/hooks/use-demo-simulator';

import Link from 'next/link';
import { Filter, Plus, X, Zap, ArrowUpRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function DashboardContent() {
    const searchParams = useSearchParams();
    const submitted = searchParams.get('submitted') === 'true';
    const [filterStatus, setFilterStatus] = useState<'all' | 'verifying'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isDemoMode, setIsDemoMode] = useState(false);

    // Demo Simulator Hook
    const { logs: demoLogs } = useDemoSimulator(isDemoMode);

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
            <GlobalNavbar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                isDemoMode={isDemoMode}
                onToggleDemo={() => setIsDemoMode(!isDemoMode)}
            />

            <div className="max-w-[1600px] mx-auto px-6 mt-8">

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
                            <LiveAuditStream demoLogs={demoLogs} />
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

                    {/* Card F: Active Agents (Fills the gap) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="md:col-span-2 bento-card p-6 flex flex-col relative overflow-hidden"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-8 w-8 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                                <Check size={16} className="text-orange-500" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-zinc-200 tracking-tight">Active Agents</h3>
                                <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Autonomous Workers</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                                    <span className="text-sm text-zinc-300 font-medium">Validator_v2</span>
                                </div>
                                <span className="text-xs text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">Active</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                                    <span className="text-sm text-zinc-300 font-medium">DataBuddy_AI</span>
                                </div>
                                <span className="text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded-md border border-yellow-500/20">Idle</span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-zinc-500" />
                                    <span className="text-sm text-zinc-300 font-medium">Scraper_Node_04</span>
                                </div>
                                <span className="text-xs text-zinc-500 bg-zinc-500/10 px-2 py-1 rounded-md border border-zinc-500/20">Offline</span>
                            </div>
                        </div>
                    </motion.div>

                </div>

                <div className="mt-12 mb-6 flex justify-center">
                    <p className="text-zinc-600 text-xs font-mono">
                        Engineered in Bengaluru, India • <a href="https://github.com/sambhavi12/data-etl-project" target="_blank" className="hover:text-emerald-500 transition-colors">GitHub</a>
                    </p>
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
