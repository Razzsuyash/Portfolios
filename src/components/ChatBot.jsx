import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Download, RefreshCw, Settings, FileText, Globe, Key, AlertCircle, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../utils/resumeData';
import { downloadResume } from '../utils/downloadResume';
import './ChatBot.css';

// --- Client-Side RAG Utilities ---

// 1. Text Splitter (Mimicking CharacterTextSplitter)
const splitTextIntoChunks = (text, chunkSize = 500, chunkOverlap = 100) => {
  if (!text) return [];
  const chunks = [];
  let startIndex = 0;

  while (startIndex < text.length) {
    let endIndex = startIndex + chunkSize;
    if (endIndex > text.length) {
      endIndex = text.length;
    }
    chunks.push(text.slice(startIndex, endIndex));
    startIndex += (chunkSize - chunkOverlap);
  }
  return chunks;
};

// 2. Vector math utilities
const dotProduct = (a, b) => a.reduce((sum, val, i) => sum + val * b[i], 0);
const magnitude = (arr) => Math.sqrt(arr.reduce((sum, val) => sum + val * val, 0));
const cosineSimilarity = (a, b) => {
  const magA = magnitude(a);
  const magB = magnitude(b);
  if (magA === 0 || magB === 0) return 0;
  return dotProduct(a, b) / (magA * magB);
};

// 3. Fallback Offline Search (Keyword Retrieval)
const queryOfflineKnowledgeBase = (query) => {
  const q = query.toLowerCase().trim();

  if (q.includes('tcs') || q.includes('totalenergies') || q.includes('clever energy') || q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('current role') || q.includes('kafka') || q.includes('iot')) {
    const tcs = resumeData.experience[0];
    return `### 💼 Current Role: ${tcs.role} @ ${tcs.company}\n\n` +
      `**Client:** ${tcs.client} | **Duration:** ${tcs.period} (${tcs.location})\n\n` +
      `**Achievements:**\n` +
      `• **IoT Energy Optimization:** Scalable Python backend services processing **50K+ sensor records/day**.\n` +
      `• **Kafka Pipelines:** High-throughput producer-consumer streams reducing ingestion latency by **35%**.\n` +
      `• **REST APIs:** FastAPI & Flask services improving system throughput by **25%**.\n` +
      `• **Data Science:** Pandas & NumPy for feature engineering, reducing preprocessing time by **40%**.`;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('python') || q.includes('fastapi') || q.includes('backend') || q.includes('database') || q.includes('languages')) {
    return `### ⚡ Technical Skills\n\n` +
      `• **Languages:** ${resumeData.skills.languages.join(', ')}\n` +
      `• **Backend & APIs:** ${resumeData.skills.backend.join(', ')}\n` +
      `• **Databases:** ${resumeData.skills.databases.join(', ')}\n` +
      `• **Libraries & ML:** ${resumeData.skills.libraries.join(', ')}\n` +
      `• **Tools:** ${resumeData.skills.tools.join(', ')}\n` +
      `• **Concepts:** ${resumeData.skills.concepts.join(', ')}`;
  }

  if (q.includes('project') || q.includes('movie') || q.includes('potato') || q.includes('ai') || q.includes('ml') || q.includes('recommend') || q.includes('optistack')) {
    return `### 🚀 Key Technical Projects\n\n` +
      `1. **Movie Recommendation System:** FastAPI & Streamlit NLP content recommender with 95% accuracy.\n` +
      `2. **Potato Disease CNN Classifier:** Deep learning TensorFlow classification model with 93% accuracy.\n` +
      `3. **OptiStack AI:** Live infrastructure & cloud configuration optimizer.\n` +
      `4. **MiddayMeal Portal:** Live student nutrition distribution dashboard.`;
  }

  if (q.includes('courpedia') || q.includes('intern') || q.includes('internship')) {
    const cp = resumeData.experience[1];
    return `### 🎓 Software Engineer Intern @ Courpedia\n\n` +
      `**Duration:** ${cp.period} | **Location:** ${cp.location}\n\n` +
      `• Developed responsive web applications using JavaScript, HTML5, and CSS3.\n` +
      `• Implemented interactive utility tools including a **QR Code Generator** and **Random Password Generator**.\n` +
      `• Optimized frontend performance with DOM manipulation and code reviews.`;
  }

  if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('nsut') || q.includes('degree') || q.includes('btech')) {
    return `### 🏛️ Education Background\n\n` +
      `**Institution:** ${resumeData.education.institution}\n` +
      `**Degree:** ${resumeData.education.degree}\n` +
      `**Duration:** ${resumeData.education.duration}\n` +
      `**Location:** ${resumeData.education.location}`;
  }

  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire') || q.includes('location') || q.includes('resume')) {
    return `### 📬 Contact Details\n\n` +
      `• **Email:** [${resumeData.email}](mailto:${resumeData.email})\n` +
      `• **Phone:** ${resumeData.phone}\n` +
      `• **Location:** ${resumeData.location}\n` +
      `• **LinkedIn:** [linkedin.com/in/razzsuyash](${resumeData.linkedin})\n` +
      `• **GitHub:** [github.com/razzsuyash](${resumeData.github})`;
  }

  return `### 👋 Hello! I'm Suyash's AI Assistant.\n\n` +
    `I can answer questions about Suyash's background:\n` +
    `• **Backend & IoT:** Python, FastAPI, Apache Kafka, 50K+ records/day at TCS.\n` +
    `• **Tech Stack:** PostgreSQL, Microservices, SQLAlchemy, Scikit-learn, React.\n` +
    `• **Projects:** Movie Recommender, Potato Disease CNN, OptiStack AI.\n\n` +
    `To activate the **live RAG pipeline** to upload your own files or scrape URLs, click the **Settings Gear (⚙️)** in the top right and enter your OpenAI API key!`;
};

