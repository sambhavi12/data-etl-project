
import { NextResponse } from 'next/server';

// Simple in-memory store for the demo (reset on server restart)
let systemLogs: string[] = [
    "System initialized.",
    "Waiting for ETL pipeline connection...",
];

export async function GET() {
    return NextResponse.json({ logs: systemLogs });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { message } = body;

        if (message) {
            const timestamp = new Date().toLocaleTimeString();
            systemLogs.unshift(`${message}`);
            // Keep only last 50 logs
            if (systemLogs.length > 50) systemLogs.pop();
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
