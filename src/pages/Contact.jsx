import React, { useState } from 'react';
import { Mail, MapPin, Send, Phone } from 'lucide-react';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
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
            Whether you are looking for a reliable Software Engineer, have a project proposal, or just want to connect, 
            my inbox is always open. I'll get back to you!
          </p>

          <div className="contact-details">
            <div className="contact-item">
              <div className="icon-wrapper glass"><Mail size={20} className="text-accent" /></div>
              <div>
                <h4>Email</h4>
                <span>Suyashraj2000@gmail.com</span>
              </div>
            </div>
            
            <div className="contact-item">
               <div className="icon-wrapper glass"><Phone size={20} className="text-accent" /></div>
               <div>
                 <h4>Phone</h4>
                 <span>+91 8588087722</span>
               </div>
            </div>

            <div className="contact-item">
              <div className="icon-wrapper glass"><MapPin size={20} className="text-accent" /></div>
              <div>
                <h4>Location</h4>
                <span>New Delhi, Delhi, India</span>
              </div>
            </div>
          </div>

          <h4 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#fff' }}>Social Profiles</h4>
          <div className="social-links">
            <a href="https://linkedin.com/in/razzsuyash" target="_blank" rel="noopener noreferrer" className="social-icon glass"><FaLinkedinIn size={22} /></a>
            <a href="https://github.com/razzsuyash" target="_blank" rel="noopener noreferrer" className="social-icon glass"><FaGithub size={22} /></a>
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
                   placeholder="Your Name"
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
                   placeholder="you@domain.com"
                 />
               </div>
               <div className="form-group">
                 <label htmlFor="message">Message</label>
                 <textarea 
                   id="message" 
                   rows="4" 
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
