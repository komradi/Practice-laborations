import React from 'react';

const Hero = () => {
  return (
    <section className="hero" id="about">
      <div className="decorative-line"></div>
      <div className="hero-content">
        <span>Привіт</span>
        <h1>Я Соловйов<br />Ілля</h1>
        <p>Full stack дизайнер, який створює креативні рішення та інноваційні проекти. 
           Спеціалізуюсь на UI/UX дизайні та веб-розробці.</p>
        <a href="#" className="cta-button">Завантажити CV</a>
      </div>
    </section>
  );
};

export default Hero;
