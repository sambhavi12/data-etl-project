
'use client';

import GlobalNavbar from '@/components/global-navbar';
import { motion } from 'framer-motion';
import { Settings, Shield, Key, Bell, CreditCard, User } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('account');

    const tabs = [
        { id: 'account', label: 'Account', icon: User },
        { id: 'api', label: 'API Keys', icon: Key },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'security', label: 'Security', icon: Shield },
    ];

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-100 font-sans selection:bg-emerald-500/30">
            <GlobalNavbar />

            <div className="max-w-5xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
                    <p className="text-zinc-400 mt-2">Manage your account preferences and API access.</p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="w-full md:w-64 flex-shrink-0 space-y-1"
                    >
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all ${activeTab === tab.id
                                        ? 'bg-zinc-800 text-white shadow-[0_0_15px_rgba(255,255,255,0.05)]'
                                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                                    }`}
                            >
                                <tab.icon size={16} />
                                {tab.label}
                            </button>
                        ))}
                    </motion.div>

                    {/* Content Area */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex-1 min-h-[500px] rounded-2xl border border-white/5 bg-zinc-900/30 p-8 backdrop-blur-sm"
                    >
                        {activeTab === 'account' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Profile Information</h2>
                                    <p className="text-sm text-zinc-500 mt-1">Update your photo and personal details.</p>
                                </div>
                                <div className="flex items-center gap-6 pb-6 border-b border-white/5">
                                    <div className="h-20 w-20 rounded-full bg-zinc-800 flex items-center justify-center border-2 border-dashed border-zinc-700">
                                        <User size={32} className="text-zinc-500" />
                                    </div>
                                    <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                                        Upload New Photo
                                    </button>
                                </div>
                                <div className="grid gap-4">
                                    <div className="grid gap-2">
                                        <label className="text-xs font-medium uppercase text-zinc-500">Display Name</label>
                                        <input type="text" defaultValue="DataAnalyst_01" className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
                                    </div>
                                    <div className="grid gap-2">
                                        <label className="text-xs font-medium uppercase text-zinc-500">Email Address</label>
                                        <input type="email" defaultValue="engineer@project-direct.ai" className="w-full bg-black/50 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:outline-none" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'api' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">API Access</h2>
                                    <p className="text-sm text-zinc-500 mt-1">Manage your API keys for the ETL pipeline.</p>
                                </div>

                                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <p className="font-mono text-sm text-emerald-400 font-bold">Production Key</p>
                                            <p className="text-xs text-zinc-400">Created 2 days ago</p>
                                        </div>
                                        <span className="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase border border-emerald-500/30">Active</span>
                                    </div>
                                    <div className="flex gap-2 mt-3">
                                        <code className="flex-1 bg-black/50 p-2 rounded border border-emerald-500/20 font-mono text-xs text-zinc-300 overflow-hidden">
                                            sk_prod_5928...9283
                                        </code>
                                        <button className="px-3 py-1 bg-emerald-500 text-black text-xs font-bold rounded hover:bg-emerald-400 transition-colors">Copy</button>
                                    </div>
                                </div>

                                <button className="w-full py-2.5 border border-dashed border-zinc-700 text-zinc-400 rounded-xl hover:bg-zinc-900/50 hover:text-white hover:border-zinc-600 transition-all text-sm font-medium">
                                    + Generate New Key
                                </button>
                            </div>
                        )}

                        {/* Other tabs placeholders */}
                        {['notifications', 'billing', 'security'].includes(activeTab) && (
                            <div className="flex flex-col items-center justify-center h-64 text-center">
                                <div className="p-4 rounded-full bg-zinc-800/50 mb-4">
                                    {activeTab === 'notifications' && <Bell size={24} className="text-zinc-500" />}
                                    {activeTab === 'billing' && <CreditCard size={24} className="text-zinc-500" />}
                                    {activeTab === 'security' && <Shield size={24} className="text-zinc-500" />}
                                </div>
                                <h3 className="text-lg font-medium text-zinc-300 capitalize">{activeTab} Settings</h3>
                                <p className="text-sm text-zinc-500 mt-1">This section is currently under development.</p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
