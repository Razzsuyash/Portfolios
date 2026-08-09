import React from 'react';
import { Tilt } from 'react-tilt';
import { ExternalLink, Sparkles, Brain, Globe, Database, BarChart3, Layers } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './ProjectCard.css';

const getCategoryIcon = (iconType) => {
  switch (iconType) {
    case 'ai':
      return <Brain size={32} className="card-banner-icon" />;
    case 'web':
      return <Globe size={32} className="card-banner-icon" />;
    case 'data':
      return <Database size={32} className="card-banner-icon" />;
    case 'analytics':
      return <BarChart3 size={32} className="card-banner-icon" />;
    case 'stack':
      return <Layers size={32} className="card-banner-icon" />;
    default:
      return <Sparkles size={32} className="card-banner-icon" />;
  }
};

const ProjectCard = ({ title, description, tags, githubLink, liveLink, category, iconType = 'ai', delay = 100 }) => {
  return (
    <Tilt options={{ max: 12, scale: 1.02, transition: true, speed: 400 }} style={{ height: '100%' }}>
      <div className={`project-card glass animate-fade-in delay-${delay}`}>
        <div className={`project-banner-container banner-${iconType}`}>
          <div className="banner-badge-group">
            {category && <span className="project-category-badge">{category}</span>}
            {liveLink && (
              <span className="live-status-badge">
                <span className="live-pulse-dot"></span> Live Demo
              </span>
            )}
          </div>
          <div className="banner-icon-wrapper">
            {getCategoryIcon(iconType)}
          </div>
          <div className="banner-glow-effect"></div>
        </div>

        <div className="project-content">
          <h3 className="project-title">{title}</h3>
          <p className="project-desc">{description}</p>
          
          <div className="project-tags">
            {tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>

          <div className="project-links">
            {githubLink && (
              <a 
                href={githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-project-code"
                aria-label={`View GitHub source code for ${title}`}
              >
                <FaGithub size={18} />
                <span>GitHub Code</span>
              </a>
            )}
            {liveLink ? (
              <a 
                href={liveLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-project-live"
                aria-label={`Open live demo for ${title}`}
              >
                <ExternalLink size={16} />
                <span>Live Project</span>
              </a>
            ) : (
              <span className="btn-project-repo-only">
                <span>Repository Project</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default ProjectCard;
