import React from 'react';

export const PrivacyPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
      <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-main)] mb-4">Privacy Policy</h1>
      <p className="text-sm text-[var(--text-muted)] mb-12">Last updated: February 5, 2026</p>

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
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">Waitlist Information</h3>
              <p className="text-[var(--text-muted)] leading-relaxed mb-2">
                When you sign up for our Studio waitlist, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)] ml-4">
                <li>Email address (required)</li>
                <li>Name (required)</li>
                <li>Organization (required)</li>
                <li>Use case description (optional)</li>
              </ul>
              <p className="text-[var(--text-muted)] leading-relaxed mt-2">
                This information is collected with your explicit consent and is used solely to notify you about Studio availability
                and to understand how you plan to use our tools. We will never sell or share this data with third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">Newsletter Subscriptions</h3>
              <p className="text-[var(--text-muted)] leading-relaxed mb-2">
                When you subscribe to our newsletter, we collect your email address. Newsletter subscriptions are managed through
                Buttondown, which uses double opt-in to confirm your subscription. You can unsubscribe at any time using the link
                in any newsletter email.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">Contact Form</h3>
              <p className="text-[var(--text-muted)] leading-relaxed mb-2">
                When you submit our contact form, we collect:
              </p>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)] ml-4">
                <li>Name (required)</li>
                <li>Email address (required)</li>
                <li>Organization (optional)</li>
                <li>Message content (required)</li>
              </ul>
              <p className="text-[var(--text-muted)] leading-relaxed mt-2">
                This information is used to respond to your inquiry. Contact form submissions are processed through Formspark.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">What We Don't Collect</h3>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)] ml-4">
                <li>No user accounts or logins (yet)</li>
                <li>No tracking cookies</li>
                <li>No IP addresses</li>
                <li>No payment information</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Your Data Rights</h2>
          <p className="text-[var(--text-muted)] leading-relaxed mb-4">
            Under GDPR and similar privacy regulations, you have the following rights regarding any personal data we hold:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[var(--text-muted)] ml-4 mb-4">
            <li><strong className="text-[var(--text-main)]">Right to Access:</strong> Request a copy of the personal data we hold about you</li>
            <li><strong className="text-[var(--text-main)]">Right to Rectification:</strong> Request correction of inaccurate data</li>
            <li><strong className="text-[var(--text-main)]">Right to Erasure:</strong> Request deletion of your personal data</li>
            <li><strong className="text-[var(--text-main)]">Right to Portability:</strong> Request your data in a machine-readable format</li>
            <li><strong className="text-[var(--text-main)]">Right to Withdraw Consent:</strong> Withdraw your consent at any time</li>
          </ul>
          <p className="text-[var(--text-muted)] leading-relaxed">
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:brandon@quietloudlab.com" className="text-blue-600 dark:text-blue-400 hover:underline">brandon@quietloudlab.com</a>.
            We will respond to your request within 30 days.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Data Retention</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            Waitlist data is retained until Studio launches publicly, after which we will either migrate your data to a user account
            (with your consent) or delete it. You may request deletion at any time by contacting us. Analytics data collected by
            Fathom is aggregated and anonymized, with no individual-level data retained.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Third-Party Services</h2>
          <div className="space-y-6 text-[var(--text-muted)]">
            <div>
              <p className="font-semibold text-[var(--text-main)]">Fathom Analytics</p>
              <p className="leading-relaxed">
                Privacy-first analytics for understanding site usage. Does not collect personal data or use cookies. View their privacy policy at{' '}
                <a href="https://usefathom.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  usefathom.com/privacy
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-main)]">Supabase</p>
              <p className="leading-relaxed">
                Database service used to securely store waitlist information. Supabase is GDPR compliant and processes data
                on our behalf as a data processor. View their privacy policy at{' '}
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  supabase.com/privacy
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-main)]">Buttondown</p>
              <p className="leading-relaxed">
                Newsletter service used to manage email subscriptions and send updates. Buttondown uses double opt-in and is GDPR compliant. View their privacy policy at{' '}
                <a href="https://buttondown.email/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  buttondown.email/legal/privacy
                </a>
              </p>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-main)]">Formspark</p>
              <p className="leading-relaxed">
                Form submission service used to process contact form inquiries. View their privacy policy at{' '}
                <a href="https://formspark.io/legal/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                  formspark.io/legal/privacy-policy
                </a>
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Legal Basis for Processing</h2>
          <p className="text-[var(--text-muted)] leading-relaxed mb-4">
            We process personal data under the following legal bases:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[var(--text-muted)] ml-4">
            <li><strong className="text-[var(--text-main)]">Consent:</strong> When you submit the waitlist form, you explicitly consent to our processing of your data for the stated purposes</li>
            <li><strong className="text-[var(--text-main)]">Legitimate Interest:</strong> For anonymous analytics to improve our services</li>
          </ul>
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
