'use client';

import Link from 'next/link';

export default function About() {
  return (
    <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white p-8 text-center">
        <h1 className="text-5xl font-bold mb-3">📖 About This System</h1>
        <p className="text-xl opacity-90">RAG System Architecture & Implementation</p>
      </div>

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

      <div className="p-10">
        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#667eea] mb-5 border-b-4 border-[#667eea] pb-3">🎯 System Overview</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            This is a production-ready <strong>Retrieval-Augmented Generation (RAG)</strong> system built with <strong>Next.js and React</strong>. 
            It combines vector search with Large Language Model generation to deliver accurate, relevant answers about professional background and experience.
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
            <strong className="text-lg">✨ Key Features:</strong>
            <ul className="list-disc list-inside mt-3 space-y-2 text-gray-700">
              <li>Real-time semantic search across professional profile data</li>
              <li>AI-powered response generation using Groq's llama-3.1-8b-instant</li>
              <li>STAR methodology implementation for structured content</li>
              <li>Relevance scoring and source attribution</li>
              <li>Modern React/Next.js interface with Tailwind CSS</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#667eea] mb-5 border-b-4 border-[#667eea] pb-3">🛠️ Technology Stack</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#667eea]">
              <h4 className="text-xl font-bold text-[#667eea] mb-3">Frontend</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Next.js 14 (React Framework)</li>
                <li>• TypeScript for type safety</li>
                <li>• Tailwind CSS for styling</li>
                <li>• Server & Client Components</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-[#764ba2]">
              <h4 className="text-xl font-bold text-[#764ba2] mb-3">Backend & AI</h4>
              <ul className="space-y-2 text-gray-700">
                <li>• Upstash Vector (Database)</li>
                <li>• Groq API (LLM Inference)</li>
                <li>• Next.js API Routes</li>
                <li>• Serverless Architecture</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-[#667eea] mb-5 border-b-4 border-[#667eea] pb-3">🏗️ How It Works</h2>
          <div className="bg-gray-50 p-6 rounded-xl font-mono text-sm overflow-x-auto">
            <pre className="whitespace-pre">
{`┌─────────────┐
│  User Query │
└──────┬──────┘
       │
       ▼
┌──────────────────┐
│  Next.js API     │
│  Route Handler   │
└────┬─────────┬───┘
     │         │
     ▼         ▼
┌──────────┐ ┌─────────┐
│ Upstash  │ │  Groq   │
│  Vector  │ │   API   │
└────┬─────┘ └────┬────┘
     │            │
     └────────┬───┘
              │
              ▼
         Response + Sources`}
            </pre>
          </div>
          <ol className="mt-6 space-y-3 text-gray-700">
            <li><strong>1. Query Processing:</strong> User submits question through React interface</li>
            <li><strong>2. Vector Search:</strong> Question embedded and searched in Upstash</li>
            <li><strong>3. Context Retrieval:</strong> Top 3 relevant content chunks retrieved</li>
            <li><strong>4. Prompt Construction:</strong> Context formatted for LLM</li>
            <li><strong>5. Response Generation:</strong> Groq generates personalized response</li>
            <li><strong>6. Display:</strong> Answer shown with sources and scores</li>
          </ol>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#667eea] mb-5 border-b-4 border-[#667eea] pb-3">⭐ STAR Methodology</h2>
          <p className="text-lg text-gray-700 mb-4">
            Professional achievements are structured using the STAR framework:
          </p>
          <ul className="space-y-2 text-gray-700 list-inside">
            <li>• <strong>Situation:</strong> Context and background</li>
            <li>• <strong>Task:</strong> Responsibilities and objectives</li>
            <li>• <strong>Action:</strong> Steps taken and decisions made</li>
            <li>• <strong>Result:</strong> Quantifiable outcomes and impact</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
