import { Component, OnInit } from '@angular/core';
import { Movement } from 'src/app/models/Movement';
import { ResponseBank } from 'src/app/models/ResponseBank';
import { ResponseHistoricalMovement } from 'src/app/models/ResponseHistoricalMovement';
import { TransactionsService } from 'src/app/services/transactions.service';
import { DefaultBanksService } from 'src/app/services/default-banks.service';
import { BankDetail } from 'src/app/models/bankDetail';
import { AccountType } from 'src/app/models/AccountType';

@Component({
  selector: 'app-historical-movements',
  templateUrl: './historical-movements.component.html',
  styleUrls: ['./historical-movements.component.scss']
})
export class HistoricalMovementsComponent implements OnInit {
  movements:Movement[]=[];
  banks: BankDetail[] = [];
  accountTypes:AccountType[]=[];

  displayedColumns: string[] = ['date','type','name','rutDestinataryWithOutVd','bankCode', 'accountType', 'amount'];
  
  constructor(private transactionService:TransactionsService,
              private defaultBanksService: DefaultBanksService) { }

  ngOnInit(): void {
    let id=localStorage.getItem('rut');
     if(id!=null){
      this.defaultBanksService.getAllBanks().subscribe(
        (data:ResponseBank)=>{
          this.banks=data.banks;
        },
        (err)=>{
          console.error('Error on service getAllBanks');
        }
      );


      this.transactionService.getHistoricalMovements(id).subscribe(
        (data:ResponseHistoricalMovement)=>{
          this.movements=data.response;
        },
        (err)=>{
          console.log("Error getHistoricalMovements: "+err);
        }
      );
    }
  }

  public getBankName(bankCode:string){
    return this.banks.filter((bank)=> bank.id==bankCode).map((bank)=>bank.name)
  }

 public getAccountType(accountTypeId:string){
   return this.defaultBanksService.getAccountTypes().filter((accountType)=> accountType.value==accountTypeId).map((accountType)=>accountType.viewValue)
 }

 public getTypeDescription(type:string){
    if(type==='DEPOSIT'){
      return "DEPOSITO"
    }else if(type==="TRANSFER_TO"){
      return "TRANSFERENCIA A"
    }else{
      return "TRANSFERENCIA DESDE"
    }
 }

}
