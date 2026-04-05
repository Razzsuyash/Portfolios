import React from 'react';
import { Tilt } from 'react-tilt';
import { Code, Database, Terminal, Server } from 'lucide-react';
import './About.css';

const About = () => {
  const skills = [
    { category: 'Languages', items: ['Java', 'JavaScript', 'SQL', 'HTML5', 'CSS3', 'Python'] },
    { category: 'Frameworks & Tools', items: ['Spring Boot', 'Hibernate', 'JUnit', 'Maven', 'REST APIs', 'JDBC', 'Servlets', 'JSP'] },
    { category: 'Databases & Tools', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Git', 'GitHub', 'Jenkins', 'Docker'] },
    { category: 'Concepts', items: ['OOP', 'DSA', 'Multithreading', 'Design Patterns', 'MVC Architecture'] }
  ];

  return (
    <div className="page-container container animate-fade-in">
      <div className="section-header delay-100">
        <h2>About <span className="text-accent">Me</span></h2>
        <div className="section-line"></div>
      </div>

      <div className="about-content">
        <div className="about-bio glass delay-200">
          <h3>Professional Journey</h3>
          <p>
            I am a Software Engineer currently working at Tata Consultancy Services, based out of New Delhi.
            I graduated with a B.Tech. in Instrumentation and Control Engineering from Netaji Subhash University Of Technology (NSUT), 
            where I honed my foundational problem-solving skills and algorithms background.
          </p>
          <p>
            My technical expertise leans heavily towards backend engineering. I have hands-on experience building modular
            components, developing robust Java Spring Boot microservices, and integrating Hibernate ORM for efficient data handling. 
            Whether I'm optimizing database latency for large-scale IoT processing or deploying secure and modular web utilities, 
            I'm driven by continuous improvement and clean architecture.
          </p>
          <p>
            During my time at university, I also served as the Strategy Head for the Travelling and Hiking Club, where I led
            the planning of national trips and was heavily involved in eco-tourism initiatives and community building. 
            I enjoy combining my team-leadership skills with a strong technical foundation to deliver real-world solutions.
          </p>
        </div>

        <div className="about-skills">
          <h3 className="delay-200" style={{ marginBottom: '1.5rem' }}>Technical Arsenal</h3>
          <div className="skills-grid">
            {skills.map((skillGroup, idx) => (
              <Tilt key={idx} options={{ max: 15, scale: 1.05, transition: true }}>
                <div className={`skill-card glass delay-${100 * (idx+2)}`} style={{ height: '100%' }}>
                  <div className="skill-header">
                    {idx === 0 && <Code size={20} className="text-accent" />}
                    {idx === 1 && <Terminal size={20} className="text-accent" />}
                    {idx === 2 && <Database size={20} className="text-accent" />}
                    {idx === 3 && <Server size={20} className="text-accent" />}
                    <h4>{skillGroup.category}</h4>
                  </div>
                  <div className="skill-tags">
                    {skillGroup.items.map((item, i) => (
                      <span key={i} className="skill-tag">{item}</span>
                    ))}
                  </div>
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
