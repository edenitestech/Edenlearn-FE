import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import Preloader from './components/Preloader';





function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2500); // Fake 2.5s loading delay
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (1 second)
      once: true,     // Whether animation should happen only once - while scrolling down
    });
  }, []);
  
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <>
            {loading ? <Preloader /> : <AppRoutes />}
          </>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;