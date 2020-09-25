import { Component, OnInit  } from '@angular/core';
import { ApiService } from './services/api.service';
import { FakeDataService } from './services/fake-data.service';
import { BroadcastService } from './services/broadcastService';

import { UserStore } from './store/userStore';
declare var $: any; // ADD THIS


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private api: ApiService,
              private fakeData: FakeDataService,
              private broadcastService: BroadcastService,
              private userStore: UserStore

  ) {
    this.broadcastService.subscribe('EVENT', (msg) => {
      this.msg = msg;
      alert('hello! ' + msg);
    });
  }

  title = 'ng-demo';
  public lucy;
  public menu4;

  public msg: string;
  ngOnInit() {
    $('[data-toggle="popover"]').popover();
  }

  callApi() {
    this.getSmartphones();
    // alert('hello');
  }

  async getSmartphones() {
    // this.api.getSmartphone()
    //   .subscribe(data => {
    //     console.log(data);
    //   });
    // console.log('end');
    const result = await this.api.getSmartphone().toPromise();
    console.log(result);
    console.log('end');
  }

  getTeams() {
    const data = this.fakeData.getTeamList();
    console.log(data);
  }

  getTools() {
    const data = this.fakeData.getToolListByTeamId();
    console.log(data);
  }

  setUser() {
    this.userStore.setCurrentUser({
      id: 1,
      name: 'zevi'
    });
  }

}
