import React, { useEffect } from 'react';

const SkillBar = ({ skill, percentage }) => (
  <div className="skill-bar">
    <div className="skill-name">
      {skill}
      <span className="skill-percentage">{percentage}%</span>
    </div>
    <div className="skill-progress">
      <div className="progress" style={{ width: `${percentage}%` }}></div>
    </div>
  </div>
);

const Skills = () => {
  const skills = [
    { name: 'Photoshop', percentage: 62 },
    { name: 'Illustrator', percentage: 84 },
    { name: 'Marketing', percentage: 78 },
    { name: 'Digital Painting', percentage: 58 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
              const percentage = bar.parentElement.previousElementSibling
                .querySelector('.skill-percentage').textContent;
              bar.style.width = percentage;
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
      observer.observe(skillsSection);
    }

    return () => {
      if (skillsSection) {
        observer.unobserve(skillsSection);
      }
    };
  }, []);

  return (
    <section className="skills" id="skills">
      <h2>Професійні навички</h2>
      {skills.map((skill, index) => (
        <SkillBar 
          key={index}
          skill={skill.name}
          percentage={skill.percentage}
        />
      ))}
    </section>
  );
};

export default Skills;
