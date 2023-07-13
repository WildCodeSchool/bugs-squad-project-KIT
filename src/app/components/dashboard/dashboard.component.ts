import { Component, OnInit } from '@angular/core';
import { GridStack } from 'gridstack';
declare let $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      const grid = GridStack.init({
        cellHeight: 70,
        acceptWidgets: true,
        removable: '#trash',
        float: true,
      });
      GridStack.setupDragIn('.newWidget', { appendTo: 'body', helper: 'clone' });

      const items = [
        { x: 0, y: 0, w: 4, h: 2, content: '1' },
        { x: 4, y: 0, w: 4, h: 4, content: '2' },
        { x: 8, y: 0, w: 2, h: 2, content: '3' },
        { x: 10, y: 0, w: 2, h: 2, content: '4' },
        { x: 0, y: 2, w: 2, h: 2, content: '5' },
        { x: 2, y: 2, w: 2, h: 4, content: '6' },
        { x: 8, y: 2, w: 4, h: 2, content: '7' },
        { x: 0, y: 4, w: 2, h: 2, content: '8' },
        { x: 4, y: 4, w: 4, h: 2, content: '9' },
        { x: 8, y: 4, w: 2, h: 2, content: '10' },
        { x: 10, y: 4, w: 2, h: 2, content: '11' },
      ];
      grid.load(items);

      grid.on('added removed change', function (e: any, items: any) {
        let str = '';
        items.forEach(function (item: any) {
          str += ' (x,y)=' + item.x + ',' + item.y;
        });
        console.log(e.type + ' ' + items.length + ' items:' + str);
      });
    });
  }
}
