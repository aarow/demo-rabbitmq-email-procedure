const amqp = require("amqplib");

const rabbitmqUrl = process.env.RABBITMQ_URL;
const exchangeName = "mq-test-exchange";
const queue = "";

module.exports = listenRabbitMQ;

function listenRabbitMQ(io, fn) {
  connect(rabbitmqUrl).then(async (channel) => {
    channel.assertExchange(exchangeName, "fanout", {
      durable: false,
    });

    const q = await channel.assertQueue(queue, { exclusive: true });

    // binding the queue
    const binding_key = "";
    channel.bindQueue(q.queue, exchangeName, binding_key);

    console.log("consuming messages from queue: ", q.queue);
    channel.consume(q.queue, (msg) => {
      if (msg.content) {
        io.emit("message", msg.content.toString());
        fn(msg.content.toString());
        console.log("Received message: ", msg.content.toString());
      }
      channel.ack(msg);
    });
  });
}

async function connect(url) {
  if (!url) {
    throw new Error("RabbitMQ URL not found");
  }
  const connection = await amqp.connect(url);
  const channel = await connection.createChannel();
  return channel;
}

async function sendEmail(data) {}
