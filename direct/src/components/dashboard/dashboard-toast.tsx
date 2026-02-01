
'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';
import { useRouter, useSearchParams } from 'next/navigation';

export default function DashboardToast() {
    const searchParams = useSearchParams();
    const router = useRouter();

    useEffect(() => {
        if (searchParams.get('submitted') === 'true') {
            toast.success('Task Bracket Published', {
                description: 'Hiring Working Buddies & initiating AI Pre-check...',
                duration: 5000,
            });

            // Clean up URL without refresh
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.delete('submitted');
            router.replace(newUrl.pathname);
        }
    }, [searchParams, router]);

    return null;
}
