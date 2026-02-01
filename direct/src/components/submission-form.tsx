'use client'

import { useFormStatus } from 'react-dom'
import { submitProject } from '@/app/actions'

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <button
            type="submit"
            disabled={pending}
            style={{
                width: '100%',
                padding: '1rem',
                background: pending ? '#333' : 'var(--primary)',
                color: pending ? '#888' : 'var(--background)',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: pending ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                marginTop: '1rem'
            }}
        >
            {pending ? 'Verifying...' : 'Submit for Verification'}
        </button>
    )
}

export default function SubmissionForm() {
    return (
        <form action={submitProject} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2rem' }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="title" style={{ fontSize: '0.9rem', color: '#888', fontWeight: 500 }}>Project Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    placeholder="e.g. Distributed Task Queue"
                    style={{
                        padding: '1rem',
                        background: 'var(--accent)',
                        border: '1px solid #333',
                        borderRadius: '6px',
                        color: 'var(--foreground)',
                        fontSize: '1rem',
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label htmlFor="description" style={{ fontSize: '0.9rem', color: '#888', fontWeight: 500 }}>Overview</label>
                <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    placeholder="Describe the problem, solution, and tech stack..."
                    style={{
                        padding: '1rem',
                        background: 'var(--accent)',
                        border: '1px solid #333',
                        borderRadius: '6px',
                        color: 'var(--foreground)',
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        resize: 'vertical',
                        outline: 'none'
                    }}
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="repoUrl" style={{ fontSize: '0.9rem', color: '#888', fontWeight: 500 }}>Repository URL</label>
                    <input
                        type="url"
                        id="repoUrl"
                        name="repoUrl"
                        placeholder="github.com/username/repo"
                        style={{
                            padding: '1rem',
                            background: 'var(--accent)',
                            border: '1px solid #333',
                            borderRadius: '6px',
                            color: 'var(--foreground)',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label htmlFor="liveUrl" style={{ fontSize: '0.9rem', color: '#888', fontWeight: 500 }}>Live Demo (Optional)</label>
                    <input
                        type="url"
                        id="liveUrl"
                        name="liveUrl"
                        placeholder="https://..."
                        style={{
                            padding: '1rem',
                            background: 'var(--accent)',
                            border: '1px solid #333',
                            borderRadius: '6px',
                            color: 'var(--foreground)',
                            fontSize: '1rem',
                            outline: 'none'
                        }}
                    />
                </div>
            </div>

            <SubmitButton />

            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '1rem', textAlign: 'center' }}>
                By submitting, you agree to have your code analyzed by our AI Verification Engine.
            </p>
        </form>
    )
}
