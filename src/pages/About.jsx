import React from 'react';
import { Tilt } from 'react-tilt';
import { Code, Database, Terminal, Server, Cpu, Layers, Download } from 'lucide-react';
import { downloadResume } from '../utils/downloadResume';
import './About.css';

const About = () => {
  const skills = [
    { 
      category: 'Languages', 
      items: ['Python', 'JavaScript', 'SQL', 'HTML5', 'CSS3'] 
    },
    { 
      category: 'Backend & Distributed Systems', 
      items: ['FastAPI', 'Flask', 'Apache Kafka', 'REST APIs', 'SQLAlchemy ORM', 'JWT & OAuth2', 'API Design', 'Microservices', 'ETL Pipelines'] 
    },
    { 
      category: 'Databases & Search', 
      items: ['PostgreSQL', 'MySQL', 'OpenSearch', 'Database Design', 'Query Optimization'] 
    },
    { 
      category: 'Data Science & Machine Learning', 
      items: ['Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'NLP', 'CNNs'] 
    },
    { 
      category: 'Tools & DevOps', 
      items: ['Git', 'GitLab', 'Postman', 'Power BI', 'CI/CD Pipelines', 'Docker', 'AWS'] 
    },
    { 
      category: 'Core Concepts', 
      items: ['Distributed Systems', 'System Design', 'OOPs', 'Data Structures & Algorithms', 'Agile Methodology'] 
    }
  ];

  return (
    <div className="page-container container animate-fade-in">
      <div className="section-header delay-100">
        <h2>About <span className="text-accent">Me</span></h2>
        <div className="section-line"></div>
      </div>

      <div className="about-content">
        <div className="about-bio glass delay-200">
          <h3>Engineering Philosophy</h3>
          <p>
            I am a <strong>Backend Development Engineer</strong> at <strong>Tata Consultancy Services</strong>, working on mission-critical IoT energy optimization systems for <strong>TotalEnergies (Clever Energy)</strong>.
            I graduated with a B.Tech from <strong>Netaji Subhash University Of Technology (NSUT)</strong>.
          </p>
          <p>
            My core strength lies in designing high-throughput data pipelines with <strong>Apache Kafka</strong>, developing ultra-fast asynchronous REST APIs using <strong>FastAPI & Flask</strong>, and architecting resilient microservices that process tens of thousands of IoT sensor telemetry points every single day.
          </p>
          <p>
            I believe in building software that is clean, modular, and measurable—from shaving 35% off latency with optimized ETL pipelines to ensuring high database availability with PostgreSQL & SQLAlchemy.
          </p>

          <div style={{ marginTop: '2rem' }}>
            <button onClick={downloadResume} className="button-primary">
              <Download size={18} /> Download Full Resume (PDF)
            </button>
          </div>
        </div>

        <div className="about-skills">
          <h3 className="delay-200" style={{ marginBottom: '1.5rem' }}>Technical Arsenal</h3>
          <div className="skills-grid">
            {skills.map((skillGroup, idx) => (
              <Tilt key={idx} options={{ max: 15, scale: 1.04, transition: true }}>
                <div className={`skill-card glass delay-${100 * (idx+2)}`} style={{ height: '100%' }}>
                  <div className="skill-header">
                    {idx === 0 && <Code size={20} className="text-accent" />}
                    {idx === 1 && <Cpu size={20} className="text-accent" />}
                    {idx === 2 && <Database size={20} className="text-accent" />}
                    {idx === 3 && <Terminal size={20} className="text-accent" />}
                    {idx === 4 && <Server size={20} className="text-accent" />}
                    {idx === 5 && <Layers size={20} className="text-accent" />}
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
