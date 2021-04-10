import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './component/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatTableModule} from '@angular/material/table';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatCardModule} from '@angular/material/card';




import { NewDestinataryComponent } from './component/new-destinatary/new-destinatary.component';
import { HeaderComponent } from './component/header/header.component';
import { HistoricalMovementsComponent } from './component/historical-movements/historical-movements.component';
import { TransferComponent } from './component/transfer/transfer.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogComponent } from './component/dialog/dialog.component';
import { AngularFireModule } from '@angular/fire';
import { LoginComponent } from './component/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    NewDestinataryComponent,
    HeaderComponent,
    HistoricalMovementsComponent,
    TransferComponent,
    DialogComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatTableModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDialogModule,
    AngularFireModule.initializeApp({apiKey: "AIzaSyBAwIAS1jMCl94tTBSYiIDKi9nj9fSuPdw",
    authDomain: "bancoripleypoc.firebaseapp.com",
    projectId: "bancoripleypoc",
    storageBucket: "bancoripleypoc.appspot.com",
    messagingSenderId: "367778702077",
    appId: "1:367778702077:web:395d9090a0eb81917e9494",
    measurementId: "G-WGSQ3BK76Y"})    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
