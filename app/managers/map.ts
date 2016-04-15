'use strict';
import { API_ENDPOINT } from '../const';

export class MapManager {
    
    private static instance: MapManager;
    
    constructor() {}
    
    public static getInstance() {
        if(!MapManager.instance)
            MapManager.instance = new MapManager();
        return MapManager.instance;
    }
}