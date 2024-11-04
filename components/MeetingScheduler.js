import React, { useState } from 'react';
import moment from 'moment-timezone';
import axios from 'axios';
import './MeetingScheduler.css';


const MeetingScheduler = () => {
  const [teamMembers, setTeamMembers] = useState([
    { name: '', timeZone: moment.tz.guess(), selectedTime: '09:00', selectedDate: moment().format('YYYY-MM-DD') },
  ]);
  const [commonTime, setCommonTime] = useState(null);

  // Handle changes to team member fields
  const handleMemberChange = (index, field, value) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers[index][field] = value;
    setTeamMembers(updatedTeamMembers);
  };

  // Add a new team member to the form
  const addTeamMember = () => {
    setTeamMembers([
      ...teamMembers,
      { name: '', timeZone: moment.tz.guess(), selectedTime: '09:00', selectedDate: moment().format('YYYY-MM-DD') },
    ]);
  };

  // Remove a team member from the form
  const removeTeamMember = (index) => {
    const updatedTeamMembers = [...teamMembers];
    updatedTeamMembers.splice(index, 1);
    setTeamMembers(updatedTeamMembers);
  };

  // Calculate common time for the meeting
  const calculateCommonTime = () => {
    const times = teamMembers.map((member) =>
      moment.tz(`${member.selectedDate}T${member.selectedTime}`, member.timeZone)
    );

    const earliestTime = moment.max(times);
    const latestTime = moment.min(times);

    if (earliestTime.isSameOrBefore(latestTime)) {
      setCommonTime(earliestTime.format('YYYY-MM-DD HH:mm z'));
    } else {
      setCommonTime('No common time available');
    }
  };

  // Save meeting data to the backend
  const handleSave = async () => {
    const loggedInUserEmail = localStorage.getItem('userEmail');

    try {
      const response = await axios.post(
        'http://localhost:9000/save-meeting',
        { teamMembers, commonTime },
        { headers: { 'user-email': loggedInUserEmail } }
      );

      if (response.status === 201) {
        alert('Meeting saved successfully!');
      } else {
        alert('Unexpected response while saving the meeting.');
      }
    } catch (error) {
      console.error('Error saving meeting:', error);
      alert('Failed to save meeting.');
    }
  };

  return (
    <div>
      <h2>Schedule a Meeting</h2>
      {teamMembers.map((member, index) => (
        <div key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
          <input
            type="text"
            placeholder="Member Name"
            value={member.name}
            onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
          />
          <select
            value={member.timeZone}
            onChange={(e) => handleMemberChange(index, 'timeZone', e.target.value)}
          >
            {moment.tz.names().map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
          <input
            type="date"
            value={member.selectedDate}
            onChange={(e) => handleMemberChange(index, 'selectedDate', e.target.value)}
          />
          <input
            type="time"
            value={member.selectedTime}
            onChange={(e) => handleMemberChange(index, 'selectedTime', e.target.value)}
          />
          <button type="button" onClick={() => removeTeamMember(index)}>
            Remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addTeamMember}>
        Add Team Member
      </button>
      <button type="button" onClick={calculateCommonTime}>
        Calculate Common Time
      </button>
      {commonTime && <p>Common Meeting Time: {commonTime}</p>}
      <button type="button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default MeetingScheduler;
