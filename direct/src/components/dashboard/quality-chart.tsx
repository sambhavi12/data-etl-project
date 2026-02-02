"use client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function QualityChart({ stats }: { stats: any }) {
    return (
        <div className="w-full h-full flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h3 className="font-semibold text-zinc-200 tracking-tight">Data Quality Trend</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-widest">7-Day Rolling Avg</p>
                </div>
                <div className="text-right">
                    <p className="text-2xl font-mono font-bold text-white tracking-tighter">{stats?.averageQualityScore || 98}%</p>
                    <p className="text-xs font-medium text-emerald-500 flex justify-end items-center gap-1">
                        +2.4% <span className="opacity-50">vs last week</span>
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="flex-1 min-h-0 relative">
                <div className="absolute inset-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={stats?.weeklyTrend || []} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                            <XAxis
                                dataKey="day"
                                stroke="#52525b"
                                fontSize={10}
                                tickLine={false}
                                axisLine={false}
                                dy={10}
                            />
                            <YAxis hide domain={[0, 100]} />
                            <Tooltip
                                contentStyle={{
                                    background: '#18181b',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    borderRadius: '12px',
                                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
                                    fontSize: '12px'
                                }}
                                itemStyle={{ color: '#e4e4e7' }}
                                cursor={{ stroke: 'rgba(16, 185, 129, 0.2)', strokeWidth: 1 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="score"
                                stroke="#10b981"
                                fillOpacity={1}
                                fill="url(#scoreGradient)"
                                strokeWidth={2}
                                animationDuration={2000}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
