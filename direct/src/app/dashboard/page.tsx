
'use client';

import { mockTasks, mockStats } from '@/lib/mock-data';
import StatRibbon from '@/components/dashboard/stat-ribbon';
import ProfessionalTaskTable from '@/components/dashboard/professional-task-table';
import { ActivitySidebar } from '@/components/dashboard/activity-sidebar';
import QualityChart from '@/components/dashboard/quality-chart';
import NotificationDropdown from '@/components/dashboard/notification-dropdown';
import DashboardToast from '@/components/dashboard/dashboard-toast';
import Link from 'next/link';
import { Search, UserCircle, LayoutGrid, Filter, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';

function DashboardContent() {
    // We need to resolve useSearchParams on the client side now that we switched to Client Component for Framer Motion?
    // Wait, typical pattern for Page in App Router is Server Component.
    // Specifying 'use client' at top makes the whole page client.
    // Framer Motion generally requires client components.
    // I will keep it 'use client' for the rich interactivity requested.

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
        <div style={{
            minHeight: '100vh',
            background: '#09090b', // Zinc 950
            backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)', // Subtle gradient
            fontFamily: 'Inter, sans-serif',
            color: '#e4e4e7',
            paddingBottom: '4rem'
        }}>
            <DashboardToast />

            <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 2rem' }}>

                {/* 1. Header (Glass & Sticky) */}
                <header style={{
                    position: 'sticky', top: 0, zIndex: 40,
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                    background: 'rgba(9, 9, 11, 0.6)',
                    backdropFilter: 'blur(12px)',
                    margin: '0 -2rem', paddingLeft: '2rem', paddingRight: '2rem' // break out of container
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ width: '32px', height: '32px', background: '#e4e4e7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <LayoutGrid size={20} color="#000" />
                            </div>
                            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>Direct.</h1>
                        </div>

                        {/* System Status Indicator */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.8rem', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ position: 'relative', width: '6px', height: '6px' }}>
                                <div style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', background: '#10b981', opacity: 0.75, animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite' }}></div>
                                <div style={{ position: 'relative', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
                            </div>
                            <span style={{ fontSize: '0.7rem', fontWeight: 500, color: '#a1a1aa' }}>System v2.4 (Live)</span>
                        </div>

                        {/* Global Search */}
                        <div style={{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            background: 'rgba(24, 24, 27, 0.5)', border: '1px solid rgba(255,255,255,0.1)',
                            padding: '0.5rem 1rem', borderRadius: '8px', width: '300px', marginLeft: '1rem',
                            transition: 'all 0.2s',
                        }}
                            className="group hover:border-zinc-700 hover:bg-zinc-900/80"
                        >
                            <Search size={14} color="#71717a" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    background: 'transparent', border: 'none', outline: 'none',
                                    color: '#ddd', fontSize: '0.85rem', width: '100%'
                                }}
                            />
                            <span style={{ fontSize: '0.7rem', color: '#52525b', border: '1px solid #3f3f46', borderRadius: '4px', padding: '0 4px' }}>⌘K</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <NotificationDropdown />
                        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <div style={{ textAlign: 'right', lineHeight: 1.2 }}>
                                <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e4e4e7' }}>Shambhavi P.</p>
                                <p style={{ fontSize: '0.7rem', color: '#a1a1aa' }}>Senior Engineer</p>
                            </div>
                            <UserCircle size={32} strokeWidth={1.5} color="#e4e4e7" />
                        </div>
                    </div>
                </header>

                {/* 2. Macro Stats Row (Bento Style within component) */}
                <StatRibbon stats={mockStats} />

                {/* 3. The Main Bento Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '1.5rem',
                    alignItems: 'start'
                }}>

                    {/* Left Column: Task Execution Table (Span 8) */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        style={{ gridColumn: 'span 8' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#e4e4e7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                Execution Queue
                                <span style={{ fontSize: '0.75rem', background: '#27272a', color: '#a1a1aa', padding: '2px 8px', borderRadius: '9999px' }}>{displayTasks.length}</span>
                            </h2>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <button
                                    onClick={() => setFilterStatus(prev => prev === 'all' ? 'verifying' : 'all')}
                                    style={{
                                        padding: '0.5rem 0.9rem',
                                        background: filterStatus === 'verifying' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)',
                                        color: filterStatus === 'verifying' ? '#10b981' : '#a1a1aa',
                                        border: filterStatus === 'verifying' ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        fontWeight: 500,
                                        display: 'flex', alignItems: 'center', gap: '0.4rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <Filter size={14} />
                                    {filterStatus === 'verifying' ? 'Active: Verifying' : 'Filter Status'}
                                    {filterStatus === 'verifying' && <X size={12} style={{ marginLeft: '4px' }} />}
                                </button>
                                <Link href="/submit" style={{
                                    padding: '0.5rem 1rem',
                                    background: '#fff',
                                    color: '#000',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    fontWeight: 600,
                                    textDecoration: 'none',
                                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                                    boxShadow: '0 0 20px rgba(255, 255, 255, 0.2)'
                                }}>
                                    <Plus size={16} /> New Task
                                </Link>
                            </div>
                        </div>

                        <div style={{
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            background: 'rgba(24, 24, 27, 0.6)',
                            backdropFilter: 'blur(12px)',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        }}>
                            <ProfessionalTaskTable tasks={displayTasks} highlightId={highlightId} />
                        </div>
                    </motion.div>

                    {/* Right Column: AI Activity Stream & Performance (Span 4) */}
                    <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

                        {/* AI Audit Stream Sidebar */}
                        <div style={{ height: '400px' }}>
                            <ActivitySidebar />
                        </div>

                        {/* Performance Chart Bento Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.25 }}
                            style={{
                                border: '1px solid rgba(255, 255, 255, 0.08)',
                                borderRadius: '16px',
                                background: 'rgba(24, 24, 27, 0.6)',
                                backdropFilter: 'blur(12px)',
                                padding: '1.25rem',
                                minHeight: '300px'
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#e4e4e7' }}>Quality Trend</h2>
                                <span style={{ fontSize: '0.7rem', color: '#10b981', background: 'rgba(16, 185, 129, 0.1)', padding: '0.2rem 0.6rem', borderRadius: '6px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                                    +12% vs last week
                                </span>
                            </div>
                            <div style={{ height: '250px', width: '100%' }}>
                                <QualityChart stats={mockStats} />
                            </div>
                        </motion.div>

                    </div>

                </div>
            </div>
        </div>
    );
}

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
