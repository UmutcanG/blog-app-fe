import React, { useEffect, useState } from 'react';
import { getWelcome } from '../../services/api';
import './Welcome.css';

const Welcome = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await getWelcome();
        setMessage(response.data);
      } catch (error) {
        console.error('Error fetching welcome message', error);
      }
    };

    fetchWelcomeMessage();
  }, []);

  return (
    <div className="welcome-container">
      <h2>Welcome</h2>
      <p>{message}</p>
    </div>
  );
};

export default Welcome;
