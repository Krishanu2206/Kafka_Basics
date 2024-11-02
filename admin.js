const {kafka} = require('./client');

async function init(){
    const admin = kafka.admin();
    console.log("Admin conneecting");
    admin.connect();
    console.log("Admin connected");

    console.log("Creating topic : driver-updates")
    await admin.createTopics({
        topics: [{
            topic: 'driver-updates',
            numPartitions: 2,
        }]
    })
    console.log("Topic driver-updates created");

    console.log("Disconnecting admin");
    await admin.disconnect();
}

init();