import Link from 'next/link'
import { signup } from '@/app/auth/actions'
import SignupButton from '@/components/signup-button'

export default async function SignupPage({
    searchParams,
}: {
    searchParams: Promise<{ message?: string; error?: string }>
}) {
    const { error } = await searchParams;

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
                    <p style={{ color: '#888', marginTop: '0.5rem', fontSize: '0.9rem' }}>Initialize your professional identity</p>
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
                </div>

                <form action={signup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        <label htmlFor="full_name" style={{ fontSize: '0.85rem', color: '#888' }}>Full Name</label>
                        <input
                            id="full_name"
                            name="full_name"
                            type="text"
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
                            minLength={8}
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

                    <SignupButton />
                </form>

                <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.9rem', color: '#666' }}>
                    Already verified? <Link href="/login" style={{ color: 'white', textDecoration: 'underline' }}>Sign In</Link>
                </p>
            </div>
        </div>
    )
}
