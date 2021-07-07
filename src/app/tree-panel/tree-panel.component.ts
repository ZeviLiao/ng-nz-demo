import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-panel',
  templateUrl: './tree-panel.component.html',
  styleUrls: ['./tree-panel.component.scss']
})
export class TreePanelComponent implements OnInit {

  checkedIds=[];

  nodes = [
    {
      id: 1,
      name: 'North America',
      children: [
        {
          id: 11,
          name: 'United States',
        },
        {
          id: 12,
          name: 'Canada'
        }
      ],
      unBoundData: ['aa', 'bb']
    },
    {
      id: 2,
      name: 'North America',
      children: [
        {
          id: 21,
          name: 'United States',
        },
        {
          id: 22,
          name: 'Canada'
        }
      ],
      unBoundData: ['aa1', 'bb2']
    }
  ];

  ngOnInit(): void {
  }

}
