import { Globalization } from 'ionic-native';
import { LANG_AVAILABLE, LANG_DEFAULT }  from '../const';
import * as TextMap from '../strings/map';

/**
 * String class is the loader of the text constants for the default
 * platform language.
 * 
 * @class {Strings}
 */
export class Strings {

    private static language: Promise<any>;

    /**
     * @private
     * @static
     * Chooses between the platform language or the default
     * based on the availability of the language for the text.
     * @param {string} lang - platform BCP-47 complient language id
     * @return {string}
     */
    private static setLanguage(lang: string): string {
        return (LANG_AVAILABLE.indexOf(lang) > -1)  ? lang : LANG_DEFAULT;
    }

    /**
     * @private
     * @static
     * Initializes the language retriever structure
     * @return {void}
     */
    private static initialize(): void {
        Strings.language = Globalization.getPreferredLanguage()
            .then( response => Strings.setLanguage(response.value))
            .catch( error => Strings.setLanguage(''))
            .then( language => TextMap[language]);
    }

    /**
     * @static
     * Returns the strings object
     * @return {Promise<any>} 
     */
    public static all(): Promise<any> {
        if (!Strings.language) Strings.initialize();
        return Strings.language;
    }
}
