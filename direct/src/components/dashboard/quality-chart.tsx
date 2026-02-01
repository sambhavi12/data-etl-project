
'use client';
import { DashboardStats } from '@/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function QualityChart({ stats }: { stats: DashboardStats }) {
    return (
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ flex: 1, minHeight: '0' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.weeklyTrend} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                        <XAxis
                            dataKey="day"
                            stroke="#71717a"
                            fontSize={10}
                            tickLine={false}
                            axisLine={false}
                            dy={10}
                        />
                        <YAxis
                            hide={true}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{
                                background: 'rgba(24, 24, 27, 0.9)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                fontSize: '0.75rem'
                            }}
                            itemStyle={{ color: '#e4e4e7' }}
                            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="score"
                            stroke="#10b981"
                            fillOpacity={1}
                            fill="url(#scoreGradient)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            <div style={{ marginTop: '0.5rem', display: 'flex', gap: '2rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div>
                    <p style={{ fontSize: '0.7rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Current Avg</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff' }}>{stats.averageQualityScore}%</p>
                </div>
                <div>
                    <p style={{ fontSize: '0.7rem', color: '#a1a1aa', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Delta</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 700, color: '#10b981' }}>+2.4%</p>
                </div>
            </div>
        </div>
    );
}
