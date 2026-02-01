import Link from 'next/link'
import { login } from '@/app/auth/actions'

export default async function LoginPage({
    searchParams,
}: {
    searchParams: Promise<{ message?: string; error?: string }>
}) {
    const { error, message } = await searchParams;

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(to bottom, #0a0a0a, #111)'
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '2.5rem',
                border: '1px solid #333',
                borderRadius: '12px',
                background: '#0a0a0a'
            }}>
                <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Direct.</h1>
                    <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '0.9rem' }}>Sign in to access your workspace</p>
                    {error && (
                        <p style={{
                            marginTop: '1rem',
                            padding: '0.75rem',
                            background: 'rgba(255, 0, 0, 0.1)',
                            color: '#ff4444',
                            fontSize: '0.85rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(255, 0, 0, 0.2)'
                        }}>
                            {error}
                        </p>
                    )}
                    {message && (
                        <p style={{
                            marginTop: '1rem',
                            padding: '0.75rem',
                            background: 'rgba(0, 255, 0, 0.1)',
                            color: '#44ff44',
                            fontSize: '0.85rem',
                            borderRadius: '6px',
                            border: '1px solid rgba(0, 255, 0, 0.2)'
                        }}>
                            {message}
                        </p>
                    )}
                </div>

                <form action={login} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="email" style={{ fontSize: '0.85rem', color: '#888' }}>Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            style={{
                                padding: '0.9rem',
                                background: '#151515',
                                border: '1px solid #333',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: '0.95rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="password" style={{ fontSize: '0.85rem', color: '#888' }}>Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            style={{
                                padding: '0.9rem',
                                background: '#151515',
                                border: '1px solid #333',
                                borderRadius: '6px',
                                color: 'white',
                                fontSize: '0.95rem',
                                outline: 'none'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            marginTop: '0.5rem',
                            padding: '0.9rem',
                            background: 'white',
                            color: 'black',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        Sign In
                    </button>
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    Don&apos;t have an account? <Link href="/join" style={{ color: 'white', textDecoration: 'underline' }}>Join Direct</Link>
                </p>
            </div>
        </div>
    )
}
