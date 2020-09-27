import { Component } from '@angular/core';
import { ClrSelectedState } from '@clr/angular';

function search(array, name) {
  const s = (r, { files, ...object }) => {
    if (object.name.includes(name)) {
      r.push({ object, files: [] });
      return r;
    }
    files = files.reduce(s, []);
    if (files.length) { r.push({ ...object, files }); }
    return r;
  };
  return array.reduce(s, []);
}

@Component({
  selector: 'app-tree-demo',
  templateUrl: './tree-demo.component.html',
  styleUrls: ['./tree-demo.component.scss']
})
export class TreeDemoComponent {
  searchValue = '';
  root = [
    {
      name: 'src',
      files: [
        {
          name: 'app',
          files: [
            {
              name: 'app.component.html', files: []
            },
            {
              name: 'app.component.ts', files: []
            },
            {
              name: 'app.module.ts', files: []
            },
            {
              name: 'app.routing.ts', files: []
            }
          ]
        },
        {
          name: 'environments',
          files: [
            {
              name: 'environments.prod.ts', files: []

            },
            {
              name: 'environment.ts', files: []
            }
          ]
        },
        {
          name: 'index.html', files: []
        },
        {
          name: 'main.ts', files: []
        }
      ]
    },
    {
      name: 'package.json', files: []
    },
    {
      name: 'tsconfig.json', files: []
    }
  ];

  getChildren = (folder) => folder.files;

  get dispNodes() {
    if (this.searchValue) {
      // search(this.root, this.searchValue);
      const nodes = [
        {
          name: 'src',
          files: [
            {
              name: 'app',
              files: [
                {
                  name: 'app.component.html', files: []
                },
                {
                  name: 'app.component.ts', files: []
                },
                {
                  name: 'app.module.ts', files: []
                },
                {
                  name: 'app.routing.ts', files: []
                }
              ]
            },
            {
              name: 'environments',
              files: [
                {
                  name: 'environments.prod.ts', files: []

                },
                {
                  name: 'environment.ts', files: []
                }
              ]
            },
            {
              name: 'index.html', files: []
            },
            {
              name: 'main.ts', files: []
            }
          ]
        }
      ];
      return nodes;
    } else {
      return this.root;
    }
  }

}
