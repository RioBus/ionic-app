'use strict';
import { API_ENDPOINT } from '../const';
import { Itinerary, Line, Spot } from '../models/itinerary';
import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()
export class ItineraryService {
    
    private http: Http;
    
    constructor(http: Http) {
        this.http = http;
    }

    private processItinerary(obj: any): Itinerary {
        let spots: Spot[] = [];
        obj.spots.forEach((spot) => {
            spots.push(new Spot(spot.latitude, spot.longitude, spot.returning));
        });
        return new Itinerary(obj.line, obj.description, obj.agency, spots);
    }

    private processLines(obj: any[]): Line[] {
        let result: Line[] = [];
        obj.forEach((data) => {
            result.push(new Line(data.line, data.description));
        });
        return result;
    }
    
    public getItinerary(line: string): Promise<Itinerary> {
        return new Promise<Itinerary>(resolve => {
            let url: string = `${API_ENDPOINT}/v3/itinerary/${line}`;
            this.http.get(url).subscribe(data => resolve( this.processItinerary( data.json() ) ) );
        });
    }
    
    public getItineraries(): Promise<Line[]> {
        return new Promise<Line[]>(resolve => {
            let url: string = `${API_ENDPOINT}/v3/itinerary`;
            this.http.get(url).subscribe(data => resolve( this.processLines( data.json() ) ) );
        });
    }
}