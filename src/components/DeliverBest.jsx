import React from 'react';
import '../StyleSheets/DeliverBest.css';

function DeliverBest() {
  return (
    <section className="deliver">
      <div className="content">
        <div className="dots">
          <span className="dot blue"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="dot red"></span>
          <span className="dot purple"></span>
        </div>
        <h2 className="title">We Deliver The Best</h2>
        <ul className="list">
          <li><span className="check">✔</span> Proven CV Templates engineered to maximize interview rates</li>
          <li><span className="check">✔</span> ATS-friendly layouts optimized for recruitment algorithms</li>
          <li><span className="check">✔</span> Real-time interactive two-column preview builder</li>
          <li><span className="check">✔</span> Instant PDF download, DOCX export & direct printing</li>
          <li><span className="check">✔</span> Dynamic experiences, projects, skills chips & color themes</li>
          <li><span className="check">✔</span> Cloud saving & multi-device resume management</li>
        </ul>
      </div>
      <div className="image-box">
        <img
          src="/images/cv-img.png"
          alt="Resume Showcase Example"
          className="image"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      </div>
    </section>
  );
}

export default DeliverBest;
