'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Source {
  title: string;
  score: string;
}

interface QueryResponse {
  answer: string;
  sources: Source[];
  relevance_scores: number[];
}

export default function Home() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const sampleQuestions = [
    'Tell me about your work experience',
    'What are your technical skills?',
    'Describe your career goals',
    'What is your experience with AI/ML?',
  ];

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setResponse({
        answer: 'Error connecting to the server. Please try again.',
        sources: [],
        relevance_scores: [],
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-t-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white p-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">🤖 Digital Twin RAG System</h1>
          <p className="text-xl opacity-90">AI-Powered Professional Profile Assistant</p>
        </div>

        {/* Navigation */}
        <nav className="bg-gray-50 px-8 py-4 flex flex-wrap gap-4 border-b-2 border-gray-200">
          <Link href="/" className="text-[#667eea] font-semibold px-4 py-2 rounded-lg hover:bg-[#667eea] hover:text-white transition">
            🏠 Home
          </Link>
          <Link href="/about" className="text-[#667eea] font-semibold px-4 py-2 rounded-lg hover:bg-[#667eea] hover:text-white transition">
            📖 About
          </Link>
          <Link href="/testing" className="text-[#667eea] font-semibold px-4 py-2 rounded-lg hover:bg-[#667eea] hover:text-white transition">
            🧪 Testing
          </Link>
          <Link href="/profile-data" className="text-[#667eea] font-semibold px-4 py-2 rounded-lg hover:bg-[#667eea] hover:text-white transition">
            👤 Profile Data
          </Link>
          <Link href="/github" className="text-[#667eea] font-semibold px-4 py-2 rounded-lg hover:bg-[#667eea] hover:text-white transition">
            💻 GitHub
          </Link>
        </nav>

        {/* Content */}
        <div className="p-8">
          {/* Query Section */}
          <div className="bg-gray-50 p-8 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-5">Ask About My Professional Background</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-xl mb-4 focus:outline-none focus:border-[#667eea] transition"
                rows={3}
                placeholder="Ask me about my experience, skills, projects, or career goals..."
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white px-10 py-4 rounded-xl font-semibold text-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Thinking...' : 'Ask Question'}
              </button>
            </form>

            {/* Sample Questions */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-[#667eea] mb-3">💭 Sample Questions:</h3>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setQuestion(q)}
                    className="bg-white border-2 border-[#667eea] text-[#667eea] px-5 py-2 rounded-lg hover:bg-[#667eea] hover:text-white transition font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#667eea]"></div>
              <p className="mt-4 text-gray-600">Searching professional profile...</p>
            </div>
          )}

          {/* Response Section */}
          {response && !loading && (
            <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
              <div className="text-xl font-semibold text-[#667eea] mb-4">🤖 Response:</div>
              <div className="text-gray-700 leading-relaxed mb-6 text-lg whitespace-pre-wrap">
                {response.answer}
              </div>

              {response.sources.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-[#667eea] mb-4">📚 Sources Used:</h3>
                  <div className="space-y-3">
                    {response.sources.map((source, i) => (
                      <div key={i} className="flex justify-between items-center bg-white p-4 rounded-lg">
                        <span className="font-semibold text-gray-700">{source.title}</span>
                        <span className="bg-[#667eea] text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Relevance: {source.score}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
