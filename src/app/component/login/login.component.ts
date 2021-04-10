import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ResponseUserData } from 'src/app/models/ResponseUserData';
import { ClientService } from 'src/app/services/client.service';
import { LoginService } from 'src/app/services/login.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  isSignedIn:Boolean=false;
  constructor(public loginService:LoginService,
              private dialog:MatDialog,
              private clientService:ClientService) { }

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
      this.clientService.getUserDataFromEmail(this.loginForm.controls.email.value).subscribe(
        (data:ResponseUserData)=>{
          console.log('USER DATA: '+data);
          this.clientService.setActualTotalAmount(data.userData.totalAmount);
          this.isSignedIn=true;
          localStorage.setItem('totalAmount',data.userData.totalAmount.toString());
          localStorage.setItem('name',data.userData.name.toString());
          localStorage.setItem('rut',data.userData.rutWithOutVd.toString());
        }
        ,(err)=>{
          console.error('Error getUserData: '+err);
        }
      );
      
    }else{
      this.isSignedIn=false;
      const dialogRef = this.dialog.open(DialogComponent, {
        width: '450px',
        data: {title: 'Error',
               subtitle:'Datos ingresados no son válidos.'
              }
      });
    }
  }


  handleLogout(){
    this.isSignedIn=false;
    localStorage.removeItem('user');
  }

}
