import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Layers,
  Users,
  Workflow,
  Sparkles,
  CheckCircle2,
  Loader2,
  Download,
  Share2,
  Zap
} from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { trackEvent, EVENTS } from '../../../lib/fathom';

interface WaitlistFormData {
  email: string;
  name: string;
  organization: string;
  use_case: string;
}

const SectionHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="flex flex-col md:flex-row items-baseline border-t border-[var(--text-main)] pt-6 pb-12 mb-8">
    <div className="mr-6 text-[var(--text-muted)] mb-2 md:mb-0">
      <span className="font-mono text-sm md:text-base">(</span>
      <span className="font-mono text-sm md:text-base">{number}</span>
      <span className="font-mono text-sm md:text-base">)</span>
    </div>
    <h2 className="text-2xl md:text-4xl font-sans tracking-tight font-medium text-[var(--text-main)]">{title}</h2>
  </div>
);

export const StudioPreviewPage = () => {
  const [formData, setFormData] = useState<WaitlistFormData>({
    email: '',
    name: '',
    organization: '',
    use_case: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      trackEvent(EVENTS.STUDIO_WAITLIST_SUBMITTED);

      const { error } = await supabase
        .from('waitlist')
        .insert({
          email: formData.email.toLowerCase().trim(),
          name: formData.name.trim() || null,
          organization: formData.organization.trim() || null,
          use_case: formData.use_case.trim() || null,
        });

      if (error) {
        if (error.code === '23505') {
          setErrorMessage("You're already on the list! We'll be in touch soon.");
          setFormStatus('error');
        } else {
          console.error('Waitlist error:', error);
          setErrorMessage('Something went wrong. Please try again.');
          setFormStatus('error');
        }
        return;
      }

      setFormStatus('success');
      setFormData({ email: '', name: '', organization: '', use_case: '' });
    } catch (error) {
      console.error('Waitlist error:', error);
      setErrorMessage('Something went wrong. Please try again.');
      setFormStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="bg-[var(--surface)] text-[var(--text-main)] selection:bg-[var(--text-main)] selection:text-[var(--bg)]">
      {/* Hero Section - Medical workflow + headline */}
      <section className="pt-6 pb-0 relative overflow-hidden">
        <div className="px-4 md:px-8 max-w-screen-2xl mx-auto">
          {/* Top bar: Back link + Badge */}
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <a
              href="/atlas"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Atlas
            </a>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/30 rounded-full text-xs font-mono text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3 h-3" />
              Coming Soon
            </div>
          </div>
        </div>

        {/* Hero content: Image left, title right */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">
          {/* Left: Image bleeding off left edge of viewport */}
          <div className="order-2 lg:order-1 w-full lg:w-[55%] lg:flex-shrink-0 px-4 lg:px-0">
            <img
              src="/img/example_therapy.png"
              alt="Clinical workflow example showing precision therapy matching with safety checks and clinician review gates"
              className="w-full lg:w-[calc(100%+((100vw-100%)/2))] lg:max-w-none lg:ml-[calc(-1*((100vw-100%)/2))]"
            />
          </div>

          {/* Right: Hero title only */}
          <div className="order-1 lg:order-2 w-full lg:w-[45%] px-4 md:px-8 lg:pl-16 xl:pl-24 lg:pr-12 xl:pr-20 py-8 lg:py-16">
            <h1 className="text-[clamp(2.5rem,6vw,7.5rem)] font-sans tracking-tighter leading-[0.95] font-medium">
              From simple flows
              <br />
              <span className="text-[var(--text-muted)]">to complex systems</span>
            </h1>
          </div>
        </div>

      </section>

      {/* Waitlist Form Section */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-28 px-4 md:px-8">
        <div className="max-w-screen-xl mx-auto">
          {formStatus === 'success' ? (
            <div className="max-w-xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--success)]/10 text-[var(--success)] rounded-full mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-medium text-[var(--text-main)] mb-4">
                You're on the list
              </h3>
              <p className="text-lg text-[var(--text-muted)] mb-8">
                We'll send you an email when Studio is ready.
              </p>
              <a
                href="/atlas"
                className="group inline-flex items-center gap-2 text-[var(--text-main)] font-medium hover:gap-3 transition-all"
              >
                Continue exploring the Atlas <ArrowRight size={16} />
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-[calc(var(--spacing)*32)] items-start">
              {/* Left: Subtext */}
              <div>
                <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-[var(--text-main)] leading-snug">
                  Studio is the visual workspace for designing AI systems with the Atlas framework.
                  Drag patterns, connect flows, align your team.
                </p>
              </div>

              {/* Right: Form */}
              <div className="bg-[var(--bg)] border border-[var(--border)] rounded-lg p-8 md:p-10">
                <h3 className="text-2xl md:text-3xl font-medium text-[var(--text-main)] mb-3">
                  Get early access
                </h3>
                <p className="text-lg text-[var(--text-muted)] mb-8">
                  Be first to map your AI systems visually.
                </p>

              {formStatus === 'error' && errorMessage && (
                <div className="mb-6 p-4 bg-[var(--error)]/10 border border-[var(--error)]/20 text-[var(--error)] text-sm rounded-lg text-left">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 border border-[var(--border)] bg-[var(--surface)] rounded-md text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--text-main)] transition-colors"
                      placeholder="you@company.com"
                      disabled={formStatus === 'submitting'}
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3.5 border border-[var(--border)] bg-[var(--surface)] rounded-md text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--text-main)] transition-colors"
                      placeholder="Your name"
                      disabled={formStatus === 'submitting'}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="organization" className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    Organization *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    required
                    value={formData.organization}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-[var(--border)] bg-[var(--surface)] rounded-md text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--text-main)] transition-colors"
                    placeholder="Your company or team"
                    disabled={formStatus === 'submitting'}
                  />
                </div>

                <div>
                  <label htmlFor="use_case" className="block text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                    What will you use Studio for?
                  </label>
                  <textarea
                    id="use_case"
                    name="use_case"
                    rows={2}
                    value={formData.use_case}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 border border-[var(--border)] bg-[var(--surface)] rounded-md text-[var(--text-main)] placeholder:text-[var(--text-subtle)] focus:outline-none focus:border-[var(--text-main)] transition-colors resize-none"
                    placeholder="Tell us about your AI project (optional)"
                    disabled={formStatus === 'submitting'}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full group inline-flex items-center justify-center gap-3 bg-[var(--text-main)] text-[var(--bg)] px-8 py-4 font-mono text-sm uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        Join the Waitlist
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-8 max-w-screen-2xl mx-auto border-t border-[var(--border)]">
        <div className="mb-16">
          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4 block">(02)</span>
          <h2 className="text-4xl md:text-5xl font-sans tracking-tight font-medium">How it works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          <div>
            <div className="font-mono text-6xl font-light text-[var(--border)] mb-4">01</div>
            <h3 className="text-xl font-medium mb-3 text-[var(--text-main)]">Start with a goal</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">
              What should your AI system do? Start with the user need and work backward.
            </p>
          </div>

          <div>
            <div className="font-mono text-6xl font-light text-[var(--border)] mb-4">02</div>
            <h3 className="text-xl font-medium mb-3 text-[var(--text-main)]">Drag patterns</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Pull patterns directly from the Atlas. AI capabilities, human actions, system operations.
            </p>
          </div>

          <div>
            <div className="font-mono text-6xl font-light text-[var(--border)] mb-4">03</div>
            <h3 className="text-xl font-medium mb-3 text-[var(--text-main)]">Connect the flow</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Draw edges to show data flow. Add constraints and touchpoints from the Atlas.
            </p>
          </div>

          <div>
            <div className="font-mono text-6xl font-light text-[var(--border)] mb-4">04</div>
            <h3 className="text-xl font-medium mb-3 text-[var(--text-main)]">Share & align</h3>
            <p className="text-[var(--text-muted)] leading-relaxed">
              Export or share with your team. Iterate until everyone agrees on the system.
            </p>
          </div>
        </div>
      </section>

      {/* RAG Example - Full width */}
      <section className="py-8 md:py-12 relative overflow-hidden">
        <div className="overflow-hidden">
          <div className="max-w-[90rem] mx-auto px-4 md:px-0">
            <img
              src="/img/example_rag.png"
              alt="RAG workflow example showing a knowledge base query flow"
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Studio Features */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="mb-16">
          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4 block">(03)</span>
          <h2 className="text-4xl md:text-5xl font-sans tracking-tight font-medium">What Studio enables</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <div>
            <Layers className="w-10 h-10 mb-6 text-[var(--text-main)]" strokeWidth={1.5} />
            <h3 className="text-2xl font-medium mb-4 text-[var(--text-main)]">Direct Atlas Integration</h3>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              Every pattern you're exploring here can be dragged directly onto your canvas.
              Inputs, outputs, and constraints come with it.
            </p>
          </div>

          <div>
            <Share2 className="w-10 h-10 mb-6 text-[var(--text-main)]" strokeWidth={1.5} />
            <h3 className="text-2xl font-medium mb-4 text-[var(--text-main)]">Export & Share</h3>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              Export as PNG, JSON, or shareable links. Use your diagrams in docs,
              presentations, or hand them off to engineering.
            </p>
          </div>

          <div>
            <Zap className="w-10 h-10 mb-6 text-[var(--text-main)]" strokeWidth={1.5} />
            <h3 className="text-2xl font-medium mb-4 text-[var(--text-main)]">Fast Iteration</h3>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed">
              Rearrange, duplicate, delete. Change your mind before it costs weeks of
              engineering time. Auto-save keeps your work safe.
            </p>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto border-t border-[var(--border)]">
        <div className="mb-16">
          <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4 block">(04)</span>
          <h2 className="text-4xl md:text-5xl font-sans tracking-tight font-medium">Who it's for</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <div>
            <h3 className="text-2xl font-medium mb-4 text-[var(--text-main)]">Product Managers</h3>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">
              Translate requirements into visual specs that engineers can build from.
            </p>
            <ul className="space-y-3 text-[var(--text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-main)]">→</span>
                <span>Map user journeys with AI touchpoints</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-main)]">→</span>
                <span>Define constraints upfront</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-main)]">→</span>
                <span>Get alignment before sprint planning</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-medium mb-4 text-[var(--text-main)]">Designers</h3>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">
              Understand the AI system behind your interfaces.
            </p>
            <ul className="space-y-3 text-[var(--text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-main)]">→</span>
                <span>See how UI connects to AI capabilities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-main)]">→</span>
                <span>Design for edge cases early</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-main)]">→</span>
                <span>Communicate intent to engineers</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-2xl font-medium mb-4 text-[var(--text-main)]">Engineers</h3>
            <p className="text-lg text-[var(--text-muted)] leading-relaxed mb-6">
              Get clear specs before you start building.
            </p>
            <ul className="space-y-3 text-[var(--text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-main)]">→</span>
                <span>Understand inputs and outputs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-main)]">→</span>
                <span>Know constraints before coding</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--text-main)]">→</span>
                <span>Reference during implementation</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <span className="font-mono text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4 block">(05)</span>
            <h2 className="text-4xl md:text-5xl font-sans tracking-tight font-medium">Questions</h2>
          </div>

          <div className="lg:col-span-8 space-y-0 divide-y divide-[var(--border)]">
            <details className="group py-6 first:pt-0">
              <summary className="cursor-pointer text-xl font-medium text-[var(--text-main)] hover:text-[var(--text-muted)] transition-colors list-none flex items-center justify-between">
                When will I get access?
                <span className="text-[var(--text-muted)] group-open:rotate-45 transition-transform text-2xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
                We're rolling out access in batches. You'll receive an email
                when your spot is ready with instructions to create your account.
              </p>
            </details>

            <details className="group py-6">
              <summary className="cursor-pointer text-xl font-medium text-[var(--text-main)] hover:text-[var(--text-muted)] transition-colors list-none flex items-center justify-between">
                Can I import patterns directly from the Atlas?
                <span className="text-[var(--text-muted)] group-open:rotate-45 transition-transform text-2xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
                Yes. Studio connects directly to the Atlas. You can search and drag any pattern
                onto your canvas. All metadata—inputs, outputs, constraints, relationships—comes with it.
              </p>
            </details>

            <details className="group py-6">
              <summary className="cursor-pointer text-xl font-medium text-[var(--text-main)] hover:text-[var(--text-muted)] transition-colors list-none flex items-center justify-between">
                Is Studio free?
                <span className="text-[var(--text-muted)] group-open:rotate-45 transition-transform text-2xl flex-shrink-0 ml-4">+</span>
              </summary>
              <p className="mt-4 text-lg text-[var(--text-muted)] leading-relaxed max-w-2xl">
                Studio will have a free tier for personal projects. We'll share detailed pricing
                when we launch publicly. Early access users get extended free access.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 md:py-48 px-4 md:px-8 bg-[var(--text-main)] text-[var(--bg)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-sans tracking-tight font-medium mb-8 leading-[1.1]">
            Stop describing.
            <br />
            Start showing.
          </h2>
          <p className="text-xl md:text-2xl opacity-60 mb-12 max-w-xl mx-auto">
            Be the first to map your AI systems visually.
          </p>
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="cursor-pointer group inline-flex items-center gap-3 bg-[var(--bg)] text-[var(--text-main)] px-10 py-5 font-mono text-sm uppercase tracking-widest hover:opacity-90 transition-all"
          >
            Join the Waitlist <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-8 bg-[var(--surface)]">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[var(--text-muted)]">
          <p>
            &copy; {new Date().getFullYear()}{' '}
            <a
              href="https://quietloudlab.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-main)] hover:opacity-70 transition-opacity"
            >
              quietloudlab
            </a>
          </p>
          <div className="flex items-center gap-8">
            <a href="/privacy" className="hover:text-[var(--text-main)] transition-colors">Privacy</a>
            <a href="/terms" className="hover:text-[var(--text-main)] transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
