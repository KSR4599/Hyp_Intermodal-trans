/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { ContainerComponent } from './Container/Container.component';
import { TruckComponent } from './Truck/Truck.component';
import { MaterialModule } from './material.module';

import { ACMENetworkAdminComponent } from './ACMENetworkAdmin/ACMENetworkAdmin.component';
import { ACMEPersonnelComponent } from './ACMEPersonnel/ACMEPersonnel.component';
import { B2BPartnerComponent } from './B2BPartner/B2BPartner.component';

import { CreateContainerComponent } from './CreateContainer/CreateContainer.component';
import { AssignTruckComponent } from './AssignTruck/AssignTruck.component';
import { ClearContainerComponent } from './ClearContainer/ClearContainer.component';
import { LoadContainerComponent } from './LoadContainer/LoadContainer.component';
import { addTruckComponent } from './addTruck/addTruck.component';
import { getContainerComponent } from './getContainer/getContainer.component';
import { readyContainerComponent } from './readyContainer/readyContainer.component';
import { truckDetailsComponent } from './truckDetails/truckDetails.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { addContainerComponent } from './Container/addContainer.component';
import { WalletComponent } from './wallet/wallet.component';
import { WalletService } from './wallet/wallet.service';
import { LoginComponent } from './login/login.component';

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContainerComponent,
    TruckComponent,
    ACMENetworkAdminComponent,
    ACMEPersonnelComponent,
    B2BPartnerComponent,
    CreateContainerComponent,
    AssignTruckComponent,
    ClearContainerComponent,
    LoadContainerComponent,
    addTruckComponent,
    getContainerComponent,
    readyContainerComponent,
    truckDetailsComponent,
    HeaderComponent,
    SidenavListComponent,
    addContainerComponent,
    WalletComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule 
  ],
  providers: [
    DataService, WalletService
  ],
  bootstrap: [AppComponent],
  entryComponents: [addContainerComponent, CreateContainerComponent, LoginComponent]
})
export class AppModule { }
