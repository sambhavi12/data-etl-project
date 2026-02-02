"use client";
import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export interface LogItem {
    message: string;
    timestamp?: string;
    color?: string;
}

export default function LiveAuditStream({ demoLogs }: { demoLogs?: LogItem[] }) {
    const [logs, setLogs] = useState<LogItem[]>([]);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch('/api/logs');
                const data = await res.json();
                if (data.logs && Array.isArray(data.logs)) {
                    const richLogs = data.logs.map((l: any) => {
                        if (typeof l === 'string') {
                            return {
                                message: l,
                                timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" })
                            };
                        }
                        return l;
                    });
                    setLogs(richLogs.slice(0, 12));
                }
            } catch (e) {
                console.error("Failed to fetch logs", e);
            }
        };

        fetchLogs();
        const interval = setInterval(fetchLogs, 1000);
        return () => clearInterval(interval);
    }, []);

    const displayLogs = (demoLogs && demoLogs.length > 0) ? demoLogs : logs;

    return (
        <div className="relative h-full flex flex-col rounded-xl border border-zinc-800 bg-[#0c0c0e] p-4 font-mono text-[11px] shadow-inner overflow-hidden">
            <div className="flex items-center justify-between mb-3 text-zinc-500 border-b border-white/5 pb-2">
                <div className="flex items-center gap-2">
                    <Terminal size={14} className="text-emerald-500" />
                    <span className="uppercase tracking-wider font-semibold">System Audit Stream</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-red-500/20 border border-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
                <div className="absolute inset-0 overflow-y-auto custom-scrollbar space-y-1.5">
                    {displayLogs.map((log, i) => (
                        <div key={i} className="flex gap-2.5 items-start animate-in fade-in slide-in-from-bottom-1 duration-300">
                            <span className="text-emerald-500/80 shrink-0 font-bold select-none">{'>'}</span>
                            <div className="flex gap-2">
                                {log.timestamp && (
                                    <span className="text-zinc-600 select-none">[{log.timestamp}]</span>
                                )}
                                <span className={`break-all leading-relaxed ${log.color ? log.color : (i === 0 ? 'text-zinc-100' : 'text-zinc-400')}`}>
                                    {log.message}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div className="flex gap-2.5 items-center mt-2 group">
                        <span className="text-emerald-500/80 shrink-0 font-bold">{'>'}</span>
                        <span className="w-2 h-4 bg-emerald-500/50 animate-pulse block" />
                    </div>
                </div>
            </div>

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        </div>
    );
}
