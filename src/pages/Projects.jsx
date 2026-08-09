import React, { useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { FaGithub } from 'react-icons/fa';
import { Sparkles, Code2, ExternalLink, Filter } from 'lucide-react';
import './Projects.css';

const projectsData = [
  {
    id: 'optistack-ai',
    title: "OptiStack AI - Cloud Architecture Optimizer",
    description: "An AI-powered infrastructure and full-stack performance optimization engine that analyzes system bottlenecks, evaluates latency, and recommends architecture stack improvements.",
    tags: ["TypeScript", "Next.js", "AI Agents", "Vercel", "Tailwind CSS"],
    githubLink: "https://github.com/Razzsuyash/optistack-ai",
    liveLink: "https://optistack-ai.vercel.app",
    category: "AI & Full Stack",
    filterCategory: "ai",
    iconType: "ai",
    delay: 100
  },
  {
    id: 'rag-ai-assistant',
    title: "RAG AI Knowledge Assistant",
    description: "Retrieval-Augmented Generation (RAG) conversational intelligence system enabling semantic search and context-aware Q&A over enterprise documents and custom knowledge bases.",
    tags: ["Python", "RAG", "LLMs", "Vector Embeddings", "LangChain"],
    githubLink: "https://github.com/Razzsuyash/RAG-AI-Knowledge-Assistant",
    category: "AI & ML",
    filterCategory: "ai",
    iconType: "ai",
    delay: 150
  },
  {
    id: 'priorityflow',
    title: "PriorityFlow - Smart Workflow & Task App",
    description: "Interactive priority-driven task management and workflow productivity tool featuring real-time task sequencing, category tagging, status filtering, and persistent state management.",
    tags: ["JavaScript", "React", "State Management", "UI/UX", "Vite"],
    githubLink: "https://github.com/Razzsuyash/priorityflow-todo-app",
    category: "Full Stack",
    filterCategory: "web",
    iconType: "web",
    delay: 200
  },
  {
    id: 'middaymeal',
    title: "MiddayMeal - Nutrition Distribution Portal",
    description: "Comprehensive public welfare management portal designed to streamline, track, and monitor government student nutrition distribution programs with analytical reporting dashboards.",
    tags: ["JavaScript", "React", "Node.js", "Analytics", "Vercel"],
    githubLink: "https://github.com/Razzsuyash/Middaymeal",
    liveLink: "https://middaymeal.vercel.app",
    category: "Full Stack",
    filterCategory: "web",
    iconType: "web",
    delay: 250
  },
  {
    id: 'movie-recommender',
    title: "ML Movie Recommender System",
    description: "Content-based recommendation engine analyzing 5,000+ movie titles with 95% accuracy. Built with NLP preprocessing pipelines (CountVectorizer, PorterStemmer) and Cosine Similarity matrices.",
    tags: ["Python", "Scikit-Learn", "NLP", "Cosine Similarity", "Streamlit"],
    githubLink: "https://github.com/Razzsuyash/Movie_Recommender_system",
    category: "AI & ML",
    filterCategory: "ai",
    iconType: "ai",
    delay: 300
  },
  {
    id: 'potato-disease',
    title: "Potato Leaf Disease Classification (CNN)",
    description: "Deep Learning Computer Vision system utilizing Convolutional Neural Networks (CNN) for early detection and multi-class classification of potato crop infections (Early & Late Blight).",
    tags: ["Python", "TensorFlow", "Keras", "CNN", "OpenCV", "Deep Learning"],
    githubLink: "https://github.com/Razzsuyash/potato-diseases-classification",
    category: "Computer Vision",
    filterCategory: "ai",
    iconType: "ai",
    delay: 350
  },
  {
    id: 'pyspark-pipeline',
    title: "PySpark Distributed Big Data Analytics",
    description: "High-throughput data engineering pipelines and distributed dataset transformations using Apache Spark (PySpark) for large-scale ETL processing and structured batch computation.",
    tags: ["PySpark", "Apache Spark", "Big Data", "Distributed Systems", "ETL"],
    githubLink: "https://github.com/Razzsuyash/pyspark",
    category: "Big Data & ETL",
    filterCategory: "data",
    iconType: "data",
    delay: 400
  },
  {
    id: 'car-price-predictor',
    title: "Used Car Valuation & Price Predictor",
    description: "Supervised Machine Learning regression model predicting automobile market valuations based on vehicle specifications, mileage, brand heritage, and multi-factor regression analysis.",
    tags: ["Python", "Scikit-Learn", "Pandas", "Feature Engineering", "Regression"],
    githubLink: "https://github.com/Razzsuyash/Car_price_Predictor",
    category: "Data Science",
    filterCategory: "data",
    iconType: "analytics",
    delay: 450
  },
  {
    id: 'house-price-prediction',
    title: "Real Estate Price Prediction Engine",
    description: "End-to-end regression model utilizing Exploratory Data Analysis (EDA), correlation matrices, and multivariate linear regression to forecast residential housing valuation trends.",
    tags: ["Python", "Linear Regression", "EDA", "NumPy", "Matplotlib"],
    githubLink: "https://github.com/Razzsuyash/House_Price_prediction-Linear-Regression-",
    category: "Data Science",
    filterCategory: "data",
    iconType: "analytics",
    delay: 500
  },
  {
    id: 'smart-inventory',
    title: "Smart Inventory Management System",
    description: "Spring Boot-based enterprise backend featuring CRUD APIs, JWT authentication, and Hibernate ORM managing 10,000+ persistent records deployed on Apache Tomcat.",
    tags: ["Java", "Spring Boot", "Hibernate ORM", "MySQL", "MVC"],
    githubLink: "https://github.com/Razzsuyash",
    category: "Backend & Systems",
    filterCategory: "web",
    iconType: "stack",
    delay: 550
  }
];

const categories = [
  { key: 'all', label: 'All Projects' },
  { key: 'ai', label: 'AI & Machine Learning' },
  { key: 'web', label: 'Full Stack & Web' },
  { key: 'data', label: 'Data Science & Big Data' }
];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(project => project.filterCategory === activeFilter);

  return (
    <div className="page-container container animate-fade-in">
      <div className="section-header delay-100">
        <h2>GitHub <span className="text-accent">Projects & Repositories</span></h2>
        <div className="section-line"></div>
      </div>

      {/* GitHub Profile Banner */}
      <div className="github-profile-card glass delay-150">
        <div className="github-profile-info">
          <div className="github-icon-glow">
            <FaGithub size={36} />
          </div>
          <div>
            <h3>Connected GitHub: <span className="text-accent">@Razzsuyash</span></h3>
            <p>Showcasing production-ready repositories, live deployed web applications, and AI/ML models.</p>
          </div>
        </div>
        <div className="github-profile-actions">
          <a 
            href="https://github.com/Razzsuyash?tab=repositories" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="button-primary github-cta-btn"
          >
            <FaGithub size={18} />
            <span>Explore All Repositories</span>
            <ExternalLink size={15} />
          </a>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="filter-tabs-container delay-200">
        <div className="filter-label">
          <Filter size={16} className="text-accent" />
          <span>Filter By:</span>
        </div>
        <div className="filter-buttons">
          {categories.map((cat) => (
            <button
              key={cat.key}
              className={`filter-btn ${activeFilter === cat.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(cat.key)}
            >
              {cat.label}
              <span className="filter-count">
                {cat.key === 'all' 
                  ? projectsData.length 
                  : projectsData.filter(p => p.filterCategory === cat.key).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id || index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
