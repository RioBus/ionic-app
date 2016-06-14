export class Bus {

    private line: string;
    private order: string;
    private speed: number;
    private latitude: number;
    private longitude: number;
    private timestamp: Date;
    private direction: string;
    private directionDegrees: number;

    public constructor(line: string, order: string, speed: number, directionDegrees: number, latitude: number, longitude: number, direction: string, timestamp: string) {
        this.line = line;
        this.order = order;
        this.speed = speed;
        this.directionDegrees = directionDegrees;
        this.latitude = latitude;
        this.longitude = longitude;
        this.direction = direction;
        this.timestamp = new Date(timestamp);
    }

    public get Line(): string {
        return this.line;
    }

    public get Order(): string {
        return this.order;
    }

    public get Speed(): number {
        return this.speed;
    }

    public get DirectionDegrees(): number {
        return this.directionDegrees;
    }

    public get Latitude(): number {
        return this.latitude;
    }

    public get Longitude(): number {
        return this.longitude;
    }

    public get Direction(): string {
        return this.direction;
    }

    public get Timestamp(): Date {
        return this.timestamp;
    }
}
