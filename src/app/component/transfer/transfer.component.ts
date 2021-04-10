import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators,ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { BankDetail } from 'src/app/models/bankDetail';
import { Destinatary } from 'src/app/models/Destinatary';
import { ResponseBank } from 'src/app/models/ResponseBank';
import { ResponseDestinataries } from 'src/app/models/ResponseDestinataries';
import { ResponseTransfer } from 'src/app/models/ResponseTransfer';
import { Transfer } from 'src/app/models/Transfer';
import { ClientService } from 'src/app/services/client.service';
import { DefaultBanksService } from 'src/app/services/default-banks.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { amountValidator } from 'src/app/validators/CustomValidators';
import { DefaultErrorMatcher } from 'src/app/common/default.error-matcher';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  public matcher = new DefaultErrorMatcher();

  constructor(private transactionsService:TransactionsService, 
              private clientService:ClientService,
              private defaultBanksService:DefaultBanksService,
              private dialog:MatDialog) { }

  transferForm!: FormGroup;
  myControl = new FormControl();
  filteredOptions!: Observable<Destinatary[]>;
  destinataries:Destinatary[]=[];
  selectedDestinataryKey!:string;

  name!:string;
  email!:string;
  bank!:string;
  accountType!:string;
  banks: BankDetail[] = [];
  isLoading:Boolean=false;
  isValidAmount:Boolean=true;



  ngOnInit(): void {
    this.transferForm = new FormGroup({
      //nameView:new FormControl('', Validators.required),
      amount:new FormControl('', [Validators.required,amountValidator])
    }
    );
    
    //Getting destinataties data
      this.clientService.getDestinataries(localStorage.getItem('rut')!).subscribe(
        (data:ResponseDestinataries)=>{
          console.log("CANTIDAD: "+data.response.length);
          this.destinataries=data.response;
        },
        (err)=>{
          console.log("Error getDestinataries: "+err);
        }
      );

      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filter(value))
        );


        this.defaultBanksService.getAllBanks().subscribe(
          (data:ResponseBank)=>{
            console.log("CANTIDAD DE BANCOS:"+data.banks.length);
            this.banks=data.banks;
          },
          (err)=>{
            console.error('Error on service getAllBanks');
          }
        );

  }
  get amount() {
    return this.transferForm.get('amount');
  }

  public send(){
    this.isLoading=true;
    let id=localStorage.getItem('rut');
    if(id!=null){
        if(this.selectedDestinataryKey==null){
          const dialogRef = this.dialog.open(DialogComponent, {
            width: '450px',
            data: {title: 'Faltan campos',
                   subtitle:'Debe seleccionar un destinatario'
                  }
          });
          this.isLoading=false;
        }else{
          const transfer = new Transfer();
          transfer.rutWithOutVd=id;
          transfer.key= this.selectedDestinataryKey;
          transfer.amount=this.transferForm.controls.amount.value;
          this.transactionsService.transferMoney(transfer).subscribe(
            (resp:ResponseTransfer)=>{
              console.log("Transferencia OK: "+resp.totalAmount);
              this.clientService.setActualTotalAmount(resp.totalAmount);
              this.isLoading=false;
              },
            (err:any)=>{
                let obj :ValidationErrors = JSON.parse(JSON.stringify(err.error));
                console.log("Error transferMoney "+obj.message);
                this.isLoading=false;
            }
          );
      }
    }

  }

  private _filter(value: string): Destinatary[] {
    console.log("VALUE: "+value);
    const filterValue = value.toLowerCase();

    return this.destinataries.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  public getSelected(destinatary:Destinatary){
      this.selectedDestinataryKey=destinatary.key;
      this.name=destinatary.name;
      this.email=destinatary.email;
      this.bank=destinatary.bankCode;
      this.accountType=destinatary.accountType;
  }

  public getBankName(bankCode:string){
     return this.banks.filter((bank)=> bank.id==bankCode).map((bank)=>bank.name)
  }
 
  public getAccountType(accountTypeId:string){
    return this.defaultBanksService.getAccountTypes().filter((accountType)=> accountType.value==accountTypeId).map((accountType)=>accountType.viewValue)
 }

}
