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
        return this.sort(result);
    }

    public getItinerary(line: string): Promise<Itinerary> {
        return new Promise<Itinerary>((resolve, reject) => {
            let url: string = `${API_ENDPOINT}/v3/itinerary/${line}`;
            this.http.get(url).subscribe(
                data => resolve(this.processItinerary(data.json())),
                error => reject(error)
            );
        });
    }

    public getItineraries(): Promise<Line[]> {
        return new Promise<Line[]>((resolve, reject) => {
            let url: string = `${API_ENDPOINT}/v3/itinerary`;
            this.http.get(url).subscribe(
                data => resolve(this.processLines(data.json())),
                error => reject(error)
            );
        });
    }

    private sort(items: Line[]): Line[] {
        return items.sort((a: Line, b: Line) => {
            if (!isNaN(parseInt(a.Line)) && !isNaN(parseInt(b.Line))) return (parseInt(a.Line) - parseInt(b.Line));
            else if (!isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return -1;
            else if (isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return 0;
            else return 1;
        });
    }
}