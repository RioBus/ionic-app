import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

declare var window: any;

/**
 * Toast class shows native toast in the screen
 * 
 * @class {Toast}
 */
@Injectable()
export class Toast {

    public static SHORT: string = 'short';
    public static LONG: string = 'long';

    public constructor(private platform: Platform) {}

    /**
     * Shows the message over the screen
     * @param {string} text - Text message
     * @param {string} duration - Text display duration
     * @return {void}
     */
    public show(text: string, duration: string): void {
        this.platform.ready()
            .then(() => window.plugins.toast.show(text, duration, 'bottom'));
    }
}
