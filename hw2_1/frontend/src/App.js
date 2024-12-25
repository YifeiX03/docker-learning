import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const response = await axios.get('/api/receiver/message');
    setMessages(response.data);
  };

  const sendMessage = async () => {
    await axios.post('/api/sender/message', { message: newMessage });
    setNewMessage('');
    fetchMessages();
  };

  return (
    <div className="App">
      <h1>Kafka Message System</h1>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg, index) => (
            <tr key={index}>
              <td>{msg}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
