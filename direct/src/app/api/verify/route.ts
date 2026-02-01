import { NextResponse } from 'next/server';
import { verifyProject } from '@/utils/ai/agent';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { projectId, title, description } = body;

        // 1. Run AI Verification
        console.log(`[AI] Verifying project: ${title}`);
        const result = await verifyProject(title, description);

        // 2. Save to Database
        const supabase = await createClient();

        // Insert verification record
        // Note: In real app, we'd use service role to bypass potential RLS on insert if public user can't write here.
        const { error } = await supabase.from('verifications').insert({
            project_id: projectId,
            compliance_score: result.compliance_score,
            security_score: result.security_score,
            complexity_score: result.complexity_score,
            feedback_summary: result.feedback_summary,
            raw_analysis: result // Storing full JSON object
        });

        if (error) {
            console.error("DB Save Error", error);
            // Continue anyway to return result to UI
        }

        // Update project status
        await supabase.from('projects').update({ status: 'verified' }).eq('id', projectId);

        return NextResponse.json({ success: true, data: result });

    } catch (error: any) {
        console.error('Verification Failed:', error);
        console.error('Error Details:', error.message);
        if (error.cause) console.error('Error Cause:', error.cause);
        return NextResponse.json({ success: false, error: 'Verification failed: ' + error.message }, { status: 500 });
    }
}
