declare const System: any;

import { Globalization } from 'ionic-native';
import { LANG_AVAILABLE, LANG_DEFAULT }  from '../const';
import * as TextMap from '../strings/map';

export class Strings {

    private static language: Promise<any>;

    private static setLanguage(lang: string): string {
        return (LANG_AVAILABLE.indexOf(lang) > -1)  ? lang : LANG_DEFAULT;
    }

    private static initialize(): void {
        Strings.language = Globalization.getPreferredLanguage()
            .then( response => Strings.setLanguage(response.value))
            .catch( error => Strings.setLanguage(''))
            .then( language => TextMap[language]);
    }

    public static all(): Promise<any> {
        if (!Strings.language) Strings.initialize();
        return Strings.language;
    }
}
