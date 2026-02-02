
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

export default function LiveAuditStream({ demoLogs }: { demoLogs?: string[] }) {
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

    const displayLogs = (demoLogs && demoLogs.length > 0) ? demoLogs : logs;

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 font-mono text-xs backdrop-blur-sm shadow-inner">
            <div className="flex items-center gap-2 mb-3 text-zinc-400">
                <Terminal size={14} />
                <span className="uppercase tracking-widest text-[10px]">System Audit Stream</span>
            </div>
            <div className="space-y-1">
                {displayLogs.map((log, i) => (
                    <div key={i} className={`flex gap-2`} style={{ opacity: 1 - (i * 0.1) }}>
                        <span className="text-emerald-500 shrink-0">[LOG]</span>
                        <span className="text-zinc-300 truncate">{log}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
