import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNode } from 'ng-zorro-antd/tree';

function search(array, title) {
  const s = (r, { children, ...object }) => {
    if (object.title.includes(title)) {
      r.push({ object, children: [] });
      return r;
    }
    children = children.reduce(s, []);
    if (children.length) { r.push({ ...object, children }); }
    return r;
  };
  return array.reduce(s, []);
}

@Component({
  selector: 'app-tree-demo',
  templateUrl: './tree-demo.component.html',
  styleUrls: ['./tree-demo.component.scss']
})
export class TreeDemoComponent implements OnInit {

  searchValue = '';
  nodes = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true, children: [] },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true, children: [] },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true, children: [] }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true, children: [] },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true, children: [] },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true, children: [] }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true,
          children: []
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true, children: [] },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true, children: [] },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true, children: [] }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true,
      children: []
    }
  ];

  get dispNodes() {
    if (this.searchValue) {
      const nodes = search(this.nodes, this.searchValue);
      return [...nodes];
    } else {
      return [...this.nodes];
    }
  }

  ngOnInit(): void {
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }
}
