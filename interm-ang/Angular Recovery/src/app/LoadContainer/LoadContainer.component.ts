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
import { LoadContainerService } from './LoadContainer.service';
import 'rxjs/add/operator/toPromise';
import {  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-loadcontainer',
  templateUrl: './LoadContainer.component.html',
  styleUrls: ['./LoadContainer.component.css'],
  providers: [LoadContainerService]
})
export class LoadContainerComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  public errorMessage ='';
  public successMessage='';
 private currentContainer;
 public spinner = '';
 public btnStatus = true;


  type = new FormControl('', Validators.required);
  weight = new FormControl('', Validators.required);



  constructor(private serviceLoadContainer: LoadContainerService, fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public passedData: any) {
    this.myForm = fb.group({
      type: this.type,
      weight: this.weight
    });
  };

  ngOnInit(): void {
    this.loadAll();
    console.log("The passes Data", this.passedData.containerId);
  }



  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceLoadContainer.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(transaction => {
        tempList.push(transaction);
      });
      this.allTransactions = tempList;
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
   * @param {String} name - the name of the transaction field to update
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
   * only). This is used for checkboxes in the transaction updateDialog.
   * @param {String} name - the name of the transaction field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified transaction field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addTransaction(form: any): Promise<any> {
    this.spinner = 'aa';
    this.btnStatus = false;
    this.Transaction = {
      $class: 'org.acme.interm.container.LoadContainer',
      'containerId': this.passedData.containerId,
      'type': this.type.value,
      'weight':this.weight.value
    };

    this.myForm.setValue({
      'type': null,
      'weight':null
    });

    return this.serviceLoadContainer.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      console.log("Loaded Container Successfully!");
      this.errorMessage = null;
      this.myForm.setValue({
        'weight':null,
        'type':null
      });
      this.spinner = '';
      this.successMessage= 'Shipment has been loaded into container!👍';
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
        this.spinner = '';
        this.errorMessage = 'This operation cannot be performed! 👎';
      }
    });
  }

  updateTransaction(form: any): Promise<any> {
    this.Transaction = {
      $class: 'org.acme.interm.container.LoadContainer',
      'containerId': this.passedData.containerId,
      'weight': this.weight.value,
      'type': this.type.value
    };

    return this.serviceLoadContainer.updateTransaction(form.get('transactionId').value, this.Transaction)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  deleteTransaction(): Promise<any> {

    return this.serviceLoadContainer.deleteTransaction(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
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

  /*
  getForm(id: any): Promise<any> {

    return this.serviceLoadContainer.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'containerId': null,
        'shipment': null,
        'weight':null,
        'type':null
      };

      if (result.containerId) {
        formObject.containerId = result.containerId;
      } else {
        formObject.containerId = null;
      }

      if (result.shipment) {
        formObject.shipment = result.shipment;
      } else {
        formObject.shipment = null;
      }

      if (result.weight) {
        formObject.weight = result.weight;
      } else {
        formObject.weight = null;
      }

      
      if (result.type) {
        formObject.type = result.type;
      } else {
        formObject.type = null;
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

  */

  resetForm(): void {
    this.myForm.setValue({
      'weight':null,
      'type': null
    });
  }
}
