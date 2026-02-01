
import { Task } from '@/types';
import { BadgeCheck, AlertCircle, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
}

export function getStatusColor(status: Task['status']): string {
    switch (status) {
        case 'completed': return '#10b981'; // Emerald
        case 'verifying': return '#3b82f6'; // Blue
        case 'in_progress': return '#f59e0b'; // Amber
        case 'flagged': return '#ef4444'; // Red
        case 'claiming': return '#8b5cf6'; // Violet
        default: return '#71717a'; // Zinc
    }
}

export default function TaskTable({ tasks }: { tasks: Task[] }) {
    if (!tasks || tasks.length === 0) {
        return <div style={{ padding: '2rem', color: '#71717a', textAlign: 'center' }}>No tasks available.</div>;
    }

    return (
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid #27272a', textAlign: 'left' }}>
                        <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500 }}>Task</th>
                        <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500 }}>Status</th>
                        <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500 }}>Confidence</th>
                        <th style={{ padding: '1rem', color: '#a1a1aa', fontWeight: 500, textAlign: 'right' }}>Budget</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => (
                        <tr key={task.id} style={{ borderBottom: '1px solid #18181b' }}>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ fontWeight: 600, color: '#e4e4e7' }}>{task.title}</div>
                                <div style={{ fontSize: '0.75rem', color: '#71717a' }}>{task.category}</div>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <span style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.4rem',
                                    padding: '0.3rem 0.6rem',
                                    borderRadius: '999px',
                                    background: `${getStatusColor(task.status)}20`,
                                    color: getStatusColor(task.status),
                                    fontSize: '0.75rem',
                                    fontWeight: 600,
                                    textTransform: 'uppercase',
                                    border: `1px solid ${getStatusColor(task.status)}40`
                                }}>
                                    <StatusIcon status={task.status} color={getStatusColor(task.status)} />
                                    {task.status.replace('_', ' ')}
                                </span>
                            </td>
                            <td style={{ padding: '1rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <div style={{ flex: 1, height: '6px', background: '#27272a', borderRadius: '4px', width: '80px' }}>
                                        <div style={{
                                            height: '100%',
                                            width: `${task.confidenceScore}%`,
                                            background: task.confidenceScore >= 90 ? '#10b981' : task.confidenceScore >= 70 ? '#f59e0b' : '#ef4444',
                                            borderRadius: '4px'
                                        }} />
                                    </div>
                                    <span style={{ fontSize: '0.8rem', color: '#d4d4d8' }}>{task.confidenceScore}%</span>
                                </div>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 600, color: '#e4e4e7' }}>
                                {formatCurrency(task.budget)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function StatusIcon({ status, color }: { status: Task['status'], color: string }) {
    switch (status) {
        case 'completed': return <BadgeCheck size={14} color={color} />;
        case 'verifying': return <Clock size={14} color={color} />;
        case 'in_progress': return <CheckCircle2 size={14} color={color} />;
        case 'flagged': return <ShieldAlert size={14} color={color} />;
        default: return <AlertCircle size={14} color={color} />;
    }
}
