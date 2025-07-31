import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Viseas</h1>
        <p>Reach out to us for visa assistance</p>
      </div>

      <div className="contact-info-box">
        <div className="contact-info-item">
          <i className="fas fa-phone"></i>
          <span>+01 123 456 7890</span>
        </div>
        <div className="contact-info-item">
          <i className="fas fa-envelope"></i>
          <span>viseaas@gmail.com</span>
        </div>
        <div className="contact-info-item">
          <i className="fas fa-map-marker-alt"></i>
          <span>Viseas Headquarters, Visa Services Plaza</span>
        </div>
      </div>

      <div className="email-action">
        <a href="mailto:demo@gmail.com" className="email-button">
          <i className="fas fa-paper-plane"></i> Email Us Directly
        </a>
      </div>
    </div>
  );
};

export default Contact;