import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSignedIn:Boolean=false;
  constructor(public loginService:LoginService) { }

  ngOnInit():void{
    console.log("MI RTU ES: "+localStorage.getItem('rut'));
    this.loginForm = new FormGroup({
      accountType: new FormControl(),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }
    );

    if(localStorage.getItem('user')!==null){
      this.isSignedIn=true
    }else{
      this.isSignedIn=false
    }

  }

  async send(){
    await this.loginService.singIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
    if(this.loginService.isLoggedIn){
      console.log("WENA WENA!!!")
      this.isSignedIn=true;
    }else{
      console.log("MALA MALA :(")
      this.isSignedIn=false;
    }
  }


  handleLogout(){
    this.isSignedIn=false;
    localStorage.removeItem('user');
  }

}
