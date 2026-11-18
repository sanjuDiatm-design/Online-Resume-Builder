import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../StyleSheets/Templates.css';

const TEMPLATES_LIST = [
  {
    id: 'template-one',
    name: 'Modern Clean',
    category: 'Popular',
    description: 'A polished, minimalist layout featuring clear visual hierarchy, elegant divider lines, and clean typography.',
    image: '/images/template/template-one.png',
  },
  {
    id: 'template-two',
    name: 'Executive Sidebar',
    category: 'Executive',
    description: 'A striking two-column design with a distinct accent sidebar for personal details, skills, and education.',
    image: '/images/template/template-two.png',
  },
  {
    id: 'template-three',
    name: 'Tech Accent',
    category: 'Creative / Tech',
    description: 'Contemporary tech timeline layout with accent top bar, badge tags, and dedicated project cards.',
    image: '/images/template/template-three.png',
  },
  {
    id: 'template-four',
    name: 'Minimal ATS',
    category: 'ATS-Friendly',
    description: 'Single-column high-contrast layout optimized for Applicant Tracking Systems and traditional industries.',
    image: '/images/template/template-one.png', // Fallback preview
  },
];

function Templates() {
  const navigate = useNavigate();

  function handleChoose(templateId) {
    navigate(`/build/${templateId}`);
  }

  return (
    <section className="templates">
      <div className="templates__header">
        <div className="templates__dots">
          <span className="templates__dot templates__dot--blue"></span>
          <span className="templates__dot templates__dot--yellow"></span>
          <span className="templates__dot templates__dot--green"></span>
          <span className="templates__dot templates__dot--red"></span>
          <span className="templates__dot templates__dot--purple"></span>
        </div>
        <h2 className="templates__title">Job-Winning Resume Templates</h2>
        <p className="templates__subtitle">
          Engineered by HR experts and developers to pass ATS filters and impress hiring managers.
        </p>
      </div>

      <div className="templates__cards">
        {TEMPLATES_LIST.map((template) => (
          <div key={template.id} className="templates__card">
            <div className="templates__card-badge">{template.category}</div>
            <div className="templates__image-container">
              <img
                src={template.image}
                alt={template.name}
                className="templates__image"
                onError={(e) => {
                  e.target.src = '/images/template/template-bg.png';
                }}
              />
            </div>
            <div className="templates__info">
              <h3 className="templates__card-name">{template.name}</h3>
              <p className="templates__card-desc">{template.description}</p>
              <button
                className="templates__btn"
                onClick={() => handleChoose(template.id)}
              >
                USE THIS TEMPLATE
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Templates;
