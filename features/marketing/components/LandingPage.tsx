
import React, { useState } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  UserCircle,
  Settings,
  Database,
  Sliders,
  Smartphone
} from 'lucide-react';
import { HeroSearchWidget } from './HeroSearchWidget';
import diagramExample from '../../../src/img/diagram_example.png';
import quietloudlabLogo from '../../../src/img/quietloudlab_logo.svg';
import { trackEvent, EVENTS } from '../../../lib/fathom';

const SectionHeader = ({ number, title }: { number: string; title: string }) => (
  <div className="flex flex-col md:flex-row items-baseline border-t border-black pt-6 pb-12 mb-8">
    <div className="mr-6 text-gray-600 mb-2 md:mb-0">
      <span className="font-mono text-sm md:text-base">(</span>
      <span className="font-mono text-sm md:text-base">{number}</span>
      <span className="font-mono text-sm md:text-base">)</span>
    </div>
    <h2 className="text-2xl md:text-4xl font-sans tracking-tight font-medium">{title}</h2>
  </div>
);

export const LandingPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://submit-form.com/wD0F0mjLN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        // Reset status after 5 seconds
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 5000);
      }
    } catch (error) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribeStatus('submitting');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://submit-form.com/wD0F0mjLN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...Object.fromEntries(formData),
          _subject: 'New Atlas Subscription',
          type: 'subscription'
        }),
      });

      if (response.ok) {
        setSubscribeStatus('success');
        form.reset();
        setTimeout(() => setSubscribeStatus('idle'), 5000);
      } else {
        setSubscribeStatus('error');
        setTimeout(() => setSubscribeStatus('idle'), 5000);
      }
    } catch (error) {
      setSubscribeStatus('error');
      setTimeout(() => setSubscribeStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-white text-black selection:bg-black selection:text-white">
      {/* Skip Navigation Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-black focus:text-white focus:px-4 focus:py-2 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      >
        Skip to main content
      </a>

      {/* Hero Section - Above the Fold */}
      <section id="main-content" className="min-h-[40vh] flex flex-col justify-start px-4 md:px-8 max-w-screen-2xl mx-auto pt-32 pb-12 w-full relative">
        {/* Subtle top light */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/5 to-transparent" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full">
          {/* Left: Hero Text */}
          <div className="min-w-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tighter leading-[0.95] font-medium mb-3">
              The Atlas of AI<br />Interaction<br />Design
            </h1>

            <div className="inline-flex items-center gap-2 mt-4 mb-8">
              <span className="text-sm text-black">by</span>
              <a
                href="https://www.linkedin.com/company/quietloudlab"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity p-1 -m-1 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 rounded"
              >
                <img src={quietloudlabLogo} alt="quietloudlab" className="h-4" />
              </a>
            </div>

            <div className="max-w-xxl">
              <p className="text-xl md:text-2xl font-sans font-light text-gray-700 leading-snug mb-8">
              A shared language for designing human-AI interaction systems.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('atlas')}
                className="group inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-gray-800 transition-all active:translate-y-px focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.06)' }}
              >
                View the Atlas <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://github.com/quietloudlab/ai-interaction-atlas"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent(EVENTS.GITHUB_CLICKED)}
                className="group inline-flex items-center gap-2 border-2 border-black text-black px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all active:translate-y-px focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
              >
                View on GitHub <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Right: Search Widget */}
          <div className="lg:pt-8 min-w-0 w-full">
            <HeroSearchWidget onResultClick={(result) => {
              // Navigate to the appropriate detail page based on result type
              if (result.type === 'task') {
                onNavigate(`atlas/task/${result.id}`);
              } else if (result.type === 'data') {
                onNavigate('atlas/data');
              } else if (result.type === 'constraint') {
                onNavigate('atlas/constraints');
              } else if (result.type === 'touchpoint') {
                onNavigate('atlas/touchpoints');
              }
            }} />
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto relative">
        {/* Subtle shadow transition from above */}
        <div className="absolute top-0 left-0 right-0 h-24 pointer-events-none" />
        <SectionHeader number="01" title="The Problem" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 border-t border-black/10 pt-8">
            <p className="text-2xl md:text-3xl font-sans font-light text-gray-800 leading-snug mb-8">
              AI systems are designed at the wrong level of abstraction.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Teams say "add an agent" or "use an LLM" instead of asking the questions that matter:
              What decisions are probabilistic versus deterministic? Where does human judgment remain essential?
              What constraints govern safety, privacy, and trust?
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              This mismatch creates products that feel magical but fail unpredictably. Black boxes obscure
              responsibility, collaboration becomes guesswork, and "AI strategy" defaults to the lowest-imagination
              patterns: chatbots, generators, automations.
            </p>
          </div>

          <div className="md:col-span-4 border-t border-black/10 pt-8">
            <div className="space-y-4 text-sm text-gray-500 font-mono">
              <div>SYMPTOM 01</div>
              <div className="text-gray-700">"The prototype worked, production is chaos."</div>

              <div className="mt-6">SYMPTOM 02</div>
              <div className="text-gray-700">"We can't explain why it did that."</div>

              <div className="mt-6">SYMPTOM 03</div>
              <div className="text-gray-700">"Who's accountable when this fails?"</div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-black pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <p className="text-2xl md:text-4xl font-sans font-light text-gray-800 leading-snug mb-8">
                The Atlas makes invisible systems visible.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                It provides a vocabulary for designing AI as legible, inspectable systems of interaction—where
                capabilities, constraints, human agency, and responsibility are explicit by design. It's not a
                UI kit or code library. It's the language layer underneath, where responsibility and agency get designed.
              </p>
            </div>

            {/* Right: Subscribe */}
            <div className="flex flex-col items-center justify-center text-center max-w-sm mx-auto">
              <p className="text-sm text-gray-600 mb-4">Stay updated on new patterns and improvements</p>

              {subscribeStatus === 'success' && (
                <div
                  className="mb-4 p-3 bg-green-50 border border-green-200 text-green-800 text-sm rounded"
                  role="alert"
                  aria-live="polite"
                >
                  Subscribed! Check your email for confirmation.
                </div>
              )}
              {subscribeStatus === 'error' && (
                <div
                  className="mb-4 p-3 bg-red-50 border border-red-200 text-red-800 text-sm rounded"
                  role="alert"
                  aria-live="assertive"
                >
                  Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubscribe} className="space-y-3">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="_honeypot"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-2 text-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all"
                />
                <button
                  type="submit"
                  disabled={subscribeStatus === 'submitting'}
                  className="w-full px-6 py-2 bg-black text-white text-sm font-mono uppercase tracking-wider hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                >
                  {subscribeStatus === 'submitting' ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Six System Dimensions */}
      <section className="py-20 md:py-32 bg-black text-white relative">
        {/* Subtle top light gradient on dark section */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 border-b border-white/20 pb-12">
            <div>
              <span className="font-mono text-sm text-gray-400 mb-4 block">(02)</span>
              <h2 className="text-4xl md:text-6xl font-sans tracking-tighter mb-6">Six system dimensions</h2>
            </div>
            <div className="max-w-md md:mt-10">
              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                The Atlas externalizes AI as composable systems made of six dimensions. Together, they form
                the language for designing interactions where agency, responsibility, and creativity are
                intentional—not accidental.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-white/20 group/list">
            {/* AI Patterns */}
            <button
              onClick={() => onNavigate('atlas/ai')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
            >
              <div>
                <BrainCircuit className="w-8 h-8 mb-4" style={{ color: '#8B22F1' }} />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">AI Patterns</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  Probabilistic capabilities: detect, classify, transform, generate. Tools, not intelligence.
                </p>
              </div>
            </button>

            {/* Human Actions */}
            <button
              onClick={() => onNavigate('atlas/human')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
            >
              <div>
                <UserCircle className="w-8 h-8 mb-4" style={{ color: '#2B5CF3' }} />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">Human Actions</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  Where agency lives: review, decide, configure, approve. People control what matters.
                </p>
              </div>
            </button>

            {/* System Operations */}
            <button
              onClick={() => onNavigate('atlas/system')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
            >
              <div>
                <Settings className="w-8 h-8 mb-4" style={{ color: '#4C5564' }} />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">System Operations</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  Deterministic operations: routing, caching, logging. Infrastructure that shapes reliability.
                </p>
              </div>
            </button>

            {/* Data Modalities */}
            <button
              onClick={() => onNavigate('atlas/data')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
            >
              <div>
                <Database className="w-8 h-8 mb-4" style={{ color: '#D37709' }} />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">Data Modalities</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  What flows through: inputs, outputs, context. The raw material AI transforms.
                </p>
              </div>
            </button>

            {/* Constraints */}
            <button
              onClick={() => onNavigate('atlas/constraints')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
            >
              <div>
                <Sliders className="w-8 h-8 mb-4" style={{ color: '#D91A45' }} />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">Constraints</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  What cannot be violated: latency, privacy, accuracy. Design scaffolding, not limitations.
                </p>
              </div>
            </button>

            {/* Touchpoints */}
            <button
              onClick={() => onNavigate('atlas/touchpoints')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100 relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)' }}
            >
              <div>
                <Smartphone className="w-8 h-8 mb-4" style={{ color: '#3090B5' }} />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">Touchpoints</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  Where systems surface: screens, voice, notifications. Invisible systems made tangible.
                </p>
              </div>
            </button>
          </div>

          <div className="mt-8 flex justify-between items-center text-sm font-mono text-gray-500">
            <span>OPEN SOURCE • APACHE 2.0 LICENSE</span>
            <span>6 DIMENSIONS • 100+ PATTERNS</span>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="py-20 md:py-28 px-4 md:px-8 max-w-screen-2xl mx-auto border-t border-black/10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-sans tracking-tight font-medium mb-4">
            How to use the Atlas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            A step-by-step guide to navigating the taxonomy and building inspectable AI systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Step 1 */}
          <div className="border-l-2 border-black pl-6">
            <div className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">Step 01</div>
            <h3 className="text-xl font-sans font-medium mb-3">Explore</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Navigate 100+ interaction patterns organized by six system dimensions: AI, Human, System, Data, Constraints, and Touchpoints.
            </p>
          </div>

          {/* Step 2 */}
          <div className="border-l-2 border-black pl-6">
            <div className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">Step 02</div>
            <h3 className="text-xl font-sans font-medium mb-3">Search</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Find specific patterns using keyword search or AI-powered semantic search to discover related concepts and connections.
            </p>
          </div>

          {/* Step 3 */}
          <div className="border-l-2 border-black pl-6">
            <div className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">Step 03</div>
            <h3 className="text-xl font-sans font-medium mb-3">Build</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Create visual system maps by dragging patterns onto a canvas, connecting them to model your AI product's interaction flows.
            </p>
          </div>

          {/* Step 4 */}
          <div className="border-l-2 border-black pl-6">
            <div className="font-mono text-xs uppercase tracking-widest text-gray-400 mb-3">Step 04</div>
            <h3 className="text-xl font-sans font-medium mb-3">Share</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Export diagrams as images or JSON, bookmark patterns, and use the shared vocabulary to align your team on AI system design.
            </p>
          </div>
        </div>
      </section>

      {/* From Vocabulary to Practice */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto relative">
        {/* Subtle shadow transition from above */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/[0.02] to-transparent pointer-events-none" />
        <SectionHeader number="03" title="From vocabulary to practice" />

        <div className="border-t border-black pt-12 mb-16">
          <p className="text-2xl md:text-3xl font-sans font-light text-gray-700 leading-snug mb-8 max-w-4xl">
            The Atlas is how <a href="https://quietloudlab.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">quietloudlab</a> approaches
            AI product design, translating abstract capabilities into concrete systems, surfacing
            tradeoffs early, and making responsibility explicit.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            Using the Atlas is free and open. Working with quietloudlab means applying this thinking
            to your specific organizational, technical, and human constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="border-t border-black/10 pt-8">
            <h3 className="font-sans text-xl font-medium mb-6">What you can do with the Atlas</h3>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">/</span>
                <span>Map existing AI products as legible systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">/</span>
                <span>Design new experiences from composable patterns</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">/</span>
                <span>Identify gaps, risks, and ownership boundaries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">/</span>
                <span>Align cross-functional teams around shared language</span>
              </li>
            </ul>
          </div>

          <div className="border-t border-black/10 pt-8">
            <h3 className="font-sans text-xl font-medium mb-6">What quietloudlab brings</h3>
            <ul className="space-y-4 text-gray-600 mb-8">
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">/</span>
                <span>Multi-week product blueprints and system design sprints</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">/</span>
                <span>Facilitation that surfaces tradeoffs and responsibilities</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">/</span>
                <span>Durable thinking infrastructure, not disposable reports</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black mt-1">/</span>
                <span>Judgment grounded in systems thinking, not AI hype</span>
              </li>
            </ul>
            <button
              onClick={() => {
                document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-black font-medium hover:gap-3 transition-all cursor-pointer"
            >
              Learn more about working together <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-20 md:py-16 mb-20 md:mb-32 px-4 md:px-8 max-w-screen-2xl mx-auto bg-gray-50 relative">
        {/* Subtle top shadow on light background */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/[0.03] to-transparent pointer-events-none" />
        <div className="max-w-screen-2xl mx-auto">
          <SectionHeader number="04" title="Free and open source" />

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-black pt-12 gap-12">
            <div>
              <p className="text-2xl md:text-3xl font-sans font-light text-gray-700 leading-snug mb-8">
                Legibility demands transparency. You can inspect the patterns, contribute new ones, and adapt the system to your needs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                The AI Interaction Atlas is a shared resource for teams who
                believe AI systems should be understandable. Open sourcing the Atlas is a commitment
                to the same principles it encodes: visibility, accountability, and collective intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/quietloudlab/ai-interaction-atlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent(EVENTS.GITHUB_CLICKED)}
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-gray-800 transition-all active:translate-y-px group focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
                  style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.06)' }}
                >
                  View on GitHub <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="border-l border-black/10 pl-8 md:pl-12">
              <h3 className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-6">Apache 2.0 licensed</h3>
              <div className="space-y-4 font-mono text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-black">/</span> Use it commercially
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black">/</span> Modify and adapt it
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black">/</span> Contribute improvements
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black">/</span> No vendor lock-in
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="pt-32 md:pt-48 pb-20 md:pb-32 bg-black text-white relative">
        {/* Subtle top light gradient on dark section */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          {/* Diagram Example */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl text-center font-sans tracking-tight font-medium mb-8 leading-tight">
            Make the system visible.<br className="md:hidden" /> Decide with clarity.
            </h2>
            <div className="-mx-4 md:-mx-8">
              <img
                src={diagramExample}
                alt="Example of an AI system diagram using the Atlas framework"
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Copy */}
            <div>
              <span className="text-xl md:text-2xl leading-relaxed font-light">quietloudlab works with teams to map AI products as inspectable systems so ownership, constraints, and tradeoffs are explicit before build decisions harden.<br /><br></br>
              Have a system or product in mind? Share a bit about it and we'll take a look.</span>

              <div className="mt-8">
                <a
                  href="https://quietloudlab.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors group"
                >
                  Visit quietloudlab.com <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Right: Form */}
            <div>
              {formStatus === 'success' && (
                <div
                  className="mb-6 p-4 bg-white/10 border border-white/20 text-white font-mono text-sm"
                  role="alert"
                  aria-live="polite"
                >
                  Thank you! We'll be in touch soon.
                </div>
              )}
              {formStatus === 'error' && (
                <div
                  className="mb-6 p-4 bg-red-900/20 border border-red-500/30 text-red-200 font-mono text-sm"
                  role="alert"
                  aria-live="assertive"
                >
                  Something went wrong. Please try again or email us directly.
                </div>
              )}
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* Honeypot field for spam protection - hidden from users */}
                <input
                  type="text"
                  name="_honeypot"
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:border-white transition-all"
                    style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:border-white transition-all"
                    style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-mono text-gray-300 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:border-white transition-all"
                    style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
                    placeholder="Your organization (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-gray-300 mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black focus:border-white transition-all resize-none"
                    style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
                    placeholder="What AI product challenge are you working on?"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-gray-200 transition-all active:translate-y-px group disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 4px 8px rgba(0,0,0,0.08), 0 8px 16px rgba(0,0,0,0.06)' }}
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send inquiry'} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
