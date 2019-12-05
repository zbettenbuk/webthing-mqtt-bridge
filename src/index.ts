import mqtt from 'mqtt';
import { MultipleThings, WebThingServer } from 'webthing';

import { DigooMotionSensor, MqttThing } from './things';
import logger from './logger';

const things: MqttThing[] = [
    new DigooMotionSensor()
];

const server = new WebThingServer(new MultipleThings(things, 'webthings-server'), 8888);

process.on('SIGINT', () => {
    server.stop().then(() => process.exit()).catch(() => process.exit());
});

server.start().catch(console.error);

const mqttClient = mqtt.connect('mqtt://home-server');

mqttClient.on('connect', () => {
    const topics: string[] = [];
    for(const thing of things) {
        const topic = thing.getTopic();

        if (topics.indexOf(topic) === -1) {
            logger.info(`Subscribing to MQTT topic ${topic}`);

            mqttClient.subscribe(topic);
            topics.push(topic);
        }
    }
});

mqttClient.on('message', (topic: string, message: Buffer) => {
    const messageString = message.toString();
    let messageObject
    try {
        messageObject = JSON.parse(messageString);
    } catch (error) {
        logger.warning(`Invalid MQTT message received on topic ${topic}: ${messageString}`)
        return;
    }
    
    logger.info(`MQTT message received on topic ${topic}: ${messageString}`);

    for(const thing of things) {
        try {
            if (thing.getTopic() === topic && thing.consume(messageObject)) {
                break;
            }
        } catch (error) {
            logger.error(`Error consuming message ${messageString} by thing ${thing.getTitle()}`);
        }
    }
});
