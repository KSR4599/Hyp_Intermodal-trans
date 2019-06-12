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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContainerService } from './Container.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-container',
  templateUrl: './Container.component.html',
  styleUrls: ['./Container.component.css'],
  providers: [ContainerService]
})
export class ContainerComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  containerId = new FormControl('', Validators.required);
  containerNumber = new FormControl('', Validators.required);
  normalWeight = new FormControl('', Validators.required);
  fragileWeight = new FormControl('', Validators.required);
  allShipments = new FormControl('', Validators.required);
  route = new FormControl('', Validators.required);
  truck = new FormControl('', Validators.required);
  readyToLoad = new FormControl('', Validators.required);
  status = new FormControl('', Validators.required);

  constructor(public serviceContainer: ContainerService, fb: FormBuilder) {
    this.myForm = fb.group({
      containerId: this.containerId,
      containerNumber: this.containerNumber,
      normalWeight: this.normalWeight,
      fragileWeight: this.fragileWeight,
      allShipments: this.allShipments,
      route: this.route,
      truck: this.truck,
      readyToLoad: this.readyToLoad,
      status: this.status
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceContainer.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.interm.container.Container',
      'containerId': this.containerId.value,
      'containerNumber': this.containerNumber.value,
      'normalWeight': this.normalWeight.value,
      'fragileWeight': this.fragileWeight.value,
      'allShipments': this.allShipments.value,
      'route': this.route.value,
      'truck': this.truck.value,
      'readyToLoad': this.readyToLoad.value,
      'status': this.status.value
    };

    this.myForm.setValue({
      'containerId': null,
      'containerNumber': null,
      'normalWeight': null,
      'fragileWeight': null,
      'allShipments': null,
      'route': null,
      'truck': null,
      'readyToLoad': null,
      'status': null
    });

    return this.serviceContainer.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'containerId': null,
        'containerNumber': null,
        'normalWeight': null,
        'fragileWeight': null,
        'allShipments': null,
        'route': null,
        'truck': null,
        'readyToLoad': null,
        'status': null
      });
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.acme.interm.container.Container',
      'containerNumber': this.containerNumber.value,
      'normalWeight': this.normalWeight.value,
      'fragileWeight': this.fragileWeight.value,
      'allShipments': this.allShipments.value,
      'route': this.route.value,
      'truck': this.truck.value,
      'readyToLoad': this.readyToLoad.value,
      'status': this.status.value
    };

    return this.serviceContainer.updateAsset(form.get('containerId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceContainer.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.loadAll();
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceContainer.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'containerId': null,
        'containerNumber': null,
        'normalWeight': null,
        'fragileWeight': null,
        'allShipments': null,
        'route': null,
        'truck': null,
        'readyToLoad': null,
        'status': null
      };

      if (result.containerId) {
        formObject.containerId = result.containerId;
      } else {
        formObject.containerId = null;
      }

      if (result.containerNumber) {
        formObject.containerNumber = result.containerNumber;
      } else {
        formObject.containerNumber = null;
      }

      if (result.normalWeight) {
        formObject.normalWeight = result.normalWeight;
      } else {
        formObject.normalWeight = null;
      }

      if (result.fragileWeight) {
        formObject.fragileWeight = result.fragileWeight;
      } else {
        formObject.fragileWeight = null;
      }

      if (result.allShipments) {
        formObject.allShipments = result.allShipments;
      } else {
        formObject.allShipments = null;
      }

      if (result.route) {
        formObject.route = result.route;
      } else {
        formObject.route = null;
      }

      if (result.truck) {
        formObject.truck = result.truck;
      } else {
        formObject.truck = null;
      }

      if (result.readyToLoad) {
        formObject.readyToLoad = result.readyToLoad;
      } else {
        formObject.readyToLoad = null;
      }

      if (result.status) {
        formObject.status = result.status;
      } else {
        formObject.status = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'containerId': null,
      'containerNumber': null,
      'normalWeight': null,
      'fragileWeight': null,
      'allShipments': null,
      'route': null,
      'truck': null,
      'readyToLoad': null,
      'status': null
      });
  }

}
