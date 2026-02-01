
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, ShieldCheck, Banknote } from 'lucide-react';
import { Task } from '@/types';
import { getStatusColor } from './task-table';
import VerificationReport from './verification-report';

interface TaskDrawerProps {
    task: Task | null;
    isOpen: boolean;
    onClose: () => void;
}

export default function TaskDrawer({ task, isOpen, onClose }: TaskDrawerProps) {
    if (!task) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{
                            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                            background: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)',
                            zIndex: 40
                        }}
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        style={{
                            position: 'fixed', top: 0, right: 0, bottom: 0,
                            width: '100%', maxWidth: '500px',
                            background: '#09090b', borderLeft: '1px solid #27272a',
                            boxShadow: '-4px 0 15px rgba(0, 0, 0, 0.5)',
                            zIndex: 50, display: 'flex', flexDirection: 'column'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '1.5rem', borderBottom: '1px solid #27272a', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', lineHeight: 1.2, marginBottom: '0.5rem' }}>
                                    {task.title}
                                </h2>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <span style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>{task.category}</span>
                                    <span style={{
                                        fontSize: '0.75rem', fontWeight: 600,
                                        color: getStatusColor(task.status),
                                        padding: '0.2rem 0.6rem', borderRadius: '9999px',
                                        background: `${getStatusColor(task.status)}1A`, // 10% opacity hex
                                        border: `1px solid ${getStatusColor(task.status)}33`,
                                        textTransform: 'uppercase'
                                    }}>
                                        {task.status.replace('_', ' ')}
                                    </span>
                                </div>
                            </div>
                            <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
                                <X size={20} color="#71717a" />
                            </button>
                        </div>

                        {/* Content Scrollable Area */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                            {/* The Submission */}
                            <section>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e4e4e7', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <FileText size={16} color="#3b82f6" /> The Submission
                                </h3>
                                <div style={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px', padding: '1rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                                        <div style={{ width: '40px', height: '40px', background: '#27272a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <span style={{ fontSize: '1rem', fontWeight: 600, color: '#d4d4d8' }}>SB</span>
                                        </div>
                                        <div>
                                            <p style={{ fontSize: '0.9rem', fontWeight: 500, color: '#e4e4e7' }}>Sarah B. (Data Buddy)</p>
                                            <p style={{ fontSize: '0.75rem', color: '#71717a' }}>Attached 2 files • 1 hour ago</p>
                                        </div>
                                    </div>
                                    <div style={{ padding: '0.75rem', background: '#27272a', borderRadius: '6px', fontSize: '0.85rem', color: '#d4d4d8', fontFamily: 'monospace', borderLeft: '3px solid #3b82f6' }}>
                                        final_output_v2.json (1.2MB)
                                    </div>
                                    <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#a1a1aa', lineHeight: 1.5 }}>
                                        Completed the refactoring as requested. Validated against the test suite provided in the brief. Please review the schema changes.
                                    </p>
                                </div>
                            </section>

                            {/* AI Logic Audit */}
                            <section>
                                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e4e4e7', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <ShieldCheck size={16} color="#10b981" /> AI Logic Audit
                                </h3>
                                <VerificationReport task={task} />
                            </section>

                        </div>

                        {/* Footer / Actions */}
                        <div style={{ padding: '1.5rem', borderTop: '1px solid #27272a', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <button style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: '#10b981',
                                border: 'none',
                                borderRadius: '8px',
                                color: '#fff',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)'
                            }}>
                                <Banknote size={18} /> Release Funds (${task.budget})
                            </button>
                            <button onClick={onClose} style={{
                                width: '100%',
                                padding: '0.75rem',
                                background: 'transparent',
                                border: '1px solid #3f3f46',
                                borderRadius: '8px',
                                color: '#e4e4e7',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                cursor: 'pointer'
                            }}>
                                Request Revision
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
