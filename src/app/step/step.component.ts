import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  constructor() { }
  get currentStep() {
    return this.stateList[this.curStateIndex];
  }
  stateList = ['step-1',
    'step-2', 'step-2-1',
    'step-3', 'step-3-1'];

  devices = false;

  curStateIndex = 0;

  timer;

  ngOnInit(): void {

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
      this.navStep(3);
      // this.navStep(4); // error
    }, 2000);
  }

  cancelProcess() {
    clearTimeout(this.timer);
    // this.prev();
    this.navStep(1);
  }

  alert(msg) {
    alert(msg);
  }

}
