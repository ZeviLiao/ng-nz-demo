import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';

declare var bootbox: any;
declare var axios: any;
declare global {
  interface Window {
    nuwa: any;
  }
}
const { WebSocketProccess } = window.nuwa;

const slideServerUrl = 'https://dev-slide-api.nuwarobotics.com/api-admin/v1' + '/presentations/2/distribute';
// const slideServerUrl = 'https://dev-slide-api.nuwarobotics.com/api-admin/v1' + '/presentations/2/file-url';



@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  constructor(
    // private modal: NzModalService,
    private elRef: ElementRef,
    private httpClient: HttpClient) { }
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
  token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2Rldi1hcGkubnV3YXJvYm90aWNzLmNvbSIsInN1YiI6ImF1dGguZGV2Lm51d2Fyb2JvdGljc3wxNzcxNjA3MzM3OTkiLCJhdWQiOiIyODk5MDk1OC1DQ0FFLTQ5QjktQjg2MS0wRDQyQTdENURERkUiLCJpYXQiOjE2MDI5ODk2OTMsImV4cCI6MTYwMzI0ODg5MywianRpIjoiMTI5MzEyYWUtZTQyNC00MGFkLTk0M2ItYWU2Y2I5ZDEyMWU1IiwiY29udGV4dCI6eyJ0eXBlIjoiYWNjZXNzIiwicHJvdmlkZXIiOiJuZXdOdXdhfHpldmlsaWFvQGdtYWlsLmNvbSJ9LCJzY29wZSI6InVhbXMgcm1zX3VzZXIgY29kZUxhYiBtYXRlcmlhbExpYnJheSBkZXZlbG9wVG9vbCBzbGlkZSBjb250ZW50RWRpdG9yIHNoYXJpbmdBY2NvdW50In0.Dc8P91UHdx91tcRlkj0SpmUUhbw7aBRXrgFgX2-ZIAfSn1WRqCPKZUaOiEri2iiWPprzzeZZpGaPXf9lOYZWFoAQbapLM3go5hnwP-enh26Rdt82MuUqY4f1CeCgW4gEq13vSTdAU_GI2Wr4L9FNPeApShe7Ot7tgt0OYDD5beJLYePmHuCz6ikwbm3jJ8y_8Xe3LWU0oewsXtU0o4WkZMV7P82SKBE4nt1TEGCohAx7qLrU3X_7AFau-VnQvhBF3C5hF5bpPcOHiIOUN-PYpKP7apZBIChYuG8QALfyfE6_yUQFoPO-ytBKEckLsv2TsOoPuNHMoQKQwYiyTz6kyQ';
  customerId = 'NB1557903870927'; // "NB1557903870926",
  curCnnState = false;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.token
    })
  };

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
  robots = [];
  presentationId = '2';
  curName = '';
  curState = false;

  projectId = '2';
  url = 'ptt-2-1602560231286.zip';
  projectName = 'ptt-2-1602560231286.zip';
  newProjectName = 'ptt-2-1602560231286.zip';
  zipFileInfo: {
    presentationId: string,
    title,
    zipFileName,
    zipFileSize,
    zipFileMd5
  };

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

  async getAsyncZipData() {
    const url = '';
    return await this.httpClient.post<any>(
      slideServerUrl, {}, this.httpOptions
    ).toPromise();
    // console.log('No issues, I will wait until promise is resolved..');
  }

  async process() {
    console.log('zevi', 'process');
    this.navStep(2);
    // pack and get zip file info.


    // {
    //   "presentationId": 2,
    //   "title": "zppt3",
    //   "zipFileName": "ptt-2-1602997641848.zip",
    //   "zipFileSize": "148489",
    //   "zipFileMd5": "e17c865aded12813c4e08ba5d36f1474"
    // }
    this.zipFileInfo = await this.getAsyncZipData();
    this.zipFileInfo.presentationId = this.zipFileInfo.presentationId + '';

    // this.next();
    // get file info send file.

    const ok = await this.sendFile();
    if (ok) {
      this.navStep(3);
    } else {
      this.navStep(4); // error
    }
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
    const self = this;
    bootbox.confirm('This is the default confirm!',
      function(result) {
        console.log('This was logged in the callback: ' + result);
        if (result) {
          self.backToRms();
        }
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

  getDevice() {
    console.log('getDevice');
    this.ws.subscribe.getDevice((payload) => {
      // console.log(payload, "getDevice:");
      this.curName = payload.name;
      if (payload.status.state === 'resolve') {
        if (payload.name === 'white') {
          // 白名单没有
          console.log(payload.payload.data.list);
          // get clinet ids
          this.robotClientIds = payload.payload.data.list
            .filter((flo) => /^0-/.test(flo.clientId))
            .map((mo) => mo.clientId);

          // show robots on screen
          this.robots = payload.payload.data.list
            .filter((flo) => /^0-/.test(flo.clientId));


        } else if (payload.name === 'rms') {
          console.log('zevi_devs', payload.payload.payload);
          // console.log("这里是rms的设备列表 拥有群组概念");
          this.robotClientIds = payload.payload.payload
            .filter((grp) => grp.currentDeviceCount > 0)
            .map((grp) => {
              return grp.devices.map((d) => d.clientId);
            })
            .flat();
        }
        // console.log("getDevice_resolve:", this.robotClientIds, payload);
      }
    }); // name == rms 可携带参数 { page: xx, limit: xxx  } 分页查询设备
  }

  sendFile() {
    console.log('sendFile');
    const { /*presentationId,*/ robotClientIds } = this;
    const self = this;

    return new Promise((rev, rej) => {
      this.ws.subscribe.sendFile(
        (payload) => {
          console.log(payload, 'sendFile:');
          // rev(true);
          if (payload.status.state === 'resolve') {
            // console.log(payload, 'sendFile_resolve:');
            rev(true);
          } else if (payload.status.state === 'reject') {
            rev(false);
          }
        },
        // { robotClientIds, presentationId }
        {
          url: self.zipFileInfo.zipFileName, // 'ptt-2-1602560231286.zip', // destinationName url 和 to 为必填
          to: robotClientIds,
          md5: self.zipFileInfo.zipFileMd5, // '0c75a73dfc458ab705e648ed5422765a',
          size: +(self.zipFileInfo.zipFileSize) // 306153,
        }
      );

    });

  }

  async backToRms(forceOverwrite = {}) {
    const self = this;
    const body = {
      projectId: self.zipFileInfo.presentationId,
      url: self.zipFileInfo.zipFileName,
      type: 'slide',
      projectName: `${self.zipFileInfo.title}.zip` ,
      newProjectName: `${self.zipFileInfo.title}.zip`,
      forceOverwrite: undefined,
      ...forceOverwrite,
    };
    console.log(body, forceOverwrite);
    const [data, err] = await axios({
      method: 'post',
      url: 'http://dev-api.nuwarobotics.com/v1/rms/upload/to/rms',
      headers: {
        Authorization: 'Bearer ' + this.token,
        customerid: 'NB1557903870927' // this.customerId,
      },
      data: body,
    })
      .then((res) => [res, null])
      .catch((err) => [null, err]);
    // console.log("uploadToRms=>", data);

    if (data) {
      let msg = 'backup ok!';
      if (body.forceOverwrite) {
        msg = 'over write ok!';
      }
      bootbox.alert(msg);
    }

    if (err) {
      const response = err.response;
      if (
        response &&
        response.data &&
        response.data.status &&
        response.data.status.description.indexOf('data exist') > -1
      ) {
        bootbox.confirm({
          title: '重複專案提示',
          message: '檔案已存在, 繼續將覆蓋已經存在的檔案, 是否继续?',
          buttons: {
            cancel: {
              label: '新增檔案'
            },
            confirm: {
              label: '確定覆蓋'
            }
          },
          callback(result) {
            console.log('This was logged in the callback: ' + result);
            if (result) {
              self.backToRms({ forceOverwrite: 'Y' });
            } else {
              const newProjectName = response.data.status.message;
              self.backToRms({
                forceAdd: 'Y',
                newProjectName,
              });
            }
          }
        });
      } else {
        bootbox.alert('備份失敗');
      }
    }
  }

  connect() {
    const connectStatus = (payload: any) => {
      console.log('connectStatus:xx=>', payload);
      if (payload.status.state === 'resolve') {
        console.log('已登录');
        this.curCnnState = true;
        if (this.curCnnState) {
          this.next();
          this.getDevice();
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
      console.log('receiveData:xx=>', payload);
      // if (['resolve', 'reject'].includes(payload.status.state)) {
      //   console.log('receiveData:xx=>', payload);
      // }
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

