import { Directive, HostListener } from '@angular/core';
import { Alert, NavController } from 'ionic-angular';
import { HistoryDAO } from '../../dao/history';
import { BasePage } from '../../core/page';

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
    private nav: NavController;

    public constructor(nav: NavController) {
        super();
        this.nav = nav;
        this.dao = new HistoryDAO();
    }

    /**
     * Called when a HTML element with 'clear-history' directive is clicked. <br/>
     * It opens an dialog which allows the user to clear his navigation history or cancel the operation.
     * @return {void}
     */
    @HostListener('click', ['$event.target'])
    public onClick(): void {
        let confirm: Alert = Alert.create({
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
        this.nav.present(confirm);
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
