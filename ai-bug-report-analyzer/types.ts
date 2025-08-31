
export enum PriorityLevel {
  Critical = 'Critical',
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export interface BugAnalysis {
  summary: string;
  priority: PriorityLevel;
  category: string;
  reproducibilitySteps: string[];
  suggestedFix: string;
}
