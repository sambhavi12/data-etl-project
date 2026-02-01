
'use client';

import { useState } from 'react';
import { Task } from '@/types';
import { BadgeCheck, AlertCircle, Clock, CheckCircle2, ShieldAlert, Play, MessageSquare, Eye, Banknote, Loader2 } from 'lucide-react';
import { formatCurrency, getStatusColor } from '@/components/dashboard/task-table';
import CircularProgress from '@/components/ui/circular-progress';
import TaskDrawer from './task-drawer';

export default function ProfessionalTaskTable({ tasks, highlightId }: { tasks: Task[], highlightId?: string | null }) {
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    if (!tasks || tasks.length === 0) return null;

    const handleRowClick = (task: Task) => {
        setSelectedTask(task);
    };

    const renderAction = (task: Task) => {
        switch (task.status) {
            case 'draft':
                return (
                    <button onClick={(e) => { e.stopPropagation(); }} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '6px', background: '#3b82f6', color: '#fff', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                        <Play size={12} /> Publish
                    </button>
                );
            case 'in_progress':
                return (
                    <button onClick={(e) => { e.stopPropagation(); }} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'transparent', color: '#a1a1aa', border: '1px solid #3f3f46', fontSize: '0.75rem', fontWeight: 500, cursor: 'pointer' }}>
                        <MessageSquare size={12} /> Message
                    </button>
                );
            case 'verifying':
                return (
                    <button onClick={(e) => { e.stopPropagation(); setSelectedTask(task); }} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'rgba(59, 130, 246, 0.1)', color: '#60a5fa', border: '1px solid rgba(59, 130, 246, 0.3)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', animation: 'pulse 2s infinite' }}>
                        <Eye size={12} /> Live Audit
                    </button>
                );
            case 'completed':
                return (
                    <button onClick={(e) => { e.stopPropagation(); setSelectedTask(task); }} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.4rem 0.8rem', borderRadius: '6px', background: 'rgba(16, 185, 129, 0.1)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}>
                        <Banknote size={12} /> Release Funds
                    </button>
                );
            default:
                return <span style={{ color: '#52525b', fontSize: '0.8rem' }}>View</span>;
        }
    };

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #27272a', textAlign: 'left' }}>
                        <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500 }}>Task / Requirement</th>
                        <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500 }}>Status</th>
                        <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500 }}>AI Audit Score</th>
                        <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500, textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr
                            key={task.id}
                            onClick={() => handleRowClick(task)}
                            style={{
                                borderBottom: '1px solid #18181b',
                                background: task.id === highlightId ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer',
                                borderLeft: task.id === highlightId ? '2px solid #10b981' : '2px solid transparent'
                            }}
                            className="hover:bg-white/5"
                        >
                            <td style={{ padding: '1rem' }}>
                                <div style={{ fontWeight: 600, color: '#e4e4e7', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {task.title}
                                </div>
                                <div style={{ fontSize: '0.75rem', color: '#71717a' }}>{task.category}</div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <StatusIcon status={task.status} color={getStatusColor(task.status)} />
                                    <span style={{
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        color: getStatusColor(task.status),
                                        textTransform: 'uppercase',
                                        letterSpacing: '0.05em'
                                    }}>
                                        {task.status.replace('_', ' ')}
                                    </span>
                                </div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                {task.status !== 'draft' && task.status !== 'in_progress' ? (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <CircularProgress
                                            value={task.confidenceScore}
                                            size={40}
                                            color={task.confidenceScore >= 90 ? '#10b981' : task.confidenceScore < 60 ? '#ef4444' : '#f59e0b'}
                                        />
                                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                                            <span style={{ fontSize: '0.75rem', color: '#d4d4d8', fontWeight: 500 }}>Confidence</span>
                                            <span style={{ fontSize: '0.65rem', color: '#71717a' }}>High Fidelity</span>
                                        </div>
                                    </div>
                                ) : (
                                    <span style={{ fontSize: '0.8rem', color: '#52525b', paddingLeft: '0.5rem' }}>--</span>
                                )}
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    {renderAction(task)}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <TaskDrawer
                task={selectedTask}
                isOpen={!!selectedTask}
                onClose={() => setSelectedTask(null)}
            />
        </div>
    );
}

function StatusIcon({ status, color }: { status: Task['status'], color: string }) {
    switch (status) {
        case 'completed': return <BadgeCheck size={16} color={color} />;
        case 'verifying': return <Loader2 size={16} color={color} className="animate-spin" />;
        case 'in_progress': return <CheckCircle2 size={16} color={color} />;
        case 'flagged': return <ShieldAlert size={16} color={color} />;
        default: return <AlertCircle size={16} color={color} />;
    }
}
