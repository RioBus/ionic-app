import { ItineraryService } from '../services/itinerary';
import { LinesDAO } from '../dao/lines';
import { Line } from '../models/itinerary';
import { Injectable } from '@angular/core';

/**
 * LineManager class is responsible for handling the access to the
 * Line data you need to retrieve. It abstracts all the logic operations
 * needed to guarantee that you will receive your data when requested.
 *
 * @class {LineManager}
 */
@Injectable()
export class LineManager {

    private service: ItineraryService;
    private dao: LinesDAO;

    public constructor(service: ItineraryService) {
        this.service = service;
        this.dao = new LinesDAO();
    }

    /**
     * @private
     * Downloads all the Lines from the external API.
     * @return {Promise<Line[]>}
     */
    private downloadLines(): Promise<Line[]> {
        return new Promise<Line[]>(resolve => {
            this.service.getItineraries().then((lines: Line[]) => {
                this.dao.saveAll(lines).then(() => {
                    resolve(lines);
                });
            });
        });
    }

    /**
     * Retrieves all known Line instances from the repository.
     * @return {Line[]}
     */
    public getAll(): Promise<Line[]> {
        return new Promise<Line[]>(resolve => {
            this.dao.getAll().then(daoLines => {
                if (daoLines.length > 0) resolve(daoLines);
                else this.downloadLines()
                    .then(downloadedLines => resolve(downloadedLines));
            });
        });
    }
}
