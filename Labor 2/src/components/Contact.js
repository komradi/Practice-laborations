import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    /* Тут була повинна буть логіка додання форми, але це не думаю що обовязково. */
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact" id="contact">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Ваше ім'я"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Ваш email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Ваше повідомлення"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="cta-button">
          Надіслати повідомлення
        </button>
      </form>
    </section>
  );
};

export default Contact;