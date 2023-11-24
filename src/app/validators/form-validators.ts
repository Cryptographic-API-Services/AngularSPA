var luhn = require("luhn");
import { AbstractControl } from '@angular/forms';

export function passwordValidator(control: AbstractControl) {
    var regex: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    if (!regex.test(control.value)) {
        return { passwordValidator: { valid: false } };
    }
    return null;
}

export function phoneNumberValidator(control: AbstractControl) {
    var regex: RegExp = /^((\\+91-?)|0)?[0-9]{10}$/
    if (!regex.test(control.value)) {
        return { phoneNumberValidator: { valid: false } };
    }
    return null;
}

export function creditCardNumberValidator(control: AbstractControl) {
    if (!luhn.validate(control.value)) {
        return { creditCardNumberValidator: { valid: false } }
    }
    return null;
}

export function usernameValidator(control: AbstractControl) {
    var regex: RegExp = /^[a-zA-Z0-9]{3,16}$/
    if (!regex.test(control.value)) {
        return { usernameValidator: { valid: false } };
    }
    return null;
}