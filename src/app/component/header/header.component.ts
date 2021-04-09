import { Component, OnInit } from '@angular/core';
import { ResponseUserData } from 'src/app/models/ResponseUserData';
import { UserData } from 'src/app/models/UserData';
import { ClientService } from 'src/app/services/client.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name!:string;
  amount!:number;
  userData!:ResponseUserData;

  constructor(private clientService:ClientService) { }

  ngOnInit(): void {

    localStorage.setItem('rut', '15840395-1JIC');

    this.clientService.getUserData('15840395').subscribe(
      (data:ResponseUserData)=>{
        console.log('USER DATA: '+data);
        this.name=data.userData.name;
        this.amount=data.userData.totalAmount;
        console.log('USER DATA: '+data.userData.name);
        console.log('USER DATA: '+data.userData.totalAmount);
      }
      ,(err)=>{
        console.error('Error getUserData: '+err);
      }
    );


  }

}
