const { Kafka } = require("kafkajs");

const run = async () => {
  try {
    const kafka = new Kafka({
      clientId: "appconsumer01",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({ groupId: "my-group" });
    console.log("Connecting.....");
    await consumer.connect();
    console.log("Connected!");
    await consumer.subscribe({
      topic: "users",
      fromBeginning: false,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log("New Message");
        console.log(result); // Complete result
        console.log("value");
        console.log(result.message.value.toString());
      },
    });
  } catch (err) {
    console.error(`Something bad happened ${err}`);
  } finally {
  }
};
run();
