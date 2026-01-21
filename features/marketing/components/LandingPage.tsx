
import React from 'react';
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
  return (
    <div className="bg-white text-black selection:bg-black selection:text-white">
      {/* Hero Section - Above the Fold */}
      <section className="min-h-[60vh] flex flex-col justify-start px-4 md:px-8 max-w-screen-2xl mx-auto pt-32 pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start w-full">
          {/* Left: Hero Text */}
          <div className="min-w-0">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tighter leading-[0.95] font-medium mb-8">
              The Atlas of AI<br />Interaction<br />Design
            </h1>

            <div className="max-w-xl">
              <p className="text-xl md:text-2xl font-sans font-light text-gray-700 leading-snug mb-8">
                A shared language for designing AI experiences across human actions, AI tasks,
                system operations, data, constraints, and touchpoints.
              </p>
            </div>

            <div>
              <button
                onClick={() => onNavigate('atlas')}
                className="group inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg"
              >
                View the Atlas <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
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
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto">
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
          <p className="text-2xl md:text-4xl font-sans font-light text-gray-800 leading-snug mb-8">
            The Atlas makes invisible systems visible.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            It provides a vocabulary for designing AI as legible, inspectable systems of interaction—where
            capabilities, constraints, human agency, and responsibility are explicit by design. It's not a
            UI kit or code library. It's the language layer underneath, where responsibility and agency get designed.
          </p>
        </div>
      </section>

      {/* Six System Dimensions */}
      <section className="py-20 md:py-32 bg-black text-white">
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
            {/* AI Tasks */}
            <button
              onClick={() => onNavigate('atlas')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
            >
              <div>
                <BrainCircuit className="w-8 h-8 mb-4" style={{ color: '#8B22F1' }} />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">AI Tasks</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  Probabilistic capabilities: detect, classify, transform, generate. Tools, not intelligence.
                </p>
              </div>
            </button>

            {/* Human Tasks */}
            <button
              onClick={() => onNavigate('atlas')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
            >
              <div>
                <UserCircle className="w-8 h-8 mb-4" style={{ color: '#2B5CF3' }} />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">Human Tasks</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  Where agency lives: review, decide, configure, approve. People control what matters.
                </p>
              </div>
            </button>

            {/* System Tasks */}
            <button
              onClick={() => onNavigate('atlas')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
            >
              <div>
                <Settings className="w-8 h-8 mb-4" style={{ color: '#4C5564' }} />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">System Tasks</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  Deterministic operations: routing, caching, logging. Infrastructure that shapes reliability.
                </p>
              </div>
            </button>

            {/* Data Artifacts */}
            <button
              onClick={() => onNavigate('atlas')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
            >
              <div>
                <Database className="w-8 h-8 mb-4" style={{ color: '#D37709' }} />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">Data Artifacts</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  What flows through: inputs, outputs, context. The raw material AI transforms.
                </p>
              </div>
            </button>

            {/* Constraints */}
            <button
              onClick={() => onNavigate('atlas')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
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
              onClick={() => onNavigate('atlas')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
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

      {/* From Vocabulary to Practice */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <SectionHeader number="03" title="From vocabulary to practice" />

        <div className="border-t border-black pt-12 mb-16">
          <p className="text-2xl md:text-3xl font-sans font-light text-gray-700 leading-snug mb-8 max-w-4xl">
            The Atlas is the foundation. It's how <a href="https://quietloudlab.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">quietloudlab</a> approaches
            AI product design—translating abstract capabilities into concrete systems, surfacing
            tradeoffs early, and making responsibility explicit.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            Using the Atlas is free and open. Working with quietloudlab means applying this thinking
            to your specific organizational, technical, and human constraints—moving from vocabulary
            to strategy, from patterns to decisions, from clarity to shipping.
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
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto bg-gray-50">
        <div className="max-w-screen-2xl mx-auto">
          <SectionHeader number="04" title="Free and open source" />

          <div className="grid grid-cols-1 md:grid-cols-2 border-t border-black pt-12 gap-12">
            <div>
              <p className="text-2xl md:text-3xl font-sans font-light text-gray-700 leading-snug mb-8">
                The Atlas is open source because legibility demands transparency. You can inspect
                the patterns, contribute new ones, and adapt the system to your needs.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                This isn't a SaaS product or vendor lock-in—it's a shared resource for teams who
                believe AI systems should be understandable. Open sourcing the Atlas is a commitment
                to the same principles it encodes: visibility, accountability, and collective intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://github.com/quietloudlab/ai-interaction-atlas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg group"
                >
                  View on GitHub <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="border-l border-black/10 pl-8 md:pl-12">
              <h3 className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-6">What this means</h3>
              <div className="space-y-4 font-mono text-sm text-gray-600">
                <div className="flex items-start gap-2">
                  <span className="text-black">/</span> Use it commercially
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black">/</span> Modify and adapt it
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black">/</span> Contribute improvements back
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-black">/</span> Apache 2.0 licensed
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 md:py-32 bg-black text-white">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Copy */}
            <div>
              <h2 className="text-3xl md:text-5xl font-sans tracking-tight font-medium mb-6 leading-tight">
                Ready to design AI systems that feel intentional, not magical?
              </h2>
              <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                quietloudlab helps organizations apply the Atlas vocabulary to real product challenges.
                From system mapping to product blueprints to ongoing advisory—we bring structure to AI strategy.
              </p>
            </div>

            {/* Right: Form */}
            <div>
              <form
                action="https://submit-form.com/wD0F0mjLN"
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-mono text-gray-400 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-mono text-gray-400 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="organization" className="block text-sm font-mono text-gray-400 mb-2">
                    Organization
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors"
                    placeholder="Your organization (optional)"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-mono text-gray-400 mb-2">
                    Tell us about your project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="What AI product challenge are you working on?"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors shadow-lg group"
                  >
                    Send inquiry <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <a
                    href="https://quietloudlab.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors group"
                  >
                    Visit quietloudlab.com <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
