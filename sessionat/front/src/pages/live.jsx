import React, { useState, useEffect } from 'react';
import { JitsiMeeting } from 'react-jitsi';

const ScheduleMeeting = () => {
  const [meetingDetails, setMeetingDetails] = useState({
    title: '',
    date: '',
    time: '',
    roomName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeetingDetails((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const roomName = `${meetingDetails.title}-${Date.now()}`;
    setMeetingDetails((prev) => ({
      ...prev,
      roomName: roomName
    }));
  };

  return (
    <div>
      <h2>Schedule a Meeting</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="title" 
          placeholder="Meeting Title" 
          value={meetingDetails.title} 
          onChange={handleChange} 
        />
        <input 
          type="date" 
          name="date" 
          value={meetingDetails.date} 
          onChange={handleChange} 
        />
        <input 
          type="time" 
          name="time" 
          value={meetingDetails.time} 
          onChange={handleChange} 
        />
        <button type="submit">Schedule</button>
      </form>

      {meetingDetails.roomName && (
        <div>
          <h3>Join your Meeting</h3>
          <JitsiMeeting
            roomName={meetingDetails.roomName}
            configOverwrite={{
              prejoinPageEnabled: false
            }}
            interfaceConfigOverwrite={{
              filmStripOnly: false
            }}
            userInfo={{
              displayName: 'User'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleMeeting;
