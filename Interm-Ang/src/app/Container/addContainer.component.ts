import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
    selector: 'app-addContainer',
    template: `<h1 mat-dialog-title>Provide the Container Details Below :</h1>

    <div mat-dialog-content>
    <p>Enter Container Number :</p>
    <mat-form-field>
      <input matInput>
    </mat-form-field>

    <p>Origin:</p>
    <mat-form-field>
      <input matInput>
    </mat-form-field>

    <p>Destination:</p>
    <mat-form-field>
      <input matInput>
    </mat-form-field>

    <p>Shchedule:</p>
    <mat-form-field>
      <input matInput>
    </mat-form-field>


  </div>
  <div mat-dialog-actions>
    <button mat-button (click)="onNoClick()">Cancel</button>
    <button mat-button>Ok</button>
  </div>
    `
})

export class addContainerComponent {

    constructor(public dialogRef: MatDialogRef<addContainerComponent>) {

       
    }

    onNoClick() {
        this.dialogRef.close();
    }
    
}