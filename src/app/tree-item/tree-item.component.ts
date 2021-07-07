import { Component, OnInit, Input, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { ITreeOptions, TreeModel, TreeNode } from '@circlon/angular-tree-component';

@Component({
  selector: 'app-tree-item',
  templateUrl: './tree-item.component.html',
  styleUrls: ['./tree-item.component.scss']
})
export class TreeItemComponent implements AfterViewInit, OnDestroy {

  @ViewChild('tree') treeComponent;

  options: ITreeOptions = {
    useCheckbox: true
  };
  @Input() nodes = [];

  ngAfterViewInit() {
    this.treeComponent.treeModel.subscribeToState((state: any) => { // ITreeState does not contain selectedLeafNodeIds

      // console.log(state);
      // console.log(this.treeComponent.treeModel.selectedLeafNodeIds);

      // drop the unwanted prototypes
      const selected = Object.assign({}, this.treeComponent.treeModel.selectedLeafNodeIds);
      const arr = [];
      for (const [key, value] of Object.entries(selected)) {
        if (value) { arr.push(key); }
      }
      console.log(arr);

    });
  }

  ngOnDestroy() {
    this.treeComponent.treeModel.unSubscribeToState();
  }
}


