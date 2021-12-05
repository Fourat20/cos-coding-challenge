import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string;
userPayload
payload

  constructor(private httpClient: HttpClient,
              private storage: StorageService,
              private router: Router,
              ) { 
    this.url = "https://api-core-dev.caronsale.de/api";
  }

//login
   login(email,password){
  this.httpClient.put(this.url+"/v1/authentication/"+email, {
    password:password,
    meta: 'string',
  }).subscribe(
         async (res)=>{
        this.userPayload=res
            //  console.log("token ",this.userPayload.token);
            await this.storage.store("userPayload",this.userPayload)
           
            this.router.navigate(["/home"]);
         },       (err)=> {
           this.presentAlert() 
      })
}

//if Non-Buyer registers Err Alert
async presentAlert() {
  const alert = document.createElement('ion-alert');
  alert.header = 'Error';
  alert.message = 'Non-Buyer registers.';
  alert.buttons = ['OK'];
  document.body.appendChild(alert);
  await alert.present();
}

//get userPayload from storage service
getUserPayload(){
  return  this.storage.get("userPayload")
}

//get AuctionBuyer
getAuctionBuyer(userPayload){
  if(userPayload){
    const httpOptions = {
      headers: new HttpHeaders({
        userId: userPayload.userId,
        authToken: userPayload.token,
      }),
    };
    this.httpClient.get(this.url+"/v2/auction/buyer/", httpOptions).subscribe(
           (res)=>{
            this.payload=res              
               
              this.router.navigate(["/home"]);
             return  this.payload
           },()=>{
            console.log("redirect to login Exception thrown ");
            this.router.navigate(["/login"]);
           });
  }
}

check(){
  return this.getUserPayload().then(async (userPayload) => {
    if (userPayload) {
       this.getAuctionBuyer(userPayload)
    }else{
      this.router.navigate(["/login"]);
    }
  })
}
}
