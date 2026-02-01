import SubmissionForm from '@/components/submission-form';
import Navbar from '@/components/navbar';

export default function SubmitPage() {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '4rem 2rem' }}>
                <div style={{ width: '100%', maxWidth: '600px' }}>
                    <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>Submit Work</h1>
                        <p style={{ color: '#888' }}>Ready to verify your execution? Link your proof of work below.</p>
                    </header>

                    <SubmissionForm />
                </div>
            </main>
        </div>
    );
}
