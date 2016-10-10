import { Line } from './itinerary';

export class History {

    private timestamp: Date;
    private line: Line;
    private timesSearched: number;

    public get Line(): Line {
        return this.line;
    }

    public get Timestamp(): Date {
        return this.timestamp;
    }

    public get count(): number {
        return this.timesSearched;
    }

    public constructor(line: Line, timestamp: Date, timesSearched: number = 0) {
        this.line = line;
        this.timestamp = timestamp;
        this.timesSearched = timesSearched;
    }

    public incrementCounter(): void {
        this.timesSearched++;
    }
}
