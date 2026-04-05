import React from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Database, BrainCircuit, LineChart } from 'lucide-react';
import './Home.css';

const Home = () => {
  return (
    <div className="page-container container">
      <section className="hero-section">
        <div className="hero-content animate-fade-in">
          <div className="hero-badge delay-100">Open to new opportunities</div>
          <h1 className="delay-200">
            Transforming Data into <br />
            <span className="text-gradient">Actionable Intelligence</span>
          </h1>
          <p className="hero-subtitle delay-300">
            I'm a Data Scientist and Machine Learning Engineer specializing in predictive modeling, 
            natural language processing, and scalable data pipelines.
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
              <div className="code-line">import pandas as pd</div>
              <div className="code-line">import tensorflow as tf</div>
              <div className="code-line empty"></div>
              <div className="code-line">def build_model(data):</div>
              <div className="code-line indent">features = process(data)</div>
              <div className="code-line indent">model = tf.keras.Sequential()</div>
              <div className="code-line indent accent">return model.fit(features)</div>
            </div>
          </div>
          
          <div className="floating-badge badge-1 glass">
            <BrainCircuit size={24} className="text-accent" />
            <span>Deep Learning</span>
          </div>
          
          <div className="floating-badge badge-2 glass">
            <Database size={24} className="text-accent" />
            <span>Big Data</span>
          </div>

          <div className="floating-badge badge-3 glass">
            <LineChart size={24} className="text-accent" />
            <span>Analytics</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
