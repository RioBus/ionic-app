import {Application} from './app.component';
import {NgModule} from '@angular/core';
import {Storage} from '@ionic/storage';
import {IonicApp, IonicModule} from 'ionic-angular';
import {Components} from '../components';
import {Providers} from '../providers';

const COMPONENTS: any = [
    Application,
    ...Components
];

const PROVIDERS: any = [
    Storage,
    ...Providers
];

@NgModule({
    declarations: COMPONENTS,
    entryComponents: COMPONENTS,
    imports: [
        IonicModule.forRoot(Application)
    ],
    bootstrap: [IonicApp],
    providers: PROVIDERS
})
export class AppModule {}