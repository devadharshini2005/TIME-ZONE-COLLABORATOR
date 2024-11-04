import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SavedMeetings = () => {
  const [meetings, setMeetings] = useState([]);

  // Fetch saved meetings for the logged-in user
  const fetchMeetings = async () => {
    try {
      const loggedInUserEmail = localStorage.getItem('userEmail'); // Retrieve the user's email from localStorage
      const response = await axios.get('http://localhost:9000/get-meetings', {
        headers: { 'user-email': loggedInUserEmail },
      });

      if (response.status === 200) {
        setMeetings(response.data.meetings);
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  return (
    <div>
      <h2>Saved Meetings</h2>
      {meetings.length === 0 ? (
        <p>No saved meetings found.</p>
      ) : (
        meetings.map((meeting, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h3>Meeting {index + 1}</h3>
            <p><strong>Common Time:</strong> {meeting.commonTime}</p>
            <h4>Team Members:</h4>
            <ul>
              {meeting.teamMembers.map((member, idx) => (
                <li key={idx}>
                  <p><strong>Name:</strong> {member.name}</p>
                  <p><strong>Time Zone:</strong> {member.timeZone}</p>
                  <p><strong>Date:</strong> {member.selectedDate}</p>
                  <p><strong>Time:</strong> {member.selectedTime}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
};

export default SavedMeetings;
