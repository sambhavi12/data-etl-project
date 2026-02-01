
// The heart of the platform: The Task
export interface Task {
    id: string;
    title: string;
    category: 'Data Engineering' | 'Market Research' | 'Content' | 'Technical Design';
    status: 'draft' | 'claiming' | 'in_progress' | 'verifying' | 'completed' | 'flagged';
    budget: number;
    buddyName?: string;
    confidenceScore: number; // 0 to 100
    createdAt: Date;
    aiReport?: AIReport;
}

// The "Senior Flex": Detailed AI validation data
export interface AIReport {
    id: string;
    taskId: string;
    requirementsMet: number; // percentage
    logicAccuracy: number;    // percentage
    plagiarismScore: number;  // 0 is good, 100 is bad
    verdict: 'pass' | 'fail' | 'needs_human_review';
    auditLog: string[];       // e.g., ["Format checked", "PII scrubbed", "Logic verified"]
}

// For your Data Analyst/Engineer Resume
export interface DashboardStats {
    totalEscrowed: number;
    activeTasks: number;
    averageQualityScore: number;
    weeklyTrend: { day: string; score: number }[];
}
