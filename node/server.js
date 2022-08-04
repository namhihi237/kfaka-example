const { Kafka } = require('kafkajs')
const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['localhost:9092'],
})


async function initSubscriber() {
  const consumer = kafka.consumer({ groupId: 'test-group' })
  await consumer.connect()
  await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        // @ts-ignore
        value: message.value.toString(),
      })
    },
  })
}

initSubscriber().then(() => {
  console.log("Starting subscription");
})