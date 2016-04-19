'use strict';

import { Line } from './itinerary';

export class History {
    
    private search: string;
    private timestamp: Date;
    private line: Line;
    
    public get Line(): Line {
        return this.line;
    }
    
    public get Timestamp(): Date {
        return this.timestamp;
    }
    
    public constructor(line: Line, timestamp: Date) {
        this.line = line;
        this.timestamp = timestamp;
    }
}