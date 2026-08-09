import React from 'react';
import { Briefcase, GraduationCap, Calendar, Download, MapPin, CheckCircle2 } from 'lucide-react';
import { downloadResume } from '../utils/downloadResume';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      role: "Backend Development Engineer",
      company: "Tata Consultancy Services",
      client: "Client: TotalEnergies, Clever Energy",
      period: "Feb 2025 – Present",
      location: "Pune, India",
      type: "work",
      highlights: [
        "Engineered scalable backend services using Python for a real-time IoT Energy Optimization Platform, processing 50K+ sensor records/day through a distributed 5-layer architecture.",
        "Developed high-throughput Apache Kafka Producer-Consumer pipelines for real-time sensor data ingestion and built robust ETL pipelines to extract, transform, validate, and load data, reducing processing latency by 35%.",
        "Leveraged Pandas and NumPy for large-scale data preprocessing, feature engineering, and statistical analysis, improving data quality and reducing preprocessing time by 40%.",
        "Designed and developed scalable REST APIs using FastAPI and Flask, enabling seamless communication between backend computation services and client applications.",
        "Optimized backend performance through modular Python development, efficient algorithms, and database interactions, improving application throughput by 25% while enhancing scalability and maintainability.",
        "Collaborated using Git, GitLab, code reviews, and CI/CD pipelines in an Agile environment to deliver reliable backend solutions supporting real-time energy optimization."
      ]
    },
    {
      role: "Software Development Engineer Intern",
      company: "Courpedia",
      period: "Aug 2024 – Dec 2024",
      location: "New Delhi, India",
      type: "work",
      highlights: [
        "Developed responsive web applications using HTML, CSS, and JavaScript, implementing interactive features including a QR Code Generator and a Random Password Generator.",
        "Collaborated in an Agile environment to optimize frontend performance through JavaScript, DOM Manipulation, Debugging, UI Enhancements, and Code Reviews, improving application usability and maintainability."
      ]
    },
    {
      role: "B.Tech in Instrumentation and Control Engineering",
      company: "Netaji Subhash University Of Technology (NSUT)",
      period: "Sept 2020 – July 2024",
      location: "New Delhi, Delhi",
      type: "education",
      highlights: [
        "Strong foundation in algorithms, signals & systems, distributed computing, computational mathematics, and database management."
      ]
    },
    {
      role: "Strategy Head — Travelling and Hiking Club",
      company: "NSUT",
      period: "Jan 2022 – Dec 2023",
      location: "New Delhi",
      type: "work",
      highlights: [
        "Led planning and execution of national trips for 300+ students; boosted active community membership by 40%.",
        "Spearheaded eco-tourism initiatives and managed vendor partnerships and safety protocols."
      ]
    }
  ];

  return (
    <div className="page-container container animate-fade-in">
      <div className="section-header delay-100">
        <h2>Professional <span className="text-accent">Experience</span></h2>
        <div className="section-line"></div>
      </div>

      {/* Resume Download Callout Banner */}
      <div className="experience-download-card glass delay-150">
        <div>
          <h3>Official Verified Resume</h3>
          <p>Looking for a printable or ATS-friendly PDF copy of my background?</p>
        </div>
        <button onClick={downloadResume} className="button-primary">
          <Download size={18} /> Download Resume (PDF)
        </button>
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
                <div>
                  <h3>{exp.role}</h3>
                  <h4 className="text-accent company-title">
                    {exp.company} {exp.client && <span className="client-badge">{exp.client}</span>}
                  </h4>
                </div>
                <div className="timeline-meta">
                  <div className="timeline-period">
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                  {exp.location && (
                    <div className="timeline-location">
                      <MapPin size={14} />
                      <span>{exp.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <ul className="timeline-highlights">
                {exp.highlights.map((h, i) => (
                  <li key={i}>
                    <CheckCircle2 size={16} className="highlight-bullet-icon" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;
