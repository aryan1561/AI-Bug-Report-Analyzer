
import React, { useState, useCallback } from 'react';
import { BugAnalysis } from './types';
import { analyzeBugReport } from './services/geminiService';
import BugReportInput from './components/BugReportInput';
import AnalysisResult from './components/AnalysisResult';
import { BugIcon, GithubIcon } from './components/icons/Icons';

const App: React.FC = () => {
  const [bugReport, setBugReport] = useState<string>('');
  const [analysis, setAnalysis] = useState<BugAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeClick = useCallback(async () => {
    if (!bugReport.trim()) {
      setError('Bug report cannot be empty.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeBugReport(bugReport);
      setAnalysis(result);
    } catch (e) {
      console.error(e);
      setError('Failed to analyze the bug report. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  }, [bugReport]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <BugIcon className="w-8 h-8 text-blue-400" />
              <h1 className="text-xl font-bold tracking-tight text-white">
                AI Bug Report Analyzer
              </h1>
            </div>
            <a
              href="https://github.com/google/genai-js"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-6 h-6" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          <BugReportInput
            value={bugReport}
            onChange={(e) => setBugReport(e.target.value)}
            onAnalyze={handleAnalyzeClick}
            isLoading={isLoading}
          />
          <AnalysisResult
            analysis={analysis}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
