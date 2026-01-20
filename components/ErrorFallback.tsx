import React from 'react';

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
}

/**
 * Lightweight error fallback component for specific sections
 * Use this for smaller feature areas that shouldn't crash the entire app
 */
export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  title = "Something went wrong",
  message = "We encountered an error loading this section.",
  onRetry,
  compact = false,
}) => {
  if (compact) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="flex-1">
            <p className="text-sm font-medium text-red-900">{title}</p>
            <p className="text-sm text-red-700 mt-1">{message}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-2 text-sm text-red-800 hover:text-red-900 font-medium underline"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      <div className="max-w-md text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-[#111111] mb-2">{title}</h3>
        <p className="text-[#6E6E6E] mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-[#111111] text-white rounded-lg font-medium hover:bg-[#2a2a2a] transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};
