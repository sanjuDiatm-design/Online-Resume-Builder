// Import React
import React from 'react';
// Import useNavigate hook from react-router-dom (used for page navigation)
import { useNavigate } from 'react-router-dom';
// Import CSS file for styling
import '../StyleSheets/Templates.css';
// Importing images (resume template previews)
import templateOne from '../../public/images/template/template-one.png';
import templateTwo from '../../public/images/template/template-two.png';
import templateThree from '../../public/images/template/template-three.png';

function Templates() {
  // useNavigate helps us move to another page programmatically
  const navigate = useNavigate();

  // Function called when user clicks "Use This Template" button
  function handleChoose(templateId) {
    // Navigates to build page with selected templateId
    navigate(`/build/${templateId}`);
  }

  return (
    // Main wrapper section for templates
    <section className="templates">

      {/* Header part - Title, Subtitle and Colored dots */}
      <div className="templates__header">
        {/* Colored Dots */}
        <div className="templates__dots">
          <span className="templates__dot templates__dot--blue"></span>
          <span className="templates__dot templates__dot--yellow"></span>
          <span className="templates__dot templates__dot--green"></span>
          <span className="templates__dot templates__dot--red"></span>
          <span className="templates__dot templates__dot--purple"></span>
        </div>
        {/* Heading and small subtitle */}
        <h2 className="templates__title">Our Creative Templates</h2>
        <p className="templates__subtitle">
          Choose from our modern and professional resume templates to stand out in hiring.
        </p>
      </div>

      {/* Template Cards Section */}
      <div className="templates__cards">

        {/* Card 1 */}
        <div className="templates__card">
          <img src={templateOne} alt="Template One" className="templates__image" />
          <button
            className="templates__btn"
            onClick={() => handleChoose('template-one')}>
            USE THIS TEMPLATE
          </button>
        </div>

        {/* Card 2 */}
        <div className="templates__card">
          <img src={templateTwo} alt="Template Two" className="templates__image" />
          <button
            className="templates__btn"
            onClick={() => handleChoose('template-two')}>
            USE THIS TEMPLATE
          </button>
        </div>

        {/* Card 3 */}
        <div className="templates__card">
          <img src={templateThree} alt="Template Three" className="templates__image" />
          <button
            className="templates__btn"
            onClick={() => handleChoose('template-three')}>
            USE THIS TEMPLATE
          </button>
        </div>
      </div>
    </section>
  );
}

export default Templates;
