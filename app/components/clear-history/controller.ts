import { Directive, HostListener } from '@angular/core';
import { Alert, AlertController } from 'ionic-angular';
import { HistoryDAO } from '../../dao/history';
import { BasePage } from '../../core/page';
import { Analytics } from '../../core/analytics';

/**
 * @export
 * @class {ClearHistory}
 * 
 * Represents the 'clear-history' directive use to trigger the action to clear the history
 * when the elements with this directive are clicked.
 */
@Directive({
    selector: '[clear-history]',
})
export class ClearHistory extends BasePage {

    private dao: HistoryDAO;
    private ctrl: AlertController;

    public constructor(ctrl: AlertController) {
        super();
        this.ctrl = ctrl;
        this.dao = new HistoryDAO();
    }

    /**
     * Called when a HTML element with 'clear-history' directive is clicked. <br/>
     * It opens an dialog which allows the user to clear his navigation history or cancel the operation.
     * @return {void}
     */
    @HostListener('click', ['$event.target'])
    public onClick(): void {
        Analytics.trackEvent('Clear History', 'click', 'button');
        let confirm: Alert = this.ctrl.create({
            title: this.Text.COMPONENT_CLEAR_HISTORY_ALERT_TITLE,
            message: this.Text.COMPONENT_CLEAR_HISTORY_ALERT_MESSAGE,
            buttons: [
                {
                    text: this.Text.COMPONENT_CLEAR_HISTORY_ALERT_BUTTON_NO,
                    handler: (): void => console.log('Clear canceled'),
                },
                {
                    text: this.Text.COMPONENT_CLEAR_HISTORY_ALERT_BUTTON_YES,
                    handler: (): void => this.clearHistory(),
                },
            ],
        });
        confirm.present(confirm);
    }

    /**
     * Clears the history.
     * @return {void}
     */
    private clearHistory(): void {
        this.dao.clear()
        .then(
            () => console.log('History cleared.'),
            error => console.log('Failed to clear history.')
        );
    }
}
