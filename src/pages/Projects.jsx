import React from 'react';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const Projects = () => {
  const projectsData = [
    {
      title: "Customer Churn Predictor",
      description: "An end-to-end ML pipeline predicting customer churn using XGBoost. Includes an interactive Streamlit dashboard for real-time risk assessment.",
      tags: ["Python", "XGBoost", "Streamlit", "AWS S3"],
      githubLink: "https://github.com",
      liveLink: "https://example.com",
      image: "", // Leave empty for placeholder
      delay: 100
    },
    {
      title: "NLP Sentiment Analyzer",
      description: "A deep learning model utilizing BERT to analyze sentiment from social media streams regarding major tech stocks in real-time.",
      tags: ["PyTorch", "HuggingFace transformers", "Kafka", "PostgreSQL"],
      githubLink: "https://github.com",
      delay: 200
    },
    {
      title: "Retail Demand Forecaster",
      description: "Time-series forecasting model using Facebook Prophet and LSTM networks to predict weekly sales across 500+ retail locations.",
      tags: ["Python", "Prophet", "TensorFlow", "Pandas"],
      liveLink: "https://example.com",
      delay: 300
    },
    {
      title: "Medical Image Segmenter",
      description: "A U-Net architecture computer vision model designed to segment MRI scans and identify potential anomalies with 98% accuracy.",
      tags: ["TensorFlow", "Keras", "OpenCV", "Flask"],
      githubLink: "https://github.com",
      liveLink: "https://example.com",
      delay: 400
    }
  ];

  return (
    <div className="page-container container animate-fade-in">
      <div className="section-header delay-100">
        <h2>Featured <span className="text-accent">Projects</span></h2>
        <div className="section-line"></div>
      </div>
      
      <p className="projects-subtitle delay-200">
        A selection of my best work in machine learning, data engineering, and predictive analytics.
      </p>

      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
