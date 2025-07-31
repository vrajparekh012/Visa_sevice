// Updated HeroSection.js
import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const services = [
    {
      title: "Business Visa",
      description: "Premium support for corporate transfers",
    },
    {
      title: "Tourist Visa", 
      description: "Flexible documentation options",
    },
    {
      title: "Student Visa",
      description: "Study abroad assistance",
    }
  ];

  return (
    <div className="hero">
      <div className="hero-content">
        <h1>Visa Services</h1>
        
        <div className="services-container">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <button className="apply-button">Apply Now</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;