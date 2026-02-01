import Navbar from '@/components/navbar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1, padding: '2rem 4rem' }}>
                {children}
            </main>
        </div>
    );
}
