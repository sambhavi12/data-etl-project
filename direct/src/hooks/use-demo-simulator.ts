
import { useState, useEffect } from 'react';

const STEPS = [
    { msg: "🔍 Starting Integrity Check (Plagiarism/AI)...", color: "text-blue-400" },
    { msg: "🧠 Analyzing Context Alignment (Semantic)...", color: "text-purple-400" },
    { msg: "⚙️ Running Data Logic Validation...", color: "text-yellow-400" },
    { msg: "✅ Task Verified. Escrow Released.", color: "text-emerald-400" }
];

export function useDemoSimulator(isActive: boolean) {
    const [currentStep, setCurrentStep] = useState(0);
    const [logs, setLogs] = useState<{ timestamp: string; message: string; color: string }[]>([]);

    useEffect(() => {
        if (!isActive) return;

        const interval = setInterval(() => {
            // Random chance to not log anything to simulate idle processing
            if (Math.random() > 0.7) return;

            setCurrentStep((prev) => {
                const next = (prev + 1) % STEPS.length;
                const step = STEPS[next];
                // Add timestamp
                const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "numeric", minute: "numeric", second: "numeric" });

                const newLog = {
                    timestamp: time,
                    message: step.msg,
                    color: step.color
                };

                setLogs(prevLogs => [newLog, ...prevLogs].slice(0, 10));
                return next;
            });
        }, 3000); // Progress every 3 seconds

        return () => clearInterval(interval);
    }, [isActive]);

    return { logs, currentStep };
}
