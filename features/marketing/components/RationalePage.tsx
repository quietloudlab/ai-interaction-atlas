
import React from 'react';
import { ArrowLeft } from 'lucide-react';

export const RationalePage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  return (
    <div className="bg-white text-[#111]">
      <section className="py-12 px-6 border-b border-[#E6E6E6]">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => onNavigate('landing')}
            className="cursor-pointer flex items-center gap-2 text-[#6E6E6E] hover:text-[#111111] mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-[#111111] mb-6">
            Why the Atlas Exists
          </h1>

          <p className="text-xl text-[#6E6E6E] leading-relaxed">
            A case for shared language in AI interaction design
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-12 text-lg leading-relaxed">

          <div>
            <h2 className="text-2xl font-medium text-[#111111] mb-4">
              The problem isn't the models
            </h2>
            <p className="text-[#111111] mb-4">
              We have powerful AI capabilities. Classification works. Generation works. Retrieval works.
              The models are not the bottleneck anymore.
            </p>
            <p className="text-[#111111]">
              The bottleneck is designing the system around them—deciding who does what, when,
              and why. The bottleneck is alignment.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-[#111111] mb-4">
              "User → AI → Output" breaks down quickly
            </h2>
            <p className="text-[#111111] mb-4">
              Most diagrams of AI systems show a linear flow: user sends input, AI processes it,
              user gets output. This works for demos. It fails for products.
            </p>
            <p className="text-[#111111] mb-4">
              Real AI systems involve:
            </p>
            <ul className="space-y-2 text-[#111111] ml-6">
              <li>• People reviewing, approving, and correcting AI outputs</li>
              <li>• AI assisting with tasks that people still decide on</li>
              <li>• Systems routing, logging, and managing state across interactions</li>
              <li>• Data flowing in multiple directions, not just input → output</li>
              <li>• Constraints that shape what's possible: latency, privacy, cost, accuracy</li>
            </ul>
            <p className="text-[#111111] mt-4">
              The moment you add human review, or multi-step reasoning, or session persistence,
              the simple arrow diagram becomes a lie.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-[#111111] mb-4">
              AI experience design is about responsibility allocation
            </h2>
            <p className="text-[#111111] mb-4">
              Every interaction with AI requires decisions about responsibility:
            </p>
            <ul className="space-y-3 text-[#111111] ml-6 mb-4">
              <li>• Should the AI <em>suggest</em> or <em>decide</em>?</li>
              <li>• Should a person <em>review before</em> or <em>correct after</em>?</li>
              <li>• Should the system <em>block</em> an action or <em>warn and allow</em>?</li>
              <li>• Should this run <em>synchronously</em> or <em>in the background</em>?</li>
              <li>• Should we <em>optimize for speed</em> or <em>accuracy</em>?</li>
            </ul>
            <p className="text-[#111111]">
              These aren't technical questions. They're design questions. And they require a shared
              vocabulary across product, design, and engineering.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-[#111111] mb-4">
              Teams don't have a shared language yet
            </h2>
            <p className="text-[#111111] mb-4">
              When a product manager says "the AI should help users rewrite emails," what does that mean?
            </p>
            <ul className="space-y-2 text-[#111111] ml-6 mb-4">
              <li>• Does the AI <em>generate alternatives</em> or <em>edit the draft in place</em>?</li>
              <li>• Does it <em>analyze tone first</em>, or go straight to generation?</li>
              <li>• Can the user <em>compare options</em>, or only accept/reject?</li>
              <li>• Does the system <em>remember preferences</em> across sessions?</li>
              <li>• What happens if generation fails—does it <em>retry</em>, <em>fall back</em>, or <em>surface an error</em>?</li>
            </ul>
            <p className="text-[#111111]">
              Without a shared taxonomy, each person imagines a different system. Designers draw flows
              that engineers can't build. Engineers build features that users don't understand. Product
              managers discover constraints only after launch.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-[#111111] mb-4">
              The Atlas is a shared reference
            </h2>
            <p className="text-[#111111] mb-4">
              The AI Interaction Atlas provides a vocabulary for the building blocks of AI systems:
            </p>
            <ul className="space-y-2 text-[#111111] ml-6 mb-4">
              <li>• <strong>AI Tasks</strong> — What capabilities AI provides (classify, generate, verify, transform)</li>
              <li>• <strong>Human Tasks</strong> — What people do in the loop (review, approve, edit, compare)</li>
              <li>• <strong>System Tasks</strong> — What infrastructure handles (routing, logging, state management)</li>
              <li>• <strong>Data Artifacts</strong> — What information flows between tasks</li>
              <li>• <strong>Constraints</strong> — What boundaries shape the design (latency, privacy, cost, accuracy)</li>
              <li>• <strong>Touchpoints</strong> — Where interactions happen (UI, API, notifications, integrations)</li>
            </ul>
            <p className="text-[#111111]">
              This isn't prescriptive. It doesn't tell you what to build. It gives you language to describe
              what you're building—so teams can align before writing code.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-[#111111] mb-4">
              Why this matters now
            </h2>
            <p className="text-[#111111] mb-4">
              AI is no longer a feature—it's an architecture. Systems are moving from single-model inference
              to multi-step workflows involving retrieval, reasoning, generation, and human oversight.
            </p>
            <p className="text-[#111111] mb-4">
              As systems get more complex, the cost of misalignment goes up:
            </p>
            <ul className="space-y-2 text-[#111111] ml-6 mb-4">
              <li>• Engineers build the wrong thing because requirements were vague</li>
              <li>• Designers create flows that violate latency or cost constraints</li>
              <li>• Product managers promise features that can't be responsibly built</li>
              <li>• Users encounter behaviors that feel arbitrary or unsafe</li>
            </ul>
            <p className="text-[#111111]">
              Shared language reduces this waste. It makes systems legible. It helps teams reason about
              tradeoffs before committing to implementation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-medium text-[#111111] mb-4">
              This is a starting point, not an endpoint
            </h2>
            <p className="text-[#111111] mb-4">
              The Atlas is incomplete. It will always be incomplete. AI interaction design is still forming
              as a discipline.
            </p>
            <p className="text-[#111111] mb-4">
              But having <em>some</em> shared vocabulary is better than having none. Having a reference that
              teams can point to, critique, and extend is better than everyone inventing their own terms.
            </p>
            <p className="text-[#111111]">
              This is an open-source taxonomy because it needs to evolve with the field. Contribute patterns.
              Suggest changes. Fork it for your own use. The goal isn't perfection—it's shared understanding.
            </p>
          </div>

          <div className="pt-8 border-t border-[#E6E6E6]">
            <p className="text-[#111111] mb-4">
              The Atlas makes complex AI systems legible—so responsibility, intent, and behavior can be
              designed on purpose.
            </p>
            <p className="text-[#6E6E6E]">
              That's why it exists.
            </p>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onNavigate('atlas')}
              className="cursor-pointer px-8 py-4 bg-[#111111] text-white rounded-lg font-medium hover:bg-[#2a2a2a] transition-colors"
            >
              View the Atlas
            </button>
            <button
              onClick={() => onNavigate('landing')}
              className="cursor-pointer px-8 py-4 text-[#6E6E6E] hover:text-[#111111] font-medium transition-colors"
            >
              Back to home
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
