// kafka-sender/server.js
const express = require('express');
const { Kafka } = require('kafkajs');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const kafka = new Kafka({
  clientId: 'kafka-sender',
  brokers: ['kafka:9092']
});

const producer = kafka.producer();

app.post('/message', async (req, res) => {
  const { content } = req.body;
  await producer.connect();
  await producer.send({
    topic: 'messages',
    messages: [{ value: JSON.stringify({ content, timestamp: new Date() }) }],
  });
  await producer.disconnect();
  res.status(200).json({ message: 'Message sent to Kafka' });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Kafka Sender running on port ${PORT}`));
