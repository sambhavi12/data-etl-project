'use client';

import { useState } from 'react';

export default function HireButton({ workerId, price }: { workerId: string, price: number }) {
    const [loading, setLoading] = useState(false);

    const handleHire = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workerId, amount: price })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Error initiating hire: ' + (data.error || 'Unknown error'));
            }
        } catch (err) {
            console.error(err);
            alert('Hire failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleHire}
            disabled={loading}
            style={{
                marginTop: '1rem',
                width: '100%',
                padding: '0.8rem',
                background: 'white',
                color: 'black',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                opacity: loading ? 0.7 : 1
            }}
        >
            {loading ? 'Processing...' : `Hire for $${price}`}
        </button>
    );
}
