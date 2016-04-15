'use strict';
import { Line } from '../models/itinerary';

export class ItineraryManager {
    
    private static instance: ItineraryManager;
    private lines: Line[];
    
    public get Lines(): Line[] {
        return this.lines;
    }
    
    public set Lines(value: Line[]) {
        this.lines = value;
    }
    
    constructor() {}
    
    public static getInstance() {
        if(!ItineraryManager.instance)
            ItineraryManager.instance = new ItineraryManager();
        return ItineraryManager.instance;
    }
}