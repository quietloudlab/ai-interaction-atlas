import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { trackEvent, EVENTS } from '../lib/fathom';

type FeedbackType = 'bug' | 'idea' | 'other';
type WidgetState = 'collapsed' | 'expanded' | 'submitting' | 'success' | 'error';

export const FeedbackWidget = () => {
  const [state, setState] = useState<WidgetState>('collapsed');
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('idea');
  const [message, setMessage] = useState('');
  const [wantsReply, setWantsReply] = useState(false);
  const [email, setEmail] = useState('');
  const widgetRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target as Node)) {
        if (state === 'expanded') {
          setState('collapsed');
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [state]);

  // Auto-collapse after success
  useEffect(() => {
    if (state === 'success') {
      const timer = setTimeout(() => {
        setState('collapsed');
        // Reset form
        setMessage('');
        setFeedbackType('idea');
        setWantsReply(false);
        setEmail('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setState('submitting');

    try {
      const response = await fetch('https://submit-form.com/JntZEEcBw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          type: feedbackType,
          message: message.trim(),
          email: wantsReply ? email : undefined,
          page: window.location.href,
          viewport: `${window.innerWidth}x${window.innerHeight}`,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        setState('success');
        trackEvent(EVENTS.FEEDBACK_SUBMITTED);
      } else {
        setState('error');
      }
    } catch (error) {
      setState('error');
    }
  };

  // Collapsed state - just the button
  if (state === 'collapsed') {
    return (
      <button
        onClick={() => {
          setState('expanded');
          trackEvent(EVENTS.FEEDBACK_OPENED);
        }}
        className="fixed bottom-4 right-4 z-50 bg-zinc-800 border border-zinc-700 text-white px-4 py-2 text-sm font-medium rounded shadow-[inset_0_1px_3px_rgba(255,255,255,0.1)] hover:bg-zinc-700 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.15)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--text-main)] focus:ring-offset-2"
      >
        Quick Feedback
      </button>
    );
  }

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-4 right-4 z-50 w-[300px] bg-[var(--bg)] border border-[var(--border)] rounded-lg shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-[var(--surface)]">
        <span className="text-sm font-medium text-[var(--text-main)]">
          {state === 'success' ? 'Thanks!' : 'Quick Feedback'}
        </span>
        <button
          onClick={() => setState('collapsed')}
          className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors p-1"
          aria-label="Close feedback"
        >
          <X size={16} />
        </button>
      </div>

      {/* Success State */}
      {state === 'success' && (
        <div className="p-4 text-center">
          <p className="text-sm text-[var(--text-main)] mb-3">
            Thanks for the feedback!
          </p>
          <p className="text-xs text-[var(--text-muted)] mb-3">
            Want updates on new patterns and tools?
          </p>
          <a
            href="https://buttondown.com/ai-atlas-updates"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[var(--text-main)] underline hover:opacity-70"
          >
            Subscribe to updates
          </a>
        </div>
      )}

      {/* Error State */}
      {state === 'error' && (
        <div className="p-4">
          <p className="text-sm text-red-600 dark:text-red-400 mb-3">
            Something went wrong. Try again?
          </p>
          <button
            onClick={() => setState('expanded')}
            className="w-full bg-[var(--text-main)] text-[var(--bg)] py-2 text-sm font-medium rounded hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Form State */}
      {(state === 'expanded' || state === 'submitting') && (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Type Selector */}
          <div className="flex gap-2">
            {(['bug', 'idea', 'other'] as FeedbackType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFeedbackType(type)}
                className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${
                  feedbackType === type
                    ? 'bg-[var(--text-main)] text-[var(--bg)]'
                    : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border)]'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          {/* Message */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What's on your mind?"
            rows={3}
            className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--text-main)] focus:border-transparent resize-none"
            disabled={state === 'submitting'}
          />

          {/* Want Reply Checkbox */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={wantsReply}
              onChange={(e) => setWantsReply(e.target.checked)}
              className="w-4 h-4 rounded border-[var(--border)] text-[var(--text-main)] focus:ring-[var(--text-main)]"
              disabled={state === 'submitting'}
            />
            <span className="text-xs text-[var(--text-muted)]">I'd like a reply</span>
          </label>

          {/* Email Field - conditional */}
          {wantsReply && (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full bg-[var(--surface)] border border-[var(--border)] rounded px-3 py-2 text-sm text-[var(--text-main)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--text-main)] focus:border-transparent"
              disabled={state === 'submitting'}
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!message.trim() || state === 'submitting'}
            className="w-full bg-[var(--text-main)] text-[var(--bg)] py-2 text-sm font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === 'submitting' ? 'Sending...' : 'Send'}
          </button>
        </form>
      )}
    </div>
  );
};
