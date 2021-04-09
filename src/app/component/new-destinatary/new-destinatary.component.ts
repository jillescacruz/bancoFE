import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DefaultBanksService } from 'src/app/services/default-banks.service';
import { Bank } from 'src/app/models/bank';
import { BankDetail } from 'src/app/models/bankDetail';
import { Destinatary } from 'src/app/models/Destinatary';
import { TransactionsService } from 'src/app/services/transactions.service';
import { ClientService } from 'src/app/services/client.service';
import { ResponseDestinataries } from 'src/app/models/ResponseDestinataries';

interface AccountType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-destinatary',
  templateUrl: './new-destinatary.component.html',
  styleUrls: ['./new-destinatary.component.scss']
})
export class NewDestinataryComponent implements OnInit  {
  displayedColumns: string[] = ['name', 'bankCode', 'accountType', 'accountNumber'];

  destinataries:Destinatary[]=[];

  newDestinataryForm!: FormGroup;
  banks: Bank[] = [];
  accountTypes: AccountType[] = [
    {value: '1', viewValue: 'Cuenta Corriente'},
    {value: '2', viewValue: 'Cuenta Vista'},
    {value: '3', viewValue: 'Cuenta Ahorro'}
  ];

  selectedValue: string | undefined;


  constructor(private defaultBanksService: DefaultBanksService, 
              private transactionsService:TransactionsService,
              private clientService:ClientService){}



  ngOnInit():void{

    this.newDestinataryForm = new FormGroup({
      accountType: new FormControl(),
      name: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      rut: new FormControl('', Validators.required),
      bank: new FormControl('', Validators.required),
      accountNumber:new FormControl('', Validators.required)
    }
    );

    this.defaultBanksService.getAllBanks().subscribe(
      (data)=>{
        //console.log(JSON.parse(data));
       //this.banks=JSON.parse(data);
      },
      (err)=>{
        console.error('Error on service getAllBanks');
      }
    );

    
    this.getDestinataryList();
   


  }


 public send(){
  const destinatary = new Destinatary();
  destinatary.rutWithOutVd="15840395";
  destinatary.name=this.newDestinataryForm.controls.name.value;
  destinatary.email=this.newDestinataryForm.controls.email.value;
  destinatary.phone=this.newDestinataryForm.controls.phone.value;
  destinatary.bankCode=this.newDestinataryForm.controls.bank.value;
  destinatary.accountType=this.newDestinataryForm.controls.accountType.value;
  destinatary.accountNumber=this.newDestinataryForm.controls.accountNumber.value;
  destinatary.rutDestinataryWithOutVd=this.newDestinataryForm.controls.rut.value;
  this.clientService.addDestinatary(destinatary).subscribe(
    (resp:Response)=>{
      console.log("Guardado OK");
      this.getDestinataryList();
    },
    (err)=>{
      console.log("Error addDestinatary: "+err);
    }
  );
   console.log('Enviando......'+destinatary);
 }

 //Getting destinataties data
 private getDestinataryList(){
  this.clientService.getDestinataries('').subscribe(
    (data:ResponseDestinataries)=>{
      console.log("CANTIDAD: "+data.response.length);
      this.destinataries=data.response;
    },
    (err)=>{
      console.log("Error getDestinataries: "+err);
    }
  );
 }

}