import { Thing } from 'webthing';

export default abstract class MqttThing extends Thing {
    constructor(id: string, title: string, type: string, description: string) {
        super(id, title, type, description);
    };

    public abstract consume(mqttMessage: any): boolean;
    public abstract getTopic(): string;
}
