import React from 'react';
import '../StyleSheets/DeliverBest.css';
import cvImg from '../../public/images/cv-img.png';

function DeliverBest() {
  return (
    <section className="deliver">
      <div className="content">
        {/* This <div> holds all the text parts (title, dots, list). */}
        <div className="dots">
          <span className="dot blue"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <span className="dot red"></span>
          <span className="dot purple"></span>
        </div>
        <h2 className="title">We Deliver The Best</h2>
        <ul className="list">
          <li><span className="check">✔</span> Proven CV Templates to increase Hiring Chance</li>
          <li><span className="check">✔</span> Creative and Clean Templates Design</li>
          <li><span className="check">✔</span> Easy and Intuitive Online CV Builder</li>
          <li><span className="check">✔</span> Free to use. Developed by hiring professionals.</li>
          <li><span className="check">✔</span> Fast Easy CV and Resume Formatting</li>
          <li><span className="check">✔</span> Recruiter Approved Phrases.</li>
        </ul>
      </div>
      <div className="image-box">
        <img src={cvImg} alt="CV Example" className="image" />
      </div>
    </section>
  );
}

export default DeliverBest;
