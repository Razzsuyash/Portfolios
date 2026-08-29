import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, Download, RefreshCw, Settings, FileText, Globe, AlertCircle, CheckCircle2 } from 'lucide-react';
import { resumeData } from '../utils/resumeData';
import { downloadResume } from '../utils/downloadResume';
import './ChatBot.css';

// Fallback Offline Search (Keyword Retrieval)
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
      `• Developed responsive web applications using HTML5, CSS3, and JavaScript.\n` +
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
    `Ask me anything!`;
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
  const [sourceType, setSourceType] = useState('resume'); // 'resume', 'upload', 'url'
  const [inputUrl, setInputUrl] = useState('');
  const [customText, setCustomText] = useState('');
  const [ragStatus, setRagStatus] = useState('Python Backend Active');
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! 👋 I'm **Suyash's AI Assistant**. Ask me anything about his backend experience at TCS, Kafka & IoT pipelines, projects, or contact details!\n\n*Note: This chatbot automatically queries a secure Python RAG endpoint or falls back offline if needed!*",
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setRagStatus('Reading uploaded file...');
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      setCustomText(text);
      setRagStatus(`File "${file.name}" loaded successfully as context!`);
    };
    reader.readAsText(file);
  };

  const handleUrlProcess = async () => {
    if (!inputUrl) return;
    setRagStatus('Fetching URL content...');
    try {
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(inputUrl)}`);
      if (!response.ok) throw new Error('Proxy error');
      const data = await response.json();
      const parser = new DOMParser();
      const doc = parser.parseFromString(data.contents, 'text/html');
      
      const scripts = doc.querySelectorAll('script, style');
      scripts.forEach(s => s.remove());

      const text = doc.body.innerText || doc.body.textContent || '';
      if (!text.trim()) {
        setRagStatus('No readable text found at URL.');
        return;
      }

      setCustomText(text);
      setRagStatus('Website scraped and loaded as context!');
    } catch (err) {
      console.error(err);
      setRagStatus('Failed to scrape URL (CORS block).');
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

    try {
      const payload = {
        query: query,
        custom_text: sourceType !== 'resume' ? customText : ''
      };

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Server connection offline.');
      }

      const resData = await response.json();
      
      if (resData.success) {
        const botMessage = {
          sender: 'bot',
          text: resData.result,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Log backend warning (e.g. quota limit) and fallback to keyword retrieval
        console.warn("Backend RAG warning, falling back to client semantic rules:", resData.error);
        const fallbackText = queryOfflineKnowledgeBase(query);
        const botMessage = {
          sender: 'bot',
          text: fallbackText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, botMessage]);
      }

    } catch (err) {
      console.warn("RAG backend unreachable, using offline client-side fallback:", err.message);
      // Seamless degradation to offline keyword engine (Completely Free & Silent!)
      const fallbackText = queryOfflineKnowledgeBase(query);
      const botMessage = {
        sender: 'bot',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const resetChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "Conversation reset! How can I assist you with Suyash's background?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
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
                <p>Offline Fallback Active</p>
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
                onClick={resetChat} 
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
                <h5>RAG Source Configuration</h5>
                <button className="config-close" onClick={() => setShowConfig(false)}><X size={16} /></button>
              </div>

              <div className="config-body">
                {/* Source Selector */}
                <div className="config-section">
                  <label className="config-label">Context Source</label>
                  <select 
                    value={sourceType} 
                    onChange={e => {
                      setSourceType(e.target.value);
                      setCustomText('');
                    }}
                    className="config-select"
                  >
                    <option value="resume">Preloaded Resume Document (Default)</option>
                    <option value="upload">Upload Custom Document (.txt, .md)</option>
                    <option value="url">Scrape Website URL</option>
                  </select>
                  <p className="config-help">The selected document context will be parsed and loaded into the RAG pipeline.</p>
                </div>

                {/* Dynamic Inputs */}
                {sourceType === 'url' && (
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
                      <button type="button" onClick={handleUrlProcess} className="config-btn">Load</button>
                    </div>
                  </div>
                )}

                {sourceType === 'upload' && (
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
                    {ragStatus.includes('Error') || ragStatus.includes('Failed') ? (
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
