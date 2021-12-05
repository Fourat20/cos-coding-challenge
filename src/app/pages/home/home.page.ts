import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit {
  constructor(  private auth: AuthService,) {
                  this.auth.check()
                }

  async ngOnInit() {
    //reload data every 20 second
    setInterval(data => {
      this.auth.check()
      }, 20000);
  }
}