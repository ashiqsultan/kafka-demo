const { Kafka } = require("kafkajs");

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: "adminclient",
      brokers: ["localhost:9092"],
    });

    const admin = kafka.admin();
    console.log("Connecting.....");
    await admin.connect();
    console.log("Connected!");
    // Creating a topic
    await admin.createTopics({
      topics: [
        {
          topic: "users",
          numPartitions: 2,
        },
      ],
    });
    console.log("Created Successfully!");
    const topicList = await admin.listTopics()
    console.log("topicList",topicList);
    await admin.disconnect();
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
