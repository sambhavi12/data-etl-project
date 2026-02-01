
import { DollarSign, Wallet, TrendingUp, ArrowUpRight, Receipt } from 'lucide-react';

export default function EscrowCard() {
    return (
        <div style={{
            background: 'linear-gradient(145deg, #18181b 0%, #111 100%)',
            border: '1px solid #27272a',
            borderRadius: '12px',
            padding: '1.5rem',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                    <div>
                        <p style={{ fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>Total Balance</p>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: '1' }}>
                            $12,450<span style={{ fontSize: '1.5rem', color: '#71717a' }}>.00</span>
                        </h2>
                    </div>
                    <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem', borderRadius: '8px' }}>
                        <Wallet size={20} color="#10b981" />
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <LockIcon size={12} color="#fbbf24" /> In Escrow
                        </p>
                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>$2,500.00</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <TrendingUp size={12} color="#3b82f6" /> Lifetime
                        </p>
                        <p style={{ fontSize: '1rem', fontWeight: 600 }}>$45,200.00</p>
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: '#e4e4e7',
                    color: '#09090b',
                    border: 'none',
                    padding: '0.6rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                }}>
                    Submit Invoice
                </button>
                <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    background: 'transparent',
                    color: '#e4e4e7',
                    border: '1px solid #3f3f46',
                    padding: '0.6rem 1rem',
                    borderRadius: '6px',
                    fontWeight: 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer'
                }}>
                    <ArrowUpRight size={16} />
                </button>
            </div>
        </div>
    );
}

function LockIcon({ size, color }: { size: number, color: string }) {
    // Simple custom lock icon wrapper using Lucide for consistent style if needed, 
    // or just use standard Lock from Lucide imports above?
    // Using simple div for now as I missed importing Lock in the map above, 
    // let me just grab it from the Lucid imports.
    // Wait, I didn't import 'Lock' in the top line. Let me fix that import implicitly by not using a separate function if possible,
    // or just using the one from Lucide.
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
    )
}
