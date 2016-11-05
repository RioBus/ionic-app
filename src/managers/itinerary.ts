import { ItineraryService } from '../services/itinerary';
import { ItineraryDAO } from '../dao/itinerary';
import { Itinerary } from '../models/itinerary';
import { Injectable } from '@angular/core';

/**
 * ItineraryManager class is responsible for handling the access to the
 * Itinerary data you need to retrieve. It abstracts all the logic operations
 * needed to guarantee that you will receive your data when requested.
 *
 * @class {ItineraryManager}
 */
@Injectable()
export class ItineraryManager {

    public constructor(private service: ItineraryService, private dao: ItineraryDAO) {}

    /**
     * @private
     * Downloads the Itinerary from the external API.
     * @param {string} line - Itinerary line identifier
     * @return {Promise<Itinerary>}
     */
    private downloadItinerary(line: string): Promise<Itinerary> {
        return new Promise<Itinerary>(resolve => {
            this.service.getItinerary(line).then((data: Itinerary) =>
                this.dao.save(data).then(() => resolve(data) )
            );
        });
    }

    /**
     * Retrieves the requested Itinerary from the repository given a line identifier.
     * @param {string} line - Itinerary line identifier
     * @return {Promise<Itinerary>}
     */
    public getByLine(line: string): Promise<Itinerary> {
        return new Promise<Itinerary>(resolve => {
            this.dao.get(line).then(it => {
                if (it) resolve(it);
                else this.downloadItinerary(line).then(dit => resolve(dit));
            });
        });
    }
}
