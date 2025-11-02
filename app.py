"""
Digital Twin RAG Web Application
Flask web interface for recruiter-ready interactions
"""

import os
import json
from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
from upstash_vector import Index
from groq import Groq

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)

# Constants
JSON_FILE = "digitaltwin.json"
GROQ_API_KEY = os.getenv('GROQ_API_KEY')
DEFAULT_MODEL = "llama-3.1-8b-instant"

# Initialize clients
groq_client = None
vector_index = None

def setup_groq_client():
    """Setup Groq client"""
    if not GROQ_API_KEY:
        return None
    try:
        return Groq(api_key=GROQ_API_KEY)
    except Exception as e:
        print(f"Error initializing Groq client: {str(e)}")
        return None

def setup_vector_database():
    """Setup Upstash Vector database"""
    try:
        index = Index.from_env()
        
        # Check if we need to load data
        try:
            info = index.info()
            current_count = getattr(info, 'vector_count', 0)
        except:
            current_count = 0
        
        if current_count == 0:
            # Load and upload profile data
            with open(JSON_FILE, "r", encoding="utf-8") as f:
                profile_data = json.load(f)
            
            vectors = []
            content_chunks = profile_data.get('content_chunks', [])
            
            for chunk in content_chunks:
                enriched_text = f"{chunk['title']}: {chunk['content']}"
                vectors.append((
                    chunk['id'],
                    enriched_text,
                    {
                        "title": chunk['title'],
                        "type": chunk['type'],
                        "content": chunk['content'],
                        "category": chunk.get('metadata', {}).get('category', ''),
                        "tags": chunk.get('metadata', {}).get('tags', [])
                    }
                ))
            
            index.upsert(vectors=vectors)
        
        return index
    except Exception as e:
        print(f"Error setting up database: {str(e)}")
        return None

def query_rag(question):
    """Perform RAG query"""
    try:
        # Query vector database
        results = vector_index.query(
            data=question,
            top_k=3,
            include_metadata=True
        )
        
        if not results or len(results) == 0:
            return {
                "answer": "I don't have specific information about that topic.",
                "sources": [],
                "relevance_scores": []
            }
        
        # Extract relevant content
        top_docs = []
        sources = []
        scores = []
        
        for result in results:
            metadata = result.metadata or {}
            title = metadata.get('title', 'Information')
            content = metadata.get('content', '')
            score = result.score
            
            scores.append(score)
            sources.append({"title": title, "score": f"{score:.3f}"})
            if content:
                top_docs.append(f"{title}: {content}")
        
        # Generate response with Groq
        context = "\n\n".join(top_docs)
        prompt = f"""Based on the following information about yourself, answer the question.
Speak in first person as if you are describing your own background.

Your Information:
{context}

Question: {question}

Provide a helpful, professional response:"""
        
        completion = groq_client.chat.completions.create(
            model=DEFAULT_MODEL,
            messages=[
                {
                    "role": "system",
                    "content": "You are an AI digital twin. Answer questions as if you are the person, speaking in first person about your background, skills, and experience."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.7,
            max_tokens=500
        )
        
        answer = completion.choices[0].message.content.strip()
        
        return {
            "answer": answer,
            "sources": sources,
            "relevance_scores": scores
        }
        
    except Exception as e:
        return {
            "answer": f"Error generating response: {str(e)}",
            "sources": [],
            "relevance_scores": []
        }

# Routes
@app.route('/')
def home():
    """Main query interface"""
    return render_template('index.html')

@app.route('/about')
def about():
    """RAG system architecture documentation"""
    return render_template('about.html')

@app.route('/github')
def github():
    """GitHub repository link"""
    return render_template('github.html')

@app.route('/testing')
def testing():
    """Sample queries and quality assessments"""
    return render_template('testing.html')

@app.route('/profile-data')
def profile_data():
    """Professional profile data visualization"""
    with open(JSON_FILE, 'r') as f:
        data = json.load(f)
    return render_template('profile_data.html', profile=data)

@app.route('/api/query', methods=['POST'])
def api_query():
    """API endpoint for RAG queries"""
    data = request.get_json()
    question = data.get('question', '')
    
    if not question:
        return jsonify({"error": "No question provided"}), 400
    
    result = query_rag(question)
    return jsonify(result)

@app.route('/api/health')
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "groq_connected": groq_client is not None,
        "vector_db_connected": vector_index is not None
    })

if __name__ == '__main__':
    print("🚀 Starting Digital Twin RAG Web Application...")
    print("=" * 50)
    
    # Initialize clients
    groq_client = setup_groq_client()
    if not groq_client:
        print("❌ Failed to initialize Groq client")
        exit(1)
    print("✅ Groq client initialized")
    
    vector_index = setup_vector_database()
    if not vector_index:
        print("❌ Failed to initialize vector database")
        exit(1)
    print("✅ Vector database initialized")
    
    print("\n🌐 Application running at: http://localhost:5000")
    print("📖 View documentation at: http://localhost:5000/about")
    print("🧪 Test queries at: http://localhost:5000/testing")
    print("\n" + "=" * 50)
    
    app.run(debug=True, host='0.0.0.0', port=5000)
