// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Global Styles
import './App.css';
import './components/styles/header.css';
import './components/styles/footer.css';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Countries from './pages/Countries';
import Contact from './pages/Contact';
import AuthForm from './pages/AuthForm';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />
        <main className="main-content">
          <MainRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function MainRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/contact" element={<Contact />} />

      {/* Auth Pages */}
      <Route path="/login" element={<AuthForm isRegistering={false} />} />
      <Route path="/register" element={<AuthForm isRegistering={true} />} />
    </Routes>
  );
}

export default App;
