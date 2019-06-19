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
import { CreateContainerService } from './CreateContainer.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-createcontainer',
  templateUrl: './CreateContainer.component.html',
  styleUrls: ['./CreateContainer.component.css'],
  providers: [CreateContainerService]
})
export class CreateContainerComponent implements OnInit {

  myForm: FormGroup;

  private allTransactions;
  private Transaction;
  private currentId;
  public errorMessage ='';
  public successMessage='';
  public spinner = '';
  public btnStatus = true;

  containerNumber = new FormControl('', Validators.required);
  origin = new FormControl('', Validators.required);
  destination = new FormControl('', Validators.required);
  schedule = new FormControl('', Validators.required);
  

  constructor(private serviceCreateContainer: CreateContainerService, fb: FormBuilder) {
    this.myForm = fb.group({
      containerNumber: this.containerNumber,
      origin: this.origin,
      destination: this.destination,
      schedule: this.schedule
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceCreateContainer.getAll()
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
      $class: 'org.acme.interm.container.CreateContainer',
      'containerNumber': this.containerNumber.value,
      'origin': this.origin.value,
      'destination': this.destination.value,
      'schedule': this.schedule.value
    };

    this.myForm.setValue({
      'containerNumber': null,
      'origin': null,
      'destination': null,
      'schedule': null
    });

    return this.serviceCreateContainer.addTransaction(this.Transaction)
    .toPromise()
    .then(() => {
      console.log("Container Added Successfully")
      this.errorMessage = null;
      this.myForm.setValue({
        'containerNumber': null,
        'origin': null,
        'destination': null,
        'schedule': null
      });
      this.spinner = '';
      this.successMessage= 'New Container Created!👍';
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
      $class: 'org.acme.interm.container.CreateContainer',
      'containerNumber': this.containerNumber.value,
      'origin': this.origin.value,
      'destination': this.destination.value,
      'schedule': this.schedule.value
    };

    return this.serviceCreateContainer.updateTransaction(form.get('transactionId').value, this.Transaction)
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

    return this.serviceCreateContainer.deleteTransaction(this.currentId)
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

  getForm(id: any): Promise<any> {

    return this.serviceCreateContainer.getTransaction(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'containerNumber': null,
        'origin': null,
        'destination': null,
        'schedule': null
      };

      if (result.containerNumber) {
        formObject.containerNumber = result.containerNumber;
      } else {
        formObject.containerNumber = null;
      }

      if (result.origin) {
        formObject.origin = result.origin;
      } else {
        formObject.origin = null;
      }

      if (result.destination) {
        formObject.destination = result.destination;
      } else {
        formObject.destination = null;
      }

      if (result.schedule) {
        formObject.schedule = result.schedule;
      } else {
        formObject.schedule = null;
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
      'containerNumber': null,
      'origin': null,
      'destination': null,
      'schedule': null
    });
  }
}
