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
        cellHeight: 100,
        acceptWidgets: true,
        removable: '#trash',
        float: true,
      });
      GridStack.setupDragIn('.newWidget', { appendTo: 'body', helper: 'clone' });

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
