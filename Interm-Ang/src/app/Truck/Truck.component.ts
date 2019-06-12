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
import { TruckService } from './Truck.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-truck',
  templateUrl: './Truck.component.html',
  styleUrls: ['./Truck.component.css'],
  providers: [TruckService]
})
export class TruckComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  truckId = new FormControl('', Validators.required);
  ownershipType = new FormControl('', Validators.required);
  totalNormalWeight = new FormControl('', Validators.required);
  totalFragileWeight = new FormControl('', Validators.required);
  containersAlloted = new FormControl('', Validators.required);
  containersLoaded = new FormControl('', Validators.required);

  constructor(public serviceTruck: TruckService, fb: FormBuilder) {
    this.myForm = fb.group({
      truckId: this.truckId,
      ownershipType: this.ownershipType,
      totalNormalWeight: this.totalNormalWeight,
      totalFragileWeight: this.totalFragileWeight,
      containersAlloted: this.containersAlloted,
      containersLoaded: this.containersLoaded
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceTruck.getAll()
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
      $class: 'org.acme.interm.truck.Truck',
      'truckId': this.truckId.value,
      'ownershipType': this.ownershipType.value,
      'totalNormalWeight': this.totalNormalWeight.value,
      'totalFragileWeight': this.totalFragileWeight.value,
      'containersAlloted': this.containersAlloted.value,
      'containersLoaded': this.containersLoaded.value
    };

    this.myForm.setValue({
      'truckId': null,
      'ownershipType': null,
      'totalNormalWeight': null,
      'totalFragileWeight': null,
      'containersAlloted': null,
      'containersLoaded': null
    });

    return this.serviceTruck.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'truckId': null,
        'ownershipType': null,
        'totalNormalWeight': null,
        'totalFragileWeight': null,
        'containersAlloted': null,
        'containersLoaded': null
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
      $class: 'org.acme.interm.truck.Truck',
      'ownershipType': this.ownershipType.value,
      'totalNormalWeight': this.totalNormalWeight.value,
      'totalFragileWeight': this.totalFragileWeight.value,
      'containersAlloted': this.containersAlloted.value,
      'containersLoaded': this.containersLoaded.value
    };

    return this.serviceTruck.updateAsset(form.get('truckId').value, this.asset)
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

    return this.serviceTruck.deleteAsset(this.currentId)
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

    return this.serviceTruck.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'truckId': null,
        'ownershipType': null,
        'totalNormalWeight': null,
        'totalFragileWeight': null,
        'containersAlloted': null,
        'containersLoaded': null
      };

      if (result.truckId) {
        formObject.truckId = result.truckId;
      } else {
        formObject.truckId = null;
      }

      if (result.ownershipType) {
        formObject.ownershipType = result.ownershipType;
      } else {
        formObject.ownershipType = null;
      }

      if (result.totalNormalWeight) {
        formObject.totalNormalWeight = result.totalNormalWeight;
      } else {
        formObject.totalNormalWeight = null;
      }

      if (result.totalFragileWeight) {
        formObject.totalFragileWeight = result.totalFragileWeight;
      } else {
        formObject.totalFragileWeight = null;
      }

      if (result.containersAlloted) {
        formObject.containersAlloted = result.containersAlloted;
      } else {
        formObject.containersAlloted = null;
      }

      if (result.containersLoaded) {
        formObject.containersLoaded = result.containersLoaded;
      } else {
        formObject.containersLoaded = null;
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
      'truckId': null,
      'ownershipType': null,
      'totalNormalWeight': null,
      'totalFragileWeight': null,
      'containersAlloted': null,
      'containersLoaded': null
      });
  }

}
