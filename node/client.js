const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})

const producer = kafka.producer()

async function sendMessage(message) {
  await producer.connect()
  await producer.send({
    topic: 'test-topic',
    messages: [
      { value: 'Hello KafkaJS user!' },
    ],
  })

  await producer.disconnect()
}

sendMessage('Hello KafkaJS user!').then(() => {
  console.log("sendMessage");
}).catch(err => {
  console.log(err);
});