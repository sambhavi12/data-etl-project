'use client';

import { CheckCircle2, AlertCircle, Loader2, Search, Download, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

type ActivityEvent = {
    id: string;
    type: 'success' | 'warning' | 'loading' | 'info';
    message: string;
    timestamp: string;
};

const mockEvents: ActivityEvent[] = [
    { id: '2', type: 'loading', message: 'Analyzing "Refactored Payment Logic" inputs...', timestamp: 'Just now' },
    { id: '1', type: 'success', message: 'Plagiarism check passed for "Market Analysis"', timestamp: '5 mins ago' },
    { id: '3', type: 'warning', message: 'Incomplete citation in "Research Task"', timestamp: '20 mins ago' },
    { id: '4', type: 'info', message: 'Buddy "Alex" claimed "Python Scripting"', timestamp: '1 hour ago' },
];

export const ActivitySidebar = () => {
    const handleDownload = () => {
        toast.info("Generating Audit Report...", { duration: 2000 });

        setTimeout(() => {
            const element = document.createElement("a");
            const file = new Blob([JSON.stringify(mockEvents, null, 2)], { type: 'text/plain' });
            element.href = URL.createObjectURL(file);
            element.download = "audit-report-v2.4.json";
            document.body.appendChild(element); // Required for this to work in FireFox
            element.click();
            toast.success("Download Complete");
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{
                width: '100%',
                height: '100%',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '16px',
                background: 'rgba(24, 24, 27, 0.6)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                padding: '1.25rem',
                position: 'sticky',
                top: '2rem',
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e4e4e7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Activity size={16} className="text-blue-500" />
                    AI Audit Stream
                </h3>
                <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    background: 'rgba(16, 185, 129, 0.1)',
                    color: '#10b981',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                    Live
                </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
                {mockEvents.map((event) => (
                    <div key={event.id} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                        <div style={{ marginTop: '0.125rem', padding: '0.25rem', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                            {event.type === 'success' && <CheckCircle2 size={14} className="text-emerald-500" />}
                            {event.type === 'warning' && <AlertCircle size={14} className="text-amber-500" />}
                            {event.type === 'loading' && <Loader2 size={14} className="text-blue-500 animate-spin" />}
                            {event.type === 'info' && <Search size={14} className="text-slate-400" />}
                        </div>
                        <div style={{ flex: 1 }}>
                            <p style={{ fontSize: '0.85rem', color: '#d4d4d8', lineHeight: 1.4, marginBottom: '0.2rem' }}>{event.message}</p>
                            <span style={{ fontSize: '0.7rem', color: '#71717a' }}>{event.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleDownload}
                style={{
                    width: '100%',
                    marginTop: '1.5rem',
                    padding: '0.6rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#a1a1aa',
                    border: '1px dashed #3f3f46',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.02)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s'
                }}>
                <Download size={14} />
                Download Audit Report
            </button>
        </motion.div >
    );
};
