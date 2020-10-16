import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
declare var bootbox: any;
declare var axios: any;
declare global {
  interface Window {
    nuwa: any;
  }
}
const { WebSocketProccess } = window.nuwa;

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  constructor(private modal: NzModalService, private elRef: ElementRef) { }
  get currentStep() {
    return this.stateList[this.curStateIndex];
  }

  confirmModal?: NzModalRef; // For testing by now
  stateList = ['step-1',
    'step-2', 'step-2-1',
    'step-3', 'step-3-1'];

  devices = false;
  result = true;
  timer;
  team = [];
  token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Rldi1hcGkubnV3YXJvYm90aWNzLmNvbSIsInN1YiI6ImF1dGguZGV2Lm51d2Fyb2JvdGljc3wxNzcxNjA3MzM3OTkiLCJhdWQiOiIyODk5MDk1OC1DQ0FFLTQ5QjktQjg2MS0wRDQyQTdENURERkUiLCJpYXQiOjE2MDI4MjgzMTYsImV4cCI6MTYwMzA4NzUxNiwianRpIjoiNDI4OWQ0YjItYTQ0YS00MTU0LTljZTctMWI3MmFhNzliNWQ1IiwiY29udGV4dCI6eyJ0eXBlIjoiYWNjZXNzIiwicHJvdmlkZXIiOiJuZXdOdXdhfHpldmlsaWFvQGdtYWlsLmNvbSJ9LCJzY29wZSI6InVhbXMgcm1zX3VzZXIgY29kZUxhYiBtYXRlcmlhbExpYnJheSBkZXZlbG9wVG9vbCBzbGlkZSBjb250ZW50RWRpdG9yIHNoYXJpbmdBY2NvdW50In0.DwjBbEilGCtJRWMfocp8uoxGZiBLj1-I9W9shMlg9A1p1fzeZWyzijQKRCQUmlDFKm7kDXJtrjQZAeYQliyfc4gB7H1zGiMEXevTuyDaQls4ATVF8dzmaG6-i_Gk3MHDhZVk9E_VkhCxpkPISfauRMRUQcBunLWhgk3m0XSTfXe7Jx-d43tWj7UL-4G3yr5MDyVAzDizZg8MOAqUPv_kfJmkctnJJdmUWyJsTTO7EPSSq8MAyhmRU286zwlmp-LngNsMqop4zP1lh10x29E8pbux-oa_s012XskwJ2hP5cSVXfddQJCDPej0vxV-vb8Qe4PdHSgBOSmJnkStFkj6vA';
  customerId = 'NB1557903870927'; // "NB1557903870926",
  curCnnState = false;

  userId = '';
  webVersion = '0.0.10';
  isRmsScope = false;
  isBiz = false;
  teachFeature = false;
  ws = null;
  type = 'slide';
  env = 'dev';
  ver = 'v1';
  app: {
    showConnect,
    showFuncBtn,
    funcList,
  } = {
      showConnect: false,
      showFuncBtn: false,
      funcList: false,
    };
  robotClientIds = [];
  presentationId = '2';
  curName = '';

  @Input()
  curStateIndex = 0;

  @Output()
  closeDailog: EventEmitter<boolean> = new EventEmitter<boolean>();


  wsConn: boolean;

  ngOnInit(): void {
    const target = this.elRef.nativeElement.ownerDocument.body;
    target.classList.add('zevi');
    this.login();
  }

  ngOnDestroy(): void {
    const target = this.elRef.nativeElement.ownerDocument.body;
    target.classList.remove('zevi');
  }

  white(meet = 'isBiz') {

    const target = this.team.find((item) => item[meet]);
    if (target) {
      const { isBiz, teachFeature, teamId } = target;
      Object.assign(this, {
        customerId: teamId,
        isBiz,
        teachFeature,
      });
      this.connect();

    } else {
      console.warn('未找到白名单权限');
    }
    // console.log(target, this.team);
  }

  next() {
    this.curStateIndex++;
    if (this.curStateIndex > this.stateList.length - 1) {
      this.curStateIndex = this.stateList.length - 1;
    }
  }

  prev() {
    this.curStateIndex--;
    if (this.curStateIndex === -1) {
      this.curStateIndex = 0;
    }
  }

  navStep(index) {
    this.curStateIndex = index;
  }

  process() {
    // this.next();
    this.navStep(2);
    console.log('zip/transfer');
    this.timer = setTimeout(() => {
      console.log('done');
      // this.navStep(3);
      // this.navStep(4); // error
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.result = !this.result;
          if (this.result) {
            resolve(this.navStep(3));

          } else { reject(this.navStep(4)); }
        }, 1000);
      }).catch(() => console.log('Oops errors!'));

    }, 2000);
  }

  cancelProcess() {
    clearTimeout(this.timer);
    // this.prev();
    this.navStep(1);
  }

  exit() {
    this.closeDailog.emit(false);
  }

  showConfirm(): void {
    // this.confirmModal = this.modal.create({
    //   nzTitle: 'Do you Want to delete these items?',
    //   nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
    //   nzOnOk: () =>
    //     // new Promise((resolve, reject) => {
    //     //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
    //     // }).catch(() => console.log('Oops errors!'))
    //     console.log('ok')
    // });
    bootbox.confirm('This is the default confirm!', function(result) {
      console.log('This was logged in the callback: ' + result);
    });
  }

  async login() {
    const { token } = this;
    await axios({
      method: 'get',
      url: 'http://dev-api.nuwarobotics.com/v1/uams/user/info',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => {
        const { userId, team } = res.data.data;
        Object.assign(this, {
          userId,
          team,
        });
        console.log(res, 'res');
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  }

  connect() {
    const connectStatus = (payload: any) => {
      console.log('connectStatus:xx=>', payload);
      if (payload.status.state === 'reslove') {
        console.log('已登录');
        this.curCnnState = true;
        if (this.curCnnState) {
          this.next();
        }
      } else if (payload.status.state === 'reject') {
        console.log('未登录');
      } else if (payload.status.state === 'pending') {
        console.log('登录中');
      } else if (payload.status.state === 'on') {
        this.curCnnState = payload.status.state === 'on';
        console.log(payload.payload.desc);
      } else if (payload.status.state === 'off') {
        this.curCnnState = payload.status.state === 'on';
        console.log(payload.payload.desc);
      }
    };
    const receiveData = (payload) => {
      // getDevice sendFile
      // console.log("receiveData:xx=>", payload);
      if (['reslove', 'reject'].includes(payload.status.state)) {
        console.log('receiveData:xx=>', payload);
      }
    };

    if (this.ws) {
      this.ws.reconnectForced();
      return;
    }

    const {
      ver,
      env,
      type,
      webVersion,
      userId,
      customerId,
      token,
      isRmsScope,
      isBiz,
      teachFeature,
    } = this;
    const ws = (this.ws = new WebSocketProccess(
      {
        ver,
        env,
        webVersion,
        type,
        userId,
        customerId,
        token,
        isRmsScope,
        isBiz,
        teachFeature,
      },
      { connectStatus, receiveData },
      {}
    ));
    console.log(ws);
  }
  disCnn() {
    this.ws.close();
    this.curCnnState = false;
  }
}

