import { Component, OnInit, EventEmitter, Output, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Subscription } from 'rxjs/Subscription';
import  { WalletService } from '../../wallet/wallet.service';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  // void is to specify that, this event has no pay load, or any any data getting emitetd with it.
  // @Output specifies that, this event is listenable from outside
  constructor (private walletService: WalletService, public dialog: MatDialog){
  };

  @Output() sidenavToggle = new EventEmitter<void>();

  openDialog(logger): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      data: {
        passkey: logger
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The login dialog was closed');
      
    });
  }



  onToggleSidenav() {
   this.sidenavToggle.emit();
  }

  setDefaultWalletCard(card: string) {
    this.walletService.setDefaultCard(card).subscribe(()=>{
       // nothing to do here
       // ... or maybe just perform your page reload here after the call is finished
    });
    // also I don't think you have to return the observable to the form
}

}
