// kafka-receiver/server.js
const express = require('express');
const { Kafka } = require('kafkajs');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());

const kafka = new Kafka({
  clientId: 'kafka-receiver',
  brokers: ['kafka:9092']
});

const consumer = kafka.consumer({ groupId: 'message-group' });
let db;

const connectToMongo = async () => {
  const client = await MongoClient.connect('mongodb://mongodb:27017');
  db = client.db('messagedb');
};

const startKafkaConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'messages', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ message }) => {
      const messageContent = JSON.parse(message.value.toString());
      await db.collection('messages').insertOne(messageContent);
    },
  });
};

app.get('/message', async (req, res) => {
  const messages = await db.collection('messages').find().toArray();
  res.json(messages);
});

const PORT = 5500;
app.listen(PORT, async () => {
  console.log(`Kafka Receiver running on port ${PORT}`);
  await connectToMongo();
  await startKafkaConsumer();
});