const defaultSuggestions = [
  "What is Suyash's experience with Kafka & IoT?",
  "Show me his top technical skills",
  "Tell me about his ML & AI projects",
  "How can I contact or hire Suyash?"
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('OPENAI_API_KEY') || '');
  const [sourceType, setSourceType] = useState('resume'); // 'resume', 'upload', 'url'
  const [inputUrl, setInputUrl] = useState('');
  const [pastedText, setPastedText] = useState('');
  const [vectorstore, setVectorstore] = useState([]); // Array of { text, embedding }
  const [ragStatus, setRagStatus] = useState('');
  
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! 👋 I'm **Suyash's AI Assistant**. Ask me anything about his backend experience at TCS, Kafka & IoT pipelines, projects, or contact details!\n\n*Tip: Click the Settings Gear (⚙️) to enter an OpenAI API key to upload your own documents or scrape custom URLs for live RAG question answering!*",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Load preloaded resume context into vectors when API key is provided
  useEffect(() => {
    if (apiKey && sourceType === 'resume' && vectorstore.length === 0) {
      indexResumeContext();
    }
  }, [apiKey, sourceType]);

  const indexResumeContext = async () => {
    if (!apiKey) return;
    setRagStatus('Indexing resume...');
    try {
      const serializedResume = JSON.stringify(resumeData);
      const chunks = splitTextIntoChunks(serializedResume, 500, 100);
      const embeddedChunks = await generateEmbeddingsForChunks(chunks);
      setVectorstore(embeddedChunks);
      setRagStatus('Resume indexed successfully!');
    } catch (err) {
      console.error(err);
      setRagStatus('Error indexing resume.');
    }
  };

  const saveApiKey = (key) => {
    setApiKey(key);
    localStorage.setItem('OPENAI_API_KEY', key);
    if (key) {
      setRagStatus('API Key saved.');
    } else {
      setRagStatus('API Key removed.');
      setVectorstore([]);
    }
  };

  // Scrape website using standard clean extractor
  const handleUrlProcess = async () => {
    if (!inputUrl) return;
    setRagStatus('Fetching URL content...');
    try {
      // Use proxy or direct fetch depending on target site CORS support
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(inputUrl)}`);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      
      // Clean script/styles
      const scripts = doc.querySelectorAll('script, style');
      scripts.forEach(s => s.remove());

      const text = doc.body.innerText || doc.body.textContent || '';
      if (!text.trim()) {
        setRagStatus('No readable text found at URL.');
        return;
      }

      setRagStatus('Splitting text and embedding...');
      const chunks = splitTextIntoChunks(text, 500, 100);
      const embeddedChunks = await generateEmbeddingsForChunks(chunks);
      setVectorstore(embeddedChunks);
      setRagStatus(`URL processed! ${embeddedChunks.length} chunks indexed.`);
    } catch (err) {
      console.error(err);
      setRagStatus('Error reading URL. Site might block scraping.');
    }
  };

  // Read uploaded text document
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setRagStatus('Reading uploaded file...');
    const reader = new FileReader();
    reader.onload = async (event) => {
      const text = event.target.result;
      try {
        setRagStatus('Chunking and generating embeddings...');
        const chunks = splitTextIntoChunks(text, 500, 100);
        const embeddedChunks = await generateEmbeddingsForChunks(chunks);
        setVectorstore(embeddedChunks);
        setRagStatus(`File indexed! ${embeddedChunks.length} chunks ready.`);
      } catch (err) {
        console.error(err);
        setRagStatus('Error generating embeddings for file.');
      }
    };
    reader.readAsText(file);
  };

  // Generate OpenAI Embeddings for text chunks
  const generateEmbeddingsForChunks = async (chunks) => {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        input: chunks,
        model: 'text-embedding-ada-002'
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || 'Embedding generation failed');
    }

    const resData = await response.json();
    return chunks.map((chunk, idx) => ({
      text: chunk,
      embedding: resData.data[idx].embedding
    }));
  };

  // Generate single embedding query vector
  const generateQueryEmbedding = async (queryText) => {
    const response = await fetch('https://api.openai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        input: queryText,
        model: 'text-embedding-ada-002'
      })
    });

    if (!response.ok) throw new Error('Query embedding failed');
    const resData = await response.json();
    return resData.data[0].embedding;
  };

  // Core LLM Retrieval QA function
  const runLiveRAGPipeline = async (query) => {
    if (vectorstore.length === 0) {
      return "I don't have any document index loaded. Please configure the source in settings.";
    }

    try {
      // 1. Generate Query Vector
      const queryVector = await generateQueryEmbedding(query);

      // 2. Similarity Search (Top 4 most relevant chunks)
      const scoredChunks = vectorstore.map(chunk => ({
        ...chunk,
        score: cosineSimilarity(queryVector, chunk.embedding)
      }));

      // Sort by similarity descending
      scoredChunks.sort((a, b) => b.score - a.score);
      const topChunks = scoredChunks.slice(0, 4);

      // 3. Assemble Prompt Template
      const contextText = topChunks.map(c => c.text).join('\n\n');
      
      const systemPrompt = `Context: ${contextText}\n\nQuestion: ${query}\n\nAnswer the question concisely based only on the given context. If the context doesn't contain relevant information, say "I don't have enough information to answer that question."\n\nBut, if the question is generic, then go ahead and answer the question, example what is an electric vehicle?`;

      // 4. Request completion
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'user', content: systemPrompt }
          ],
          temperature: 0.4
        })
      });

      if (!response.ok) throw new Error('Inference request failed');
      const resData = await response.json();
      return resData.choices[0].message.content;

    } catch (err) {
      console.error(err);
      return `❌ RAG Pipeline Error: ${err.message}. Please check your API key or network connection.`;
    }
  };

  const handleSendMessage = async (textToSend = null) => {
    const query = textToSend || inputValue;
    if (!query.trim()) return;

    const userMessage = {
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    if (apiKey && vectorstore.length > 0) {
      // Run full Vector RAG Pipeline
      const ragResponse = await runLiveRAGPipeline(query);
      const botMessage = {
        sender: 'bot',
        text: ragResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    } else {
      // Fallback to offline keyword engine
      setTimeout(() => {
        const botResponseText = queryOfflineKnowledgeBase(query);
        const botMessage = {
          sender: 'bot',
          text: botResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      }, 450);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          className="chatbot-launcher-btn glass"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
        >
          <div className="launcher-pulse"></div>
          <Bot size={26} className="launcher-icon" />
          <span className="launcher-label">Ask AI about Suyash</span>
          <Sparkles size={16} className="sparkle-icon" />
        </button>
      )}

      {/* Expanded Chatbot Modal */}
      {isOpen && (
        <div className="chatbot-modal glass animate-fade-in">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="bot-avatar glass">
                <Bot size={20} className="text-accent" />
                <span className="online-status-indicator"></span>
              </div>
              <div>
                <h4>Suyash AI Assistant</h4>
                <p>{apiKey && vectorstore.length > 0 ? 'Live RAG Model Active' : 'RAG Knowledge Base'}</p>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button 
                onClick={() => setShowConfig(!showConfig)} 
                className={`header-action-btn ${showConfig ? 'active-config' : ''}`} 
                title="RAG Configuration Settings"
              >
                <Settings size={17} />
              </button>
              <button 
                onClick={downloadResume} 
                className="header-action-btn" 
                title="Download Resume"
              >
                <Download size={17} />
              </button>
              <button 
                onClick={() => setMessages([
                  {
                    sender: 'bot',
                    text: "Conversation reset! How can I assist you with Suyash's background?",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  }
                ])} 
                className="header-action-btn" 
                title="Clear Chat"
              >
                <RefreshCw size={15} />
              </button>
              <button 
                onClick={() => { setIsOpen(false); setShowConfig(false); }} 
                className="header-close-btn"
                title="Close Chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* RAG Settings Configuration Panel */}
          {showConfig && (
            <div className="rag-config-panel glass animate-fade-in">
              <div className="config-header">
                <h5>RAG Configuration</h5>
                <button className="config-close" onClick={() => setShowConfig(false)}><X size={16} /></button>
              </div>

              <div className="config-body">
                {/* 1. API Key Input */}
                <div className="config-section">
                  <label className="config-label"><Key size={13} /> OpenAI API Key</label>
                  <input
                    type="password"
                    placeholder="sk-proj-..."
                    value={apiKey}
                    onChange={e => saveApiKey(e.target.value)}
                    className="config-input"
                  />
                  <p className="config-help">Your API Key is saved locally in your browser cache.</p>
                </div>

                {/* 2. Source Selector */}
                <div className="config-section">
                  <label className="config-label">Context Source</label>
                  <select 
                    value={sourceType} 
                    onChange={e => setSourceType(e.target.value)}
                    className="config-select"
                    disabled={!apiKey}
                  >
                    <option value="resume">Preloaded Resume Document (JSON)</option>
                    <option value="upload">Upload Custom Document (.txt, .md)</option>
                    <option value="url">Scrape Website URL</option>
                  </select>
                </div>

                {/* 3. Dynamic Inputs */}
                {apiKey && sourceType === 'url' && (
                  <div className="config-section config-input-group">
                    <label className="config-label"><Globe size={13} /> Scrape Website URL</label>
                    <div className="flex-input-row">
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={inputUrl}
                        onChange={e => setInputUrl(e.target.value)}
                        className="config-input"
                      />
                      <button type="button" onClick={handleUrlProcess} className="config-btn">Index</button>
                    </div>
                  </div>
                )}

                {apiKey && sourceType === 'upload' && (
                  <div className="config-section">
                    <label className="config-label"><FileText size={13} /> Upload Document</label>
                    <input
                      type="file"
                      accept=".txt,.md,.json,.js,.jsx,.py"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                      className="config-file-input"
                    />
                    <button 
                      type="button" 
                      onClick={() => fileInputRef.current.click()} 
                      className="button-primary config-upload-trigger"
                    >
                      Choose File
                    </button>
                  </div>
                )}

                {/* Status Bar */}
                {ragStatus && (
                  <div className="config-status-bar">
                    {ragStatus.includes('Error') || ragStatus.includes('failed') ? (
                      <AlertCircle size={14} className="text-error" />
                    ) : (
                      <CheckCircle2 size={14} className="text-accent" />
                    )}
                    <span>{ragStatus}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Messages Body */}
          <div className="chatbot-body">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message-row ${msg.sender}`}>
                {msg.sender === 'bot' && (
                  <div className="msg-avatar glass">
                    <Bot size={15} className="text-accent" />
                  </div>
                )}
                <div className={`chat-bubble glass ${msg.sender}`}>
                  <div 
                    className="chat-text-content"
                    dangerouslySetInnerHTML={{
                      __html: msg.text
                        .replace(/### (.*)/g, '<strong class="chat-heading">$1</strong>')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
                        .replace(/\n/g, '<br/>')
                    }}
                  />
                  <span className="msg-timestamp">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chat-message-row bot">
                <div className="msg-avatar glass">
                  <Bot size={15} className="text-accent" />
                </div>
                <div className="chat-bubble glass bot typing-bubble">
                  <div className="typing-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="chatbot-suggestions">
            {defaultSuggestions.map((sug, i) => (
              <button 
                key={i} 
                className="sug-chip" 
                onClick={() => handleSendMessage(sug)}
              >
                {sug}
              </button>
            ))}
          </div>

          {/* Input Footer */}
          <div className="chatbot-footer">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask about IoT, Kafka, Python, projects..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button 
              className="chatbot-send-btn"
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              aria-label="Send query"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
