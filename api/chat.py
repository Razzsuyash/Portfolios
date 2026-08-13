import os
import json
import math
import requests
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

def query_offline_resume(query):
    q = query.lower().strip()

    if any(k in q for k in ['tcs', 'totalenergies', 'clever energy', 'experience', 'work', 'job', 'current role', 'kafka', 'iot']):
        return "### 💼 Experience: Backend Engineer @ TCS (Client: TotalEnergies)\n\n" \
               "• **IoT Energy Optimization:** Python backend services processing **50K+ sensor records/day**.\n" \
               "• **Kafka Pipelines:** Real-time sensor stream ingestion (processing latency reduced by **35%**).\n" \
               "• **FastAPI & Flask REST APIs:** Developed high-throughput microservices.\n" \
               "• **Data Science:** Pandas & NumPy feature extraction and preprocessing (40% time savings)."

    if any(k in q for k in ['skill', 'stack', 'tech', 'python', 'fastapi', 'backend', 'database', 'languages']):
        return "### ⚡ Technical Skills\n\n" \
               "• **Languages:** Python, JavaScript, SQL, HTML5, CSS3\n" \
               "• **Backend & APIs:** FastAPI, Flask, Apache Kafka, REST APIs, Microservices, ETL, SQLAlchemy ORM\n" \
               "• **Databases:** PostgreSQL, MySQL, OpenSearch\n" \
               "• **Libraries:** Pandas, NumPy, Scikit-learn, TensorFlow, Keras"

    if any(k in q for k in ['project', 'movie', 'potato', 'ai', 'ml', 'recommend', 'optistack']):
        return "### 🚀 Key Projects\n\n" \
               "1. **Movie Recommender System:** FastAPI & NLP content recommendation engine (95% accuracy).\n" \
               "2. **Potato Disease CNN Classifier:** Deep learning TensorFlow model (93% accuracy).\n" \
               "3. **OptiStack AI:** Cloud system optimization dashboard."

    if any(k in q for k in ['courpedia', 'intern', 'internship']):
        return "### 🎓 SDE Intern @ Courpedia\n\n" \
               "• Developed responsive web applications with HTML5, CSS3, and JavaScript.\n" \
               "• Built interactive tools like QR Code Generator and Random Password Generator.\n" \
               "• Optimized DOM loading and rendering performance."

    if any(k in q for k in ['education', 'college', 'university', 'nsut', 'degree', 'btech']):
        return "### 🏛️ Education Background\n\n" \
               "• **Degree:** B.Tech in Instrumentation & Control Engineering\n" \
               "• **Institution:** Netaji Subhash University Of Technology (NSUT), New Delhi\n" \
               "• **Duration:** Sept 2020 - July 2024"

    if any(k in q for k in ['contact', 'email', 'phone', 'reach', 'hire', 'location', 'resume']):
        return "### 📬 Contact Details\n\n" \
               "• **Email:** [Suyashraj2000@gmail.com](mailto:Suyashraj2000@gmail.com)\n" \
               "• **Phone:** 8588087722\n" \
               "• **Location:** New Delhi / Pune (Open to relocation)\n" \
               "• **LinkedIn:** [linkedin.com/in/razzsuyash](https://linkedin.com/in/razzsuyash)\n" \
               "• **GitHub:** [github.com/razzsuyash](https://github.com/razzsuyash)"

    return "### 👋 Hello! I'm Suyash's AI Assistant.\n\n" \
           "I can answer questions about Suyash's experience at TCS, Kafka & IoT streams, Python backend APIs, technical skills, and college projects. Try asking one of the quick suggestions chips below!"

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

# --- Google Gemini API Calls ---
def get_gemini_embedding(text, gemini_key):
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key={gemini_key}"
    payload = {
        "model": "models/gemini-embedding-001",
        "content": {"parts": [{"text": text}]}
    }
    response = requests.post(url, json=payload, headers={"Content-Type": "application/json"})
    response.raise_for_status()
    res = response.json()
    return res['embedding']['values']

def get_gemini_completion(prompt, gemini_key):
    # Set to gemini-1.5-pro for advanced reasoning capability
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key={gemini_key}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"temperature": 0.4}
    }
    response = requests.post(url, json=payload, headers={"Content-Type": "application/json"})
    response.raise_for_status()
    res = response.json()
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
        
        # Parse payload
        body = json.loads(post_data.decode('utf-8'))
        query = body.get("query", "")
        custom_text = body.get("custom_text", "")

        try:
            # Support variants of environment variables
            gemini_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GEMINI_KEY")
            openai_key = os.environ.get("OPENAI_API_KEY") or os.environ.get("OPENAI_KEY")

            context_source = custom_text if custom_text.strip() else RESUME_CONTEXT
            chunks = split_text_into_chunks(context_source, 500, 100)

            # Prioritize Gemini API Key
            if gemini_key:
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
                # Fallback to backend offline keyword search
                result_text = query_offline_resume(query)
                self.wfile.write(json.dumps({"success": True, "result": result_text}).encode('utf-8'))

        except Exception as e:
            # If an API key is present but fails, return the actual error so we can debug it
            if gemini_key or openai_key:
                self.wfile.write(json.dumps({"success": False, "error": f"LLM API Error: {str(e)}"}).encode('utf-8'))
            else:
                # Silent fallback only if no keys are configured
                result_text = query_offline_resume(query)
                self.wfile.write(json.dumps({"success": True, "result": result_text}).encode('utf-8'))
