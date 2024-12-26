import React from 'react';
import './page.css';

const About = () => {
  return (
    <div>
      <main>
        <section className="hero">
          <div className="container">
            <h1>About Fitness Geek</h1>
            <p>Your all-in-one solution to monitor and improve your health and fitness journey.</p>
          </div>
        </section>

        <section className="details">
          <div className="container">
            <h2>What We Offer</h2>
            <p>Our web app helps you achieve your health and fitness goals by tracking key metrics and providing tailored insights.</p>
            <div className="features-grid">
              <div className="feature">
                <h3>Calorie Intake</h3>
                <p>Monitor your daily food consumption to stay on top of your nutritional goals.</p>
              </div>
              <div className="feature">
                <h3>Weight Tracking</h3>
                <p>Log your weight progress over time and visualize your journey toward your goal.</p>
              </div>
              <div className="feature">
                <h3>Water Intake</h3>
                <p>Keep hydrated by tracking your daily water intake.</p>
              </div>
              <div className="feature">
                <h3>Steps</h3>
                <p>Set step goals and track your activity level throughout the day.</p>
              </div>
              <div className="feature">
                <h3>Sleep</h3>
                <p>Track your sleeping patterns and improve your rest for better recovery.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mission">
          <div className="container">
            <h2>Our Mission</h2>
            <p>To empower individuals to take control of their health and wellness through data-driven insights and personalized recommendations.</p>
          </div>
        </section>

        <section className="team">
          <div className="container">
            <h2>About the Developer</h2>
            <p>This web app was created as part of a thesis project to merge technology and health, providing users with a simple yet comprehensive health management tool.</p>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>&copy; 2024 Fitness Geek.</p>
        </div>
      </footer>
    </div>
  );
};

export default About;
