import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ForProductPage = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      {/* Hero */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-sans font-medium text-[var(--text-main)] mb-6 leading-tight">
          For Product
        </h1>
        <p className="text-2xl text-[var(--text-muted)] font-light leading-relaxed">
          Stop being the translation layer between design, engineering, and leadership.
        </p>
      </div>

      {/* Problem */}
      <section className="mb-16">
        <h2 className="text-2xl font-sans font-medium text-[var(--text-main)] mb-6">
          The problem isn't ambiguity—it's re-explaining the same reality to everyone
        </h2>
        <p className="text-lg text-[var(--text-muted)] mb-4 leading-relaxed">
          You write a PRD, but:
        </p>
        <ul className="space-y-3 text-[var(--text-muted)] ml-6">
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span>Design asks: "Wait, is this generating text or classifying it?"</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span>Engineering asks: "What's the expected latency? What if the model is down?"</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span>Leadership asks: "Why can't we just automate this fully?"</span>
          </li>
        </ul>
        <p className="text-lg text-[var(--text-muted)] mt-6 leading-relaxed">
          You end up in endless clarification cycles—not because you're unclear, but because there's no shared language.
        </p>
        <p className="text-lg text-[var(--text-muted)] mt-4 leading-relaxed">
          The Atlas doesn't replace your PRD. It gives you a reference layer so your decisions survive contact with reality.
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
              1. Link patterns in your PRDs to reduce clarification rounds
            </h3>
            <p className="text-[var(--text-muted)] mb-4 leading-relaxed">
              Instead of explaining the same concept three times, link to Atlas patterns:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="bg-[var(--bg)] p-4 border border-[var(--border)]">
                <div className="text-sm font-mono text-[var(--text-muted)] mb-2">Before:</div>
                <div className="text-sm text-[var(--text-muted)]">
                  "The system will use AI to suggest responses, but a human needs to approve them before sending."
                </div>
              </div>
              <div className="bg-[var(--bg)] p-4 border border-[var(--border)]">
                <div className="text-sm font-mono text-[var(--text-muted)] mb-2">After:</div>
                <div className="text-sm text-[var(--text-muted)]">
                  The system will use <button onClick={() => navigate('/atlas/ai')} className="underline hover:opacity-70">Text Generation</button> to draft responses, followed by <button onClick={() => navigate('/atlas/human')} className="underline hover:opacity-70">Human Review</button> before sending.
                  <br /><br />
                  Constraints: Latency budget for generation, Privacy prevents logging user data.
                </div>
              </div>
            </div>
            <p className="text-[var(--text-muted)] mb-4">What this does:</p>
            <ul className="space-y-2 text-[var(--text-muted)] ml-6 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>Design knows what to prototype</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>Engineering knows what to build</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>Leadership understands why full automation isn't viable</span>
              </li>
            </ul>
            <p className="text-sm text-[var(--text-muted)] italic">
              Benefit: You stop re-explaining. The Atlas becomes shared context.
            </p>
          </div>

          {/* Example 2 */}
          <div className="border-l-2 border-[var(--border)] pl-6">
            <h3 className="text-xl font-sans font-medium text-[var(--text-main)] mb-3">
              2. Use constraints to justify scope decisions
            </h3>
            <p className="text-[var(--text-muted)] mb-4 leading-relaxed">
              When someone asks "why can't we just...", point to Atlas constraints:
            </p>
            <ul className="space-y-2 text-[var(--text-muted)] ml-6 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>"We can't log conversations" → Privacy constraint</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>"Real-time isn't feasible at this scale" → Latency constraint</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[var(--text-main)]">→</span>
                <span>"We need human oversight here" → Accuracy constraint</span>
              </li>
            </ul>
            <div className="bg-[var(--bg)] p-4 border border-[var(--border)] mb-4">
              <p className="text-sm font-mono text-[var(--text-muted)] mb-3">Example conversation:</p>
              <div className="text-sm text-[var(--text-muted)] space-y-2">
                <p><strong>Stakeholder:</strong> "Why not fully automate this?"</p>
                <p><strong>You:</strong> "Because our accuracy constraint requires 99.5% precision. The best model hits 94%. That 5% gap requires human review."</p>
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)] italic">
              Benefit: You move from defending to explaining. Tradeoffs become visible, not debatable.
            </p>
          </div>

          {/* Example 3 */}
          <div className="border-l-2 border-[var(--border)] pl-6">
            <h3 className="text-xl font-sans font-medium text-[var(--text-main)] mb-3">
              3. Align teams before sprint planning
            </h3>
            <p className="text-[var(--text-muted)] mb-4 leading-relaxed">
              Before writing tickets, map the workflow using Atlas patterns. Example in a Jira epic or Notion doc:
            </p>
            <div className="bg-[var(--bg)] p-6 border border-[var(--border)] font-mono text-sm text-[var(--text-muted)] space-y-4 mb-4">
              <div>
                <div className="text-[var(--text-main)] mb-2">Feature: Smart email triage</div>
                <div className="ml-4 space-y-1">
                  <div>Workflow:</div>
                  <div className="ml-4">1. Text Classification → Categorize incoming email</div>
                  <div className="ml-4">2. Conditional Routing → Urgent vs. non-urgent</div>
                  <div className="ml-4">3. Human Review → Agent approves auto-drafted responses</div>
                  <div className="ml-4">4. Send Response → Only after approval</div>
                </div>
              </div>
              <div>
                <div className="text-[var(--text-main)] mb-2">Data required:</div>
                <div className="ml-4 space-y-1">
                  <div>- Email text (input)</div>
                  <div>- User history (context)</div>
                  <div>- Response templates (reference data)</div>
                </div>
              </div>
              <div>
                <div className="text-[var(--text-main)] mb-2">Constraints:</div>
                <div className="ml-4 space-y-1">
                  <div>- Latency: &lt;2s for classification</div>
                  <div>- Privacy: No email content logged</div>
                  <div>- Accuracy: 95%+ for urgency detection</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-[var(--text-muted)] italic">
              Benefit: Design, eng, and PM start from the same reality. Fewer surprises mid-sprint.
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
            <span><strong>No new tools</strong> → Reference Atlas in Notion, Jira, Google Docs, or wherever you already work</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span><strong>No process change</strong> → Start by linking patterns in your own docs; no team buy-in required</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span><strong>No training</strong> → The Atlas is documentation, not a framework to adopt</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[var(--text-main)] mt-1">/</span>
            <span><strong>No vendor lock-in</strong> → It's open source—use it however it's useful</span>
          </li>
        </ul>
      </section>

      {/* One system, four readings */}
      <section className="mb-16">
        <h2 className="text-2xl font-sans font-medium text-[var(--text-main)] mb-4">
          Example: One system, four readings
        </h2>
        <p className="text-[var(--text-muted)] mb-8 leading-relaxed">
          Here's how a "Sentiment-based prioritization" feature looks through different lenses:
        </p>

        <div className="space-y-8">
          {/* PM view */}
          <div className="border border-[var(--border)] p-6">
            <h3 className="font-mono text-sm text-[var(--text-main)] mb-4 uppercase tracking-wide">PM view (you)</h3>
            <div className="font-mono text-sm text-[var(--text-muted)] mb-4 space-y-1">
              <div>User submits feedback</div>
              <div className="ml-4">↓ [Sentiment Detection] → Positive/Negative/Neutral</div>
              <div className="ml-4">↓ [Conditional Routing] → Negative to urgent queue</div>
              <div className="ml-4">↓ [Human Review] → Support agent triages</div>
              <div>Response or escalation</div>
            </div>
            <p className="text-sm text-[var(--text-muted)] font-medium mb-2">Your responsibility:</p>
            <ul className="text-sm text-[var(--text-muted)] space-y-1 ml-4">
              <li>• Define SLA for urgent vs. non-urgent</li>
              <li>• Decide: What if sentiment is ambiguous?</li>
              <li>• Measure: False positive rate (urgent when it's not)</li>
              <li>• Scope: Who reviews at 2am?</li>
            </ul>
          </div>

          {/* Designer view */}
          <div className="border border-[var(--border)] p-6">
            <h3 className="font-mono text-sm text-[var(--text-main)] mb-4 uppercase tracking-wide">Designer view</h3>
            <p className="text-sm text-[var(--text-muted)] mb-3">Same workflow, design questions:</p>
            <ul className="text-sm text-[var(--text-muted)] space-y-1 ml-4">
              <li>• How do we show sentiment confidence?</li>
              <li>• What if the user disagrees with the classification?</li>
              <li>• How does the agent override the routing?</li>
              <li>• What's the fallback UI if AI is unavailable?</li>
            </ul>
          </div>

          {/* Engineer view */}
          <div className="border border-[var(--border)] p-6">
            <h3 className="font-mono text-sm text-[var(--text-main)] mb-4 uppercase tracking-wide">Engineer view</h3>
            <p className="text-sm text-[var(--text-muted)] mb-3">Same workflow, implementation focus:</p>
            <ul className="text-sm text-[var(--text-muted)] space-y-1 ml-4">
              <li>• Which sentiment model?</li>
              <li>• Where does the queue live?</li>
              <li>• How do we handle retries?</li>
              <li>• What's the API contract?</li>
            </ul>
          </div>

          {/* Research view */}
          <div className="border border-[var(--border)] p-6">
            <h3 className="font-mono text-sm text-[var(--text-main)] mb-4 uppercase tracking-wide">Research view</h3>
            <p className="text-sm text-[var(--text-muted)] mb-3">Same workflow, strategic lens:</p>
            <ul className="text-sm text-[var(--text-muted)] space-y-1 ml-4">
              <li>• Why prioritize by sentiment vs. keyword matching?</li>
              <li>• What does this reveal about our support philosophy?</li>
              <li>• Is this workflow reusable across products?</li>
            </ul>
          </div>
        </div>

        <p className="text-lg text-[var(--text-muted)] mt-8 font-medium">
          The insight: You're all describing the same system. Atlas makes that shared reality explicit—so you stop translating.
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
          Some product teams are testing a visual studio that maps Atlas patterns into shareable system diagrams (for workshops and stakeholder alignment). We're only expanding access to teams actively using the Atlas. If that's you, email <a href="mailto:brandon@quietloudlab.com?subject=Visual%20Studio%20Interest%20-%20PM" className="underline hover:opacity-70">brandon@quietloudlab.com</a>.
        </p>
      </section>
    </div>
  );
};
