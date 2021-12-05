import { Component } from '@angular/core';
import { Platform} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor( private platform: Platform,
               private storage: Storage,
               private auth: AuthService) {
                this.initializeApp();
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.storage.create()
    });
}
}
