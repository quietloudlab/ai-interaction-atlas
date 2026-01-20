
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

export const LandingPage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="bg-white text-[#111]">
      {/* Hero Section - Above the Fold */}
      <section className="min-h-[85vh] flex flex-col justify-center px-6 border-b border-[#E6E6E6]">
        <div className="max-w-4xl mx-auto py-20">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-[#111111] mb-8 leading-[1.1]">
            The AI Interaction Atlas
          </h1>

          <p className="text-xl md:text-2xl text-[#6E6E6E] font-light leading-relaxed mb-6 max-w-3xl">
            A shared language for designing AI experiences across human actions, AI tasks,
            system operations, data, constraints, and touchpoints.
          </p>

          <p className="text-lg md:text-xl text-[#111111] leading-relaxed mb-12 max-w-3xl">
            The Atlas makes complex AI systems legible—so responsibility, intent, and behavior
            can be designed on purpose.
          </p>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <button
              onClick={() => onNavigate('atlas')}
              className="cursor-pointer px-8 py-4 bg-[#111111] text-white rounded-lg font-medium text-lg hover:bg-[#2a2a2a] transition-colors flex items-center gap-2"
            >
              View the Atlas <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('rationale')}
              className="cursor-pointer px-8 py-4 text-[#6E6E6E] hover:text-[#111111] font-medium text-lg transition-colors"
            >
              Read the rationale →
            </button>
          </div>
        </div>
      </section>

      {/* What is the Atlas - Explainer */}
      <section className="py-20 px-6 bg-[#FAFAFA] border-b border-[#E6E6E6]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium mb-12 text-[#111111]">What is the Atlas?</h2>

          <div className="space-y-8 text-[#111111]">
            <div>
              <h3 className="text-xl font-medium mb-3">What it is</h3>
              <ul className="space-y-2 text-lg text-[#6E6E6E] leading-relaxed">
                <li>• An open-source taxonomy for AI interaction design</li>
                <li>• A vocabulary for mapping roles, responsibilities, and decision points</li>
                <li>• A way to reason about AI systems beyond "User → Model → Output"</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3">What it is not</h3>
              <ul className="space-y-2 text-lg text-[#6E6E6E] leading-relaxed">
                <li>• Not a UI framework</li>
                <li>• Not a canvas tool (yet)</li>
                <li>• Not prescriptive about solutions</li>
                <li>• Not tied to a single model or vendor</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Atlas Structure */}
      <section className="py-20 px-6 border-b border-[#E6E6E6]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium mb-4 text-[#111111]">Browse the Atlas</h2>
          <p className="text-lg text-[#6E6E6E] mb-12 max-w-2xl">
            The Atlas organizes AI interactions into six core dimensions. Each is browsable,
            linkable, and designed to help teams speak the same language.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI Tasks */}
            <button
              onClick={() => onNavigate('atlas')}
              className="cursor-pointer text-left bg-white p-8 rounded-xl border border-[#E6E6E6] hover:border-[#111111] transition-all group"
            >
              <BrainCircuit className="w-8 h-8 text-[#5A2D82] mb-4" />
              <h3 className="text-xl font-medium mb-2 text-[#111111] group-hover:underline">AI Tasks</h3>
              <p className="text-[#6E6E6E] text-sm leading-relaxed">
                What AI capabilities do: detect, classify, transform, generate, verify, and more.
              </p>
            </button>

            {/* Human Tasks */}
            <button
              onClick={() => onNavigate('atlas')}
              className="cursor-pointer text-left bg-white p-8 rounded-xl border border-[#E6E6E6] hover:border-[#111111] transition-all group"
            >
              <UserCircle className="w-8 h-8 text-[#2D5A27] mb-4" />
              <h3 className="text-xl font-medium mb-2 text-[#111111] group-hover:underline">Human Tasks</h3>
              <p className="text-[#6E6E6E] text-sm leading-relaxed">
                What people do: review, approve, compare, edit, provide feedback, and decide.
              </p>
            </button>

            {/* System Tasks */}
            <button
              onClick={() => onNavigate('atlas')}
              className="cursor-pointer text-left bg-white p-8 rounded-xl border border-[#E6E6E6] hover:border-[#111111] transition-all group"
            >
              <Settings className="w-8 h-8 text-[#27405A] mb-4" />
              <h3 className="text-xl font-medium mb-2 text-[#111111] group-hover:underline">System Tasks</h3>
              <p className="text-[#6E6E6E] text-sm leading-relaxed">
                Infrastructure operations: session management, state tracking, logging, and routing.
              </p>
            </button>

            {/* Data Artifacts */}
            <button
              onClick={() => onNavigate('atlas')}
              className="cursor-pointer text-left bg-white p-8 rounded-xl border border-[#E6E6E6] hover:border-[#111111] transition-all group"
            >
              <Database className="w-8 h-8 text-[#5A4827] mb-4" />
              <h3 className="text-xl font-medium mb-2 text-[#111111] group-hover:underline">Data Artifacts</h3>
              <p className="text-[#6E6E6E] text-sm leading-relaxed">
                Information that flows through the system: inputs, outputs, context, and state.
              </p>
            </button>

            {/* Constraints */}
            <button
              onClick={() => onNavigate('atlas')}
              className="cursor-pointer text-left bg-white p-8 rounded-xl border border-[#E6E6E6] hover:border-[#111111] transition-all group"
            >
              <Sliders className="w-8 h-8 text-[#8B4513] mb-4" />
              <h3 className="text-xl font-medium mb-2 text-[#111111] group-hover:underline">Constraints</h3>
              <p className="text-[#6E6E6E] text-sm leading-relaxed">
                Boundaries and requirements: latency, privacy, accuracy, cost, and safety.
              </p>
            </button>

            {/* Touchpoints */}
            <button
              onClick={() => onNavigate('atlas')}
              className="cursor-pointer text-left bg-white p-8 rounded-xl border border-[#E6E6E6] hover:border-[#111111] transition-all group"
            >
              <Smartphone className="w-8 h-8 text-[#D2691E] mb-4" />
              <h3 className="text-xl font-medium mb-2 text-[#111111] group-hover:underline">Touchpoints</h3>
              <p className="text-[#6E6E6E] text-sm leading-relaxed">
                Where interactions happen: interfaces, notifications, integrations, and channels.
              </p>
            </button>
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="py-20 px-6 bg-[#FAFAFA] border-b border-[#E6E6E6]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-medium mb-6 text-[#111111]">Open Source</h2>
          <p className="text-lg md:text-xl text-[#6E6E6E] mb-8 leading-relaxed max-w-2xl mx-auto">
            The AI Interaction Atlas is open source. Browse the code, contribute patterns,
            or adapt it for your own use.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://github.com/quietloudlab/ai-interaction-atlas"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer px-8 py-4 bg-[#111111] text-white rounded-lg font-medium text-lg hover:bg-[#2a2a2a] transition-colors"
            >
              View on GitHub
            </a>
            <span className="text-[#6E6E6E]">MIT License</span>
          </div>
        </div>
      </section>

      {/* What's Next */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-medium mb-6 text-[#111111]">What's next</h2>
          <p className="text-lg md:text-xl text-[#6E6E6E] leading-relaxed">
            The Atlas is the foundation. Future work includes tools for mapping, collaboration,
            and exploration—but the vocabulary comes first.
          </p>
        </div>
      </section>
    </div>
  );
};
