import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { FaLinkedinIn, FaGithub, FaTwitter } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <div className="page-container container animate-fade-in">
      <div className="section-header delay-100">
        <h2>Get In <span className="text-accent">Touch</span></h2>
        <div className="section-line"></div>
      </div>

      <div className="contact-container">
        <div className="contact-info delay-200">
          <h3>Let's collaborate</h3>
          <p>
            Whether you have a question, a project proposal, or just want to say hi, 
            my inbox is always open. I'll try my best to get back to you!
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="icon-wrapper glass"><Mail size={20} className="text-accent" /></div>
              <div>
                <h4>Email</h4>
                <span>hello@dataviz.dev</span>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="icon-wrapper glass"><MapPin size={20} className="text-accent" /></div>
              <div>
                <h4>Location</h4>
                <span>San Francisco, CA (Remote)</span>
              </div>
            </div>
          </div>

          <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Social Profiles</h4>
          <div className="social-links">
            <a href="#" className="social-icon glass"><FaLinkedinIn size={22} /></a>
            <a href="#" className="social-icon glass"><FaGithub size={22} /></a>
            <a href="#" className="social-icon glass"><FaTwitter size={22} /></a>
          </div>
        </div>

        <form className="contact-form glass delay-300" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="success-message animate-fade-in">
              <h3 className="text-accent">Message Sent!</h3>
              <p>Thank you for reaching out. I'll get back to you soon.</p>
            </div>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  value={formData.name} 
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                  required 
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  value={formData.email} 
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                  required 
                  placeholder="john@example.com"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  value={formData.message} 
                  onChange={(e) => setFormData({...formData, message: e.target.value})} 
                  required 
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              <button type="submit" className="button-primary submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
