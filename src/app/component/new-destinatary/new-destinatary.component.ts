import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DefaultBanksService } from 'src/app/services/default-banks.service';
import { ResponseBank } from 'src/app/models/ResponseBank';
import { Destinatary } from 'src/app/models/Destinatary';
import { ClientService } from 'src/app/services/client.service';
import { ResponseDestinataries } from 'src/app/models/ResponseDestinataries';

import { validateRut } from '@fdograph/rut-utilities';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { BankDetail } from 'src/app/models/bankDetail';
import { AccountType } from 'src/app/models/AccountType';


@Component({
  selector: 'app-new-destinatary',
  templateUrl: './new-destinatary.component.html',
  styleUrls: ['./new-destinatary.component.scss']
})
export class NewDestinataryComponent implements OnInit  {
  displayedColumns: string[] = ['name', 'bankCode', 'accountType', 'accountNumber'];

  destinataries:Destinatary[]=[];
  newDestinataryForm!: FormGroup;
  banks: BankDetail[] = [];
  accountTypes:AccountType[]=[];



  selectedValue: string | undefined;


  constructor(private defaultBanksService: DefaultBanksService, 
              private clientService:ClientService,
              private dialog:MatDialog){}



  ngOnInit():void{

    this.accountTypes=this.defaultBanksService.getAccountTypes();

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
      (data:ResponseBank)=>{
        this.banks=data.banks;
        //Get all destinataries of the client
        this.getDestinataryList();
      },
      (err:any)=>{
        console.error('Error on service getAllBanks'+err);
      }
    );

  }


 public send(){
  const destinatary = new Destinatary();
  destinatary.rutOriginWithOutVd=localStorage.getItem('rut')!;
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
    (err:any)=>{
      console.log("Error addDestinatary: "+err);
    }
  );
 }

 //Getting destinataties data
 private getDestinataryList(){
    this.clientService.getDestinataries(localStorage.getItem('rut')!).subscribe(
      (data:ResponseDestinataries)=>{
        this.destinataries=data.response;
      },
      (err:any)=>{
        console.log("Error getDestinataries: "+err);
      }
    );

 }


 public validateRut(event:any){
  if(validateRut(event.target.value)){
  }else{
    this.newDestinataryForm.controls.rut.reset();
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '450px',
      data: {title: 'Rut Ingresado no es válido',
             subtitle:'El rut debe estar en el siguiente formato: 11.111.111-k'
            }
    });

  }
 }


 public getBankName(bankCode:string){
    return this.banks.filter((bank)=> bank.id==bankCode).map((bank)=>bank.name)
 }

 public getAccountType(accountTypeId:string){
   return this.defaultBanksService.getAccountTypes().filter((accountType)=> accountType.value==accountTypeId).map((accountType)=>accountType.viewValue)
}

}