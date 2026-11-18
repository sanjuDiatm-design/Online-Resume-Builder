import React from 'react';
import '../StyleSheets/Features.css';

const featureCards = [
  {
    icon: '📝',
    iconColor: 'orange',
    title: 'Proven CV Templates to increase Hiring Chance',
    desc: "Choose from a variety of professionally designed templates that are proven to catch recruiters' attention.",
    delay: 0,
  },
  {
    icon: '📁',
    iconColor: 'blue',
    title: 'Creative, Modern and Clean Templates Design',
    desc: 'Stand out with creative and ATS-friendly templates, ensuring your CV looks great on any device.',
    delay: 1,
  },
  {
    icon: '📥',
    iconColor: 'red',
    title: 'Easy and Intuitive Online Builder',
    desc: 'Build your CV effortlessly with drag-and-drop editor and real-time suggestions.',
    delay: 2,
  },
  {
    icon: '🌐',
    iconColor: 'green',
    title: 'Free to use, built by hiring pros',
    desc: 'Access all features for free, created by experts to help you succeed in your job search.',
    delay: 3,
  },
  {
    icon: '🔔',
    iconColor: 'yellow',
    title: 'Recruiter Approved Phrases',
    desc: 'Get recruiter-approved phrases and instant notifications to optimize your CV.',
    delay: 4,
  },
  {
    icon: '⚡',
    iconColor: 'blue',
    title: 'Fast & Easy Formatting',
    desc: 'Format your CV quickly with smart tools for a polished, professional look every time.',
    delay: 5,
  },
];

function Features() {
  return (
    <section className="features">
      <div className="features__header">
        <div className="features__dots">
          <span className="features__dot features__dot--blue"></span>
          <span className="features__dot features__dot--yellow"></span>
          <span className="features__dot features__dot--green"></span>
          <span className="features__dot features__dot--red"></span>
          <span className="features__dot features__dot--purple"></span>
        </div>
        <h2 className="features__title">Our Main Features</h2>
        <p className="features__subtitle">
          Discover the powerful features that make our CV builder
          the best choice for job seekers and professionals alike.
        </p>
      </div>

      <div className="features__grid">
        {featureCards.map((card, i) => (
          <div
            className={`features__card features__card--stagger-${card.delay}`}
            key={i}
          >
            <div className={`features__icon features__icon--${card.iconColor}`}>{card.icon}</div>
            <h3 className="features__card-title">{card.title}</h3>
            <p className="features__card-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
