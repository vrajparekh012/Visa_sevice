import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/services');
        setServices(response.data.services);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (service) => {
    const res = await loadRazorpayScript();
    if (!res) {
      alert('Failed to load Razorpay SDK. Please check your internet.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/v1/services/create-order', {
        amount: service.price * 100, // Razorpay uses paise
      });

      const { amount, id: order_id, currency } = response.data;

      const options = {
        key: 'rzp_test_agMxgzdJcrLUrP', // ✅ Replace with your Razorpay Key ID
        amount,
        currency,
        name: 'Viseas',
        description: `${service.title} Payment`,
        order_id,
        handler: function (response) {
          alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#2563eb', // Primary color for Razorpay checkout
        },
      };

      const razorpayObject = new window.Razorpay(options);
      razorpayObject.open();
    } catch (err) {
      console.error('Payment error:', err);
      alert('Something went wrong while initiating payment.');
    }
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <h1>Our <span className="highlight">Visa Services</span></h1>
        <p className="subtitle">Professional visa processing with guaranteed approval rates</p>
      </div>

      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <div 
              key={service.id}
              className={`service-card ${hoveredCard === service.id ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card-header">
                <h2>{service.title}</h2>
                <div className="price-badge">₹{service.price}</div>
              </div>
              
              <p className="card-description">{service.description}</p>
              
              <ul className="benefits-list">
                <li><FiCheckCircle /> Fast Processing</li>
                <li><FiCheckCircle /> Expert Guidance</li>
                <li><FiCheckCircle /> 24/7 Support</li>
              </ul>
              
              <button
                className="cta-button"
                onClick={() => handlePayment(service)}
              >
                {service.cta_text || 'Get Started'}
                <FiArrowRight className="arrow-icon" />
              </button>

              {hoveredCard === service.id && (
                <div className="card-hover-effect"></div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
