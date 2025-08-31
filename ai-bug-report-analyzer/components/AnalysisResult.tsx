import React from 'react';
import { BugAnalysis, PriorityLevel } from '../types';
// FIX: Removed unused import for CheckCircleIcon which was not exported from Icons.tsx.
import { CodeIcon, ListIcon, SummaryIcon, TagIcon, TriangleAlertIcon } from './icons/Icons';
import Card from './shared/Card';

interface AnalysisResultProps {
  analysis: BugAnalysis | null;
  isLoading: boolean;
  error: string | null;
}

const getPriorityClass = (priority: PriorityLevel): string => {
  switch (priority) {
    case PriorityLevel.Critical:
      return 'bg-red-500/20 text-red-400 border-red-500/30';
    case PriorityLevel.High:
      return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
    case PriorityLevel.Medium:
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case PriorityLevel.Low:
      return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

const EmptyState: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 p-8">
    <SummaryIcon className="w-16 h-16 mb-4" />
    <h3 className="text-lg font-semibold text-gray-300">Analysis Results</h3>
    <p>The analyzed bug report details will appear here.</p>
  </div>
);

const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 flex items-center justify-center h-full ring-1 ring-white/10">
        <div className="text-center">
            <svg className="animate-spin mx-auto h-12 w-12 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="mt-4 text-lg font-semibold">AI is thinking...</p>
            <p className="text-sm text-gray-400">Analyzing the bug report.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
        <div className="bg-red-900/50 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center h-full ring-1 ring-red-500/30 text-center">
            <TriangleAlertIcon className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">An Error Occurred</h3>
            <p className="text-red-300">{error}</p>
        </div>
    );
  }

  if (!analysis) {
    return <div className="bg-gray-800/50 rounded-lg shadow-lg h-full ring-1 ring-white/10"><EmptyState /></div>;
  }

  return (
    <div className="space-y-6 h-full overflow-y-auto pr-2">
      <Card icon={<SummaryIcon />} title="Summary">
        <p className="text-gray-300">{analysis.summary}</p>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card icon={<TriangleAlertIcon />} title="Priority">
          <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full border ${getPriorityClass(analysis.priority)}`}>
            {analysis.priority}
          </span>
        </Card>
        <Card icon={<TagIcon />} title="Category">
           <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full border bg-gray-500/20 text-gray-300 border-gray-500/30">
            {analysis.category}
          </span>
        </Card>
      </div>

      <Card icon={<ListIcon />} title="Steps to Reproduce">
        <ol className="list-decimal list-inside space-y-2 text-gray-300">
          {analysis.reproducibilitySteps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </Card>

      <Card icon={<CodeIcon />} title="Suggested Fix">
        <p className="text-gray-300 whitespace-pre-wrap font-mono text-sm">{analysis.suggestedFix}</p>
      </Card>
    </div>
  );
};

export default AnalysisResult;