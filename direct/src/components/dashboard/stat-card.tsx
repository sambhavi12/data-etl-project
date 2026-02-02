
import React from 'react';

export default function StatCard({ title, value, trend }: { title: string, value: string, trend: string }) {
    return (
        <div className="bento-card p-6 flex flex-col justify-between overflow-hidden relative min-h-[160px]">
            {/* Background Decorative Mesh */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-emerald-500/5 blur-3xl rounded-full" />

            <div className="flex justify-between items-start">
                <p className="text-zinc-500 text-xs font-medium uppercase tracking-widest">{title}</p>
                <div className="text-emerald-500 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                    {trend}
                </div>
            </div>

            <div className="mt-4">
                <h2 className="text-3xl font-mono font-bold tracking-tighter text-white">
                    {value}
                </h2>
                <div className="h-1 w-full bg-zinc-800 mt-3 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-2/3 shadow-[0_0_10px_#10b981]" />
                </div>
            </div>
        </div>
    );
}
