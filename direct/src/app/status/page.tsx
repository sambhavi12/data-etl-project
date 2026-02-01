'use client'

import { useState } from 'react'

export default function StatusPage() {
    const [result, setResult] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    const checkAI = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId: 'debug-test-id',
                    title: 'Debug Project',
                    description: 'Testing AI connection'
                })
            })
            const data = await res.json()
            setResult(data)
        } catch (err: any) {
            setResult({ error: err.message })
        }
        setLoading(false)
    }

    return (
        <div style={{ padding: '2rem', background: '#000', color: 'white', minHeight: '100vh', fontFamily: 'monospace' }}>
            <h1>System Status</h1>
            <button
                onClick={checkAI}
                style={{ padding: '10px 20px', background: 'white', color: 'black', border: 'none', cursor: 'pointer' }}
            >
                {loading ? 'Running Test...' : 'Test AI Connection'}
            </button>

            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #333' }}>
                <h3>Result:</h3>
                <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
        </div>
    )
}
