
import Navbar from '@/components/navbar';
import Link from 'next/link';

export default function VerifyPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '4rem 2rem',
                textAlign: 'center'
            }}>
                <div style={{ maxWidth: '800px' }}>
                    <h1 style={{
                        fontSize: '3rem',
                        fontWeight: 700,
                        letterSpacing: '-0.03em',
                        marginBottom: '1.5rem',
                        background: 'linear-gradient(to right, #fff, #888)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        AI-Powered Verification
                    </h1>
                    <p style={{ color: '#aaa', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '3rem' }}>
                        Our autonomous agents analyze code quality, security compliance, and complexity tailored to your specific stack.
                        Direct provides an immutable proof of work for every project you ship.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '2rem',
                        marginBottom: '4rem',
                        textAlign: 'left'
                    }}>
                        <Feature
                            title="Compliance"
                            desc="Checks against industry standards and best practices for your language."
                        />
                        <Feature
                            title="Security"
                            desc="Scans for vulnerabilities, secret leaks, and unsafe patterns."
                        />
                        <Feature
                            title="Complexity"
                            desc="Evaluates architectural depth and implementation difficulty."
                        />
                    </div>

                    <Link href="/submit" style={{
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        background: 'var(--primary)',
                        color: 'var(--background)',
                        borderRadius: '8px',
                        fontWeight: 600,
                        textDecoration: 'none',
                        border: '1px solid var(--primary)'
                    }}>
                        Start Verification
                    </Link>
                </div>
            </main>
        </div>
    );
}

function Feature({ title, desc }: { title: string; desc: string }) {
    return (
        <div style={{
            padding: '1.5rem',
            background: 'var(--secondary)',
            border: '1px solid var(--accent)',
            borderRadius: '12px'
        }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff' }}>{title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#888', lineHeight: '1.5' }}>{desc}</p>
        </div>
    );
}
