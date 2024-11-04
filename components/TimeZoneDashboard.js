// src/components/TimeZoneDashboard.js
import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import './TimeZoneDashboard.css';

const timeZones = [
  { country: 'India', zone: 'Asia/Kolkata' },
  { country: 'United States (Eastern)', zone: 'America/New_York' },
  { country: 'United States (Central)', zone: 'America/Chicago' },
  { country: 'United States (Mountain)', zone: 'America/Denver' },
  { country: 'United States (Pacific)', zone: 'America/Los_Angeles' },
  { country: 'Canada (Eastern)', zone: 'America/Toronto' },
  { country: 'Canada (Central)', zone: 'America/Winnipeg' },
  { country: 'Canada (Mountain)', zone: 'America/Edmonton' },
  { country: 'Canada (Pacific)', zone: 'America/Vancouver' },
  { country: 'United Kingdom', zone: 'Europe/London' },
  { country: 'Australia (Eastern)', zone: 'Australia/Sydney' },
  { country: 'Australia (Central)', zone: 'Australia/Adelaide' },
  { country: 'Australia (Western)', zone: 'Australia/Perth' },
  { country: 'Japan', zone: 'Asia/Tokyo' },
  { country: 'South Korea', zone: 'Asia/Seoul' },
  { country: 'Germany', zone: 'Europe/Berlin' },
  { country: 'France', zone: 'Europe/Paris' },
  { country: 'Italy', zone: 'Europe/Rome' },
  { country: 'Spain', zone: 'Europe/Madrid' },
  { country: 'Russia (Moscow)', zone: 'Europe/Moscow' },
  { country: 'Russia (St. Petersburg)', zone: 'Europe/Samara' },
  { country: 'Russia (Vladivostok)', zone: 'Asia/Vladivostok' },
  { country: 'Russia (Yekaterinburg)', zone: 'Asia/Yekaterinburg' },
  { country: 'China', zone: 'Asia/Shanghai' },
  { country: 'Brazil (Sao Paulo)', zone: 'America/Sao_Paulo' },
  { country: 'Argentina', zone: 'America/Argentina/Buenos_Aires' },
  { country: 'Mexico (Central)', zone: 'America/Mexico_City' },
  { country: 'Mexico (Pacific)', zone: 'America/Tijuana' },
  { country: 'South Africa', zone: 'Africa/Johannesburg' },
  { country: 'Egypt', zone: 'Africa/Cairo' },
  { country: 'Turkey', zone: 'Europe/Istanbul' },
  { country: 'Saudi Arabia', zone: 'Asia/Riyadh' },
  { country: 'Israel', zone: 'Asia/Jerusalem' },
  { country: 'New Zealand', zone: 'Pacific/Auckland' },
  { country: 'United Arab Emirates', zone: 'Asia/Dubai' },
  { country: 'Indonesia (Western)', zone: 'Asia/Jakarta' },
  { country: 'Indonesia (Central)', zone: 'Asia/Makassar' },
  { country: 'Indonesia (Eastern)', zone: 'Asia/Jayapura' },
  { country: 'Philippines', zone: 'Asia/Manila' },
  { country: 'Vietnam', zone: 'Asia/Ho_Chi_Minh' },
  { country: 'Pakistan', zone: 'Asia/Karachi' },
  { country: 'Bangladesh', zone: 'Asia/Dhaka' },
  { country: 'Malaysia', zone: 'Asia/Kuala_Lumpur' },
  { country: 'Thailand', zone: 'Asia/Bangkok' },
  { country: 'Singapore', zone: 'Asia/Singapore' },
  { country: 'Nepal', zone: 'Asia/Kathmandu' },
  { country: 'Sri Lanka', zone: 'Asia/Colombo' },
  { country: 'Portugal', zone: 'Europe/Lisbon' },
  { country: 'Greece', zone: 'Europe/Athens' },
  { country: 'Poland', zone: 'Europe/Warsaw' },
  { country: 'Netherlands', zone: 'Europe/Amsterdam' },
  { country: 'Ireland', zone: 'Europe/Dublin' },
  { country: 'Belgium', zone: 'Europe/Brussels' },
  { country: 'Sweden', zone: 'Europe/Stockholm' },
  { country: 'Switzerland', zone: 'Europe/Zurich' },
  { country: 'Norway', zone: 'Europe/Oslo' },
  { country: 'Finland', zone: 'Europe/Helsinki' },
  { country: 'Iceland', zone: 'Atlantic/Reykjavik' },
  { country: 'Chile', zone: 'America/Santiago' },
  { country: 'Peru', zone: 'America/Lima' },
  { country: 'Colombia', zone: 'America/Bogota' },
  { country: 'Venezuela', zone: 'America/Caracas' },
  { country: 'Cuba', zone: 'America/Havana' },
  { country: 'Jamaica', zone: 'America/Jamaica' },
  { country: 'Morocco', zone: 'Africa/Casablanca' },
  { country: 'Kenya', zone: 'Africa/Nairobi' },
  { country: 'Nigeria', zone: 'Africa/Lagos' },
  { country: 'Algeria', zone: 'Africa/Algiers' },
  { country: 'Ethiopia', zone: 'Africa/Addis_Ababa' },
  { country: 'Sudan', zone: 'Africa/Khartoum' },
  { country: 'Tunisia', zone: 'Africa/Tunis' },
];

const TimeZoneDashboard = () => {
  const [timeFormat, setTimeFormat] = useState('12-hour'); // Default format
  const [times, setTimes] = useState({});

  useEffect(() => {
    const updateTimes = () => {
      const newTimes = {};
      timeZones.forEach(tz => {
        newTimes[tz.zone] = moment.tz(tz.zone).format(timeFormat === '12-hour' ? 'hh:mm A' : 'HH:mm');
      });
      setTimes(newTimes);
    };

    updateTimes();
    const intervalId = setInterval(updateTimes, 1000);

    return () => clearInterval(intervalId);
  }, [timeFormat]);

  const toggleTimeFormat = () => {
    setTimeFormat(timeFormat === '12-hour' ? '24-hour' : '12-hour');
  };

  return (
    <div className='full'>
    <div className="timezone-dashboard">
      <h2>World Time Zone Dashboard</h2>
      <button onClick={toggleTimeFormat}>
        Switch to {timeFormat === '12-hour' ? '24-hour' : '12-hour'} mode
      </button>
      <div className="timezone-grid">
        {timeZones.map(tz => (
          <div key={tz.zone} className="timezone-item">
            <strong>{tz.country}</strong>
            <span>{times[tz.zone] || 'Loading...'}</span>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default TimeZoneDashboard;
