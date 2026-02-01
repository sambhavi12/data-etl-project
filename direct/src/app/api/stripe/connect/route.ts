import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(_request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // --- MOCK MODE: Bypass Stripe for UI testing ---
        // 1. Simulate saving a fake account ID
        await supabase.from('profiles').update({ stripe_account_id: 'acct_MOCK_12345' }).eq('id', user.id);

        // 2. Return a dummy URL (google.com as a placeholder for the onboarding flow)
        // In a real app, this would be the Stripe Hosted Onboarding URL
        return NextResponse.json({ url: 'https://google.com' });

        /* 
        // Real implementation (Restored when keys are available)
        // 1. Create a Stripe Connect Account (Express)
        const account = await stripe.accounts.create({
            type: 'express',
            country: 'US', // Defaulting to US for demo
            email: user.email,
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
        });

        // 2. Save account ID to DB
        // Ideally we check if they already have one first.
        await supabase.from('profiles').update({ stripe_account_id: account.id }).eq('id', user.id);

        // 3. Create Account Link for onboarding
        const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url: `${origin}/dashboard?stripe_refresh=true`,
            return_url: `${origin}/dashboard?stripe_success=true`,
            type: 'account_onboarding',
        });

        return NextResponse.json({ url: accountLink.url });
        */
    } catch (error) {
        console.error('Stripe Connect Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
