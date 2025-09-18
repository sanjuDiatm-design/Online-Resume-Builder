import React from 'react';
import { Link } from 'react-router-dom';
import '../StyleSheets/HeroSection.css';
import heroImg from '../../public/images/hero-img.png';

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-icon">💲</span>
          <span className="hero__badge-text">Discover The Easiest ways to Build Your CV!</span>
        </div>
        <h1 className="hero__title">Online CV Builder With<br/>Creative Templates.</h1>
        <p className="hero__desc">
          Our Perfect resume builder takes the hassle out of resume writing. Choose from several templates and follow easy prompts to create the perfect job-ready resume.
        </p>
        <div className="hero__actions">
          <Link to="/template"><button className="hero__btn hero__btn--primary">CHOOSE TEMPLATE</button></Link>
          <Link to="/contact"><button className="hero__btn hero__btn--secondary">CONTACT US</button></Link>
        </div>
      </div>
      <div className="hero__image-wrapper">
        <img src={heroImg} alt="Hero" className="hero__image" />
      </div>
    </section>
  );
}

export default HeroSection;
