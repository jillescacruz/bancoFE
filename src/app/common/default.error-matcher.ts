import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class DefaultErrorMatcher {
  
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    if(null!=isSubmitted && null!=control){
      return (control && control.invalid && isSubmitted);
    }else{
      return false
    }
    
  }
}
