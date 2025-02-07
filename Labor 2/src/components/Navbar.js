import React from 'react';

const Navbar = () => {
  const scrollToSection = (sectionId) => {
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav>
      <div className="logo">Соловйов Ілля</div>
      <div className="nav-links">
        <a href="#about" onClick={(e) => {
          e.preventDefault();
          scrollToSection('#about');
        }}>Про мене</a>
        <a href="#skills" onClick={(e) => {
          e.preventDefault();
          scrollToSection('#skills');
        }}>Навички</a>
        <a href="#contact" onClick={(e) => {
          e.preventDefault();
          scrollToSection('#contact');
        }}>Контакти</a>
      </div>
    </nav>
  );
};

export default Navbar;