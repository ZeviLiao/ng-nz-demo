import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-step-dialog',
  templateUrl: './step-dialog.component.html',
  styleUrls: ['./step-dialog.component.scss']
})
export class StepDialogComponent implements OnInit, OnDestroy {

  constructor(private elRef: ElementRef) {

  }

  isVisible = false;

  ngOnInit(): void {
    const target = this.elRef.nativeElement.ownerDocument.body;
    target.classList.add('zevi');
  }

  ngOnDestroy(): void {
    const target = this.elRef.nativeElement.ownerDocument.body;
    target.classList.remove('zevi');
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}
