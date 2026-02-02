
import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ title, value, trend }: { title: string, value: string, trend: string }) {
    return (
        <div className="bento-card p-6 flex flex-col justify-between overflow-hidden relative min-h-[160px] group">
            {/* Background Decorative Mesh & Glow */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 bg-emerald-500/10 blur-[50px] rounded-full transition-opacity group-hover:opacity-100 opacity-50" />

            <div className="flex justify-between items-start relative z-10">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{title}</p>
                <div className="text-emerald-400 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1 shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    {trend}
                </div>
            </div>

            <div className="mt-4 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={value} // Re-animate on value change
                    className="text-4xl font-mono font-bold tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                    {value}
                </motion.h2>

                {/* Live Activity Indicator */}
                <div className="mt-4 flex items-center gap-2">
                    <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "65%" }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 relative"
                        >
                            <div className="absolute top-0 right-0 h-full w-2 bg-white/50 blur-[2px] animate-pulse" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Subtle Grid Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        </div>
    );
}
