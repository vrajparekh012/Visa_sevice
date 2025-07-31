// src/pages/About.js
import React from 'react';
import { FiCheck, FiGlobe, FiUsers, FiAward, FiClock, FiShield } from 'react-icons/fi';
import './About.css';

const About = () => {
  const stats = [
    { value: '10,000+', label: 'Successful Applications', icon: <FiCheck /> },
    { value: '9+', label: 'Countries Covered', icon: <FiGlobe /> },
    { value: '98%', label: 'Approval Rate', icon: <FiAward /> },
    { value: '24/7', label: 'Client Support', icon: <FiUsers /> }
  ];

  const expertiseItems = [
    { text: '5+ years of combined immigration law experience', icon: <FiClock /> },
    { text: 'Multilingual support team', icon: <FiUsers /> },
    { text: 'Direct partnerships with embassies worldwide', icon: <FiGlobe /> },
    { text: 'Real-time application tracking system', icon: <FiShield /> }
  ];

  const teamMembers = [
    { name: 'Vraj Parekh',  position: 'frontend Developer' },
    { name: 'Priyanshu Bhati', position: 'Backend Developer' },
    { name: 'Dhruv Prajapati', position: 'Database Specialist' }
  ];

  return (
    <div className="about-container">
      <header className="about-header">
        <h1>About <span>Viseas</span></h1>
        <p>Your trusted global visa solutions partner</p>
      </header>

      <div className="about-content">
        <section className="mission-section">
          <h2>Our Mission</h2>
          <p>
            To simplify global mobility through transparent, efficient, and 
            reliable visa processing services that bridge nations and cultures.
          </p>
        </section>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        <section className="expertise-section">
          <h2>Our Expertise</h2>
          <ul className="expertise-list">
            {expertiseItems.map((item, index) => (
              <li key={index}>
                <span className="expertise-icon">{item.icon}</span>
                {item.text}
              </li>
            ))}
          </ul>
        </section>

        <section className="team-section">
          <h2>The Team Behind Viseas</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <h3>{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-position">{member.position}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;