import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Database, BrainCircuit, Terminal } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="page-container container">
      <section className="hero-section">
        <div className="hero-content animate-fade-in">
          <div className="hero-badge delay-100">Welcome to my space!</div>
          <h1 className="delay-200">
            Hi, I'm <br />
            <span className="text-gradient">Suyash Raj</span>
          </h1>
          <p className="hero-subtitle delay-300">
            I'm a Software Engineer with a B.Tech in Instrumentation and Control Engineering. 
            I specialize in building scalable Java Spring Boot microservices, optimizing databases, 
            and integrating data-driven machine learning solutions.
          </p>
          <div className="hero-cta delay-300">
            <NavLink to="/projects" className="button-primary">
              View My Work <ArrowRight size={20} />
            </NavLink>
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
            </div>
            <div className="card-body">
              <div className="code-line">import org.springframework.boot.*;</div>
              <div className="code-line">import java.util.stream.*;</div>
              <div className="code-line empty"></div>
              <div className="code-line">@RestController</div>
              <div className="code-line">public class ApiController {'{'}</div>
              <div className="code-line indent">@GetMapping("/status")</div>
              <div className="code-line indent">public String check() {'{'}</div>
              <div className="code-line indent accent">    return "System Optimized & Running";</div>
              <div className="code-line indent">{'}'}</div>
              <div className="code-line">{'}'}</div>
            </div>
          </div>
          
          <div className="floating-badge badge-1 glass">
            <Terminal size={24} className="text-accent" />
            <span>Spring Boot</span>
          </div>
          
          <div className="floating-badge badge-2 glass">
            <Database size={24} className="text-accent" />
            <span>Databases</span>
          </div>

          <div className="floating-badge badge-3 glass">
            <BrainCircuit size={24} className="text-accent" />
            <span>Machine Learning</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
