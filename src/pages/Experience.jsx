import React from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      role: "Senior Data Scientist",
      company: "TechNova Analytics",
      period: "2021 - Present",
      description: "Leading a team of 4 data scientists to develop and deploy machine learning models for predictive maintenance, resulting in a 20% reduction in equipment downtime. Architected a real-time data streaming pipeline using Kafka and Spark.",
      type: "work"
    },
    {
      role: "Machine Learning Engineer",
      company: "Globex Corporation",
      period: "2018 - 2021",
      description: "Designed recommendation systems for an e-commerce platform serving 2M+ active users. Improved click-through rates by 15% using collaborative filtering and deep learning algorithms.",
      type: "work"
    },
    {
      role: "Data Analyst",
      company: "Stark Industries",
      period: "2016 - 2018",
      description: "Developed automated dashboards and reports using Tableau and SQL. Conducted A/B testing for marketing campaigns, increasing conversion rates by 8%.",
      type: "work"
    },
    {
      role: "M.S. Computer Science",
      company: "University of Technology",
      period: "2014 - 2016",
      description: "Specialization in Artificial Intelligence and Machine Learning. Thesis on 'Optimizing Neural Networks for Edge Devices'.",
      type: "education"
    }
  ];

  return (
    <div className="page-container container animate-fade-in">
      <div className="section-header delay-100">
        <h2>Professional <span className="text-accent">Experience</span></h2>
        <div className="section-line"></div>
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>
        {experiences.map((exp, index) => (
          <div key={index} className={`timeline-item delay-${(index+2)*100}`}>
            <div className="timeline-icon glass">
              {exp.type === 'work' ? <Briefcase size={20} className="text-accent" /> : <GraduationCap size={20} className="text-accent" />}
            </div>
            <div className="timeline-content glass">
              <div className="timeline-header">
                <h3>{exp.role}</h3>
                <div className="timeline-period">
                  <Calendar size={16} />
                  <span>{exp.period}</span>
                </div>
              </div>
              <h4 className="text-accent">{exp.company}</h4>
              <p>{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
