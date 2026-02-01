'use client';

import { useState } from 'react';

export default function WalletConnectButton() {
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/stripe/connect', { method: 'POST' });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Error connecting wallet');
            }
        } catch (err) {
            console.error(err);
            alert('Connection failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleConnect}
            disabled={loading}
            style={{
                padding: '0.8rem 1.5rem',
                background: 'var(--success)',
                color: 'black',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1
            }}
        >
            {loading ? 'Connecting...' : 'Connect Wallet (Get Paid)'}
        </button>
    );
}
