
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, X, Send, Check } from 'lucide-react';

const FEEDBACK_TYPES = [
  { id: 'bug', label: 'Bug', color: 'bg-red-100 text-red-700 border-red-200' },
  { id: 'feature', label: 'Feature Idea', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { id: 'ui', label: 'UI/UX', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  { id: 'content', label: 'Content', color: 'bg-green-100 text-green-700 border-green-200' },
  { id: 'other', label: 'Other', color: 'bg-gray-100 text-gray-700 border-gray-200' },
];

export const FloatingFeedback = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleType = (typeId: string) => {
    setSelectedTypes((prev) =>
      prev.includes(typeId) ? prev.filter((t) => t !== typeId) : [...prev, typeId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

      if (!FORMSPREE_ENDPOINT) {
        // Fallback: Copy to clipboard
        const typeLabels = selectedTypes
          .map((id) => FEEDBACK_TYPES.find((t) => t.id === id)?.label)
          .filter(Boolean)
          .join(', ');

        const feedbackText = `
Quick Feedback from AI Atlas

Message: ${message.trim()}
Page: ${window.location.href}
${typeLabels ? `Type: ${typeLabels}` : ''}
        `.trim();

        await navigator.clipboard.writeText(feedbackText);
        setIsSubmitting(false);
        setMessage('');
        setSelectedTypes([]);
        setIsOpen(false);
        alert('✅ Feedback copied to clipboard! Please email it to brandon@quietloudlab.com');
        return;
      }

      // Build the message with page and type info
      const typeLabels = selectedTypes
        .map((id) => FEEDBACK_TYPES.find((t) => t.id === id)?.label)
        .filter(Boolean)
        .join(', ');

      // Build the message content
      const fullMessage = `
${message.trim()}

---
Page: ${window.location.href}
${typeLabels ? `Type: ${typeLabels}` : ''}
Timestamp: ${new Date().toLocaleString()}
      `.trim();

      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: fullMessage,
          _subject: 'Quick Feedback from AI Atlas'
        }),
      });

      if (response.ok) {
        // Success!
        setMessage('');
        setSelectedTypes([]);
        setIsOpen(false);
        setShowSuccess(true);

        // Hide success message after 3 seconds
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      // Fallback: Copy to clipboard
      try {
        const typeLabels = selectedTypes
          .map((id) => FEEDBACK_TYPES.find((t) => t.id === id)?.label)
          .filter(Boolean)
          .join(', ');

        const feedbackText = `
Quick Feedback from AI Atlas

Message: ${message.trim()}
Page: ${window.location.href}
${typeLabels ? `Type: ${typeLabels}` : ''}
        `.trim();

        await navigator.clipboard.writeText(feedbackText);
        setMessage('');
        setSelectedTypes([]);
        setIsOpen(false);
        alert('⚠️ Could not send automatically. Feedback copied to clipboard! Please email it to brandon@quietloudlab.com');
      } catch (clipboardError) {
        console.error('Failed to copy to clipboard:', clipboardError);
        alert('❌ Failed to send feedback. Please try again or email brandon@quietloudlab.com directly.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 right-6 z-50
          flex items-center gap-2 px-4 py-3 rounded-full
          bg-black text-white shadow-lg
          hover:bg-gray-800 transition-all duration-200
          ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
        `}
        title="Send feedback"
      >
        <MessageSquare className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">Quick Feedback</span>
      </button>

      {/* Expanded Form */}
      <div
        className={`
          fixed bottom-6 right-6 z-50
          w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-200
          transition-all duration-300 ease-out
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
        `}
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gray-600" />
              <h3 className="font-bold text-gray-900">Quick Feedback</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Feedback Type Selector */}
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mb-2 block">
                Type (optional)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {FEEDBACK_TYPES.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => toggleType(type.id)}
                    disabled={isSubmitting}
                    className={`
                      px-2.5 py-1 rounded-full text-xs font-medium border transition-all
                      ${
                        selectedTypes.includes(type.id)
                          ? type.color + ' border-current'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts, bugs, or ideas..."
              className="w-full h-24 px-3 py-2 text-sm border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isSubmitting}
            />

            {/* Actions */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting || !message.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Success Notification */}
      <div
        className={`
          fixed bottom-6 right-6 z-50
          flex items-center gap-2 px-4 py-3 rounded-full
          bg-green-600 text-white shadow-lg
          transition-all duration-300
          ${showSuccess ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}
        `}
      >
        <Check className="w-5 h-5" />
        <span className="text-sm font-medium">Feedback sent!</span>
      </div>
    </>
  );
};
