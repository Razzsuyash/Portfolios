import React from 'react';
import { Briefcase, GraduationCap, Calendar } from 'lucide-react';
import './Experience.css';

const Experience = () => {
  const experiences = [
    {
      role: "Software Engineer",
      company: "Tata Consultancy Services",
      period: "Feb 2025 - Present",
      description: "Developed and maintained Java Spring Boot microservices supporting large-scale IoT data processing. Implemented RESTful APIs for device monitoring, improving response efficiency by 70%. Integrated Hibernate ORM, reducing query latency by 25%. Built modular back-end components using JDBC, Servlets, and JSP, deployed on Apache Tomcat. Utilized JUnit, Mockito, and Jenkins pipelines for CI/CD.",
      type: "work"
    },
    {
      role: "Software Development Intern",
      company: "Courpedia",
      period: "Jan 2024 - Mar 2024",
      description: "Developed web utilities using Java, Servlets, JSP, and MySQL to improve performance and usability. Created a QR code generator adopted by 1,000+ users alongside secure data APIs. Enhanced data workflows with optimized SQL scripts, reducing ETL runtime by 40%.",
      type: "work"
    },
    {
      role: "Strategy Head - Travelling and Hiking Club",
      company: "NSUT",
      period: "Jan 2022 - Dec 2023",
      description: "Led planning and execution of national trips for 300+ students; boosted membership by 40%. Spearheaded eco-tourism and community initiatives. Managed partnerships with vendors and organized seminars and safety training.",
      type: "work"
    },
    {
      role: "B.Tech. in Instrumentation and Control Engineering",
      company: "Netaji Subhash University Of Technology (NSUT)",
      period: "Sept 2020 - May 2024",
      description: "New Delhi, Delhi",
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
