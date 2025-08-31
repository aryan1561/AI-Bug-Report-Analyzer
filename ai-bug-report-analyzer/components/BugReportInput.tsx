
import React from 'react';
import { SparklesIcon } from './icons/Icons';

interface BugReportInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const BugReportInput: React.FC<BugReportInputProps> = ({ value, onChange, onAnalyze, isLoading }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg shadow-lg p-6 flex flex-col h-full ring-1 ring-white/10">
      <h2 className="text-lg font-semibold text-white mb-4">Bug Report Details</h2>
      <textarea
        value={value}
        onChange={onChange}
        placeholder="Paste the full bug report here...&#10;&#10;e.g.&#10;**Title:** User avatar not updating after upload&#10;**Description:** When a user uploads a new profile picture on the settings page, the old avatar remains visible in the header until a hard refresh.&#10;**Steps to Reproduce:**&#10;1. Go to /settings/profile&#10;2. Click 'Upload new picture'&#10;3. Select a new image and confirm&#10;4. Observe the avatar in the main navigation bar.&#10;**Expected Result:** The header avatar updates immediately.&#10;**Actual Result:** The old avatar is still shown."
        className="flex-grow w-full p-4 bg-gray-900 border border-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow text-gray-300 resize-none"
        rows={15}
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading}
        className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Analyzing...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5 mr-2" />
            Analyze Report
          </>
        )}
      </button>
    </div>
  );
};

export default BugReportInput;
