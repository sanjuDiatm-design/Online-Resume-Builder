import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import DeliverBest from './components/DeliverBest';
import Templates from './components/Templates';
import Features from './components/Features';
import About from './components/About';
import Footer from './components/Footer';
import ResumeBuilder from './components/ResumeBuilder';
import Dashboard from './components/Dashboard';
import Contact from './components/Contact';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <HeroSection />
                <DeliverBest />
                <Templates />
                <Features />
                <Footer />
              </>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/build/:templateId" element={<ResumeBuilder />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-resumes" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/template"
            element={
              <>
                <Templates />
                <Footer />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
