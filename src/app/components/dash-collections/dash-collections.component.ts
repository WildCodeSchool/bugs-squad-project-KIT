import { Component } from '@angular/core';
import { Collection } from 'src/app/models/Collection';
import { CollectionsService } from 'src/app/services/collections.service';

@Component({
  selector: 'app-dash-collections',
  templateUrl: './dash-collections.component.html',
  styleUrls: ['./dash-collections.component.scss'],
})
export class DashCollectionsComponent {
  collection!: Collection;
  favCollections: Collection[] = [];

  constructor(private collectionService: CollectionsService) {}

  ngOnInit() {
    this.collectionService.getFavoriteCollections().subscribe((data) => {
      this.favCollections = data;
    });
  }
}
