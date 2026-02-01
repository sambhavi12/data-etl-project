import Link from 'next/link';

export default function Navbar() {
    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.5rem 2rem',
            borderBottom: '1px solid var(--accent)',
            position: 'sticky',
            top: 0,
            background: 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(12px)',
            zIndex: 100
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--primary)' }}>
                    Direct.
                </Link>
                <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.9rem', color: '#888' }}>
                    <Link href="/dashboard" style={{ transition: 'color 0.2s' }} className="nav-link">Dashboard</Link>
                    <Link href="/verify" style={{ transition: 'color 0.2s' }} className="nav-link">Verify</Link>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
                <Link href="/join" style={{
                    padding: '0.6rem 1.2rem',
                    fontSize: '0.9rem',
                    background: 'var(--primary)',
                    color: 'var(--background)',
                    borderRadius: '6px',
                    fontWeight: 600,
                    border: '1px solid var(--primary)'
                }}>
                    Direct Sign
                </Link>
            </div>
        </nav>
    );
}
