import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ITreeOptions, TreeModel, TreeNode } from '@circlon/angular-tree-component';

@Component({
  selector: 'app-tree-demo',
  templateUrl: './tree-demo.component.html',
  styleUrls: ['./tree-demo.component.scss']
})
export class TreeDemoComponent implements AfterViewInit {

  @ViewChild('tree') treeComponent;

  options: ITreeOptions = {
    useCheckbox: true
  };
  nodes = [
    {
      id: 1,
      name: 'North America',
      children: [
        {
          id: 11,
          name: 'United States', children: [
            {
              id: 111,
              name: 'New York'
            },
            {
              id: 112,
              name: 'California'
            },
            {
              id: 113,
              name: 'Florida'
            }
          ]
        },
        {
          id: 12,
          name: 'Canada'
        }
      ]
    },
    {
      id: 2,
      name: 'South America',
      children: [
        {
          id: 21,
          name: 'Argentina', children: []
        },
        {
          id: 22,
          name: 'Brazil'
        }
      ]
    },
    {
      id: 3,
      name: 'Europe',
      children: [
        {
          id: 31,
          name: 'England'
        },
        {
          id: 32,
          name: 'Germany'
        },
        {
          id: 33,
          name: 'France'
        },
        {
          id: 34,
          name: 'Italy'
        },
        {
          id: 35,
          name: 'Spain'
        }
      ]
    }
  ];

  filterFn(value: string, treeModel: TreeModel) {
    treeModel.filterNodes((node: TreeNode) => fuzzysearch(value, node.data.name));
  }

  ngAfterViewInit() {
    this.treeComponent.treeModel.subscribeToState((state: any) => { // ITreeState does not contain selectedLeafNodeIds

      console.log(state);
      console.log(this.treeComponent.treeModel.selectedLeafNodeIds);

      // drop the unwanted prototypes
      const selected = Object.assign({}, this.treeComponent.treeModel.selectedLeafNodeIds);
      console.log(selected);
    });
  }

}
function fuzzysearch(needle: string, haystack: string) {
  const haystackLC = haystack.toLowerCase();
  const needleLC = needle.toLowerCase();

  const hlen = haystack.length;
  const nlen = needleLC.length;

  if (nlen > hlen) {
    return false;
  }
  if (nlen === hlen) {
    return needleLC === haystackLC;
  }
  outer: for (let i = 0, j = 0; i < nlen; i++) {
    const nch = needleLC.charCodeAt(i);

    while (j < hlen) {
      if (haystackLC.charCodeAt(j++) === nch) {
        continue outer;
      }
    }
    return false;
  }
  return true;
}
