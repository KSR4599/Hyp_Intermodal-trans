import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import  { WalletService } from '../wallet/wallet.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  myForm: FormGroup;
  passkey = new FormControl('', Validators.required);


  constructor( private walletService: WalletService,fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public passedData: any) { 
    this.myForm = fb.group({
      passkey: this.passkey
    });
  }

  password = '';
  Msg = '';
  card = '';
  ngOnInit() {
  }

  logged() {

    this.password = this.myForm.value.passkey;

    console.log("Inside logged method. The passeddata is :", this.passedData.passkey);

    if((this.passedData.passkey == 'truck') && ( this.password== 'tttt')){
      this.Msg = 'Welcome, Truck Admin ✔️';
      this.card = '10@intermm';
      this.walletService.setDefaultCard(this.card).subscribe(()=>{
        
     });

    } else if((this.passedData.passkey == 'container') && (this.password == 'cccc')){
      this.Msg = 'Welcome, Container Admin ✔️';
      this.card = '20@intermm';
      this.walletService.setDefaultCard(this.card).subscribe(()=>{
        
      });

    } else {
      this.Msg = 'Provided Key-code is Wrong! ❌ ';
      
    }
  }


  addTransaction(form: any){
    this.passkey = form.passkey;
    console.log("The entered credentials are :",this.passkey);

      this.myForm.setValue({
        'weight':null,
        'type':null
      });

  }
}

