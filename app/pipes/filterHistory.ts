'use strict';

import { Pipe, PipeTransform } from 'angular2/core';
import { History } from '../models/history';

@Pipe({name: 'filterHistory'})
export class FilterHistoryPipe implements PipeTransform {
    
    public transform(histories: any, args?: string[]): History[] {
        // console.log(`Filtered value: ${JSON.stringify(histories)}`);
        // console.log(`Args: ${args}`);
        let day: string = args[0];
        return histories[day];
    }
}