import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import heroBg from '../assets/hero-bg.jpg';

const Home = () => {
  const visaServices = [
    {
      title: "Business Visa",
      description: "Fast processing for corporate travelers with premium support",
      icon: "fas fa-briefcase"
    },
    {
      title: "Tourist Visa",
      description: "Leisure travel visas with flexible documentation options",
      icon: "fas fa-umbrella-beach"
    },
    {
      title: "Student Visa",
      description: "Study abroad assistance with university coordination",
      icon: "fas fa-graduation-cap"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Background Image */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Global Visa Solutions</h1>
          <p>Professional visa processing with guaranteed approval rates</p>
          <Link to="/services" className="hero-btn">
            Explore Services
          </Link>
        </div>
      </section>

      {/* Visa Services Section */}
      <section className="services-section">
        <div className="container">
          <h2>Our Visa Services</h2>
          <div className="services-grid">
            {visaServices.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">
                  <i className={service.icon}></i>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <Link to="/contact" className="service-btn">
                  Apply Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;