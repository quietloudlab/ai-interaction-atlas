import React from 'react';
import { Github, Mail } from 'lucide-react';

export const AtlasFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-auto">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-[var(--text-main)]">AI Interaction Atlas</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Open-source reference for designing AI experiences. A comprehensive taxonomy of tasks, data, and constraints.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-[var(--text-main)]">Resources</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="/atlas" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/atlas/reference" className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
                  Quick Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-[var(--text-main)]">Community</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/quietloudlab/ai-interaction-atlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5"
                >
                  <Github className="w-3 h-3" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:brandon@quietloudlab.com"
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3 h-3" />
                  Send Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold text-sm mb-3 text-[var(--text-main)]">Legal</h3>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://github.com/quietloudlab/ai-interaction-atlas/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                >
                  Apache 2.0 License
                </a>
              </li>
              <li>
                <span className="text-[var(--text-muted)]">
                  Open Source
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border)] pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[var(--text-muted)]">
              © {currentYear} AI Interaction Atlas. Built with React, Tailwind CSS, and Vite.
            </p>
            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
              <a
                href="https://github.com/quietloudlab/ai-interaction-atlas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-main)] transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
