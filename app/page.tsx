'use client';

import { useState } from 'react';

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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-900">Kevin Fuschetto</div>
          <div className="flex gap-6">
            <a href="/monitoring" className="text-gray-600 hover:text-gray-900 transition">Monitoring</a>
            <a href="/scalability" className="text-gray-600 hover:text-gray-900 transition">Scalability</a>
            <a href="/operations" className="text-gray-600 hover:text-gray-900 transition">Operations</a>
            <a href="/github" className="text-gray-600 hover:text-gray-900 transition">GitHub</a>
            <a href="/advanced" className="text-gray-600 hover:text-gray-900 transition">Advanced</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-700">
              Brisbane, Australia
            </span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Software Engineer</h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Software Engineer with 3+ years of .NET development experience and a strong background in IT support and infrastructure. 
            Skilled in building custom web applications, solving complex technical problems, and delivering solutions that improve 
            operational efficiency. Currently pursuing a Bachelor of Information Technology while working on expanding expertise 
            across software engineering and systems administration.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 px-6 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Experience</h2>
          <div className="space-y-8">
            <div className="border-l-2 border-gray-900 pl-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">IT Manager</h3>
                  <p className="text-gray-700">NEM S.r.l (Helios Technologies Group)</p>
                </div>
                <span className="text-sm text-gray-600">Mar 2021 – May 2022</span>
              </div>
              <ul className="text-gray-600 space-y-2 mt-3">
                <li>• Managed network infrastructure and automated internal processes</li>
                <li>• Built custom .NET applications to support warehouse operations</li>
                <li>• Improved efficiency across workflows and ensured reliable daily operations</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">.NET Framework</span>
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">C#</span>
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">SQL Server</span>
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">ASP.NET</span>
              </div>
            </div>

            <div className="border-l-2 border-gray-400 pl-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">.NET Software Developer</h3>
                  <p className="text-gray-700">Advantis S.r.l</p>
                </div>
                <span className="text-sm text-gray-600">Sep 2018 – Mar 2021</span>
              </div>
              <ul className="text-gray-600 space-y-2 mt-3">
                <li>• Built full-stack .NET applications for healthcare and HR clients</li>
                <li>• Designed SQL databases, created APIs, and supported end users with training</li>
                <li>• Delivered reliable applications that improved client workflow efficiency</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">.NET Framework</span>
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">MVC</span>
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">C#</span>
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">SQL Server</span>
              </div>
            </div>

            <div className="border-l-2 border-gray-400 pl-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">IT Field Technician</h3>
                  <p className="text-gray-700">Azstar Technologies</p>
                </div>
                <span className="text-sm text-gray-600">Oct 2022 – Jul 2024</span>
              </div>
              <ul className="text-gray-600 space-y-2 mt-3">
                <li>• Provided fast on-site technical support for retail POS and EFTPOS systems</li>
                <li>• Diagnosed issues, replaced components, and improved system stability</li>
                <li>• Consistently received positive customer feedback for service quality</li>
              </ul>
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">POS Systems</span>
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">Networking</span>
                <span className="px-2 py-1 bg-gray-100 text-xs text-gray-700 rounded">Hardware</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Technical Skills</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Programming Languages</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">C#</span>
                    <span className="text-sm text-gray-600">3 years · Advanced</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-900 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">SQL</span>
                    <span className="text-sm text-gray-600">3 years · Advanced</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-900 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">HTML/CSS</span>
                    <span className="text-sm text-gray-600">5 years · Advanced</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-900 h-2 rounded-full" style={{width: '90%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700">JavaScript</span>
                    <span className="text-sm text-gray-600">3 years · Intermediate</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-900 h-2 rounded-full" style={{width: '70%'}}></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Technologies & Tools</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-2 bg-white border border-gray-300 text-sm text-gray-700 rounded">.NET Framework</span>
                <span className="px-3 py-2 bg-white border border-gray-300 text-sm text-gray-700 rounded">ASP.NET</span>
                <span className="px-3 py-2 bg-white border border-gray-300 text-sm text-gray-700 rounded">MVC</span>
                <span className="px-3 py-2 bg-white border border-gray-300 text-sm text-gray-700 rounded">SQL Server</span>
                <span className="px-3 py-2 bg-white border border-gray-300 text-sm text-gray-700 rounded">jQuery</span>
                <span className="px-3 py-2 bg-white border border-gray-300 text-sm text-gray-700 rounded">Windows Server</span>
                <span className="px-3 py-2 bg-white border border-gray-300 text-sm text-gray-700 rounded">Networking</span>
                <span className="px-3 py-2 bg-white border border-gray-300 text-sm text-gray-700 rounded">Git</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-16 px-6 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Education</h2>
          <div className="space-y-6">
            <div className="flex justify-between items-start border-l-2 border-gray-900 pl-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Bachelor of Information Technology</h3>
                <p className="text-gray-700">APIC, Brisbane</p>
              </div>
              <span className="text-sm text-gray-600">Feb 2025 – Present</span>
            </div>
            <div className="flex justify-between items-start border-l-2 border-gray-400 pl-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Diploma of Information Technology</h3>
                <p className="text-gray-700">ECA College, Brisbane</p>
              </div>
              <span className="text-sm text-gray-600">Aug 2023 – Feb 2025</span>
            </div>
            <div className="flex justify-between items-start border-l-2 border-gray-400 pl-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">High School Diploma in Information Technology</h3>
                <p className="text-gray-700">I.T. High School, Italy</p>
                <p className="text-sm text-gray-600 mt-1">Focus: Software Development, Network Infrastructure</p>
              </div>
              <span className="text-sm text-gray-600">2013 – 2018</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <section className="py-16 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Assistant</h2>
            <p className="text-lg text-gray-600">Ask questions about my experience, skills, and background</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-900 transition resize-none"
                rows={4}
                placeholder="Ask about my .NET experience, technical skills, or career goals..."
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {sampleQuestions.map((q, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setQuestion(q)}
                    className="text-sm px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : 'Ask Question'}
              </button>
            </form>

            {response && !loading && (
              <div className="mt-6 p-6 bg-gray-50 border border-gray-200 rounded-lg space-y-4">
                <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {response.answer}
                </div>
                {response.sources.length > 0 && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Sources:</p>
                    <div className="flex flex-wrap gap-2">
                      {response.sources.map((source, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-white border border-gray-300 rounded text-gray-600">
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
      <footer className="py-8 px-6 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-sm">© 2025 Kevin Fuschetto · Software Engineer</p>
        </div>
      </footer>
    </div>
  );
}
