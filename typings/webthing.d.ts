declare module 'webthing' {
    class Event {
        constructor(thing: Thing, name: string, data: any);
    }

    class MultipleThings {
        constructor(things: any[], name: string) ;
    }

    class Thing {
        constructor(id: string, title: string, type: string, description: string);
        public addAvailableEvent(name: string, metadata?: object);
        public addEvent(event: any);
        public getTitle(): string;
    }

    class WebThingServer {
        constructor(things: any, port: number);
        public start(): Promise<void>;
        public stop(): Promise<void>;
    }
}