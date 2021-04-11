import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ResponseUserData } from 'src/app/models/ResponseUserData';
import { ClientService } from 'src/app/services/client.service';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router'
import { UserData } from 'src/app/models/UserData';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name!:string;
  amount:number=0;
  userData!:ResponseUserData;


  constructor(private clientService:ClientService, 
              public loginService:LoginService,
              ) { }

  ngOnInit(): void {
    if(null!==localStorage.getItem('totalAmount')){
      this.amount=Number(localStorage.getItem('totalAmount'));
    }

    var name=localStorage.getItem('name');
    if(null!==name){
      this.name=name;
    }
      
    this.clientService.getActualTotalAmount().subscribe((amount)=>{
      this.amount=amount;
    });

  }


  


}
