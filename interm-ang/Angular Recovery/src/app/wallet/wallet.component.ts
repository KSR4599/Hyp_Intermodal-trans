import { Component } from '@angular/core';
import { WalletService } from './wallet.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent {

  constructor (private walletService: WalletService){
  };

  setDefaultWalletCard(card: string) {
    this.walletService.setDefaultCard(card).subscribe(()=>{
       // nothing to do here
       // ... or maybe just perform your page reload here after the call is finished
    });
    // also I don't think you have to return the observable to the form
}

}



