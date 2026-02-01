
import { Scan, ShieldCheck, Lock, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuditEvent {
    id: string;
    type: 'analysis' | 'security' | 'financial' | 'verification';
    message: string;
    timestamp: string;
}

const mockEvents: AuditEvent[] = [
    { id: '1', type: 'verification', message: 'Logic check passed (94%)', timestamp: '2m ago' },
    { id: '2', type: 'financial', message: 'Funds secured in Escrow', timestamp: '15m ago' },
    { id: '3', type: 'analysis', message: 'Analyzing plagiarism patterns...', timestamp: '1h ago' },
    { id: '4', type: 'security', message: 'Vulnerability scan complete', timestamp: '2h ago' },
];

export default function AuditTimeline() {
    const getIcon = (type: string) => {
        switch (type) {
            case 'analysis': return <Scan size={16} color="#a1a1aa" />;
            case 'security': return <ShieldCheck size={16} color="#3b82f6" />; // Blue
            case 'financial': return <Lock size={16} color="#eab308" />; // Yellow
            case 'verification': return <CheckCircle2 size={16} color="#10b981" />; // Emerald
            default: return <AlertCircle size={16} color="#a1a1aa" />;
        }
    };

    return (
        <div style={{
            background: '#18181b',
            border: '1px solid #27272a',
            borderRadius: '12px',
            padding: '1.5rem',
            height: '100%'
        }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e4e4e7', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%', display: 'inline-block' }}></span>
                Live Audit Feed
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {mockEvents.map((event, index) => (
                    <div key={event.id} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                        {/* Connecting Line (except for last item) */}
                        {index !== mockEvents.length - 1 && (
                            <div style={{
                                position: 'absolute',
                                left: '11px', // Center of icon (24px width approx)
                                top: '24px',
                                bottom: '-8px',
                                width: '2px',
                                background: '#27272a'
                            }} />
                        )}

                        <div style={{
                            minWidth: '24px',
                            height: '24px',
                            background: '#27272a',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1
                        }}>
                            {getIcon(event.type)}
                        </div>
                        <div style={{ paddingBottom: '1.5rem' }}>
                            <p style={{ fontSize: '0.85rem', color: '#d4d4d8', marginBottom: '0.2rem' }}>{event.message}</p>
                            <span style={{ fontSize: '0.75rem', color: '#71717a' }}>{event.timestamp}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
