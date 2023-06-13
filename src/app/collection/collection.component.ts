import { Component } from '@angular/core';
import { Collection } from '../models/Collection';
import { Link } from '../models/Link';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent {

  collection: Collection = new Collection('Ma collection', [new Link('https://angular.io/', 'doc officielle Angular')], 'ma description');


}
