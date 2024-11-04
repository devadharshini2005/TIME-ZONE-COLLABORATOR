import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    return (
        <div className="homepage-container">
            <section className="features">
                <h2>Features</h2>
                <div className="feature-card">
                    <h3><Link to="/timezone-dashboard">Time Zone Dashboard</Link></h3>
                    <p>View current times and availability for your team across multiple time zones.</p>
                </div>
                <div className="feature-card">
                    <h3><Link to="/saved-meetings">Saved Meetings</Link></h3>
                    <p>The meetings saved by the user can be seen here.</p>
                </div>
                <div className="feature-card">
                    <h3><Link to="/meeting-scheduler">Meeting Scheduler</Link></h3>
                    <p>Schedule meetings with participants in different time zones. Automatically find the best overlap.</p>
                </div>
                <div className="feature-card">
                    <h3><Link to="/notifications">Real-Time Notifications</Link></h3>
                    <p>Get notifications about meeting schedules and user availability instantly.</p>
                </div>
            </section>

            <footer className="footer">
                <p>© 2024 Time-Zone Collaboration Scheduler. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
