import React from 'react';
import { Link } from 'react-router-dom';
import '../StyleSheets/HeroSection.css';

const stats = [
  { number: '10,000+', label: 'Resumes Built' },
  { number: '4', label: 'Pro Templates' },
  { number: 'Free', label: 'Export PDF/DOCX' },
];

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-icon">✨</span>
          <span className="hero__badge-text">Discover The Easiest Way to Build Your CV!</span>
        </div>
        <h1 className="hero__title">Online Resume Builder With<br/>Professional Templates.</h1>
        <p className="hero__desc">
          Our intelligent resume builder takes the hassle out of resume writing. Choose from modern templates, customize live, and export job-ready PDF &amp; DOCX resumes in minutes.
        </p>
        <div className="hero__actions">
          <Link to="/template">
            <button className="hero__btn hero__btn--primary">CHOOSE TEMPLATE</button>
          </Link>
          <Link to="/build/template-one">
            <button className="hero__btn hero__btn--secondary">QUICK BUILD</button>
          </Link>
        </div>
        <div className="hero__stats">
          {stats.map((stat) => (
            <div className="hero__stat-card" key={stat.label}>
              <span className="hero__stat-number">{stat.number}</span>
              <span className="hero__stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="hero__image-wrapper">
        <img
          src="/images/hero-img.png"
          alt="Online Resume Builder Hero"
          className="hero__image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    </section>
  );
}

export default HeroSection;
