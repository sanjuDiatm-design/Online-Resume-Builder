import React from 'react';
import { Link } from 'react-router-dom';
import '../StyleSheets/About.css';

function About() {
  return (
    <section className="about">
      <div className="about__features">
        <div className="about__card">
          <div className="about__icon about__icon--blue">
            <span role="img" aria-label="thumbs up">👍</span>
          </div>
          <div>
            <h3 className="about__card-title about__card-title--blue">Easy Online Resume Builder</h3>
            <p className="about__card-desc">Create your professional resume in minutes with our intuitive and user-friendly platform. No design skills required—just fill in your details and choose a template.</p>
          </div>
        </div>
        <div className="about__card">
          <div className="about__icon about__icon--orange">
            <span role="img" aria-label="expert">🧑‍💼</span>
          </div>
          <div>
            <h3 className="about__card-title about__card-title--orange">Step By Step Expert Tips</h3>
            <p className="about__card-desc">Get personalized guidance at every stage. Our platform offers expert tips and suggestions to help you highlight your strengths and stand out to employers.</p>
          </div>
        </div>
        <div className="about__card">
          <div className="about__icon about__icon--green">
            <span role="img" aria-label="approved">🛒</span>
          </div>
          <div>
            <h3 className="about__card-title about__card-title--green">Recruiter Approved Phrases</h3>
            <p className="about__card-desc">Access a library of recruiter-approved phrases and keywords to ensure your resume passes screening systems and impresses hiring managers.</p>
          </div>
        </div>
      </div>
      <div className="about__info">
        <div className="about__dots">
          <span className="about__dot about__dot--blue"></span>
          <span className="about__dot about__dot--red"></span>
          <span className="about__dot about__dot--yellow"></span>
          <span className="about__dot about__dot--green"></span>
          <span className="about__dot about__dot--purple"></span>
        </div>
        <h2 className="about__title">Why Choose Our Platform?</h2>
        <p className="about__desc">Our CV builder is designed to simplify your job search. With a range of modern templates and real-time content suggestions, you can create a resume that truly reflects your skills and experience.</p>
        <p className="about__desc">Whether you're a recent graduate or an experienced professional, our platform helps you craft a compelling CV that gets noticed. Start building your future today with tools trusted by job seekers worldwide.</p>
        <Link to="/template">
          <button className="about__btn">LETS BUILD YOUR CV</button>
        </Link>
      </div>
    </section>
  );
}

export default About;
