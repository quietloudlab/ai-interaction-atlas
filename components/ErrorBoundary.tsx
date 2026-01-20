import React, { Component, ErrorInfo, ReactNode } from 'react';
import { trackErrorOccurred } from '../lib/posthog';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Store error info in state
    this.setState({
      errorInfo,
    });

    // Track error in analytics
    trackErrorOccurred(
      'React Error Boundary',
      error.message,
      errorInfo.componentStack?.split('\n')[0] || 'Unknown component'
    );
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise use default
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F9F9F7] p-6">
          <div className="max-w-2xl w-full bg-white border border-[#E6E6E6] rounded-2xl shadow-lg p-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-600"
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
              <div className="flex-1">
                <h1 className="text-2xl font-semibold text-[#111111] mb-2">
                  Something went wrong
                </h1>
                <p className="text-[#6E6E6E] mb-4">
                  We encountered an unexpected error. Don't worry, your work may still be saved.
                </p>
              </div>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <summary className="cursor-pointer font-medium text-red-900 mb-2">
                  Error Details (Development Only)
                </summary>
                <div className="mt-2 space-y-2">
                  <div>
                    <p className="text-sm font-semibold text-red-800">Error:</p>
                    <pre className="text-xs text-red-700 overflow-x-auto bg-white p-2 rounded border border-red-200">
                      {this.state.error.toString()}
                    </pre>
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <p className="text-sm font-semibold text-red-800">Component Stack:</p>
                      <pre className="text-xs text-red-700 overflow-x-auto bg-white p-2 rounded border border-red-200 max-h-48">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="flex gap-3">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-[#111111] text-white rounded-lg font-medium hover:bg-[#2a2a2a] transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 border border-[#E6E6E6] text-[#111111] rounded-lg font-medium hover:bg-[#F9F9F7] transition-colors"
              >
                Go to Home
              </button>
            </div>

            <div className="mt-6 pt-6 border-t border-[#E6E6E6]">
              <p className="text-sm text-[#6E6E6E]">
                If this problem persists, please try:
              </p>
              <ul className="mt-2 text-sm text-[#6E6E6E] space-y-1 list-disc list-inside">
                <li>Refreshing the page</li>
                <li>Clearing your browser cache</li>
                <li>Checking your internet connection</li>
              </ul>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
