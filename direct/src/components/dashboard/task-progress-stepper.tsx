
'use client';

import { Check, Loader2, Circle } from 'lucide-react';
import { motion } from 'framer-motion';

type StepStatus = 'completed' | 'current' | 'pending';

interface Step {
    label: string;
    status: StepStatus;
}

export default function TaskProgressStepper({ currentStep = 1 }: { currentStep?: number }) {
    const steps: Step[] = [
        { label: 'Submitted', status: currentStep > 0 ? 'completed' : currentStep === 0 ? 'current' : 'pending' },
        { label: 'Matched', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'current' : 'pending' },
        { label: 'Executed', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'current' : 'pending' },
        { label: 'Verified', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'current' : 'pending' },
    ];

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', maxWidth: '500px' }}>
            {steps.map((step, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', flex: index === steps.length - 1 ? 0 : 1 }}>
                    {/* Step Indicator */}
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', position: 'relative', zIndex: 10 }}>
                        <div
                            style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: step.status === 'completed' ? '#10b981' : step.status === 'current' ? '#3b82f6' : '#27272a',
                                border: step.status === 'pending' ? '2px solid #3f3f46' : 'none',
                                color: '#fff',
                                boxShadow: step.status === 'current' ? '0 0 0 4px rgba(59, 130, 246, 0.2)' : 'none',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {step.status === 'completed' ? (
                                <Check size={16} />
                            ) : step.status === 'current' ? (
                                <Loader2 size={16} className="animate-spin" />
                            ) : (
                                <Circle size={10} fill="#52525b" stroke="none" />
                            )}
                        </div>
                        <span style={{
                            fontSize: '0.75rem',
                            fontWeight: step.status === 'current' ? 600 : 500,
                            color: step.status === 'pending' ? '#52525b' : '#e4e4e7',
                            position: 'absolute',
                            top: '40px',
                            whiteSpace: 'nowrap'
                        }}>
                            {step.label}
                        </span>
                    </div>

                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                        <div style={{ flex: 1, height: '2px', background: '#3f3f46', margin: '0 8px', marginBottom: '20px', position: 'relative' }}>
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 0, left: 0, bottom: 0,
                                    width: step.status === 'completed' ? '100%' : '0%',
                                    background: '#10b981',
                                    transition: 'width 0.5s ease'
                                }}
                            />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
