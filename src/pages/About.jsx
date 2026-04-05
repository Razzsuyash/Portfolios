import React from 'react';
import { Code, Database, BarChart, Server } from 'lucide-react';
import './About.css';

const About = () => {
  const skills = [
    { category: 'Machine Learning', items: ['TensorFlow', 'PyTorch', 'Scikit-Learn', 'XGBoost', 'NLP', 'Computer Vision'] },
    { category: 'Data Analysis', items: ['Pandas', 'NumPy', 'Jupyter', 'Matplotlib', 'Seaborn', 'Statistical Modeling'] },
    { category: 'Data Engineering', items: ['SQL', 'Spark', 'Airflow', 'Kafka', 'Hadoop', 'AWS/GCP'] },
    { category: 'Development', items: ['Python', 'R', 'C++', 'Git', 'Docker', 'FastAPI'] }
  ];

  return (
    <div className="page-container container animate-fade-in">
      <div className="section-header delay-100">
        <h2>About <span className="text-accent">Me</span></h2>
        <div className="section-line"></div>
      </div>

      <div className="about-content">
        <div className="about-bio glass delay-200">
          <h3>My Journey</h3>
          <p>
            I am a passionate Data Scientist driven by the power of data to solve complex problems and create tangible impact. 
            With a background in computer science and applied mathematics, I specialize in building scalable machine learning models 
            and data pipelines that turn raw data into actionable intelligence.
          </p>
          <p>
            Over the years, I've worked across various domains including finance, healthcare, and e-commerce, helping organizations 
            optimize operations, forecast trends, and personalize user experiences. I thrive in environments that challenge me 
            to learn continuously and innovate rapidly.
          </p>
          <p>
            When I'm not training neural networks or visualizing data, you can find me contributing to open-source data science tools, 
            reading about the latest advancements in AI, or hiking the local trails.
          </p>
        </div>

        <div className="about-skills">
          <h3 className="delay-200" style={{ marginBottom: '1.5rem' }}>Technical Arsenal</h3>
          <div className="skills-grid">
            {skills.map((skillGroup, idx) => (
              <div key={idx} className={`skill-card glass delay-${100 * (idx+2)}`}>
                <div className="skill-header">
                  {idx === 0 && <Code size={20} className="text-accent" />}
                  {idx === 1 && <BarChart size={20} className="text-accent" />}
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
