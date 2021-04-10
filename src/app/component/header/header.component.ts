import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResponseUserData } from 'src/app/models/ResponseUserData';
import { ClientService } from 'src/app/services/client.service';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name!:string;
  amount!:number;
  userData!:ResponseUserData;


  constructor(private clientService:ClientService, 
              public loginService:LoginService,
              private router:Router
              ) { }

  ngOnInit(): void {

    var rutActual="15840395";
    localStorage.setItem('rut', rutActual);

    this.clientService.getUserData(rutActual).subscribe(
      (data:ResponseUserData)=>{
        console.log('USER DATA: '+data);
        this.name=data.userData.name;
        this.amount=data.userData.totalAmount;
        this.clientService.setActualTotalAmount(data.userData.totalAmount);
      }
      ,(err)=>{
        console.error('Error getUserData: '+err);
      }
    );

    this.clientService.getActualTotalAmount().subscribe((amount)=>{
      this.amount=amount;
    });

  }


  


}
