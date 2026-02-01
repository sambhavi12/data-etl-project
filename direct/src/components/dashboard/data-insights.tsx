
export default function DataInsights() {
    // Mock Data: Task Accuracy over time (last 7 days/tasks)
    const data = [
        { label: 'T-6', value: 85 },
        { label: 'T-5', value: 92 },
        { label: 'T-4', value: 88 },
        { label: 'T-3', value: 95 },
        { label: 'T-2', value: 94 },
        { label: 'T-1', value: 98 },
        { label: 'Today', value: 96 },
    ];

    return (
        <div style={{
            background: '#18181b',
            border: '1px solid #27272a',
            borderRadius: '12px',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e4e4e7' }}>Execution Quality (Accuracy %)</h3>
                <span style={{ fontSize: '0.75rem', color: '#71717a', background: '#27272a', padding: '0.2rem 0.6rem', borderRadius: '4px' }}>Last 7 Tasks</span>
            </div>

            <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', paddingBottom: '0.5rem', gap: '8px' }}>
                {data.map((item, index) => (
                    <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, height: '100%' }}>
                        <div style={{
                            width: '100%',
                            flex: 1,
                            display: 'flex',
                            alignItems: 'flex-end',
                            marginBottom: '0.5rem',
                            position: 'relative',
                            background: '#27272a',
                            borderRadius: '6px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: '100%',
                                height: `${item.value}%`,
                                background: index === data.length - 1 ? '#10b981' : '#3f3f46',
                                borderRadius: '4px 4px 0 0',
                                transition: 'height 0.3s ease'
                            }} />
                        </div>
                        <span style={{ fontSize: '0.7rem', color: '#71717a' }}>{item.label}</span>
                    </div>
                ))}
            </div>

            <div style={{ borderTop: '1px solid #27272a', paddingTop: '1rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <p style={{ fontSize: '0.7rem', color: '#71717a' }}>Avg. Accuracy</p>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: '#fff' }}>92.5%</p>
                </div>
                <div>
                    <p style={{ fontSize: '0.7rem', color: '#71717a' }}>Error Rate</p>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: '#ef4444' }}>~3%</p>
                </div>
                <div>
                    <p style={{ fontSize: '0.7rem', color: '#71717a' }}>Latency</p>
                    <p style={{ fontSize: '1rem', fontWeight: 600, color: '#10b981' }}>120ms</p>
                </div>
            </div>
        </div>
    );
}
