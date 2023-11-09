const amqp = require('amqplib');
const nodemailer = require('nodemailer');

async function startConsumer() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'registration_queue';

  channel.assertQueue(queue, { durable: false });
  console.log('Waiting for registration messages...');

  channel.consume(queue, (msg) => {
    const registrationData = JSON.parse(msg.content.toString());
    const email = registrationData.email
    
    console.log(`Thank You for registering with ${email}`)

    channel.ack(msg); // Acknowledge that the message has been processed
  });
}

module.exports = { startConsumer };
