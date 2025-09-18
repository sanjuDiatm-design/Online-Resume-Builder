import React from 'react';
import '../StyleSheets/Features.css';

function Features() {
  return (
    <section className="features">
      <div className="header">
        <div className="dots">
          <span className="dot blue"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="dot red"></span>
          <span className="dot purple"></span>
        </div>
        <h2 className="title">Our Main Features</h2>
        <p className="subtitle">
          Discover the powerful features that make our CV builder 
          the best choice for job seekers and professionals alike.
        </p>
      </div>

      <div className="grid">
        <div className="card">
          <div className="icon orange">📝</div>
          <h3 className="card-title">Proven CV Templates to increase Hiring Chance</h3>
          <p className="card-desc">
            Choose from a variety of professionally designed templates 
            that are proven to catch recruiters' attention.
          </p>
        </div>

        <div className="card">
          <div className="icon blue">📁</div>
          <h3 className="card-title">Creative, Modern and Clean Templates Design</h3>
          <p className="card-desc">
            Stand out with creative and ATS-friendly templates, ensuring 
            your CV looks great on any device.
          </p>
        </div>

        <div className="card">
          <div className="icon red">📥</div>
          <h3 className="card-title">Easy and Intuitive Online Builder</h3>
          <p className="card-desc">
            Build your CV effortlessly with drag-and-drop editor 
            and real-time suggestions.
          </p>
        </div>

        <div className="card">
          <div className="icon green">🌐</div>
          <h3 className="card-title">Free to use, built by hiring pros</h3>
          <p className="card-desc">
            Access all features for free, created by experts 
            to help you succeed in your job search.
          </p>
        </div>

        <div className="card">
          <div className="icon yellow">🔔</div>
          <h3 className="card-title">Recruiter Approved Phrases</h3>
          <p className="card-desc">
            Get recruiter-approved phrases and instant 
            notifications to optimize your CV.
          </p>
        </div>

        <div className="card">
          <div className="icon blue">⚡</div>
          <h3 className="card-title">Fast & Easy Formatting</h3>
          <p className="card-desc">
            Format your CV quickly with smart tools for 
            a polished, professional look every time.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
