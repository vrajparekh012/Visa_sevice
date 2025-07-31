import React, { useState, useEffect } from 'react';
import './Countries.css';

// Flag imports from assets/flags
import usFlag from '../assets/flags/us.jpg';
import caFlag from '../assets/flags/ca.jpg';
import ukFlag from '../assets/flags/uk.jpg';
import auFlag from '../assets/flags/au.jpg';
import deFlag from '../assets/flags/de.jpg';
import frFlag from '../assets/flags/fr.jpg';
import jpFlag from '../assets/flags/jp.jpg';
import sgFlag from '../assets/flags/sg.jpg';
import aeFlag from '../assets/flags/ae.jpg';
import chFlag from '../assets/flags/ch.jpg'; // China flag

function Countries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    // Sample data with flag imports
    const sampleCountries = [
      { id: 1, name: 'United States', flag: usFlag, visaType: 'B1/B2 Visa', requirements: 'Passport, DS-160, photo', processingTime: '3-5 days' },
      { id: 2, name: 'Canada', flag: caFlag, visaType: 'Visitor Visa', requirements: 'Passport, proof of funds', processingTime: '14 days' },
      { id: 3, name: 'United Kingdom', flag: ukFlag, visaType: 'Standard Visitor', requirements: 'Passport, bank statements', processingTime: '3 weeks' },
      { id: 4, name: 'Australia', flag: auFlag, visaType: 'Visitor (600)', requirements: 'Passport, health insurance', processingTime: '1 month' },
      { id: 5, name: 'Germany', flag: deFlag, visaType: 'Schengen Visa', requirements: 'Passport, travel insurance', processingTime: '15 days' },
      { id: 6, name: 'France', flag: frFlag, visaType: 'Schengen Visa', requirements: 'Passport, accommodation proof', processingTime: '10-15 days' },
      { id: 7, name: 'Japan', flag: jpFlag, visaType: 'Tourist Visa', requirements: 'Passport, itinerary', processingTime: '5 days' },
      { id: 8, name: 'Singapore', flag: sgFlag, visaType: 'Tourist Visa', requirements: 'Passport, return ticket', processingTime: '3 days' },
      { id: 9, name: 'UAE', flag: aeFlag, visaType: 'Visit Visa', requirements: 'Passport, photo', processingTime: '2-4 days' },
      { id: 10, name: 'China', flag: chFlag, visaType: 'Tourist Visa', requirements: 'Passport, invitation letter', processingTime: '1-2 weeks' }
    ];
    
    setCountries(sampleCountries);
    setLoading(false);
  }, []);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
  };

  const handleBackClick = () => {
    setSelectedCountry(null);
  };

  if (loading) return <div className="loading">Loading visa information...</div>;

  return (
    <div className="country-container">
      {!selectedCountry ? (
        <>
          <div className="header-section">
            <h1>Explore Visa Options</h1>
            <p>Discover visa requirements for 9+ countries</p>
          </div>

          <div className="horizontal-scroll">
            <div className="countries-horizontal">
              {countries.map(country => (
                <div 
                  key={country.id} 
                  className="country-card-horizontal"
                  onClick={() => handleCountryClick(country)}
                >
                  <img src={country.flag} alt={`${country.name} flag`} className="country-flag-img" />
                  <h3>{country.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="country-details">
          <button onClick={handleBackClick} className="back-btn">
            ← Back to Countries
          </button>
          <div className="country-header">
            <img src={selectedCountry.flag} alt={`${selectedCountry.name} flag`} className="detail-flag-img" />
            <h2>{selectedCountry.name} Visa</h2>
          </div>
          <div className="details-grid">
            <div className="detail-item">
              <h4>Visa Type</h4>
              <p>{selectedCountry.visaType}</p>
            </div>
            <div className="detail-item">
              <h4>Requirements</h4>
              <p>{selectedCountry.requirements}</p>
            </div>
            <div className="detail-item">
              <h4>Processing Time</h4>
              <p>{selectedCountry.processingTime}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Countries;