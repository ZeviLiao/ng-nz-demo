import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';



@Component({
  selector: 'app-step-dialog',
  templateUrl: './step-dialog.component.html',
  styleUrls: ['./step-dialog.component.scss']
})
export class StepDialogComponent implements OnInit, OnDestroy {

  constructor(private elRef: ElementRef) {

  }

  // constructor(modal: NzModalService) {
  //   const ref: NzModalRef = modal.info();
  //   ref.close(); // Or ref.destroy(); This dialog will be destroyed directly
  // }

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

  openDialog(): void {
    console.log('open');
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
  closeDailog(event) {
    this.isVisible = event;
  }

}
