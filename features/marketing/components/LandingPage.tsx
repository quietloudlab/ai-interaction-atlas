
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
      <section className="min-h-[50vh] flex flex-col justify-center px-4 md:px-8 max-w-screen-2xl mx-auto pt-20">
        <div className="max-w-6xl">
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-sans tracking-tighter leading-[0.95] font-medium mb-12">
            The Atlas of AI<br />Interaction<br />Design
          </h1>

          {/* Glass card with description */}
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl font-sans font-light text-gray-700 leading-snug mb-6">
              A shared language for designing AI experiences across human actions, AI tasks,
              system operations, data, constraints, and touchpoints.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => onNavigate('atlas')}
              className="group inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors shadow-lg"
            >
              View the Atlas <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('rationale')}
              className="inline-flex items-center gap-2 border border-black bg-white/50 backdrop-blur-sm text-black px-8 py-4 font-mono text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
            >
              Read Rationale
            </button>
          </div>
        </div>
      </section>

      {/* The Problem → Solution */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <SectionHeader number="01" title="The Problem" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-8 border-t border-black/10 pt-8">
            <p className="text-2xl md:text-3xl font-sans font-light text-gray-800 leading-snug mb-8">
              Teams building AI products speak different languages.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Designers say "experience." Engineers say "pipeline." PMs say "feature."
              Nobody's wrong, but nobody's aligned.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Most AI products are designed backwards—features first, system thinking never.
              The parts that matter most (who decides what, when humans step in, what the AI actually controls)
              end up implicit, assumed, or discovered way too late.
            </p>
          </div>

          <div className="md:col-span-4 border-t border-black/10 pt-8">
            <div className="space-y-4 text-sm text-gray-500 font-mono">
              <div>SYMPTOM 01</div>
              <div className="text-gray-700">"Can we just add AI to this?"</div>

              <div className="mt-6">SYMPTOM 02</div>
              <div className="text-gray-700">"Wait, who's responsible when this goes wrong?"</div>

              <div className="mt-6">SYMPTOM 03</div>
              <div className="text-gray-700">"The prototype worked, but now we're redesigning everything."</div>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-black pt-12">
          <p className="text-2xl md:text-4xl font-sans font-light text-gray-800 leading-snug mb-8">
            The Atlas is the Rosetta Stone.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl">
            A shared vocabulary that makes invisible systems visible—so teams can design AI
            on purpose instead of by accident. It's not a UI kit or a code library.
            It's the language layer underneath, where responsibility and agency get designed.
          </p>
        </div>
      </section>

      {/* The Atlas Structure - Interactive Grid */}
      <section className="py-20 md:py-32 bg-black text-white">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 border-b border-white/20 pb-12">
            <div>
              <span className="font-mono text-sm text-gray-400 mb-4 block">(02)</span>
              <h2 className="text-4xl md:text-6xl font-sans tracking-tighter mb-6">Browse the Atlas</h2>
            </div>
            <div className="max-w-md md:mt-10">
              <p className="text-gray-400 font-mono text-sm leading-relaxed">
                The Atlas organizes AI interactions into six core dimensions. Each is browsable,
                linkable, and designed to help teams speak the same language.
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
                <BrainCircuit className="w-8 h-8 text-[#5A2D82] mb-4" />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">AI Tasks</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  What AI capabilities do: detect, classify, transform, generate, verify, and more.
                </p>
              </div>
            </button>

            {/* Human Tasks */}
            <button
              onClick={() => onNavigate('atlas')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
            >
              <div>
                <UserCircle className="w-8 h-8 text-[#2D5A27] mb-4" />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">Human Tasks</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  What people do: review, approve, compare, edit, provide feedback, and decide.
                </p>
              </div>
            </button>

            {/* System Tasks */}
            <button
              onClick={() => onNavigate('atlas')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
            >
              <div>
                <Settings className="w-8 h-8 text-[#27405A] mb-4" />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">System Tasks</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  Infrastructure operations: session management, state tracking, logging, and routing.
                </p>
              </div>
            </button>

            {/* Data Artifacts */}
            <button
              onClick={() => onNavigate('atlas')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
            >
              <div>
                <Database className="w-8 h-8 text-[#5A4827] mb-4" />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">Data Artifacts</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  Information that flows through the system: inputs, outputs, context, and state.
                </p>
              </div>
            </button>

            {/* Constraints */}
            <button
              onClick={() => onNavigate('atlas')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
            >
              <div>
                <Sliders className="w-8 h-8 text-[#8B4513] mb-4" />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">Constraints</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  Boundaries and requirements: latency, privacy, accuracy, cost, and safety.
                </p>
              </div>
            </button>

            {/* Touchpoints */}
            <button
              onClick={() => onNavigate('atlas')}
              className="text-left border-r border-t border-b border-white/20 p-8 min-h-[300px] flex flex-col justify-between hover:bg-white/5 transition-all group opacity-100 group-hover/list:opacity-40 hover:!opacity-100"
            >
              <div>
                <Smartphone className="w-8 h-8 text-[#D2691E] mb-4" />
                <h3 className="text-xl font-sans mb-2 group-hover:translate-x-1 transition-transform">Touchpoints</h3>
                <p className="text-sm font-mono text-gray-400 leading-relaxed">
                  Where interactions happen: interfaces, notifications, integrations, and channels.
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

      {/* Open Source Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <SectionHeader number="03" title="Open Source" />

        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-black pt-12">
          <div className="mb-12 md:mb-0">
            <p className="text-2xl md:text-3xl font-sans font-light text-gray-700 leading-snug mb-8">
              The AI Interaction Atlas is open source. Browse the code, contribute patterns,
              or adapt it for your own use.
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
            <h3 className="font-mono text-xs uppercase tracking-widest text-gray-600 mb-6">License Details</h3>
            <div className="space-y-4 font-mono text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <span className="text-black">/</span> Apache 2.0 License
              </div>
              <div className="flex items-start gap-2">
                <span className="text-black">/</span> Patent Grant Protection
              </div>
              <div className="flex items-start gap-2">
                <span className="text-black">/</span> Enterprise-Friendly
              </div>
              <div className="flex items-start gap-2">
                <span className="text-black">/</span> Trademark Protected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="py-20 px-4 md:px-8 max-w-screen-2xl mx-auto border-t border-black">
        <div className="max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-sans tracking-tight font-medium mb-6">What's next</h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-mono">
            The Atlas is the foundation. Future work includes tools for mapping, collaboration,
            and exploration—but the vocabulary comes first.
          </p>
        </div>
      </section>
    </div>
  );
};
