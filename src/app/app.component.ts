import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { FakeDataService } from './services/fake-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private api: ApiService,
              private fakeData: FakeDataService

  ) { }

  title = 'ng-demo';
  public lucy;
  public menu4;

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

}
