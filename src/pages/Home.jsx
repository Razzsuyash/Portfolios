import React from 'react';
import { NavLink } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { ArrowRight, Database, BrainCircuit, Terminal, Download, Cpu, Layers, Sparkles, Network } from 'lucide-react';
import { downloadResume } from '../utils/downloadResume';
import './Home.css';

const Home = () => {
  const highlighters = [
    { label: "Distributed Systems", icon: <Network size={16} />, color: "accent" },
    { label: "Microservices", icon: <Layers size={16} />, color: "accent" },
    { label: "RAG & AI Systems", icon: <Sparkles size={16} />, color: "accent" },
    { label: "Apache Kafka", icon: <Cpu size={16} />, color: "accent" },
    { label: "Generative AI", icon: <Terminal size={16} />, color: "accent" },
    { label: "LangChain & Langraph", icon: <Sparkles size={16} />, color: "accent" },
    { label: "Model Context Protocol", icon: <Cpu size={16} />, color: "accent" },
    { label: "FastAPI & Python", icon: <Terminal size={16} />, color: "accent" },
  ];

  return (
    <div className="page-container container">
      <section className="hero-section">
        <div className="hero-content animate-fade-in">
          {/* Top Badge */}
          <div className="hero-badge delay-100">
            <span className="live-pulse-dot" style={{ display: 'inline-block', marginRight: '6px' }}></span>
            Backend Engineer @ TCS
          </div>

          {/* Main Permanent Heading */}
          <h1 className="hero-title delay-150">
            Hi, I'm <span className="text-gradient">Suyash Raj</span>
          </h1>

          {/* Dynamic Interactive Typewriter Sub-Headline */}
          <div className="typewriter-headline delay-200">
            <span className="typewriter-prefix">Engineering </span>
            <span className="typewriter-highlight">
              <Typewriter
                options={{
                  strings: [
                    'Distributed Systems',
                    'Scalable Microservices',
                    'RAG & Conversational AI',
                    'High-Throughput Kafka Streams',
                    'Ultra-Fast FastAPI Backend'
                  ],
                  autoStart: true,
                  loop: true,
                  deleteSpeed: 30,
                  delay: 45,
                }}
              />
            </span>
          </div>

          {/* Core Specialization Highlights */}
          <div className="hero-highlighters delay-250">
            {highlighters.map((item, index) => (
              <div key={index} className="hero-highlight-pill glass">
                <span className="pill-icon">{item.icon}</span>
                <span className="pill-text">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Short Bio */}
          <p className="hero-subtitle delay-300">
            Backend Development Engineer at <strong>Tata Consultancy Services (TotalEnergies, Clever Energy)</strong>. 
            I build high-throughput <strong>Kafka</strong> stream pipelines, resilient <strong>Microservices</strong>, 
            and <strong>RAG & AI</strong> architectures processing <strong>50K+ sensor records/day</strong>.
          </p>

          {/* Call to Actions */}
          <div className="hero-cta delay-300">
            <NavLink to="/projects" className="button-primary">
              Explore Projects <ArrowRight size={20} />
            </NavLink>
            <button onClick={downloadResume} className="button-secondary resume-download-cta">
              <Download size={18} /> Download Resume
            </button>
            <NavLink to="/contact" className="button-secondary">
              Get In Touch
            </NavLink>
          </div>
        </div>

        {/* Visual Terminal / Microservices Card */}
        <div className="hero-visual animate-fade-in delay-200">
          <div className="glass visual-card main-card">
            <div className="card-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="editor-title">distributed_system.py</span>
            </div>
            <div className="card-body">
              <div className="code-line"># Microservices & RAG Pipeline</div>
              <div className="code-line">from fastapi import FastAPI</div>
              <div className="code-line">from kafka import KafkaConsumer</div>
              <div className="code-line">from rag_core import VectorRetriever</div>
              <div className="code-line empty"></div>
              <div className="code-line">@app.post("/api/v1/process-telemetry")</div>
              <div className="code-line">async def handle_iot_stream(event):</div>
              <div className="code-line indent">payload = await kafka.consume(event)</div>
              <div className="code-line indent">knowledge = rag.retrieve(payload)</div>
              <div className="code-line indent accent">return {"{"}"status": "Distributed Sync", "latency": "-35%"{"}"}</div>
            </div>
          </div>
          
          {/* Floating Highlight Badges */}
          <div className="floating-badge badge-1 glass">
            <Network size={22} className="text-accent" />
            <span>Distributed Systems</span>
          </div>
          
          <div className="floating-badge badge-2 glass">
            <Layers size={22} className="text-accent" />
            <span>Microservices</span>
          </div>

          <div className="floating-badge badge-3 glass">
            <Sparkles size={22} className="text-accent" />
            <span>RAG & AI Systems</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
