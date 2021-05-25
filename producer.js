const { Kafka } = require("kafkajs");
const msg = process.argv[2];

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: "producer01",
      brokers: ["localhost:9092"],
    });

    const producer = kafka.producer();
    console.log("Connecting.....");
    await producer.connect();
    console.log("Connected!");

    const result = await producer.send({
      topic: "users",
      messages: [
        {
          value: msg,
        //   partition: partition,
        },
      ],
    });
    console.log(`Send Successfully! ${JSON.stringify(result)}`);
    await producer.disconnect();
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
};
run();
