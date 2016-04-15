'use strict';

export class Line {
    
    private line: string;
    private description: string;
    
    public get Line(): string {
        return this.line;
    }
    
    public get Description(): string {
        return this.description;
    }
    
    constructor(line: string, description: string) {
        this.line = line;
        this.description = description;
    }
}

export class Spot {
    
    private latitude: number;
    private longitude: number;
    private returning: boolean;
    
    public get Latitude(): number {
        return this.latitude;
    }
    
    public get Longitude(): number {
        return this.longitude;
    }
    
    public get isReturning(): boolean {
        return this.returning;
    }
    
    constructor(latitude: number, longitude: number, returning: boolean) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.returning = returning;
    }
}

export class Itinerary extends Line {
    
    private agency: string;
    private spots: Spot[];
    
    public get Agency(): string {
        return this.agency;
    }
    
    public get Spots(): Spot[] {
        return this.spots;
    }
    
    constructor(line: string, description: string, agency: string, spots: Spot[]) {
        super(line, description);
        this.agency = agency;
        this.spots = spots;
    }
}