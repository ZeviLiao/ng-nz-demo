import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserStore } from '../../store/userStore';
import { BroadcastService } from '../../services/broadcastService';



@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  constructor(private broadcastService: BroadcastService,
              private userStore: UserStore
  ) { }

  @Input() yourName: string;

  user: any;

  // clickMe(): void {
  //   this.visible = false;
  // }

  // change(value: boolean): void {
  //   console.log(value);
  // }

  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  // visible = false;

  myhello() {
    this.notify.emit(this.yourName);
  }

  ngOnInit(): void {
  }
  publishEvent(): void {


    this.broadcastService.boradcast('EVENT', 'zevi cast');

    // if you want you can send a payload aswell.
    // this.broadcastService.boradcast("EVENT", {'data': [{}, {}]});
  }

  getUser() {
    this.user = this.userStore.currentUser;
  }

}
