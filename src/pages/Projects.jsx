import React from 'react';
import ProjectCard from '../components/ProjectCard';
import './Projects.css';

const Projects = () => {
  const projectsData = [
    {
      title: "Smart Inventory Management System",
      description: "Developed a Spring Boot-based inventory system with CRUD APIs and JWT-secured authentication. Implemented ORM via Hibernate to handle 10K+ records efficiently. Deployed application using Apache Tomcat and maintained a modular MVC design.",
      tags: ["Java", "Spring Boot", "Hibernate", "MySQL"],
      githubLink: "https://github.com/razzsuyash",
      delay: 100
    },
    {
      title: "Machine Learning Movie Recommender",
      description: "Built a content recommendation engine analyzing 5,000+ movies with 95% accuracy. Applied NLP using CountVectorizer and PorterStemmer for efficient tag generation. Optimized the similarity matrix using cosine similarity and deployed with AWS Lambda.",
      tags: ["Python", "Sklearn"],
      githubLink: "https://github.com/razzsuyash",
      delay: 200
    }
  ];

  return (
    <div className="page-container container animate-fade-in">
      <div className="section-header delay-100">
        <h2>Featured <span className="text-accent">Projects</span></h2>
        <div className="section-line"></div>
      </div>
      
      <p className="projects-subtitle delay-200">
        A selection of my best work in backend API development, full-stack architecture, and machine learning.
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
