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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { ContainerComponent } from './Container/Container.component';
import { TruckComponent } from './Truck/Truck.component';

import { ACMENetworkAdminComponent } from './ACMENetworkAdmin/ACMENetworkAdmin.component';
import { ACMEPersonnelComponent } from './ACMEPersonnel/ACMEPersonnel.component';
import { B2BPartnerComponent } from './B2BPartner/B2BPartner.component';

import { CreateContainerComponent } from './CreateContainer/CreateContainer.component';
import { AssignTruckComponent } from './AssignTruck/AssignTruck.component';
import { ClearContainerComponent } from './ClearContainer/ClearContainer.component';
import { LoadContainerComponent } from './LoadContainer/LoadContainer.component';
import { addTruckComponent } from './addTruck/addTruck.component';
import { getContainerComponent } from './getContainer/getContainer.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Container', component: ContainerComponent },
  { path: 'Truck', component: TruckComponent },
  { path: 'ACMENetworkAdmin', component: ACMENetworkAdminComponent },
  { path: 'ACMEPersonnel', component: ACMEPersonnelComponent },
  { path: 'B2BPartner', component: B2BPartnerComponent },
  { path: 'CreateContainer', component: CreateContainerComponent },
  { path: 'AssignTruck', component: AssignTruckComponent },
  { path: 'ClearContainer', component: ClearContainerComponent },
  { path: 'LoadContainer', component: LoadContainerComponent },
  { path: 'addTruck', component: addTruckComponent },
  { path: 'getContainer', component: getContainerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
