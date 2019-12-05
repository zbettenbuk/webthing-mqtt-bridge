import { Event, Thing } from 'webthing';

import logger from '../../logger';

import MqttThing from '../MqttThing';

const MOTION_EVENT = 'motion';

class MotionEvent extends Event {
    constructor(thing: Thing) {
        super(thing, MOTION_EVENT, undefined);
    }
}

export default class DigooMotionSensor extends MqttThing {
    constructor() {
        super(
            'urn:dzh:digoo-motion-sensor',
            'Digoo Motion Sensor',
            'motion',
            'Digoo RF433 based motion sensor'
        );

        this.addAvailableEvent(MOTION_EVENT, undefined);
    }

    public consume(mqttMessage: any): boolean {
        if (mqttMessage.RfReceived && mqttMessage.RfReceived.Data === 'F56C66') {
            this.addEvent(new MotionEvent(this));
            logger.info(`MQTT message ${JSON.stringify(mqttMessage)} consumed by ${this.getTitle()}`);
            return true;
        }

        return false;
    }

    public getTopic(): string {
        return 'tele/433-bridge/RESULT';
    }
}