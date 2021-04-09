import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Destinatary } from 'src/app/models/Destinatary';
import { ResponseDestinataries } from 'src/app/models/ResponseDestinataries';
import { ResponseTransfer } from 'src/app/models/ResponseTransfer';
import { Transfer } from 'src/app/models/Transfer';
import { ClientService } from 'src/app/services/client.service';
import { TransactionsService } from 'src/app/services/transactions.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  constructor(private transactionsService:TransactionsService, private clientService:ClientService) { }

  transferForm!: FormGroup;
  myControl = new FormControl();
  filteredOptions!: Observable<Destinatary[]>;
  destinataries:Destinatary[]=[];
  selectedDestinataryKey!:string;


  ngOnInit(): void {
    this.transferForm = new FormGroup({
      accountType: new FormControl(),
      //key: new FormControl('', Validators.required),
      amount:new FormControl('', Validators.required)
    }
    );

    
    //Getting destinataties data

    this.clientService.getDestinataries('').subscribe(
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
  }

  public send(){
    console.log("CONTROL: "+ this.myControl.value);
    const transfer = new Transfer();
    transfer.rutWithOutVd= "15840395";
    transfer.key= this.selectedDestinataryKey;
    transfer.amount=this.transferForm.controls.amount.value;
    this.transactionsService.transferMoney(transfer).subscribe(
      (resp:ResponseTransfer)=>{
        console.log("Transferencia OK: "+resp.totalAmount);
        },
      (err)=>{
          console.log("Error transferMoney "+err);
      }
    );

  }

  private _filter(value: string): Destinatary[] {
    console.log("VALUE: "+value);
    const filterValue = value.toLowerCase();

    return this.destinataries.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  public getSelected(destinatary:Destinatary){
      console.log("PARA QUIEN??"+destinatary.key);
      this.selectedDestinataryKey=destinatary.key;
  }

}
