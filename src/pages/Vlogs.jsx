import React, { useState } from 'react';
import { Play, Video, Plus, X, Eye, Clock, Calendar, Sparkles } from 'lucide-react';
import './Vlogs.css';

const initialVlogs = [
  {
    id: 1,
    title: "Mountain Summit Vlog: 14,000ft Expedition with NSUT",
    category: "adventure",
    duration: "8:45",
    views: "2.4K",
    date: "June 2024",
    thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Full cinematic documentation of our 6-day alpine pass crossing, basecamp navigation, and eco-tourism initiatives."
  },
  {
    id: 2,
    title: "Engineering Scalable IoT & Kafka Pipelines at TCS",
    category: "tech",
    duration: "14:20",
    views: "1.8K",
    date: "April 2025",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Deep dive into our 5-layer IoT energy architecture processing 50K+ records daily and reducing latency by 35%."
  },
  {
    id: 3,
    title: "Spiti Valley Road Trip & High-Altitude Camping",
    category: "adventure",
    duration: "11:10",
    views: "3.1K",
    date: "August 2023",
    thumbnail: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Navigating rugged Himalayan terrain, starry nights, and building camaraderie across our hiking collective."
  },
  {
    id: 4,
    title: "Building an End-to-End NLP Movie Recommender API",
    category: "tech",
    duration: "16:50",
    views: "4.5K",
    date: "Nov 2024",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    description: "Step-by-step walkthrough of vectorizing 5,000+ movies, cosine similarity matrices, and deploying FastAPI to AWS."
  }
];

const Vlogs = () => {
  const [vlogs, setVlogs] = useState(initialVlogs);
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeVideo, setActiveVideo] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVlog, setNewVlog] = useState({
    title: '',
    category: 'adventure',
    duration: '10:00',
    videoUrl: '',
    thumbnail: '',
    description: ''
  });

  const filteredVlogs = activeFilter === 'all'
    ? vlogs
    : vlogs.filter(v => v.category === activeFilter);

  const handleAddVlog = (e) => {
    e.preventDefault();
    if (!newVlog.title || !newVlog.videoUrl) {
      alert("Please provide a title and video URL.");
      return;
    }

    const vlogEntry = {
      id: Date.now(),
      title: newVlog.title,
      category: newVlog.category,
      duration: newVlog.duration || "5:00",
      views: "1",
      date: "Just now",
      thumbnail: newVlog.thumbnail || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      videoUrl: newVlog.videoUrl,
      description: newVlog.description || "Exciting vlog episode."
    };

    setVlogs([vlogEntry, ...vlogs]);
    setShowAddModal(false);
    setNewVlog({ title: '', category: 'adventure', duration: '10:00', videoUrl: '', thumbnail: '', description: '' });
  };

  return (
    <div className="page-container container animate-fade-in">
      <div className="section-header delay-100">
        <div>
          <h2>Vlogs & <span className="text-accent">Video Stories</span></h2>
          <p className="vlogs-subtitle">
            Documenting real-world expeditions, engineering deep-dives, and tech architecture walkthroughs.
          </p>
        </div>
        <div className="section-line"></div>
      </div>

      {/* Action Bar */}
      <div className="vlogs-actions-bar glass delay-150">
        <div className="vlogs-filters">
          <button
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All Vlogs
          </button>
          <button
            className={`filter-btn ${activeFilter === 'adventure' ? 'active' : ''}`}
            onClick={() => setActiveFilter('adventure')}
          >
            Adventures & Expeditions
          </button>
          <button
            className={`filter-btn ${activeFilter === 'tech' ? 'active' : ''}`}
            onClick={() => setActiveFilter('tech')}
          >
            Tech & System Architecture
          </button>
        </div>
        <button 
          onClick={() => setShowAddModal(true)} 
          className="button-primary add-vlog-btn"
        >
          <Video size={18} />
          <span>Upload / Add Vlog</span>
        </button>
      </div>

      {/* Vlogs Grid */}
      <div className="vlogs-grid delay-200">
        {filteredVlogs.map((vlog) => (
          <div 
            key={vlog.id} 
            className="vlog-card glass"
            onClick={() => setActiveVideo(vlog)}
          >
            <div className="vlog-thumbnail-wrapper">
              <img src={vlog.thumbnail} alt={vlog.title} loading="lazy" />
              <div className="play-button-overlay">
                <div className="play-circle">
                  <Play size={24} fill="#0b0c10" color="#0b0c10" />
                </div>
              </div>
              <span className="vlog-duration-badge">
                <Clock size={12} /> {vlog.duration}
              </span>
            </div>

            <div className="vlog-content">
              <span className="vlog-category-tag">{vlog.category === 'adventure' ? 'Expedition' : 'Engineering'}</span>
              <h4>{vlog.title}</h4>
              <p className="vlog-desc">{vlog.description}</p>
              
              <div className="vlog-meta">
                <span><Eye size={13} /> {vlog.views} views</span>
                <span><Calendar size={13} /> {vlog.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Player Modal */}
      {activeVideo && (
        <div className="video-player-modal" onClick={() => setActiveVideo(null)}>
          <div className="video-modal-content glass" onClick={e => e.stopPropagation()}>
            <button className="video-close-btn" onClick={() => setActiveVideo(null)}>
              <X size={24} />
            </button>
            <div className="video-iframe-wrapper">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-modal-details">
              <h3>{activeVideo.title}</h3>
              <p>{activeVideo.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Vlog Modal */}
      {showAddModal && (
        <div className="upload-modal" onClick={() => setShowAddModal(false)}>
          <div className="upload-content glass" onClick={e => e.stopPropagation()}>
            <div className="upload-header">
              <h3>Add New Vlog / Video Episode</h3>
              <button className="upload-close" onClick={() => setShowAddModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddVlog} className="upload-form">
              <div className="form-group">
                <label>Vlog Title *</label>
                <input
                  type="text"
                  placeholder="e.g. TotalEnergies IoT Architecture Deep Dive"
                  value={newVlog.title}
                  onChange={e => setNewVlog({...newVlog, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newVlog.category}
                    onChange={e => setNewVlog({...newVlog, category: e.target.value})}
                  >
                    <option value="adventure">Adventures & Expeditions</option>
                    <option value="tech">Tech & System Architecture</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Duration (mm:ss)</label>
                  <input
                    type="text"
                    placeholder="e.g. 12:30"
                    value={newVlog.duration}
                    onChange={e => setNewVlog({...newVlog, duration: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Video Embed / URL *</label>
                <input
                  type="url"
                  placeholder="e.g. https://www.youtube.com/embed/..."
                  value={newVlog.videoUrl}
                  onChange={e => setNewVlog({...newVlog, videoUrl: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Thumbnail Image URL</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newVlog.thumbnail}
                  onChange={e => setNewVlog({...newVlog, thumbnail: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  rows="3"
                  placeholder="Brief summary of the vlog episode..."
                  value={newVlog.description}
                  onChange={e => setNewVlog({...newVlog, description: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="button-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={18} /> Publish Vlog Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vlogs;
