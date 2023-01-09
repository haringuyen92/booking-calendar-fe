'use strict';

import Rules from '@/common/rules';

export class PasswordValidation{

    static invalidLength(password){
        if(!password) return false;
        password = password.toString();
        return !(password.length < Rules.PASSWORD.MIN || password.length > Rules.PASSWORD.MAX);
    }
}
