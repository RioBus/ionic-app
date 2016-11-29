import { API_ENDPOINT } from '../const';
import { Itinerary, Line, Spot } from '../models/itinerary';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/**
 * ItineraryService class is responsible for doing the Http requests and retrieve
 * Itinerary data from external providers.
 * @class {ItineraryService} 
 */
@Injectable()
export class ItineraryService {

    public constructor(private http: Http) {}

    /**
     * @private
     * Preprocesses the received itinerary data to turn into an Itinerary instance.
     * @param {any} obj - received data
     * @return {Itinerary}
     */
    private processItinerary(obj: any): Itinerary {
        let spots: Spot[] = [];
        obj.spots.forEach((spot) => {
            spots.push(new Spot(spot.latitude, spot.longitude, spot.returning));
        });
        return new Itinerary(obj.line, obj.description, obj.agency, spots);
    }

    /**
     * @private
     * Preprocesses the received line array to turn into an array of Line instances.
     * @param {any[]} obj - received data list
     * @return {Line[]}
     */
    private processLines(obj: any[]): Line[] {
        let result: Line[] = [];
        obj.forEach((data) => {
            result.push(new Line(data.line, data.description));
        });
        return this.sort(result);
    }

    /**
     * Retrieves a single Itinerary from the external API
     * @param {string} line - Itinerary line identifier
     * @return {Promise<Itinerary>}
     */
    public getItinerary(line: string): Promise<Itinerary> {
        return new Promise<Itinerary>((resolve, reject) => {
            let url: string = `${API_ENDPOINT}/v3/itinerary/${line}`;
            this.http.get(url).subscribe(
                data => resolve(this.processItinerary(data.json())),
                error => reject(error)
            );
        });
    }

    /**
     * Retrieves the list of Line instances from external API
     * @return {Promise<Line[]>}
     */
    public getItineraries(): Promise<Line[]> {
        return new Promise<Line[]>((resolve, reject) => {
            let url: string = `${API_ENDPOINT}/v3/itinerary`;
            this.http.get(url).subscribe(
                data => resolve(this.processLines(data.json())),
                error => reject(error)
            );
        });
    }

    /**
     * @private
     * Sorts the Line array based on line identifier
     * @param {Line[]} items - Array of Line
     * @return {Line[]}
     */
    private sort(items: Line[]): Line[] {
        return items.sort((a: Line, b: Line) => {
            if (!isNaN(parseInt(a.Line)) && !isNaN(parseInt(b.Line))) return (parseInt(a.Line) - parseInt(b.Line));
            else if (!isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return -1;
            else if (isNaN(parseInt(a.Line)) && isNaN(parseInt(b.Line))) return 0;
            else return 1;
        });
    }
}
