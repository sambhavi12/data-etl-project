
import { Activity, Gauge } from 'lucide-react';

export default function SystemHealth() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>

            {/* Live Feed Card */}
            <div style={{
                background: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '12px',
                padding: '1.5rem',
                flex: 1
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    <div style={{ position: 'relative' }}>
                        <div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%' }} />
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%', opacity: 0.5, animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
                    </div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#e4e4e7' }}>AI Monitor</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <FeedItem
                        time="Just now"
                        msg="Scanning Task #t-102 for plagiarism..."
                        icon={<Activity size={14} color="#3b82f6" />}
                    />
                    <FeedItem
                        time="2m ago"
                        msg="Task #t-104 failed compliance check (GDPR)"
                        icon={<AlertIcon />}
                        isError
                    />
                    <FeedItem
                        time="15m ago"
                        msg="Verification complete for Task #t-101"
                        icon={<CheckIcon />}
                    />
                    <div style={{
                        padding: '0.75rem',
                        background: '#27272a',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        color: '#a1a1aa',
                        fontFamily: 'monospace',
                        marginTop: '0.5rem'
                    }}>
                        {`> PROCESS_ID: 8821a`} <br />
                        {`> LATENCY: 42ms`} <br />
                        {`> AGENT: GPT-4o-Mini`}
                    </div>
                </div>
            </div>

            {/* Quality Gauge */}
            <div style={{
                background: '#18181b',
                border: '1px solid #27272a',
                borderRadius: '12px',
                padding: '1.5rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                    <Gauge size={16} color="#a1a1aa" />
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e4e4e7' }}>Daily Throughput</h3>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>12</p>
                        <p style={{ fontSize: '0.7rem', color: '#71717a' }}>Passed</p>
                    </div>
                    <div style={{ width: '1px', height: '30px', background: '#27272a' }} />
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#ef4444' }}>2</p>
                        <p style={{ fontSize: '0.7rem', color: '#71717a' }}>Flagged</p>
                    </div>
                    <div style={{ width: '1px', height: '30px', background: '#27272a' }} />
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>4</p>
                        <p style={{ fontSize: '0.7rem', color: '#71717a' }}>Pending</p>
                    </div>
                </div>
            </div>

        </div>
    );
}

function FeedItem({ time, msg, icon, isError }: { time: string, msg: string, icon: React.ReactNode, isError?: boolean }) {
    return (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
            <div style={{
                marginTop: '2px',
                minWidth: '20px',
                height: '20px',
                background: isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(39, 39, 42, 0.5)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                {icon}
            </div>
            <div>
                <p style={{ fontSize: '0.85rem', color: isError ? '#fca5a5' : '#d4d4d8', lineHeight: '1.4' }}>{msg}</p>
                <p style={{ fontSize: '0.7rem', color: '#71717a', marginTop: '0.1rem' }}>{time}</p>
            </div>
        </div>
    )
}

function AlertIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
    )
}

function CheckIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
    )
}
