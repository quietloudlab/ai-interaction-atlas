import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ForDesignersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-sans font-medium text-[var(--text-main)] mb-6 leading-tight">
          For Designers
        </h1>
        <p className="text-2xl text-[var(--text-muted)] font-light leading-relaxed">
          Specify AI behavior with design language, not engineering language.
        </p>
      </div>

      {/* Problem */}
      <section className="mb-16">
        <h2 className="text-2xl font-sans font-medium text-[var(--text-main)] mb-6">
          The problem isn't that you're not technical enough
        </h2>
        <p className="text-lg text-[var(--text-muted)] mb-4 leading-relaxed">
          It's that the systems you're designing are never fully specified:
        </p>
        <ul className="space-y-3 text-[var(--text-muted)] ml-6">
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span>You design a chat interface, but "generate response" is a black box with no defined boundaries</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span>You prototype AI features, but the constraints (latency, privacy, accuracy) aren't in your control—or even visible</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span>You get blamed when the system behaves unexpectedly, even though you were never asked to specify its behavior</span>
          </li>
        </ul>
        <p className="text-lg text-[var(--text-muted)] mt-6 leading-relaxed">
          The Atlas doesn't make you more technical. It gives you language to name what's already implicit in your work.
        </p>
      </section>

      {/* How Atlas helps */}
      <section className="mb-16">
        <h2 className="text-2xl font-sans font-medium text-[var(--text-main)] mb-6">
          How the Atlas helps you today
        </h2>

        <div className="space-y-10">
          {/* Example 1 */}
          <div className="border-l-2 border-[var(--border)] pl-6">
            <h3 className="text-xl font-sans font-medium text-[var(--text-main)] mb-3">
              1. Annotate designs with pattern references
            </h3>
            <p className="text-[var(--text-muted)] mb-4 leading-relaxed">
              When you hand off a design, link to Atlas patterns to specify what you mean:
            </p>
            <ul className="space-y-2 text-[var(--text-muted)] ml-6 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>"This uses <strong>Text Generation</strong> → not classification, not search"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>"This requires <strong>Human Review</strong> → decisions stay with people"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>"This assumes a <strong>latency budget</strong> → constraint affects the entire flow"</span>
              </li>
            </ul>
            <div className="bg-[var(--bg)] p-4 border border-[var(--border)] font-mono text-sm text-[var(--text-muted)] mb-4">
              <div className="mb-2">Example: In your Figma file, add a text layer:</div>
              <div className="text-[var(--text-main)]">
                🔗 Atlas patterns used:<br />
                - Text Generation (AI)<br />
                - Approve/Reject (Human)<br />
                - Latency: &lt;500ms (Constraint)
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)] italic">
              Benefit: Designers stop being blamed for things they were never allowed to specify.
            </p>
          </div>

          {/* Example 2 */}
          <div className="border-l-2 border-[var(--border)] pl-6">
            <h3 className="text-xl font-sans font-medium text-[var(--text-main)] mb-3">
              2. Validate ideas before prototyping
            </h3>
            <p className="text-[var(--text-muted)] mb-4 leading-relaxed">
              Before you design a feature, check if the building blocks exist:
            </p>
            <ul className="space-y-2 text-[var(--text-muted)] ml-6 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>Browse <button onClick={() => navigate('/atlas/ai')} className="underline hover:opacity-70">AI Patterns</button> to see what's actually possible vs. what's hype</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>Check <button onClick={() => navigate('/atlas/data')} className="underline hover:opacity-70">Data Artifacts</button> to confirm the system has access to what you need</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>Review <button onClick={() => navigate('/atlas/constraints')} className="underline hover:opacity-70">Constraints</button> to understand what can't be violated</span>
              </li>
            </ul>
            <p className="text-[var(--text-muted)] mb-3 font-medium">Example questions you can now answer:</p>
            <ul className="space-y-2 text-[var(--text-muted)] ml-6 mb-4 text-sm">
              <li>"Can we do semantic search?" → Check if Vector search pattern exists</li>
              <li>"Can users undo AI actions?" → Look for Rollback patterns</li>
              <li>"How fast does this need to be?" → Reference Latency constraints</li>
            </ul>
            <p className="text-sm text-[var(--text-muted)] italic">
              Benefit: You stop designing impossible features or underspecifying critical ones.
            </p>
          </div>

          {/* Example 3 */}
          <div className="border-l-2 border-[var(--border)] pl-6">
            <h3 className="text-xl font-sans font-medium text-[var(--text-main)] mb-3">
              3. Explain system behavior in critiques
            </h3>
            <p className="text-[var(--text-muted)] mb-4 leading-relaxed">
              When someone asks "why does it work this way?", point to Atlas patterns:
            </p>
            <ul className="space-y-2 text-[var(--text-muted)] ml-6 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>"This is <strong>Text Classification</strong>, which means it assigns labels—it doesn't generate new content"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>"We need <strong>Batch Processing</strong> here because real-time isn't feasible at this scale"</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>"<strong>Privacy</strong> constraints prevent us from storing conversation history"</span>
              </li>
            </ul>
            <p className="text-sm text-[var(--text-muted)] italic">
              Benefit: You shift from defending design choices to explaining system reality.
            </p>
          </div>
        </div>
      </section>

      {/* What you don't need */}
      <section className="mb-16 bg-[var(--bg)] p-8 border border-[var(--border)]">
        <h2 className="text-xl font-sans font-medium text-[var(--text-main)] mb-4">
          What you don't need
        </h2>
        <ul className="space-y-3 text-[var(--text-muted)]">
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span><strong>No new tools</strong> → Use Atlas alongside Figma, Sketch, or whatever you use now</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span><strong>No code changes</strong> → You're adding context, not writing implementations</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span><strong>No buy-in required</strong> → Start by linking patterns in your own work; no team process change needed</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span><strong>No training</strong> → The Atlas is browsable documentation, not a methodology</span>
          </li>
        </ul>
      </section>

      {/* One system, four readings */}
      <section className="mb-16">
        <h2 className="text-2xl font-sans font-medium text-[var(--text-main)] mb-4">
          Example: One system, four readings
        </h2>
        <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
          Here's how a "Chatbot with human review" workflow looks through different lenses:
        </p>

        <div className="space-y-8">
          {/* Designer view */}
          <div className="border border-[var(--border)] p-6">
            <h3 className="font-mono text-sm text-[var(--text-main)] mb-4 uppercase tracking-wide">Designer view (you)</h3>
            <div className="font-mono text-sm text-[var(--text-muted)] mb-4 space-y-1">
              <div>User types message</div>
              <div className="ml-4">↓ [Text Classification] → Route to handler</div>
              <div className="ml-4">↓ [Text Generation] → Draft response</div>
              <div className="ml-4">↓ [Human Review] → Approve before sending</div>
              <div>Response sent to user</div>
            </div>
            <p className="text-sm text-[var(--text-muted)] font-medium mb-2">Your responsibility:</p>
            <ul className="text-sm text-[var(--text-muted)] space-y-1 ml-4">
              <li>• Design the review interface</li>
              <li>• Show AI confidence levels</li>
              <li>• Make approval/reject actions clear</li>
              <li>• Handle edge cases (what if reviewer is unavailable?)</li>
            </ul>
          </div>

          {/* PM view */}
          <div className="border border-[var(--border)] p-6">
            <h3 className="font-mono text-sm text-[var(--text-main)] mb-4 uppercase tracking-wide">PM view</h3>
            <p className="text-sm text-[var(--text-muted)] mb-3">Same workflow, different questions:</p>
            <ul className="text-sm text-[var(--text-muted)] space-y-1 ml-4">
              <li>• What's the approval SLA?</li>
              <li>• Who reviews at 2am?</li>
              <li>• What's the fallback if AI is down?</li>
              <li>• How do we measure review quality?</li>
            </ul>
          </div>

          {/* Engineer view */}
          <div className="border border-[var(--border)] p-6">
            <h3 className="font-mono text-sm text-[var(--text-main)] mb-4 uppercase tracking-wide">Engineer view</h3>
            <p className="text-sm text-[var(--text-muted)] mb-3">Same workflow, implementation focus:</p>
            <ul className="text-sm text-[var(--text-muted)] space-y-1 ml-4">
              <li>• Which classification model?</li>
              <li>• Where does review queue live?</li>
              <li>• How do we handle retries?</li>
              <li>• What's the database schema?</li>
            </ul>
          </div>

          {/* Research view */}
          <div className="border border-[var(--border)] p-6">
            <h3 className="font-mono text-sm text-[var(--text-main)] mb-4 uppercase tracking-wide">Research view</h3>
            <p className="text-sm text-[var(--text-muted)] mb-3">Same workflow, strategic lens:</p>
            <ul className="text-sm text-[var(--text-muted)] space-y-1 ml-4">
              <li>• Why human review vs. full automation?</li>
              <li>• What does this reveal about our risk tolerance?</li>
              <li>• Is this workflow portable across products?</li>
            </ul>
          </div>
        </div>

        <p className="text-lg text-[var(--text-muted)] mt-8 font-medium">
          The insight: You're all talking about the same system. The Atlas makes that shared reality explicit.
        </p>
      </section>

      {/* Next steps */}
      <section className="mb-16">
        <h2 className="text-2xl font-sans font-medium text-[var(--text-main)] mb-6">
          Next steps
        </h2>
        <p className="text-[var(--text-muted)] mb-6 font-medium">Browse patterns by dimension:</p>
        <ul className="space-y-2 text-[var(--text-muted)] ml-6 mb-8">
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <button onClick={() => navigate('/atlas/ai')} className="underline hover:opacity-70">AI Patterns</button> - What AI actually does (detect, classify, transform, generate)
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <button onClick={() => navigate('/atlas/human')} className="underline hover:opacity-70">Human Actions</button> - Where people stay in control
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <button onClick={() => navigate('/atlas/system')} className="underline hover:opacity-70">System Operations</button> - Deterministic infrastructure
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <button onClick={() => navigate('/atlas/data')} className="underline hover:opacity-70">Data Artifacts</button> - What flows through the system
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <button onClick={() => navigate('/atlas/constraints')} className="underline hover:opacity-70">Constraints</button> - What cannot be violated
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <button onClick={() => navigate('/atlas/touchpoints')} className="underline hover:opacity-70">Touchpoints</button> - Where humans and systems interact
          </li>
        </ul>
        <p className="text-[var(--text-muted)] font-medium mb-3">Or start here:</p>
        <ul className="space-y-2 text-[var(--text-muted)] ml-6">
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <button onClick={() => navigate('/atlas/reference')} className="underline hover:opacity-70">Quick Reference</button> - One-page overview of all patterns
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <button onClick={() => navigate('/atlas')} className="underline hover:opacity-70">Explore Templates</button> - Pre-built workflows to learn from
          </li>
        </ul>
      </section>

      {/* Canvas tease */}
      <section className="border-t border-[var(--border)] pt-8">
        <h3 className="text-lg font-sans font-medium text-[var(--text-main)] mb-4">
          A note on visual mapping
        </h3>
        <p className="text-[var(--text-muted)] leading-relaxed mb-4">
          Some design teams are testing a visual studio that maps Atlas patterns into shareable system diagrams (for workshops and stakeholder alignment). We're only expanding access to teams actively using the Atlas. If that's you, email <a href="mailto:brandon@quietloudlab.com?subject=Visual%20Studio%20Interest%20-%20Designer" className="underline hover:opacity-70">brandon@quietloudlab.com</a>.
        </p>
      </section>
    </div>
  );
};
