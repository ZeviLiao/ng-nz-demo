import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

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

  @Input()
  curStateIndex = 0;

  @Output()
  closeDailog: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
    const target = this.elRef.nativeElement.ownerDocument.body;
    target.classList.add('zevi');
  }

  ngOnDestroy(): void {
    const target = this.elRef.nativeElement.ownerDocument.body;
    target.classList.remove('zevi');
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
        } , 1000);
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
    this.confirmModal = this.modal.create({
      nzTitle: 'Do you Want to delete these items?',
      nzContent: 'When clicked the OK button, this dialog will be closed after 1 second',
      nzOnOk: () =>
        // new Promise((resolve, reject) => {
        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        // }).catch(() => console.log('Oops errors!'))
        console.log('ok')
    });
  }

}
