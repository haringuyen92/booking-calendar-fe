'use strict';

export class SlotTimeValidate{

    static duplicate(first, last){ // {from: 'HH:mm', to: 'HH:mm'}
        console.log(first, last);
    }
    static invalidTwoTime(timeStart, timeEnd){
        console.log(timeStart, timeEnd);
    }
}
