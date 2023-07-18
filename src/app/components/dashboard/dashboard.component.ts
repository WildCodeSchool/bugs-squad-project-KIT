import { Component, OnInit } from '@angular/core';
import { GridStack } from 'gridstack';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  private grid!: GridStack;

  ngOnInit(): void {
    this.initializeGrid();
  }

  private initializeGrid() {
    setTimeout(() => {
      this.grid = GridStack.init({
        cellHeight: 150,
        acceptWidgets: true,
        removable: '#trash',
        float: true,
      });

      GridStack.setupDragIn('.newWidget', { appendTo: 'body', helper: 'clone' });

      this.grid.on('added removed change', (e: any, items: any) => {
        let str = '';
        items.forEach((item: any) => {
          str += ' (x,y)=' + item.x + ',' + item.y;
        });
        console.log(e.type + ' ' + items.length + ' items:' + str);
      });
    });
  }

  viderGridStack() {
    if (this.grid) {
      this.grid.removeAll();
      this.initializeGrid();
    }
  }

  saveGridStack() {
    const gridItems = this.grid.getGridItems();
    const widgetPositions = gridItems.map((item) => ({
      id: item.getAttribute('data-gs-id'),
      x: item.getAttribute('data-gs-x'),
      y: item.getAttribute('data-gs-y'),
      width: item.getAttribute('data-gs-width'),
      height: item.getAttribute('data-gs-height'),
    }));
    // this.gridStackService.saveWidgetsPositions(widgetPositions).subscribe(
    //   (response) => {
    //     console.log('Sauvegarde réussie :', response);
    //   },
    //   (error) => {
    //     console.error('Erreur lors de la sauvegarde :', error);
    //   }
    // );
  }
}
