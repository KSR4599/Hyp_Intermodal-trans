import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';


@Injectable()
export class WalletService{
    private resolveSuffix: string = '?resolve=true';
    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http) {
        this.actionUrl = '/api/';
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

  public setDefaultCard(cardName){
   var data = new FormData();
   data.append("", "");
   var card = cardName;
   return this.http.post('http://localhost:3000/api/wallet/'+card+'/setDefault', data, {withCredentials: true});
 }
}