
'use client';
import { DashboardStats } from '@/types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function QualityChart({ stats }: { stats: DashboardStats }) {
    return (
        <div style={{
            background: '#18181b',
            border: '1px solid #27272a',
            borderRadius: '12px',
            padding: '1.5rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e4e4e7' }}>Quality Trend Analysis</h3>
                <p style={{ fontSize: '0.75rem', color: '#71717a' }}>Weekly execution confidence score</p>
            </div>

            <div style={{ flex: 1, minHeight: '150px' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.weeklyTrend}>
                        <defs>
                            <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                        <XAxis
                            dataKey="day"
                            stroke="#71717a"
                            fontSize={12}
                            tickLine={false}
                            axisLine={false}
                        />
                        <YAxis
                            hide={true}
                            domain={[0, 100]}
                        />
                        <Tooltip
                            contentStyle={{ background: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                            itemStyle={{ color: '#e4e4e7' }}
                            cursor={{ stroke: '#3f3f46', strokeWidth: 1 }}
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

            <div style={{ marginTop: '1rem', display: 'flex', gap: '2rem' }}>
                <div>
                    <p style={{ fontSize: '0.7rem', color: '#71717a' }}>Current Avg</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>{stats.averageQualityScore}%</p>
                </div>
                <div>
                    <p style={{ fontSize: '0.7rem', color: '#71717a' }}>Delta</p>
                    <p style={{ fontSize: '1.1rem', fontWeight: 700, color: '#10b981' }}>+2.4%</p>
                </div>
            </div>
        </div>
    );
}
