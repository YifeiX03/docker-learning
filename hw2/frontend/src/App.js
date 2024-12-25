// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await axios.get(`${process.env.REACT_APP_KAFKA_RECEIVER_URL}/message`);
    setMessages(response.data);
  };

  const sendMessage = async () => {
    await axios.post(`${process.env.REACT_APP_KAFKA_SENDER_URL}/message`, { content: newMessage });
    setNewMessage('');
    fetchMessages();
  };

  return (
    <div>
      <h1>Kafka Message System</h1>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send Message</button>
      <h2>Messages:</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Content</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td>{msg._id}</td>
              <td>{msg.content}</td>
              <td>{msg.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
