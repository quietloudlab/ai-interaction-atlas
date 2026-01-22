import React from 'react';

export const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
      <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-main)] mb-4">Privacy Policy</h1>
      <p className="text-sm text-[var(--text-muted)] mb-12">Last updated: January 22, 2025</p>

      <div className="prose prose-sm lg:prose-base max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Our Commitment</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            AI Interaction Atlas is an open-source reference tool built with transparency and privacy in mind.
            We believe in keeping things simple and honest about what data we collect and why.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">What We Collect</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">Anonymous Usage Analytics</h3>
              <p className="text-[var(--text-muted)] leading-relaxed mb-2">
                We use <a href="https://usefathom.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Fathom Analytics</a> to
                understand how people use the Atlas. Fathom is a privacy-first analytics service that:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)] ml-4">
                <li>Does not use cookies</li>
                <li>Does not track you across websites</li>
                <li>Does not collect personal information</li>
                <li>Is fully GDPR compliant</li>
                <li>Provides anonymous aggregate data only</li>
              </ul>
              <p className="text-[var(--text-muted)] leading-relaxed mt-2">
                We collect: page views, referral sources, and general device/browser information. Nothing personally identifiable.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">What We Don't Collect</h3>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)] ml-4">
                <li>No user accounts or logins</li>
                <li>No personal information</li>
                <li>No tracking cookies</li>
                <li>No email addresses (unless you contact us directly)</li>
                <li>No IP addresses</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Your Data Rights</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            Since we don't collect personal data, there's nothing to access, delete, or export. The analytics data
            we collect is completely anonymous and aggregated.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Third-Party Services</h2>
          <div className="space-y-2 text-[var(--text-muted)]">
            <p className="font-semibold text-[var(--text-main)]">Fathom Analytics</p>
            <p className="leading-relaxed">
              Our only third-party service. View their privacy policy at{' '}
              <a href="https://usefathom.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                usefathom.com/privacy
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Open Source</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            This entire project is open source. You can review all the code, including how analytics are implemented, on our{' '}
            <a href="https://github.com/quietloudlab/ai-interaction-atlas" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
              GitHub repository
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Changes to This Policy</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            If we make significant changes to this privacy policy, we'll update the date at the top and
            note the changes in our GitHub repository.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Questions?</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            If you have questions about privacy, feel free to reach out at{' '}
            <a href="mailto:brandon@quietloudlab.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              brandon@quietloudlab.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};
