import { Component, OnInit } from '@angular/core';
import { Destinatary } from 'src/app/models/Destinatary';
import { Movement } from 'src/app/models/Movement';
import { ResponseDestinataries } from 'src/app/models/ResponseDestinataries';
import { ResponseHistoricalMovement } from 'src/app/models/ResponseHistoricalMovement';
import { ClientService } from 'src/app/services/client.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-historical-movements',
  templateUrl: './historical-movements.component.html',
  styleUrls: ['./historical-movements.component.scss']
})
export class HistoricalMovementsComponent implements OnInit {
  movements:Movement[]=[];
  displayedColumns: string[] = ['date','name','rutDestinataryWithOutVd','bankCode', 'accountType', 'amount'];
  
  constructor(private transactionService:TransactionsService) { }

  ngOnInit(): void {
    
    this.transactionService.getHistoricalMovements('').subscribe(
      (data:ResponseHistoricalMovement)=>{
        console.log("CANTIDAD HISTORICA: "+data.response.length);
        this.movements=data.response;
      },
      (err)=>{
        console.log("Error getHistoricalMovements: "+err);
      }
    );
  }

}
