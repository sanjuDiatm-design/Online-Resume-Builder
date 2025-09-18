import React, { useState } from 'react';
import '../StyleSheets/Contact.css';

function Contact() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus('Thanks! Your message has been recorded (demo).');
  }

  return (
    <section className="contact">
      <div className="contact__container">
        <header className="contact__header">
          <h1 className="contact__title">Contact Us</h1>
          <p className="contact__subtitle">Have questions or feedback? Send us a message and we’ll get back to you shortly.</p>
        </header>

        <div className="contact__grid">
          <form className="contact__form" onSubmit={handleSubmit}>
            <label className="contact__label">
              Name
              <input className="contact__input" name="name" value={formState.name} onChange={handleChange} placeholder="Your full name" required />
            </label>
            <label className="contact__label">
              Email
              <input className="contact__input" type="email" name="email" value={formState.email} onChange={handleChange} placeholder="you@example.com" required />
            </label>
            <label className="contact__label">
              Subject
              <input className="contact__input" name="subject" value={formState.subject} onChange={handleChange} placeholder="What is this about?" />
            </label>
            <label className="contact__label">
              Message
              <textarea className="contact__textarea" name="message" value={formState.message} onChange={handleChange} placeholder="How can we help?" rows={6} required />
            </label>
            <button className="contact__button" type="submit">Send Message</button>
            {status && <p className="contact__status" role="status">{status}</p>}
          </form>

          <aside className="contact__info">
            <h2 className="contact__info-title">Get in touch</h2>
            <p className="contact__info-text">Email: sakshamwork47@gmail.com</p>
            <p className="contact__info-text">Phone: +91 6006915762</p>
            <p className="contact__info-text">Address: Ludhiana, Punjab</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Contact;


