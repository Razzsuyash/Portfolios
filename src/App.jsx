import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Experience from './pages/Experience';
import Gallery from './pages/Gallery';
import Vlogs from './pages/Vlogs';
import Contact from './pages/Contact';
import CustomCursor from './components/CustomCursor';
import ParticlesBackground from './components/ParticlesBackground';
import ChatBot from './components/ChatBot';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <CustomCursor />
        <ParticlesBackground />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/vlogs" element={<Vlogs />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <ChatBot />
      </div>
    </Router>
  );
}

export default App;
