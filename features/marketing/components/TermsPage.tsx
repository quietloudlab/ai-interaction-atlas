import React from 'react';

export const TermsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
      <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-main)] mb-4">Terms of Use</h1>
      <p className="text-sm text-[var(--text-muted)] mb-12">Last updated: January 22, 2025</p>

      <div className="prose prose-sm lg:prose-base max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Welcome!</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            AI Interaction Atlas is a free, open-source reference tool for designing AI experiences.
            These terms are intentionally simple because we want this to be an open, accessible resource for everyone.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Open Source License</h2>
          <p className="text-[var(--text-muted)] leading-relaxed mb-4">
            This project is licensed under the Apache License 2.0. This means:
          </p>
          <ul className="list-disc list-inside space-y-2 text-[var(--text-muted)] ml-4">
            <li>✅ You can use it for free, forever</li>
            <li>✅ You can use it for commercial projects</li>
            <li>✅ You can modify and adapt the content</li>
            <li>✅ You can fork the code and create your own version</li>
            <li>✅ No attribution required (but appreciated!)</li>
          </ul>
          <p className="text-[var(--text-muted)] leading-relaxed mt-4">
            View the full license on{' '}
            <a href="https://github.com/quietloudlab/ai-interaction-atlas/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
              GitHub
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">How You Can Use This</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">Encouraged Uses:</h3>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)] ml-4">
                <li>Reference for designing your AI products</li>
                <li>Teaching and educational purposes</li>
                <li>Internal documentation for your team</li>
                <li>Research and analysis</li>
                <li>Building on top of this framework</li>
                <li>Sharing with colleagues and friends</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-[var(--text-main)] mb-2">Please Don't:</h3>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-muted)] ml-4">
                <li>Claim you created the original Atlas</li>
                <li>Remove copyright notices from the code</li>
                <li>Use it for anything illegal or harmful</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">No Warranties</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            This is a reference tool provided "as is." While we strive for accuracy, we make no guarantees about
            completeness or suitability for your specific use case. AI is evolving rapidly, and this Atlas is a
            living document that will continue to grow and change.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Liability</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            We're not liable for any issues that arise from using this tool. It's a free reference resource,
            and you use it at your own discretion.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Contributing</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            We welcome contributions! If you want to improve the Atlas, suggest new patterns, or fix issues,
            please visit our{' '}
            <a href="https://github.com/quietloudlab/ai-interaction-atlas" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
              GitHub repository
            </a>. By contributing, you agree to license your contributions under the same Apache 2.0 license.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Updates to These Terms</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            We may update these terms occasionally. Changes will be noted on this page with an updated date
            and documented in our GitHub repository.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-[var(--text-main)] mb-4">Contact</h2>
          <p className="text-[var(--text-muted)] leading-relaxed">
            Questions or feedback? Reach out at{' '}
            <a href="mailto:brandon@quietloudlab.com" className="text-blue-600 dark:text-blue-400 hover:underline">
              brandon@quietloudlab.com
            </a>
          </p>
        </section>

        <section className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-6 rounded">
          <p className="text-[var(--text-muted)] leading-relaxed text-sm">
            <strong className="text-[var(--text-main)]">TL;DR:</strong> Use this however you want. It's open source,
            free, and built to help the community design better AI experiences. Just don't be a jerk about it. 🙂
          </p>
        </section>
      </div>
    </div>
  );
};
