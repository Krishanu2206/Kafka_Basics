const {kafka} = require('./client');
const group = process.argv[2];

async function init(){
    const consumer = kafka.consumer({groupId: group});
    console.log('Creating consumer');
    await consumer.connect();
    console.log('Consumer connected');

    await consumer.subscribe({ topics: ["driver-updates"], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
        console.log(`${group}: [${topic}]: PART:${partition} ${message.value.toString()}`);
        },
    });

}   

init();