import React from 'react';
import { NavLink } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import { ArrowRight, Database, BrainCircuit, Terminal, Download, Cpu } from 'lucide-react';
import { downloadResume } from '../utils/downloadResume';
import './Home.css';

const Home = () => {
  return (
    <div className="page-container container">
      <section className="hero-section">
        <div className="hero-content animate-fade-in">
          <div className="hero-badge delay-100">Backend Engineer @ TCS • TotalEnergies IoT</div>
          <h1 className="delay-200" style={{ minHeight: '120px' }}>
            Hi, I'm <br />
            <span className="text-gradient">
              <Typewriter
                options={{
                  strings: [
                    'Suyash Raj',
                    'a Backend Engineer',
                    'a Python & FastAPI Dev',
                    'a Kafka & IoT Specialist',
                    'a Distributed Systems Builder'
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </h1>
          <p className="hero-subtitle delay-300">
            Backend Development Engineer at <strong>Tata Consultancy Services (TotalEnergies, Clever Energy)</strong>. 
            I engineer high-throughput <strong>Apache Kafka</strong> pipelines, scalable <strong>FastAPI/Flask</strong> microservices, 
            and <strong>IoT Energy Optimization</strong> architectures processing <strong>50K+ sensor records/day</strong>.
          </p>
          <div className="hero-cta delay-300">
            <NavLink to="/projects" className="button-primary">
              Explore Projects <ArrowRight size={20} />
            </NavLink>
            <button onClick={downloadResume} className="button-secondary resume-download-cta">
              <Download size={19} /> Download Resume
            </button>
            <NavLink to="/contact" className="button-secondary">
              Get In Touch
            </NavLink>
          </div>
        </div>

        <div className="hero-visual animate-fade-in delay-200">
          <div className="glass visual-card main-card">
            <div className="card-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="editor-title">iot_pipeline.py</span>
            </div>
            <div className="card-body">
              <div className="code-line">from fastapi import FastAPI</div>
              <div className="code-line">from kafka import KafkaConsumer</div>
              <div className="code-line empty"></div>
              <div className="code-line">app = FastAPI(title="EnergyOptimizer")</div>
              <div className="code-line">consumer = KafkaConsumer('iot-sensors')</div>
              <div className="code-line empty"></div>
              <div className="code-line">@app.post("/api/v1/optimize")</div>
              <div className="code-line">async def process_telemetry(payload):</div>
              <div className="code-line indent">data = transform_etl(payload)</div>
              <div className="code-line indent accent">return {"{"}"status": "Optimized", "latency_cut": "35%"{"}"}</div>
            </div>
          </div>
          
          <div className="floating-badge badge-1 glass">
            <Cpu size={24} className="text-accent" />
            <span>FastAPI & Kafka</span>
          </div>
          
          <div className="floating-badge badge-2 glass">
            <Database size={24} className="text-accent" />
            <span>50K+ IoT Records/Day</span>
          </div>

          <div className="floating-badge badge-3 glass">
            <BrainCircuit size={24} className="text-accent" />
            <span>Energy Optimization</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
