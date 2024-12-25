from fastapi import FastAPI
from kafka import KafkaConsumer
from pymongo import MongoClient
import json
import threading

app = FastAPI()
client = MongoClient('mongodb://mongodb:27017/')
db = client['message_db']
collection = db['messages']

consumer = KafkaConsumer('messages', bootstrap_servers=['kafka:9092'],
                         value_deserializer=lambda m: json.loads(m.decode('utf-8')))

def consume_messages():
    for message in consumer:
        collection.insert_one(message.value)

@app.on_event("startup")
async def startup_event():
    threading.Thread(target=consume_messages, daemon=True).start()

@app.get("/message")
async def get_messages():
    messages = collection.find({}, {'_id': 0, 'message': 1})
    return [msg['message'] for msg in messages]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=6000)
