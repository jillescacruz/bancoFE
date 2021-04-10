import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoricalMovementsComponent } from './component/historical-movements/historical-movements.component';
import { LoginComponent } from './component/login/login.component';
import { NewDestinataryComponent } from './component/new-destinatary/new-destinatary.component';
import { TransferComponent } from './component/transfer/transfer.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'app-new-destinatary', component:NewDestinataryComponent},
  {path:'app-transfer', component:TransferComponent},
  {path:'app-historical-movements',component:HistoricalMovementsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
