const model = require('../models/userinfo')
const amqp = require('amqplib')

exports.register = async(req, res) => {
  try {
    const {name, email} = req.body

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const repeatEmail = await model.findOne({ email: email })
    if (repeatEmail) {
        res.status(400).json({ message: "user Email already exists!!" })
        return
    }

    const queue = 'registration_queue';
    const message = JSON.stringify({ email });

    channel.assertQueue(queue, { durable: false });
    channel.sendToQueue(queue, Buffer.from(message));

    const userCreate = await model.create({ name, email })
    if (!userCreate) {
      res.status(400).json({ message: 'Sign Up Failed!' })
      return
    }

    if(userCreate) {
      await userCreate.save()
      res.status(200).json({
        message: 'User Signed Up', 
        data: userCreate
      })
    }

    console.log(`Sent registration message for ${email}`);
    
    connection.close();

    return

  }catch {
    return res.status(400).json({msg: 'Invalid request'})
  }
}