import React from 'react';

const SuccessStories = () => {
  const stories = [
    {
      name: "Sarah K.",
      program: "Edenites AI Engineering Program",
      quote: "The AI program gave me the practical skills I needed to transition into this exciting field. I landed a job within 2 months of completing the course."
    },
    {
      name: "Michael T.",
      program: "Edenites Data Science Certificate",
      quote: "The hands-on projects were exactly what employers were looking for. I doubled my salary after completing the program."
    },
    {
      name: "Aisha B.",
      program: "Edenites Cybersecurity Bootcamp",
      quote: "The career coaching and interview prep made all the difference. I received three job offers after finishing the program."
    }
  ];

  return (
    <section className="success-stories">
      <h2>Success Stories</h2>
      <div className="stories-grid">
        {stories.map((story, index) => (
          <div className="story-card" key={index}>
            <div className="story-content">
              <p className="quote">"{story.quote}"</p>
              <div className="story-meta">
                <span className="name">{story.name}</span>
                <span className="program">{story.program}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SuccessStories;