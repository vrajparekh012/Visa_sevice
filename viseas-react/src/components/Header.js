import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/header.css';

function Header() {
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;
      setUsername(parsedUser?.name || parsedUser?.username || null);
    } catch (err) {
      console.error('Error parsing user from localStorage:', err);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUsername(null);
    navigate('/login');
  };

  return (
    <header className="header_section">
      {/* Top Contact Bar */}
      <div className="header_top">
        <div className="container-fluid contact_link-container">
          <div className="navbar-brand">Viseas</div>
          <div className="contact-info">
            <a className="contact_link1" href="tel:+011234567890">
              <i className="fa fa-phone"></i> +01 1234567890
            </a>
            <a className="contact_link2" href="mailto:viseaas5@gmail.com">
              <i className="fa fa-envelope"></i> viseaas5@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="header_bottom">
        <nav className="container-fluid custom_navbar">
          <ul className="nav-links">
            <li><Link className="nav-link" to="/"><i className="fa fa-home"></i> Home</Link></li>
            <li><Link className="nav-link" to="/services"><i className="fa fa-briefcase"></i> Services</Link></li>
            <li><Link className="nav-link" to="/about"><i className="fa fa-info-circle"></i> About</Link></li>
            <li><Link className="nav-link" to="/countries"><i className="fa fa-globe"></i> Countries</Link></li>
            <li><Link className="nav-link" to="/contact"><i className="fa fa-envelope"></i> Contact</Link></li>
          </ul>

          <div className="auth-buttons">
            {username ? (
              <>
                <span className="username-display">Welcome, {username}</span>
                <button className="logout-btn" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-btn login-btn">
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
                <Link to="/register" className="nav-btn register-btn">
                  <i className="fas fa-user-plus"></i> Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
