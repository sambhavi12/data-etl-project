
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090b] text-white flex flex-col justify-center items-center relative overflow-hidden bg-grid-pattern">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[20%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="z-10 max-w-4xl w-full px-6 flex flex-col items-center text-center">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-emerald-400 mb-6 font-medium tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            SYSTEM ONLINE
          </div>

          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
            Direct.
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 font-light max-w-2xl mx-auto tracking-tight">
            The execution-first professional platform.
          </p>
        </motion.div>

        {/* Proof of Work Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="w-full max-w-lg mb-12"
        >
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>

            <div className="relative p-8 rounded-2xl bg-[#0e0e11] border border-white/10 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                  <Terminal size={20} />
                </div>
                <h2 className="text-lg font-semibold text-white tracking-tight">Proof of Work</h2>
              </div>

              <div className="space-y-4 text-left">
                <div className="flex items-start gap-3 text-sm text-zinc-300">
                  <div className="mt-1 min-w-[16px]"><Zap size={16} className="text-yellow-400" /></div>
                  <span>System initialization complete.</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-zinc-300">
                  <div className="mt-1 min-w-[16px]"><ShieldCheck size={16} className="text-emerald-400" /></div>
                  <span>The platform is ready for architecture integration.</span>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="text-xs text-zinc-500 font-mono">v3.6.0 STABLE</div>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/20"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            href="/dashboard"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-medium text-white bg-white/10 hover:bg-white/15 border border-white/10 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              Enter Command Center <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>

      {/* Footer minimal */}
      <footer className="absolute bottom-6 text-xs text-zinc-600 font-mono uppercase tracking-widest">
        Constructed by Direct Systems
      </footer>
    </main>
  );
}

