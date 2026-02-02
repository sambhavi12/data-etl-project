
'use client';

import { DashboardStats } from '@/types';
import { formatCurrency } from './task-table';
import { Wallet, Activity, Binary, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FinancialTerminal({ stats }: { stats: DashboardStats }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
            <TerminalCard
                label="Escrow Vault"
                value={formatCurrency(stats.totalEscrowed)}
                subValue="+ $1,250.00 today"
                subColor="#10b981"
                icon={<Wallet size={18} />}
                accentColor="rgba(245, 158, 11, 0.5)" // Amber
            />
            <TerminalCard
                label="Active Contracts"
                value={stats.activeTasks.toString()}
                subValue="3 pending audit"
                subColor="#3b82f6"
                icon={<Activity size={18} />}
                accentColor="rgba(59, 130, 246, 0.5)" // Blue
            />
            <TerminalCard
                label="Quality Index"
                value={`${stats.averageQualityScore}%`}
                subValue="99.9% uptime"
                subColor="#10b981"
                icon={<Binary size={18} />}
                accentColor="rgba(16, 185, 129, 0.5)" // Emerald
            />
            <TerminalCard
                label="Net Efficiency"
                value="98.2%"
                subValue="Optimized"
                subColor="#a855f7"
                icon={<TrendingUp size={18} />}
                accentColor="rgba(168, 85, 247, 0.5)" // Purple
            />
        </div>
    );
}

function TerminalCard({ label, value, subValue, subColor, icon, accentColor }: any) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                background: '#09090b',
                border: '1px solid #27272a',
                borderRadius: '0px', // Terminal look often sharper
                borderBottom: `2px solid ${accentColor.replace('0.5)', '1)')}`,
                padding: '1.25rem',
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'var(--font-mono)' // FORCE MONO
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{label}</span>
                <span style={{ color: '#52525b' }}>{icon}</span>
            </div>

            <p style={{ fontSize: '1.5rem', fontWeight: 600, color: '#e4e4e7', marginBottom: '0.5rem', letterSpacing: '-0.05em' }}>
                {value}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: subColor }}>
                <ArrowUpRight size={14} />
                <span>{subValue}</span>
            </div>
        </motion.div>
    )
}
