
"use client";
import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

const LOG_MESSAGES = [
    "Validating Task #882... Done",
    "Checking Escrow balance... Verified",
    "AI integrity check in progress...",
    "Data pipeline synchronized with Supabase",
    "Compiling report for 'Market Analysis'...",
    "Upload complete: 14.2MB to S3 Bucket",
    "Anomaly detected in row 452 (Handled)",
    "Agent 'DataBuddy' requested improved inputs",
];

export default function LiveAuditStream() {
    const [logs, setLogs] = useState<string[]>([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch('/api/logs');
                const data = await res.json();
                if (data.logs) {
                    setLogs(data.logs.slice(0, 8));
                }
            } catch (e) {
                console.error("Failed to fetch logs", e);
            }
        };

        // Initial fetch
        fetchLogs();

        // Poll every 1 second
        const interval = setInterval(fetchLogs, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 font-mono text-xs backdrop-blur-sm" style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(9,9,11,0.5)' }}>
            <div className="flex items-center gap-2 mb-3 text-zinc-400" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: '#a1a1aa' }}>
                <Terminal size={14} />
                <span className="uppercase tracking-widest" style={{ letterSpacing: '0.1em' }}>System Audit Stream</span>
            </div>
            <div className="space-y-1" style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                {logs.map((log, i) => (
                    <div key={i} className="flex gap-2" style={{ display: 'flex', gap: '0.5rem', opacity: 1 - (i * 0.1) }}>
                        {/* Fade out older logs */}
                        <span className="text-emerald-500" style={{ color: '#10b981' }}>[OK]</span>
                        <span className="text-zinc-300" style={{ color: '#d4d4d8' }}>{log}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
