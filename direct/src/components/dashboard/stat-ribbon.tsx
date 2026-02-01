
'use client';

import { DashboardStats } from '@/types';
import { formatCurrency } from './task-table';
import { Wallet, Activity, Binary, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function StatRibbon({ stats }: { stats: DashboardStats }) {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}
        >
            <StatItem
                label="Total Escrowed"
                value={formatCurrency(stats.totalEscrowed)}
                icon={<Wallet size={20} className="text-amber-500" />}
                trend="+12%"
                color="rgba(245, 158, 11, 0.1)"
                variants={item}
            />
            <StatItem
                label="Active Tasks"
                value={stats.activeTasks.toString()}
                icon={<Activity size={20} className="text-blue-500" />}
                trend="+3"
                color="rgba(59, 130, 246, 0.1)"
                variants={item}
            />
            <StatItem
                label="Avg Quality Score"
                value={`${stats.averageQualityScore}%`}
                icon={<Binary size={20} className="text-emerald-500" />}
                trend="+2.4%"
                color="rgba(16, 185, 129, 0.1)"
                variants={item}
            />
            <StatItem
                label="Efficiency Rate"
                value="98.2%"
                icon={<TrendingUp size={20} className="text-purple-500" />}
                trend="+0.8%"
                color="rgba(168, 85, 247, 0.1)"
                variants={item}
            />
        </motion.div>
    );
}

function StatItem({ label, value, icon, trend, color, variants }: any) {
    return (
        <motion.div
            variants={variants}
            style={{
                background: 'rgba(24, 24, 27, 0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '140px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
            }}
            whileHover={{ scale: 1.02, borderColor: 'rgba(255, 255, 255, 0.15)' }}
        >
            {/* Background Glow */}
            < div style={{
                position: 'absolute', top: '-20%', right: '-20%',
                width: '100px', height: '100px', borderRadius: '50%',
                background: color, filter: 'blur(40px)', zIndex: 0
            }} />

            < div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1, marginBottom: 'auto' }}>
                <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    padding: '0.6rem', // slightly larger container
                    borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    {icon}
                </div>
                <span style={{
                    fontSize: '0.75rem', fontWeight: 600,
                    color: trend.startsWith('+') ? '#10b981' : '#ef4444',
                    background: trend.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    padding: '0.2rem 0.6rem', borderRadius: '20px'
                }}>
                    {trend}
                </span>
            </div >

            <div style={{ zIndex: 1 }}>
                <p style={{ fontSize: '0.85rem', color: '#a1a1aa', fontWeight: 500 }}>{label}</p>
                <p style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginTop: '0.2rem' }}>{value}</p>
            </div>
        </motion.div >
    )
}
