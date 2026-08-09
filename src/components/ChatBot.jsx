import React, { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, X, Send, Sparkles, Download, Mail, ExternalLink, RefreshCw } from 'lucide-react';
import { resumeData } from '../utils/resumeData';
import { downloadResume } from '../utils/downloadResume';
import './ChatBot.css';

// RAG Retrieval & Response Generation Engine
const queryRAGKnowledgeBase = (query) => {
  const q = query.toLowerCase().trim();

  // Experience / TCS / TotalEnergies / Kafka / IoT
  if (q.includes('tcs') || q.includes('totalenergies') || q.includes('clever energy') || q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('current role') || q.includes('kafka') || q.includes('iot')) {
    const tcs = resumeData.experience[0];
    return `### 💼 Current Role: ${tcs.role} @ ${tcs.company}\n\n` +
      `**Client:** ${tcs.client} | **Duration:** ${tcs.period} (${tcs.location})\n\n` +
      `**Key Engineering Achievements:**\n` +
      `• **IoT Energy Optimization Platform:** Engineered scalable Python backend services processing **50K+ sensor records/day** across a distributed 5-layer architecture.\n` +
      `• **Apache Kafka Pipelines:** Built high-throughput Producer-Consumer streams & robust ETL pipelines, **cutting processing latency by 35%**.\n` +
      `• **FastAPI & Flask APIs:** Developed modular REST APIs with SQLAlchemy ORM and PostgreSQL/MySQL, boosting system throughput by **25%**.\n` +
      `• **Data Preprocessing:** Leveraged Pandas & NumPy for feature engineering, reducing preprocessing time by **40%**.`;
  }

  // Skills / Tech Stack
  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('python') || q.includes('fastapi') || q.includes('backend') || q.includes('database') || q.includes('languages')) {
    return `### ⚡ Suyash's Technical Arsenal\n\n` +
      `• **Languages:** ${resumeData.skills.languages.join(', ')}\n` +
      `• **Backend & APIs:** ${resumeData.skills.backend.join(', ')}\n` +
      `• **Databases:** ${resumeData.skills.databases.join(', ')}\n` +
      `• **Libraries & ML:** ${resumeData.skills.libraries.join(', ')}\n` +
      `• **Tools:** ${resumeData.skills.tools.join(', ')}\n` +
      `• **Concepts:** ${resumeData.skills.concepts.join(', ')}`;
  }

  // Projects / Machine Learning / Movie / Potato
  if (q.includes('project') || q.includes('movie') || q.includes('potato') || q.includes('ai') || q.includes('ml') || q.includes('recommend') || q.includes('optistack')) {
    return `### 🚀 Key Technical Projects\n\n` +
      `1. **Movie Recommendation System (95% Accuracy):**\n` +
      `   • Built end-to-end NLP recommender over 5,000+ movies using CountVectorizer & Cosine Similarity.\n` +
      `   • Deployed scalable REST APIs with **FastAPI** on **AWS**.\n\n` +
      `2. **Potato Disease Classification (CNN - 93% Accuracy):**\n` +
      `   • Deep Learning Computer Vision model using TensorFlow/Keras with 300% dataset augmentation.\n\n` +
      `3. **OptiStack AI (Live Demo):**\n` +
      `   • AI-powered cloud infrastructure optimizer analyzing stack performance.\n\n` +
      `4. **MiddayMeal Portal (Live Demo):**\n` +
      `   • High-volume student nutrition distribution and analytics platform.`;
  }

  // Courpedia / Internship
  if (q.includes('courpedia') || q.includes('intern') || q.includes('internship')) {
    const cp = resumeData.experience[1];
    return `### 🎓 Software Development Engineer Intern @ Courpedia\n\n` +
      `**Duration:** ${cp.period} | **Location:** ${cp.location}\n\n` +
      `• Built responsive web applications using JavaScript, HTML5, and CSS3.\n` +
      `• Implemented interactive utility tools including a **QR Code Generator** and **Random Password Generator**.\n` +
      `• Optimized frontend performance with DOM manipulation and code reviews.`;
  }

  // Education / College / University / NSUT
  if (q.includes('education') || q.includes('college') || q.includes('university') || q.includes('nsut') || q.includes('degree') || q.includes('btech') || q.includes('study') || q.includes('gpa')) {
    return `### 🏛️ Education Background\n\n` +
      `**Institution:** ${resumeData.education.institution}\n` +
      `**Degree:** ${resumeData.education.degree}\n` +
      `**Duration:** ${resumeData.education.duration}\n` +
      `**Location:** ${resumeData.education.location}`;
  }

  // Contact / Phone / Email / Hire / Location / Resume
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('hire') || q.includes('location') || q.includes('number') || q.includes('resume')) {
    return `### 📬 Contact Suyash Raj\n\n` +
      `• **Email:** [${resumeData.email}](mailto:${resumeData.email})\n` +
      `• **Phone:** ${resumeData.phone}\n` +
      `• **Location:** ${resumeData.location} (Open to remote and hybrid opportunities)\n` +
      `• **LinkedIn:** [linkedin.com/in/razzsuyash](${resumeData.linkedin})\n` +
      `• **GitHub:** [github.com/razzsuyash](${resumeData.github})\n\n` +
      `*Tip: You can also click the "Download Resume" button below!*`;
  }

  // Hobbies / Lifestyle / Traveling / Hiking
  if (q.includes('hobby') || q.includes('travel') || q.includes('hiking') || q.includes('club') || q.includes('vlog') || q.includes('photo') || q.includes('outside work')) {
    return `### 🏔️ Beyond Code: Travel & Leadership\n\n` +
      `• **Strategy Head @ Travelling & Hiking Club (NSUT):** Led national expeditions for 300+ students and pioneered eco-tourism initiatives.\n` +
      `• **Photography & Vlogs:** Suyash loves capturing mountain expeditions, road trips, and tech conferences. Check out the **Photos** and **Vlogs** tabs in the navbar!`;
  }

  // Default Fallback
  return `### 👋 Hello! I'm Suyash's AI Assistant.\n\n` +
    `I can help you explore Suyash's background in detail:\n` +
    `• **Backend & IoT:** Python, FastAPI, Apache Kafka, 50K+ records/day at TCS.\n` +
    `• **Tech Stack:** PostgreSQL, Microservices, SQLAlchemy, Scikit-learn, React.\n` +
    `• **Projects:** Movie Recommender, Potato Disease CNN, OptiStack AI.\n` +
    `• **Contact Info:** Email, phone, and resume download.\n\n` +
    `Try asking one of the quick question chips below!`;
};

const defaultSuggestions = [
  "What is Suyash's experience with Kafka & IoT?",
  "Show me his top technical skills",
  "Tell me about his ML & AI projects",
  "How can I contact or hire Suyash?"
];

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! 👋 I'm **Suyash's AI Assistant** (powered by RAG). Ask me anything about Suyash's backend experience at TCS, Kafka & IoT pipelines, projects, or contact details!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend = null) => {
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

    // Simulate natural RAG semantic inference response
    setTimeout(() => {
      const botResponseText = queryRAGKnowledgeBase(query);
      const botMessage = {
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 450);
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
                <p>RAG Knowledge Base • Online</p>
              </div>
            </div>
            <div className="chatbot-header-actions">
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
                onClick={() => setIsOpen(false)} 
                className="header-close-btn"
                title="Close Chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

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
