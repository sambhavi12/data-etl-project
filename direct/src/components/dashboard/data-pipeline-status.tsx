
"use client";
import { Activity, Database, Server } from 'lucide-react';

export default function DataPipelineStatus() {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem',
            padding: '1rem',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(9, 9, 11, 0.4)',
            backdropFilter: 'blur(8px)'
        }}>
            <StatusItem
                label="DB Latency"
                value="24ms"
                icon={<Database size={14} className="text-emerald-500" />}
                statusColor="#10b981"
            />
            <StatusItem
                label="Pipeline Status"
                value="Healthy"
                icon={<Activity size={14} className="text-blue-500" />}
                statusColor="#3b82f6"
            />
            <StatusItem
                label="Worker Nodes"
                value="Active (4)"
                icon={<Server size={14} className="text-purple-500" />}
                statusColor="#a855f7"
            />
        </div>
    );
}

function StatusItem({ label, value, icon, statusColor }: any) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{
                padding: '0.4rem',
                borderRadius: '6px',
                background: `${statusColor}1A`, // 10% opacity
                display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: '0.7rem', color: '#71717a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: statusColor }}></div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e4e4e7', fontFamily: 'var(--font-mono)' }}>{value}</p>
                </div>
            </div>
        </div>
    )
}
