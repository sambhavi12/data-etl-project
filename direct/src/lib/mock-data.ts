
import { Task, DashboardStats } from '@/types';

export const mockTasks: Task[] = [
    {
        id: 't-101',
        title: 'ETL Pipeline Optimization (Python/Airflow)',
        category: 'Data Engineering',
        status: 'completed',
        budget: 850,
        confidenceScore: 98,
        createdAt: new Date(Date.now() - 86400000 * 2),
        aiReport: {
            id: 'r-101',
            taskId: 't-101',
            requirementsMet: 100,
            logicAccuracy: 99,
            plagiarismScore: 0,
            verdict: 'pass',
            auditLog: ['Syntax validated', 'Unit tests pass (12/12)', 'No security vulnerabilities found']
        }
    },
    {
        id: 't-102',
        title: 'Q3 Competitor Pricing Analysis',
        category: 'Market Research',
        status: 'verifying',
        budget: 450,
        confidenceScore: 92, // Current running score
        createdAt: new Date(Date.now() - 3600000),
        aiReport: {
            id: 'r-102',
            taskId: 't-102',
            requirementsMet: 85,
            logicAccuracy: 90,
            plagiarismScore: 5,
            verdict: 'needs_human_review',
            auditLog: ['Scanning data sources...', 'Verifying citations...', 'Anomaly check in progress...']
        }
    },
    {
        id: 't-103',
        title: 'Customer Segmentation Script (R)',
        category: 'Data Engineering',
        status: 'in_progress',
        budget: 600,
        confidenceScore: 0, // Not started
        createdAt: new Date(Date.now() - 172800000),
    },
    {
        id: 't-104',
        title: 'Lead Generation Dataset Cleaning',
        category: 'Data Engineering',
        status: 'flagged',
        budget: 200,
        confidenceScore: 45,
        createdAt: new Date(Date.now() - 43200000),
        aiReport: {
            id: 'r-104',
            taskId: 't-104',
            requirementsMet: 40,
            logicAccuracy: 60,
            plagiarismScore: 88, // High!
            verdict: 'fail',
            auditLog: ['Detecting heavy overlap with public data', 'PII detected in column 4', 'Schema mismatch']
        }
    },
    {
        id: 't-105',
        title: 'Draft Technical Whitepaper',
        category: 'Technical Design',
        status: 'draft',
        budget: 1200,
        confidenceScore: 0,
        createdAt: new Date(),
    }
];

export const mockStats: DashboardStats = {
    totalEscrowed: 5200.00,
    activeTasks: 4,
    averageQualityScore: 91.5,
    weeklyTrend: [
        { day: 'Mon', score: 86 },
        { day: 'Tue', score: 89 },
        { day: 'Wed', score: 92 },
        { day: 'Thu', score: 90 },
        { day: 'Fri', score: 94 },
        { day: 'Sat', score: 96 },
        { day: 'Sun', score: 91 },
    ]
};
