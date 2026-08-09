import React, { useState } from 'react';
import { Camera, Plus, X, Image as ImageIcon, Heart, MapPin, Eye } from 'lucide-react';
import './Gallery.css';

const initialPhotos = [
  {
    id: 1,
    title: "Himalayan Expedition Summit",
    category: "hiking",
    location: "Himachal Pradesh, India",
    date: "May 2024",
    likes: 142,
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    caption: "Leading a team of 30+ students across high-altitude mountain passes as Strategy Head of the NSUT Hiking Club."
  },
  {
    id: 2,
    title: "Backend IoT Platform Engineering",
    category: "tech",
    location: "Pune, India",
    date: "March 2025",
    likes: 98,
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    caption: "Designing high-throughput Kafka producer-consumer stream architectures for IoT telemetry."
  },
  {
    id: 3,
    title: "NSUT Graduation Day",
    category: "milestones",
    location: "New Delhi, Delhi",
    date: "July 2024",
    likes: 215,
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
    caption: "Graduated with B.Tech in Instrumentation & Control Engineering from Netaji Subhash University of Technology."
  },
  {
    id: 4,
    title: "Trek to High Alpine Meadows",
    category: "hiking",
    location: "Uttarakhand, India",
    date: "October 2023",
    likes: 180,
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    caption: "Eco-tourism and sustainability outreach during a 7-day wilderness trek."
  },
  {
    id: 5,
    title: "Deep Learning & Neural Network Lab",
    category: "tech",
    location: "New Delhi",
    date: "Jan 2024",
    likes: 110,
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    caption: "Training CNN vision architectures for potato disease classification with data augmentation."
  },
  {
    id: 6,
    title: "Starlit Campfire & Expedition Planning",
    category: "hiking",
    location: "Spiti Valley, India",
    date: "June 2023",
    likes: 165,
    imageUrl: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80",
    caption: "Unwinding around the campfire while mapping out navigation routes and safety checkpoints."
  }
];

const categories = [
  { key: 'all', label: 'All Moments' },
  { key: 'hiking', label: 'Mountain Expeditions & Travel' },
  { key: 'tech', label: 'Engineering & Tech Setup' },
  { key: 'milestones', label: 'Milestones & Life' }
];

const Gallery = () => {
  const [photos, setPhotos] = useState(initialPhotos);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    category: 'hiking',
    location: '',
    imageUrl: '',
    caption: ''
  });

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const handleLike = (id, e) => {
    e.stopPropagation();
    setPhotos(photos.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPhoto({ ...newPhoto, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = (e) => {
    e.preventDefault();
    if (!newPhoto.imageUrl || !newPhoto.title) {
      alert("Please provide an image and title.");
      return;
    }

    const photoEntry = {
      id: Date.now(),
      title: newPhoto.title,
      category: newPhoto.category,
      location: newPhoto.location || "New Delhi",
      date: "Just now",
      likes: 1,
      imageUrl: newPhoto.imageUrl,
      caption: newPhoto.caption || "Personal moment captured."
    };

    setPhotos([photoEntry, ...photos]);
    setShowUploadModal(false);
    setNewPhoto({ title: '', category: 'hiking', location: '', imageUrl: '', caption: '' });
  };

  return (
    <div className="page-container container animate-fade-in">
      <div className="section-header delay-100">
        <div>
          <h2>Moments & <span className="text-accent">Personal Gallery</span></h2>
          <p className="gallery-subtitle">
            A glimpse into my life beyond code — mountain expeditions, hiking leadership, and personal milestones.
          </p>
        </div>
        <div className="section-line"></div>
      </div>

      {/* Upload Action Bar */}
      <div className="gallery-actions-bar glass delay-150">
        <div className="gallery-filters">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`filter-btn ${activeCategory === cat.key ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>
        <button 
          onClick={() => setShowUploadModal(true)} 
          className="button-primary upload-photo-btn"
        >
          <Camera size={18} />
          <span>Upload / Add Photo</span>
        </button>
      </div>

      {/* Photo Grid */}
      <div className="photo-grid delay-200">
        {filteredPhotos.map((photo) => (
          <div 
            key={photo.id} 
            className="photo-card glass"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="photo-img-wrapper">
              <img src={photo.imageUrl} alt={photo.title} loading="lazy" />
              <div className="photo-overlay">
                <div className="photo-view-badge">
                  <Eye size={16} /> View Fullscreen
                </div>
              </div>
            </div>
            <div className="photo-card-info">
              <div className="photo-card-header">
                <h4>{photo.title}</h4>
                <button 
                  className="photo-like-btn"
                  onClick={(e) => handleLike(photo.id, e)}
                  title="Like this photo"
                >
                  <Heart size={15} className="heart-icon" />
                  <span>{photo.likes}</span>
                </button>
              </div>
              <p className="photo-caption">{photo.caption}</p>
              <div className="photo-meta">
                <span className="photo-location"><MapPin size={13} /> {photo.location}</span>
                <span className="photo-date">{photo.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedPhoto && (
        <div className="lightbox-modal" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-content glass" onClick={e => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
              <X size={24} />
            </button>
            <div className="lightbox-img-container">
              <img src={selectedPhoto.imageUrl} alt={selectedPhoto.title} />
            </div>
            <div className="lightbox-details">
              <h3>{selectedPhoto.title}</h3>
              <p className="lightbox-caption">{selectedPhoto.caption}</p>
              <div className="lightbox-footer">
                <span><MapPin size={14} className="text-accent" /> {selectedPhoto.location}</span>
                <span>📅 {selectedPhoto.date}</span>
                <span>❤️ {selectedPhoto.likes} Likes</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Photo Modal */}
      {showUploadModal && (
        <div className="upload-modal" onClick={() => setShowUploadModal(false)}>
          <div className="upload-content glass" onClick={e => e.stopPropagation()}>
            <div className="upload-header">
              <h3>Add New Photo to Gallery</h3>
              <button className="upload-close" onClick={() => setShowUploadModal(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddPhoto} className="upload-form">
              <div className="form-group">
                <label>Photo Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Kedarkantha Winter Summit"
                  value={newPhoto.title}
                  onChange={e => setNewPhoto({...newPhoto, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newPhoto.category}
                    onChange={e => setNewPhoto({...newPhoto, category: e.target.value})}
                  >
                    <option value="hiking">Mountain Expeditions & Travel</option>
                    <option value="tech">Engineering & Tech Setup</option>
                    <option value="milestones">Milestones & Life</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Manali, Himachal"
                    value={newPhoto.location}
                    onChange={e => setNewPhoto({...newPhoto, location: e.target.value})}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Image Upload / URL *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ marginBottom: '8px' }}
                />
                <input
                  type="url"
                  placeholder="Or paste direct image URL (https://...)"
                  value={newPhoto.imageUrl}
                  onChange={e => setNewPhoto({...newPhoto, imageUrl: e.target.value})}
                />
              </div>
              {newPhoto.imageUrl && (
                <div className="upload-preview">
                  <img src={newPhoto.imageUrl} alt="Preview" />
                </div>
              )}
              <div className="form-group">
                <label>Caption / Story</label>
                <textarea
                  rows="3"
                  placeholder="Tell the story behind this moment..."
                  value={newPhoto.caption}
                  onChange={e => setNewPhoto({...newPhoto, caption: e.target.value})}
                ></textarea>
              </div>
              <button type="submit" className="button-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Plus size={18} /> Add Photo to Gallery
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
