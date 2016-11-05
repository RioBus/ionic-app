import { Injectable } from '@angular/core';
import { PreferencesDAO } from '../dao/preferences';

/**
 * PreferencesManager class is responsible for handling the access to the
 * config data the user stores dynamically during his use.
 *
 * @class {ConfigManager}
 */
@Injectable()
export class PreferencesManager {

    public constructor(private dao: PreferencesDAO) {}

    /**
     * Gets the stored preference key value 
     * 
     * @template T
     * @param {string} key - Preference key name
     * @returns {Promise<T>}
     */
    public getKey<T>(key: string): Promise<T> {
        return this.dao.getKey<T>(key);
    }

    /**
     * Saves a preference to the key memory 
     * 
     * @param {string} key - Preference key name
     * @param {*} value - Value to store
     * @returns {Promise<void>}
     */
    public setKey(key: string, value: any): Promise<void> {
        return this.dao.setKey(key, value);
    }
}
