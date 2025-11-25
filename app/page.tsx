'use client';

import { useState } from 'react';
import Image from 'next/image';

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
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState<QueryResponse | null>(null);
  const [chatLoading, setChatLoading] = useState(false);

  const handleChatSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatQuestion.trim()) return;

    setChatLoading(true);
    setChatResponse(null);

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: chatQuestion }),
      });

      const data = await res.json();
      setChatResponse(data);
    } catch (error) {
      console.error('Error:', error);
      setChatResponse({
        answer: 'Error connecting to the server. Please try again.',
        sources: [],
        relevance_scores: [],
      });
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Kevin Fuschetto</span>
            <div className="hidden md:flex gap-8 text-sm">
              <a href="#experience" className="text-zinc-400 hover:text-white transition-colors">Experience</a>
              <a href="#skills" className="text-zinc-400 hover:text-white transition-colors">Skills</a>
              <a href="#education" className="text-zinc-400 hover:text-white transition-colors">Education</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12 animate-fade-in-up">
            <div className="mb-8 relative">
              <Image 
                src="/profile.jpg" 
                alt="Kevin Fuschetto" 
                width={120} 
                height={120}
                className="rounded-full object-cover w-[120px] h-[120px] ring-1 ring-white/10"
                priority
              />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
              Software Engineer
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
              Building elegant solutions with .NET, solving complex problems, and delivering exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://github.com/kevinfusko" 
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-all hover:scale-105"
              >
                View GitHub
              </a>
              <button 
                onClick={() => setChatbotOpen(true)}
                className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-medium hover:bg-white/10 transition-all hover:scale-105"
              >
                Ask AI Assistant
              </button>
            </div>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20">
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold mb-2">3+</div>
              <div className="text-sm text-zinc-400">Years Experience</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold mb-2">Brisbane</div>
              <div className="text-sm text-zinc-400">Australia</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-bold mb-2">.NET</div>
              <div className="text-sm text-zinc-400">Core Expertise</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 sm:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center">Experience</h2>
          
          <div className="space-y-16">
            {/* Supervisor / General Labourer - Most Recent */}
            <div className="group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">Supervisor / General Labourer</h3>
                  <p className="text-zinc-400">Casu</p>
                </div>
                <span className="text-sm text-zinc-500 whitespace-nowrap">Jan 2024 – Present</span>
              </div>
              <ul className="space-y-3 text-zinc-400 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Supervise small teams and ensure smooth project execution</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Delegated tasks, coordinated workflows, and supported hands-on construction activities</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Improved task efficiency and maintained consistent project quality</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">Team Supervision</span>
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">Task Coordination</span>
              </div>
            </div>

            {/* IT Field Technician */}
            <div className="group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">IT Field Technician</h3>
                  <p className="text-zinc-400">Azstar Technologies</p>
                </div>
                <span className="text-sm text-zinc-500 whitespace-nowrap">Oct 2022 – Jul 2024</span>
              </div>
              <ul className="space-y-3 text-zinc-400 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Provided fast on-site technical support for retail POS and EFTPOS systems</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Diagnosed issues, replaced components, and improved system stability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Consistently received positive customer feedback for service quality</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">POS Systems</span>
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">Networking</span>
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">Hardware</span>
              </div>
            </div>

            {/* IT Manager */}
            <div className="group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">IT Manager</h3>
                  <p className="text-zinc-400">NEM S.r.l (Helios Technologies Group)</p>
                </div>
                <span className="text-sm text-zinc-500 whitespace-nowrap">Mar 2021 – May 2022</span>
              </div>
              <ul className="space-y-3 text-zinc-400 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Managed network infrastructure and automated internal processes</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Built custom .NET applications to support warehouse operations</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Improved efficiency across workflows and ensured reliable daily operations</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">.NET Framework</span>
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">C#</span>
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">SQL Server</span>
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">ASP.NET</span>
              </div>
            </div>

            {/* .NET Software Developer */}
            <div className="group">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">.NET Software Developer</h3>
                  <p className="text-zinc-400">Advantis S.r.l</p>
                </div>
                <span className="text-sm text-zinc-500 whitespace-nowrap">Sep 2018 – Mar 2021</span>
              </div>
              <ul className="space-y-3 text-zinc-400 leading-relaxed">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Built full-stack .NET applications for healthcare and HR clients</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Designed SQL databases, created APIs, and supported end users with training</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1">→</span>
                  <span>Delivered reliable applications that improved client workflow efficiency</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">.NET Framework</span>
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">MVC</span>
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">C#</span>
                <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">SQL Server</span>
              </div>
            </div>

            {/* Additional Roles - Initially Hidden */}
            <div id="more-experience" className="space-y-16 hidden">
              {/* IT Support Intern - Reggiana Riduttori */}
              <div className="group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">IT Support Intern</h3>
                    <p className="text-zinc-400">Reggiana Riduttori S.r.l</p>
                  </div>
                  <span className="text-sm text-zinc-500 whitespace-nowrap">Jan 2018</span>
                </div>
                <ul className="space-y-3 text-zinc-400 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>Provided IT support and troubleshooting for internal users</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">IT Support</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">Troubleshooting</span>
                </div>
              </div>

              {/* IT Support Intern - Tecnoufficio */}
              <div className="group">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold mb-2 group-hover:text-blue-500 transition-colors">IT Support Intern</h3>
                    <p className="text-zinc-400">Tecnoufficio S.r.l</p>
                  </div>
                  <span className="text-sm text-zinc-500 whitespace-nowrap">May 2017 – Jun 2017</span>
                </div>
                <ul className="space-y-3 text-zinc-400 leading-relaxed">
                  <li className="flex gap-3">
                    <span className="text-blue-500 mt-1">→</span>
                    <span>Assisted with PC repair, hardware diagnostics, and customer support</span>
                  </li>
                </ul>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">PC Repair</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">Hardware Diagnostics</span>
                  <span className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/10 text-zinc-300">Customer Support</span>
                </div>
              </div>
            </div>

            {/* See More/Less Button */}
            <div className="text-center pt-8">
              <button 
                onClick={() => {
                  const moreExperience = document.getElementById('more-experience');
                  const button = document.getElementById('toggle-experience-btn');
                  const icon = document.getElementById('toggle-experience-icon');
                  if (moreExperience && button && icon) {
                    if (moreExperience.classList.contains('hidden')) {
                      moreExperience.classList.remove('hidden');
                      button.textContent = 'Show less';
                      icon.style.transform = 'rotate(180deg)';
                    } else {
                      moreExperience.classList.add('hidden');
                      button.textContent = 'See more positions';
                      icon.style.transform = 'rotate(0deg)';
                    }
                  }
                }}
                className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-400 transition-colors"
              >
                <span id="toggle-experience-btn">See more positions</span>
                <svg id="toggle-experience-icon" className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 sm:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center">Technical Skills</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center">
              <div className="text-3xl mb-2">⚙️</div>
              <div className="font-medium">C#</div>
              <div className="text-xs text-zinc-500 mt-1">3 years</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center">
              <div className="text-3xl mb-2">🗄️</div>
              <div className="font-medium">SQL</div>
              <div className="text-xs text-zinc-500 mt-1">3 years</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center">
              <div className="text-3xl mb-2">🎨</div>
              <div className="font-medium">HTML/CSS</div>
              <div className="text-xs text-zinc-500 mt-1">5 years</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <div className="font-medium">JavaScript</div>
              <div className="text-xs text-zinc-500 mt-1">3 years</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center">
              <div className="text-3xl mb-2">🔷</div>
              <div className="font-medium">.NET</div>
              <div className="text-xs text-zinc-500 mt-1">Framework</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center">
              <div className="text-3xl mb-2">🌐</div>
              <div className="font-medium">ASP.NET</div>
              <div className="text-xs text-zinc-500 mt-1">MVC</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center">
              <div className="text-3xl mb-2">🖥️</div>
              <div className="font-medium">Windows</div>
              <div className="text-xs text-zinc-500 mt-1">Server</div>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all hover:scale-105 text-center">
              <div className="text-3xl mb-2">🔀</div>
              <div className="font-medium">Git</div>
              <div className="text-xs text-zinc-500 mt-1">Version Control</div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 px-6 sm:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-16 text-center">Education</h2>
          
          <div className="space-y-8">
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Bachelor of Information Technology</h3>
                  <p className="text-zinc-400">APIC, Brisbane</p>
                </div>
                <span className="text-sm text-zinc-500 whitespace-nowrap">Feb 2025 – Present</span>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold mb-1">Diploma of Information Technology</h3>
                  <p className="text-zinc-400">ECA College, Brisbane</p>
                </div>
                <span className="text-sm text-zinc-500 whitespace-nowrap">Aug 2023 – Feb 2025</span>
              </div>
            </div>
            
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-semibold mb-1">High School Diploma in Information Technology</h3>
                  <p className="text-zinc-400">I.T. High School, Italy</p>
                  <p className="text-sm text-zinc-500 mt-2">Focus: Software Development, Network Infrastructure</p>
                </div>
                <span className="text-sm text-zinc-500 whitespace-nowrap">2013 – 2018</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 sm:px-8 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <p className="text-zinc-500 text-sm">© 2025 Kevin Fuschetto. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="https://github.com/kevinfusko" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors text-sm">
                GitHub
              </a>
              <a href="/monitoring" className="text-zinc-500 hover:text-white transition-colors text-sm">
                Monitoring
              </a>
              <a href="/scalability" className="text-zinc-500 hover:text-white transition-colors text-sm">
                Scalability
              </a>
              <a href="/operations" className="text-zinc-500 hover:text-white transition-colors text-sm">
                Operations
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chatbot Button */}
      {!chatbotOpen && (
        <button
          onClick={() => setChatbotOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-500 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50 hover:bg-blue-600"
          aria-label="Open AI Assistant"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {/* Floating Chatbot */}
      {chatbotOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <h3 className="font-semibold">AI Assistant</h3>
            <button
              onClick={() => {
                setChatbotOpen(false);
                setChatQuestion('');
                setChatResponse(null);
              }}
              className="text-zinc-400 hover:text-white transition-colors"
              aria-label="Close chatbot"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-4 h-96 overflow-y-auto">
            {!chatResponse ? (
              <div className="space-y-3">
                <p className="text-zinc-400 text-sm">Ask me anything about Kevin's experience, skills, or background!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <p className="text-sm leading-relaxed text-zinc-300 whitespace-pre-wrap">
                    {chatResponse.answer}
                  </p>
                  {chatResponse.sources.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs font-medium text-zinc-500 mb-2">Sources:</p>
                      <div className="flex flex-wrap gap-2">
                        {chatResponse.sources.map((source, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-white/5 border border-white/10 rounded text-zinc-400">
                            {source.title}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    setChatQuestion('');
                    setChatResponse(null);
                  }}
                  className="text-xs text-blue-500 hover:underline"
                >
                  Ask another question
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleChatSubmit} className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatQuestion}
                onChange={(e) => setChatQuestion(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm text-white placeholder-zinc-500"
                disabled={chatLoading}
              />
              <button
                type="submit"
                disabled={chatLoading || !chatQuestion.trim()}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                {chatLoading ? '...' : 'Send'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
