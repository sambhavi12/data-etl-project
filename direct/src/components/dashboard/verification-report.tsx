
import { CheckCircle2, AlertTriangle, XCircle, FileJson, Download, FileText, AlertOctagon } from "lucide-react";
import { Task } from "@/types";

interface VerificationReportProps {
    task: Task;
}

export default function VerificationReport({ task }: VerificationReportProps) {
    // improved mock data for the demo
    const auditChecks = [
        { id: 1, label: 'Schema Validation', status: 'pass', detail: 'Output matches the required .csv structure. 12/12 columns present.' },
        { id: 2, label: 'Data Integrity', status: 'pass', detail: "No null values found in 'Email' or 'UID' fields. Outliers in 'Revenue' were correctly capped." },
        { id: 3, label: 'Logic Check', status: 'warning', detail: "2% of 'Country Codes' (ISO-3) do not match 'Phone Prefix' logic." },
        { id: 4, label: 'Originality', status: 'pass', detail: '0% match with external training data. Analysis appears unique to this dataset.' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* Header / Summary Box */}
            <div style={{
                background: '#09090b',
                border: '1px solid #27272a',
                borderRadius: '8px',
                padding: '1rem'
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e4e4e7' }}>Confidence Score</h4>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>{task.confidenceScore}%</span>
                </div>

                {/* Confidence Meter */}
                <div style={{ height: '6px', background: '#27272a', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                    <div style={{
                        width: `${task.confidenceScore}%`,
                        height: '100%',
                        background: task.confidenceScore >= 90 ? '#10b981' : task.confidenceScore < 60 ? '#ef4444' : '#f59e0b',
                        transition: 'width 1s ease'
                    }} />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button style={{
                        flex: 1,
                        padding: '0.5rem',
                        fontSize: '0.75rem', fontWeight: 500, color: '#e4e4e7',
                        background: '#18181b', border: '1px solid #3f3f46', borderRadius: '6px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        cursor: 'pointer'
                    }}>
                        <Download size={12} /> View Cleaned Data
                    </button>
                    <button style={{
                        padding: '0.5rem 0.75rem',
                        fontSize: '0.75rem', fontWeight: 500, color: '#a1a1aa',
                        background: 'transparent', border: '1px solid transparent', borderRadius: '6px',
                        cursor: 'pointer',
                        textDecoration: 'underline'
                    }}>
                        Dispute AI Verdict
                    </button>
                </div>
            </div>

            {/* Vertical Stepper / Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {auditChecks.map((check, index) => (
                    <div key={check.id} style={{ display: 'flex', gap: '1rem', position: 'relative' }}>
                        {/* Connecting Line */}
                        {index !== auditChecks.length - 1 && (
                            <div style={{
                                position: 'absolute', left: '9px', top: '24px', bottom: '-16px',
                                width: '1px', background: '#27272a'
                            }} />
                        )}

                        <div style={{ zIndex: 10, marginTop: '2px' }}>
                            {check.status === 'pass' && <CheckCircle2 size={18} className="text-emerald-500" />}
                            {check.status === 'warning' && <AlertTriangle size={18} className="text-amber-500" />}
                            {check.status === 'fail' && <XCircle size={18} className="text-red-500" />}
                        </div>

                        <div style={{ paddingBottom: '1.25rem', flex: 1 }}>
                            <h5 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e4e4e7', marginBottom: '0.25rem' }}>
                                {check.label}
                            </h5>
                            <p style={{
                                fontFamily: 'monospace',
                                fontSize: '0.75rem',
                                color: '#a1a1aa',
                                lineHeight: 1.4,
                                background: '#18181b',
                                padding: '0.5rem',
                                borderRadius: '4px',
                                border: '1px solid #27272a'
                            }}>
                                {check.detail}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
}
