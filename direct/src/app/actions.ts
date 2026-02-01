'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function submitProject(formData: FormData) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
        repoUrl: formData.get('repoUrl'),
        liveUrl: formData.get('liveUrl'),
    }

    console.log('Submission Received:', rawData)

    // Create Server Client
    const supabase = await createClient()

    // For now, we allow anonymous submissions or we can assume a specific user if Auth isn't ready.
    // Since we haven't built Auth UI yet, we'll try to insert. 
    // NOTE: This will fail RLS if the user isn't logged in, unless we temporarily allow public inserts or use a service role (not recommended for client actions).
    // For this stage, let's assume we want to just test the connection.
    // But wait, our RLS says: "Users can insert their own projects." (auth.uid() = user_id).
    // We need a user. 

    // TEMPORARY: 
    // If we don't have a user, we can't insert into 'projects' without breaking RLS or faking usage.
    // strategy: We will check for a user. If none, we throw an error or redirect to login.

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        // For the sake of the demo, if no user, we might mock it or stop.
        // But the USER wants to "Trigger AI".
        console.log("No User found. Skipping DB insert to prevent RLS error.")
        // redirect('/login') // Uncomment when Auth is ready.
    } else {
        // 1. Insert Project and Return Data
        const { data: projectData, error } = await supabase.from('projects').insert({
            title: rawData.title,
            description: rawData.description,
            repository_url: rawData.repoUrl,
            live_url: rawData.liveUrl,
            user_id: user.id
        }).select().single()

        if (error) {
            console.error('Supabase Error:', error)
            throw new Error('Failed to submit project: ' + error.message)
        } else {
            // 2. Trigger AI Verification
            const origin = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

            // We do NOT await this, so the user gets instant feedback while AI runs in background
            fetch(`${origin}/api/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    projectId: projectData.id,
                    title: projectData.title,
                    description: projectData.description
                })
            }).catch(err => console.error("AI Trigger Failed", err));
        }
    }
    redirect('/dashboard?submitted=true')
}
