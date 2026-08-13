import os
import json
import math
import urllib.request
from http.server import BaseHTTPRequestHandler
from openai import OpenAI

# Preloaded Resume Data
RESUME_CONTEXT = """
Suyash Raj
New Delhi, Delhi
Phone: 8588087722 | Email: Suyashraj2000@gmail.com
LinkedIn: linkedin.com/in/razzsuyash | GitHub: github.com/razzsuyash

Education:
Netaji Subhash University Of Technology (NSUT) - B.Tech (Sept 2020 - July 2024), New Delhi, Delhi.

Technical Skills:
- Languages: Python, JavaScript, SQL, HTML5, CSS3
- Backend Development: FastAPI, Flask, Apache Kafka, REST APIs, SQLAlchemy, ORM, JWT, OAuth2, API Design, Microservices, ETL
- Databases: PostgreSQL, MySQL, OpenSearch, Database Design, Query Optimization
- Tools: Git, GitLab, OpenSearch, Postman, Power BI
- Libraries & Frameworks: Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn
- Concepts: Distributed Systems, System Design, OOPs, Data Structures & Algorithms

Experience:
1. Backend Development Engineer at Tata Consultancy Services (TCS) (Client: TotalEnergies, Clever Energy), Feb 2025 - Present (Pune, India)
   - Engineered scalable backend services using Python for a real-time IoT Energy Optimization Platform, processing 50K+ sensor records/day through a distributed 5-layer architecture.
   - Developed high-throughput Apache Kafka Producer-Consumer pipelines for real-time sensor data ingestion and built robust ETL pipelines, reducing latency by 35%.
   - Leveraged Pandas and NumPy for large-scale data preprocessing, feature engineering, and statistical analysis, improving data quality and reducing preprocessing time by 40%.
   - Designed and developed scalable REST APIs using FastAPI and Flask, enabling seamless communication between backend computation services and client applications.
   - Optimized backend performance through modular Python development, efficient algorithms, and database interactions, improving application throughput by 25%.
2. Software Development Engineer Intern at Courpedia, Aug 2024 - Dec 2024 (New Delhi, India)
   - Developed responsive web applications using HTML, CSS, and JavaScript, implementing interactive features including a QR Code Generator and a Random Password Generator.
   - Collaborated in an Agile environment to optimize frontend performance through JavaScript, DOM Manipulation, Debugging, UI Enhancements, and Code Reviews.

Technical Projects:
1. Movie Recommendation System (GitHub: https://github.com/Razzsuyash/Movie_Recommender_system)
   - Developed an end-to-end movie recommendation system using Python, Scikit-learn, Pandas, and NLP, analyzing 5,000+ movies and achieving 95% recommendation accuracy.
   - Implemented NLP-based feature extraction using CountVectorizer and cosine similarity.
   - Designed and implemented REST APIs using FastAPI, integrating recommendation models and deploying the solution on AWS.
2. Potato Disease Classification System (GitHub: https://github.com/Razzsuyash/potato-diseases-classification)
   - Developed a CNN-based computer vision model for potato leaf disease classification, achieving 93% accuracy on the test dataset.
   - Expanded the training dataset by 300% using data augmentation techniques.
"""

def split_text_into_chunks(text, chunk_size=500, chunk_overlap=100):
    chunks = []
    start = 0
    while start < len(text):
        end = start + chunk_size
        chunks.append(text[start:end])
        start += (chunk_size - chunk_overlap)
    return chunks

def cosine_similarity(a, b):
    dot = sum(x * y for x, y in zip(a, b))
    mag_a = math.sqrt(sum(x * x for x in a))
    mag_b = math.sqrt(sum(x * x for x in b))
    if mag_a == 0 or mag_b == 0:
        return 0
    return dot / (mag_a * mag_b)

# --- Free Google Gemini API Helpers ---
def get_gemini_embedding(text, gemini_key):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent?key={gemini_key}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "model": "models/text-embedding-004",
        "content": {"parts": [{"text": text}]}
    }
    
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method='POST')
    with urllib.request.urlopen(req) as response:
        res = json.loads(response.read().decode('utf-8'))
        return res['embedding']['values']

def get_gemini_completion(prompt, gemini_key):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
    headers = {"Content-Type": "application/json"}
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.4}
    }
    
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers=headers, method='POST')
    with urllib.request.urlopen(req) as response:
        res = json.loads(response.read().decode('utf-8'))
        return res['candidates'][0]['content']['parts'][0]['text']

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_POST(self):
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        
        try:
            body = json.loads(post_data.decode('utf-8'))
            query = body.get("query", "")
            custom_text = body.get("custom_text", "")

            # 1. Prioritize Google Gemini API Key (100% Free Tier!)
            gemini_key = os.environ.get("GEMINI_API_KEY")
            openai_key = os.environ.get("OPENAI_API_KEY")

            context_source = custom_text if custom_text.strip() else RESUME_CONTEXT
            chunks = split_text_into_chunks(context_source, 500, 100)

            if gemini_key:
                # Use Gemini Free RAG
                chunk_vectors = [get_gemini_embedding(c, gemini_key) for c in chunks]
                query_vector = get_gemini_embedding(query, gemini_key)
                
                scored_chunks = [(c, cosine_similarity(query_vector, v)) for c, v in zip(chunks, chunk_vectors)]
                scored_chunks.sort(key=lambda x: x[1], reverse=True)
                top_chunks = scored_chunks[:4]
                context_text = "\n\n".join([item[0] for item in top_chunks])

                prompt = f"Context: {context_text}\n\nQuestion: {query}\n\nAnswer the question concisely based only on the given context. If the context doesn't contain relevant information, say \"I don't have enough information to answer that question.\"\n\nBut, if the question is generic, then go ahead and answer the question, example what is an electric vehicle?"
                
                result_text = get_gemini_completion(prompt, gemini_key)
                self.wfile.write(json.dumps({"success": True, "result": result_text}).encode('utf-8'))
                return

            elif openai_key:
                # Use OpenAI RAG
                client = OpenAI(api_key=openai_key)
                
                embed_response = client.embeddings.create(
                    input=chunks,
                    model="text-embedding-3-small"
                )
                chunk_vectors = [item.embedding for item in embed_response.data]

                query_embed_response = client.embeddings.create(
                    input=query,
                    model="text-embedding-3-small"
                )
                query_vector = query_embed_response.data[0].embedding

                scored_chunks = [(c, cosine_similarity(query_vector, v)) for c, v in zip(chunks, chunk_vectors)]
                scored_chunks.sort(key=lambda x: x[1], reverse=True)
                top_chunks = scored_chunks[:4]
                context_text = "\n\n".join([item[0] for item in top_chunks])

                prompt = f"Context: {context_text}\n\nQuestion: {query}\n\nAnswer the question concisely based only on the given context. If the context doesn't contain relevant information, say \"I don't have enough information to answer that question.\"\n\nBut, if the question is generic, then go ahead and answer the question, example what is an electric vehicle?"

                completion = client.chat.completions.create(
                    model="gpt-4o-mini",
                    messages=[{"role": "user", "content": prompt}],
                    temperature=0.4
                )
                result_text = completion.choices[0].message.content
                self.wfile.write(json.dumps({"success": True, "result": result_text}).encode('utf-8'))
                return

            else:
                # Neither key is present
                self.wfile.write(json.dumps({
                    "success": False, 
                    "error": "No LLM API keys found. Please set GEMINI_API_KEY (Free) or OPENAI_API_KEY in environment variables."
                }).encode('utf-8'))

        except Exception as e:
            self.wfile.write(json.dumps({"success": False, "error": str(e)}).encode('utf-8'))
