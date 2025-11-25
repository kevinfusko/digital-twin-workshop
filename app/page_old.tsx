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
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [chatQuestion, setChatQuestion] = useState('');
  const [chatResponse, setChatResponse] = useState<QueryResponse | null>(null);
  const [chatLoading, setChatLoading] = useState(false);

  const sampleQuestions = [
    'Tell me about your .NET development experience',
    'What IT support roles have you held?',
    'Describe your technical skills',
    'What are your career goals?',
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
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-[#0a0a0f]/80 backdrop-blur-md border-b border-[#1f2937] z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold text-[#d97706] glow-text">Kevin Fuschetto</div>
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-center">
            <a href="/monitoring" className="text-[#9ca3af] hover:text-[#d97706] transition-colors">Monitoring</a>
            <a href="/scalability" className="text-[#9ca3af] hover:text-[#d97706] transition-colors">Scalability</a>
            <a href="/operations" className="text-[#9ca3af] hover:text-[#d97706] transition-colors">Operations</a>
            <a href="/github" className="text-[#9ca3af] hover:text-[#d97706] transition-colors">GitHub</a>
            <a href="/advanced" className="text-[#9ca3af] hover:text-[#d97706] transition-colors">Advanced</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative mb-6 w-[150px] h-[150px]">
              <div className="absolute inset-0 bg-[#d97706] rounded-full blur-xl opacity-30"></div>
              <Image 
                src="/profile.jpg" 
                alt="Kevin Fuschetto" 
                width={150} 
                height={150}
                className="relative rounded-full border-4 border-[#d97706] glow object-cover w-full h-full"
                priority
              />
            </div>
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 bg-[#13131a] border border-[#1f2937] rounded-full text-sm text-[#d97706]">
                📍 Brisbane, Australia
              </span>
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#e5e7eb] mb-6 text-center">
            Software <span className="text-[#d97706] glow-text">Engineer</span>
          </h1>
          <p className="text-lg sm:text-xl text-[#9ca3af] leading-relaxed text-center max-w-3xl mx-auto">
            Software Engineer with 3+ years of .NET development experience and a strong background in IT support and infrastructure. 
            Skilled in building custom web applications, solving complex technical problems, and delivering solutions that improve 
            operational efficiency. Currently pursuing a Bachelor of Information Technology while working on expanding expertise 
            across software engineering and systems administration.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#1f2937]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e5e7eb] mb-12 text-center">
            <span className="text-[#d97706]">Work</span> Experience
          </h2>
          <div className="space-y-8">
            <div className="bg-[#13131a] border border-[#1f2937] rounded-lg p-6 hover:border-[#d97706] transition-all glow">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-[#d97706]">IT Manager</h3>
                  <p className="text-[#e5e7eb]">NEM S.r.l (Helios Technologies Group)</p>
                </div>
                <span className="text-sm text-[#9ca3af]">Mar 2021 – May 2022</span>
              </div>
              <ul className="text-[#9ca3af] space-y-2 mt-3">
                <li>• Managed network infrastructure and automated internal processes</li>
                <li>• Built custom .NET applications to support warehouse operations</li>
                <li>• Improved efficiency across workflows and ensured reliable daily operations</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-[#0a0a0f] border border-[#7c3aed] text-xs text-[#7c3aed] rounded-full">.NET Framework</span>
                <span className="px-3 py-1 bg-[#0a0a0f] border border-[#7c3aed] text-xs text-[#7c3aed] rounded-full">C#</span>
                <span className="px-3 py-1 bg-[#0a0a0f] border border-[#7c3aed] text-xs text-[#7c3aed] rounded-full">SQL Server</span>
                <span className="px-3 py-1 bg-[#0a0a0f] border border-[#7c3aed] text-xs text-[#7c3aed] rounded-full">ASP.NET</span>
              </div>
            </div>

            <div className="bg-[#13131a] border border-[#1f2937] rounded-lg p-6 hover:border-[#d97706] transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-[#d97706]">.NET Software Developer</h3>
                  <p className="text-[#e5e7eb]">Advantis S.r.l</p>
                </div>
                <span className="text-sm text-[#9ca3af]">Sep 2018 – Mar 2021</span>
              </div>
              <ul className="text-[#9ca3af] space-y-2 mt-3">
                <li>• Built full-stack .NET applications for healthcare and HR clients</li>
                <li>• Designed SQL databases, created APIs, and supported end users with training</li>
                <li>• Delivered reliable applications that improved client workflow efficiency</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-[#0a0a0f] border border-[#7c3aed] text-xs text-[#7c3aed] rounded-full">.NET Framework</span>
                <span className="px-3 py-1 bg-[#0a0a0f] border border-[#7c3aed] text-xs text-[#7c3aed] rounded-full">MVC</span>
                <span className="px-3 py-1 bg-[#0a0a0f] border border-[#7c3aed] text-xs text-[#7c3aed] rounded-full">C#</span>
                <span className="px-3 py-1 bg-[#0a0a0f] border border-[#7c3aed] text-xs text-[#7c3aed] rounded-full">SQL Server</span>
              </div>
            </div>

            <div className="bg-[#13131a] border border-[#1f2937] rounded-lg p-6 hover:border-[#d97706] transition-all">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
                <div>
                  <h3 className="text-xl font-bold text-[#d97706]">IT Field Technician</h3>
                  <p className="text-[#e5e7eb]">Azstar Technologies</p>
                </div>
                <span className="text-sm text-[#9ca3af]">Oct 2022 – Jul 2024</span>
              </div>
              <ul className="text-[#9ca3af] space-y-2 mt-3">
                <li>• Provided fast on-site technical support for retail POS and EFTPOS systems</li>
                <li>• Diagnosed issues, replaced components, and improved system stability</li>
                <li>• Consistently received positive customer feedback for service quality</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 bg-[#0a0a0f] border border-[#7c3aed] text-xs text-[#7c3aed] rounded-full">POS Systems</span>
                <span className="px-3 py-1 bg-[#0a0a0f] border border-[#7c3aed] text-xs text-[#7c3aed] rounded-full">Networking</span>
                <span className="px-3 py-1 bg-[#0a0a0f] border border-[#7c3aed] text-xs text-[#7c3aed] rounded-full">Hardware</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#1f2937]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e5e7eb] mb-12 text-center">
            <span className="text-[#d97706]">Technical</span> Skills
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#13131a] border border-[#1f2937] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#d97706] mb-6">Programming Languages</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#e5e7eb]">C#</span>
                    <span className="text-sm text-[#9ca3af]">3 years · Advanced</span>
                  </div>
                  <div className="w-full bg-[#1f2937] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#d97706] to-[#7c3aed] h-2 rounded-full glow" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#e5e7eb]">SQL</span>
                    <span className="text-sm text-[#9ca3af]">3 years · Advanced</span>
                  </div>
                  <div className="w-full bg-[#1f2937] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#d97706] to-[#7c3aed] h-2 rounded-full glow" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#e5e7eb]">HTML/CSS</span>
                    <span className="text-sm text-[#9ca3af]">5 years · Advanced</span>
                  </div>
                  <div className="w-full bg-[#1f2937] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#d97706] to-[#7c3aed] h-2 rounded-full glow" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#e5e7eb]">JavaScript</span>
                    <span className="text-sm text-[#9ca3af]">3 years · Intermediate</span>
                  </div>
                  <div className="w-full bg-[#1f2937] rounded-full h-2">
                    <div className="bg-gradient-to-r from-[#d97706] to-[#7c3aed] h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#13131a] border border-[#1f2937] rounded-lg p-6">
              <h3 className="text-lg font-bold text-[#d97706] mb-6">Technologies & Tools</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-2 bg-[#0a0a0f] border border-[#7c3aed] text-sm text-[#e5e7eb] rounded-lg hover:border-[#d97706] transition-colors">.NET Framework</span>
                <span className="px-3 py-2 bg-[#0a0a0f] border border-[#7c3aed] text-sm text-[#e5e7eb] rounded-lg hover:border-[#d97706] transition-colors">ASP.NET</span>
                <span className="px-3 py-2 bg-[#0a0a0f] border border-[#7c3aed] text-sm text-[#e5e7eb] rounded-lg hover:border-[#d97706] transition-colors">MVC</span>
                <span className="px-3 py-2 bg-[#0a0a0f] border border-[#7c3aed] text-sm text-[#e5e7eb] rounded-lg hover:border-[#d97706] transition-colors">SQL Server</span>
                <span className="px-3 py-2 bg-[#0a0a0f] border border-[#7c3aed] text-sm text-[#e5e7eb] rounded-lg hover:border-[#d97706] transition-colors">jQuery</span>
                <span className="px-3 py-2 bg-[#0a0a0f] border border-[#7c3aed] text-sm text-[#e5e7eb] rounded-lg hover:border-[#d97706] transition-colors">Windows Server</span>
                <span className="px-3 py-2 bg-[#0a0a0f] border border-[#7c3aed] text-sm text-[#e5e7eb] rounded-lg hover:border-[#d97706] transition-colors">Networking</span>
                <span className="px-3 py-2 bg-[#0a0a0f] border border-[#7c3aed] text-sm text-[#e5e7eb] rounded-lg hover:border-[#d97706] transition-colors">Git</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#1f2937]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#e5e7eb] mb-12 text-center">
            <span className="text-[#d97706]">Education</span>
          </h2>
          <div className="space-y-6">
            <div className="bg-[#13131a] border border-[#1f2937] rounded-lg p-6 border-l-4 border-l-[#d97706]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-xl font-bold text-[#d97706]">Bachelor of Information Technology</h3>
                  <p className="text-[#e5e7eb]">APIC, Brisbane</p>
                </div>
                <span className="text-sm text-[#9ca3af]">Feb 2025 – Present</span>
              </div>
            </div>
            <div className="bg-[#13131a] border border-[#1f2937] rounded-lg p-6 border-l-4 border-l-[#7c3aed]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-xl font-bold text-[#e5e7eb]">Diploma of Information Technology</h3>
                  <p className="text-[#9ca3af]">ECA College, Brisbane</p>
                </div>
                <span className="text-sm text-[#9ca3af]">Aug 2023 – Feb 2025</span>
              </div>
            </div>
            <div className="bg-[#13131a] border border-[#1f2937] rounded-lg p-6 border-l-4 border-l-[#7c3aed]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-xl font-bold text-[#e5e7eb]">High School Diploma in Information Technology</h3>
                  <p className="text-[#9ca3af]">I.T. High School, Italy</p>
                  <p className="text-sm text-[#9ca3af] mt-2">Focus: Software Development, Network Infrastructure</p>
                </div>
                <span className="text-sm text-[#9ca3af] whitespace-nowrap">2013 – 2018</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-16 px-4 sm:px-6 border-t border-[#1f2937]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#e5e7eb] mb-4">
              <span className="text-[#d97706]">AI</span> Assistant
            </h2>
            <p className="text-lg text-[#9ca3af]">Ask questions about my experience, skills, and background</p>
          </div>

          <div className="bg-[#13131a] border-2 border-[#d97706] rounded-lg p-6 sm:p-8 glow">
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-4 bg-[#0a0a0f] border border-[#1f2937] rounded-lg focus:outline-none focus:border-[#d97706] transition resize-none text-[#e5e7eb] placeholder-[#9ca3af]"
                rows={4}
                placeholder="Ask about my .NET experience, technical skills, or career goals..."
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {sampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setQuestion(q)}
                    className="text-xs sm:text-sm px-3 py-1.5 bg-[#0a0a0f] border border-[#7c3aed] text-[#e5e7eb] rounded-lg hover:border-[#d97706] hover:text-[#d97706] transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="w-full py-3 bg-gradient-to-r from-[#d97706] to-[#7c3aed] text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed glow"
              >
                {loading ? 'Processing...' : 'Ask Question'}
              </button>
            </form>

            {response && !loading && (
              <div className="mt-6 p-6 bg-[#0a0a0f] border border-[#1f2937] rounded-lg space-y-4">
                <div className="text-[#e5e7eb] leading-relaxed whitespace-pre-wrap">
                  {response.answer}
                </div>
                {response.sources.length > 0 && (
                  <div className="pt-4 border-t border-[#1f2937]">
                    <p className="text-sm font-semibold text-[#d97706] mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {response.sources.map((source, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-[#13131a] border border-[#7c3aed] rounded text-[#9ca3af]">
                          {source.title}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 border-t border-[#1f2937]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#9ca3af] text-sm">© 2025 Kevin Fuschetto · Software Engineer</p>
        </div>
      </footer>

      {/* Floating Chatbot */}
      {!chatbotOpen && (
        <button
          onClick={() => setChatbotOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-[#d97706] to-[#7c3aed] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform glow z-50"
          aria-label="Open AI Assistant"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}

      {chatbotOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] bg-[#13131a] border-2 border-[#d97706] rounded-lg shadow-2xl z-50 glow">
          <div className="flex items-center justify-between p-4 border-b border-[#1f2937]">
            <h3 className="font-bold text-[#d97706]">AI Assistant</h3>
            <button
              onClick={() => {
                setChatbotOpen(false);
                setChatQuestion('');
                setChatResponse(null);
              }}
              className="text-[#9ca3af] hover:text-[#d97706] transition-colors"
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
                <p className="text-[#9ca3af] text-sm">Ask me anything about Kevin's experience, skills, or background!</p>
                <div className="space-y-2">
                  {sampleQuestions.slice(0, 3).map((q, i) => (
                    <button
                      key={i}
                      onClick={() => setChatQuestion(q)}
                      className="w-full text-left text-xs p-2 bg-[#0a0a0f] border border-[#7c3aed] text-[#e5e7eb] rounded hover:border-[#d97706] transition"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-[#0a0a0f] border border-[#1f2937] rounded-lg p-3">
                  <p className="text-[#e5e7eb] text-sm leading-relaxed whitespace-pre-wrap">
                    {chatResponse.answer}
                  </p>
                  {chatResponse.sources.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-[#1f2937]">
                      <p className="text-xs font-semibold text-[#d97706] mb-2">Sources:</p>
                      <div className="flex flex-wrap gap-1">
                        {chatResponse.sources.map((source, i) => (
                          <span key={i} className="text-xs px-2 py-1 bg-[#13131a] border border-[#7c3aed] rounded text-[#9ca3af]">
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
                  className="text-xs text-[#d97706] hover:underline"
                >
                  Ask another question
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleChatSubmit} className="p-4 border-t border-[#1f2937]">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatQuestion}
                onChange={(e) => setChatQuestion(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 px-3 py-2 bg-[#0a0a0f] border border-[#1f2937] rounded-lg focus:outline-none focus:border-[#d97706] transition text-sm text-[#e5e7eb] placeholder-[#9ca3af]"
                disabled={chatLoading}
              />
              <button
                type="submit"
                disabled={chatLoading || !chatQuestion.trim()}
                className="px-4 py-2 bg-gradient-to-r from-[#d97706] to-[#7c3aed] text-white rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed text-sm"
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
