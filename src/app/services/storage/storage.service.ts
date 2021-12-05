import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
   }
//set storage encrypted
   async store(Key:string,value:any){
    const encryptedValue=btoa(escape(JSON.stringify(value)));
    return await this.storage.set(Key,encryptedValue);
  }

//get storage decrypted
  async get(Key:string){
    return new Promise(resolve=>{
      this.storage.get(Key).then((value)=>{     
        return  resolve(JSON.parse(unescape(atob(value))));
      });
    });
  }
}
