
import { CheckCircle, AlertTriangle, XCircle, ShieldCheck, FileCheck, BrainCircuit } from 'lucide-react';

interface VerificationReport {
    status: 'Verified' | 'Flagged' | 'Review Required' | 'Draft';
    scores: {
        alignment: number;
        accuracy: number;
        originality: number;
    };
    auditSummary: string[];
    timestamp: string;
}

export default function VerificationPanel({ report }: { report?: VerificationReport }) {
    if (!report) return null;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Verified': return '#10b981'; // Emerald-500
            case 'Flagged': return '#ef4444'; // Red-500
            case 'Review Required': return '#f59e0b'; // Amber-500
            default: return '#71717a'; // Zinc-500
        }
    };

    const StatusIcon = () => {
        switch (report.status) {
            case 'Verified': return <CheckCircle size={20} color={getStatusColor(report.status)} />;
            case 'Flagged': return <XCircle size={20} color={getStatusColor(report.status)} />;
            case 'Review Required': return <AlertTriangle size={20} color={getStatusColor(report.status)} />;
            default: return <ShieldCheck size={20} color={getStatusColor(report.status)} />;
        }
    };

    return (
        <div style={{
            background: '#18181b', // Zinc-900
            border: '1px solid #27272a', // Zinc-800
            borderRadius: '12px',
            padding: '1.5rem',
            color: '#e4e4e7', // Zinc-200
            fontFamily: 'Inter, sans-serif',
            maxWidth: '400px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#a1a1aa' }}>VERIFICATION AUDIT</h3>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    background: `${getStatusColor(report.status)}20`, // 20% opacity
                    border: `1px solid ${getStatusColor(report.status)}40`
                }}>
                    <StatusIcon />
                    <span style={{
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        color: getStatusColor(report.status)
                    }}>
                        {report.status.toUpperCase()}
                    </span>
                </div>
            </div>

            {/* Scores */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
                <ScoreMeter label="Requirement Alignment" score={report.scores.alignment} />
                <ScoreMeter label="Technical Accuracy" score={report.scores.accuracy} />
                <ScoreMeter label="Originality Score" score={report.scores.originality} />
            </div>

            {/* AI Reasoning */}
            <div style={{
                background: '#27272a', // Zinc-800
                borderRadius: '8px',
                padding: '1rem',
                marginBottom: '1rem'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <BrainCircuit size={16} color="#a1a1aa" />
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#d4d4d8' }}>SYSTEM COMMENTS</span>
                </div>
                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                    {report.auditSummary.map((item, index) => (
                        <li key={index} style={{
                            fontSize: '0.85rem',
                            color: '#a1a1aa',
                            marginBottom: '0.25rem',
                            lineHeight: '1.4'
                        }}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Footer */}
            <div style={{
                borderTop: '1px solid #27272a',
                paddingTop: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <FileCheck size={14} color="#71717a" />
                    <span style={{ fontSize: '0.75rem', color: '#71717a' }}>Immutable Report ID</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#71717a' }}>{report.timestamp}</span>
            </div>
        </div>
    );
}

function ScoreMeter({ label, score }: { label: string; score: number }) {
    const getColor = (s: number) => {
        if (s >= 90) return '#10b981'; // Emerald
        if (s >= 70) return '#f59e0b'; // Amber
        return '#ef4444'; // Red
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#d4d4d8' }}>{label}</span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: getColor(score) }}>{score}/100</span>
            </div>
            <div style={{
                height: '6px',
                width: '100%',
                background: '#3f3f46',
                borderRadius: '9999px',
                overflow: 'hidden'
            }}>
                <div style={{
                    height: '100%',
                    width: `${score}%`,
                    background: getColor(score),
                    borderRadius: '9999px',
                    transition: 'width 0.5s ease-out'
                }} />
            </div>
        </div>
    );
}
