import { FormGroup } from '@angular/forms';
import * as _moment from 'moment';

const moment = _moment;
const verificador = require('verificador-rut');


export class CustomsValidators {
 
 
    static validateRut(startDate: string, endDate: string) {
    return (group: FormGroup) => {

        if(verificador('1-7')){
            console.log("Buena");
        };
      const start = moment(group.controls[startDate].value).startOf('day');
      const end = moment(group.controls[endDate].value).startOf('day');
      if (start.isAfter(end)) {
        return group.controls[endDate].setErrors({ notValidRange: { valid: false } });
      }
    };
  }

}