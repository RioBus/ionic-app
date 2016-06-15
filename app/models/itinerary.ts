export class Line {

    private line: string;
    private description: string;

    public constructor(line: string, description: string) {
        this.line = line;
        this.description = description;
    }

    public get Line(): string {
        return this.line;
    }

    public get Description(): string {
        return this.description;
    }
}

export class Spot {

    private latitude: number;
    private longitude: number;
    private returning: boolean;

    public constructor(latitude: number, longitude: number, returning: boolean) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.returning = returning;
    }

    public get Latitude(): number {
        return this.latitude;
    }

    public get Longitude(): number {
        return this.longitude;
    }

    public get isReturning(): boolean {
        return this.returning;
    }
}

export class Itinerary extends Line {

    private agency: string;
    private spots: Spot[];

    public constructor(line: string, description: string, agency: string, spots: Spot[]) {
        super(line, description);
        this.agency = agency;
        this.spots = spots;
    }

    public get Agency(): string {
        return this.agency;
    }

    public get Spots(): Spot[] {
        return this.spots;
    }
}

export class ItineraryMap {

    private itineraries: any = {};

    public constructor(itineraries: Itinerary[] = []) {
        this.map(itineraries);
    }

    public get Lines(): string[] {
        return Object.keys(this.itineraries);
    }

    private map(itineraries: Itinerary[]): void {
        itineraries.forEach(itinerary => this.itineraries[itinerary.Line] = itinerary);
    }

    public save(itinerary: Itinerary): void {
        this.itineraries[itinerary.Line] = itinerary;
    }

    public get(line: string): Itinerary {
        return this.itineraries[line] || null;
    }

    public remove(obj: Itinerary): void {
        delete this.itineraries[obj.Line];
    }
}
