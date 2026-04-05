import React from 'react';
import { Tilt } from 'react-tilt';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ title, description, tags, githubLink, liveLink, image, delay }) => {
  return (
    <Tilt options={{ max: 15, scale: 1.02, transition: true }} style={{ height: '100%' }}>
      <div className={`project-card glass animate-fade-in delay-${delay}`}>
        <div className="project-image-container">
          <div className="project-placeholder">
            {image ? <img src={image} alt={title} /> : <span>Data Viz</span>}
          </div>
        </div>
        <div className="project-content">
          <h3>{title}</h3>
          <p>{description}</p>
          <div className="project-tags">
            {tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
          <div className="project-links">
            {githubLink && (
              <a href={githubLink} target="_blank" rel="noopener noreferrer" className="icon-link">
                <FaGithub size={20} /> Code
              </a>
            )}
            {liveLink && (
              <a href={liveLink} target="_blank" rel="noopener noreferrer" className="icon-link">
                <ExternalLink size={20} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default ProjectCard;
