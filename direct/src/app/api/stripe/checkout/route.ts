import { NextResponse } from 'next/server';
import { stripe } from '@/utils/stripe/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        const { workerId, amount } = await request.json(); // amount in dollars
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // 1. Get Worker's Stripe Account ID
        const { data: worker } = await supabase
            .from('profiles')
            .select('stripe_account_id')
            .eq('id', workerId)
            .single();

        // --- MOCK MODE: Bypass Stripe for UI testing ---
        // if (!worker || !worker.stripe_account_id) {
        //     return NextResponse.json({ error: 'Worker not onboarded' }, { status: 400 });
        // }
        // 
        // return NextResponse.json({ url: 'https://google.com?q=payment+success' });
        // ----------------------------------------------

        // For now, let's just bypass the error specifically for the 'mock-worker-id' used in the dashboard
        if (workerId === 'mock-worker-id') {
            return NextResponse.json({ url: 'https://google.com?q=mock+payment+success' });
        }

        if (!worker || !worker.stripe_account_id) {
            return NextResponse.json({ error: 'Worker not onboarded' }, { status: 400 });
        }

        // 2. Calculate Fees (e.g. 10% Platform Fee)
        const amountInCents = Math.round(amount * 100);
        const platformFee = Math.round(amountInCents * 0.1);

        // 3. Create Checkout Session
        const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

        // Using "Destination Charges" (Client pays Platform, Platform pays Worker)
        // Or "Direct Charges" (Client pays Worker, Platform takes fee).
        // For Express accounts, Destination charges with `transfer_data` is common.

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Professional Services',
                            description: `Hiring ID: ${workerId}`,
                        },
                        unit_amount: amountInCents,
                    },
                    quantity: 1,
                },
            ],
            payment_intent_data: {
                application_fee_amount: platformFee,
                transfer_data: {
                    destination: worker.stripe_account_id,
                },
            },
            success_url: `${origin}/dashboard?payment=success`,
            cancel_url: `${origin}/dashboard?payment=cancelled`,
        });

        // 4. Log intention in DB (Optional but recommended)
        // await supabase.from('hires').insert(...)

        return NextResponse.json({ url: session.url });

    } catch (error) {
        console.error('Stripe Checkout Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
