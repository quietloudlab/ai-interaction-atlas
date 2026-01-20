import * as Sentry from '@sentry/react';

const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN;

export function initSentry() {
  // Only initialize if DSN is provided
  if (!SENTRY_DSN) {
    console.log('Sentry DSN not provided, skipping error monitoring setup');
    return;
  }

  Sentry.init({
    dsn: SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({
        maskAllText: false,
        blockAllMedia: false,
      }),
    ],

    // Performance Monitoring
    tracesSampleRate: 1.0, // 100% in beta to catch all issues

    // Session Replay
    replaysSessionSampleRate: 0.1, // 10% of sessions
    replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors

    // Environment
    environment: import.meta.env.MODE,

    // Release tracking
    release: `ai-atlas@${import.meta.env.VITE_APP_VERSION || '0.1.0'}`,

    // Filter out localStorage data from error reports
    beforeSend(event) {
      // Don't send errors if user dismissed them (optional)
      if (event.exception) {
        console.error('Sentry captured error:', event.exception);
      }
      return event;
    },
  });

  console.log('✅ Sentry initialized');
}

// Helper to manually capture errors
export function captureError(error: Error, context?: Record<string, any>) {
  if (!SENTRY_DSN) {
    console.error('Error (Sentry not configured):', error, context);
    return;
  }

  Sentry.captureException(error, {
    extra: context,
  });
}

// Helper to set user context
export function setUserContext(userId: string, email?: string) {
  if (!SENTRY_DSN) return;

  Sentry.setUser({
    id: userId,
    email,
  });
}

// Helper to clear user context (on logout)
export function clearUserContext() {
  if (!SENTRY_DSN) return;

  Sentry.setUser(null);
}
