import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-step-bar',
  templateUrl: './step-bar.component.html',
  styleUrls: ['./step-bar.component.scss']
})
export class StepBarComponent implements OnInit {

  constructor() { }
  stateList = ['step-1',
    'step-2', 'step-2-1',
    'step-3', 'step-3-1'];

  devices = false;

  curStateIndex = 0;
  get currentStep() {
    return this.stateList[this.curStateIndex];
  }


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
    this.next();
    console.log('zip/transfer');
    setTimeout(() => {
      console.log('done');
      this.navStep(3);
      // this.navStep(4); // error
    }, 2000);
  }

}
