import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent {
  collections: Collection[] = [];
  collection!: Collection;
  title = new FormControl('');
  description = new FormControl('');
  link = new FormControl('');
  comment = new FormControl('');
  collectionColor = new FormControl('#FFFFFF');

  addToCollections() {
    this.collections.push(this.collection);
  }

  createCollection() {
    this.collection = new Collection(
      this.title.value as string,
      [new Link(this.link.value as string, this.comment.value as string)],
      this.description.value as string
    );
    this.addToCollections();
  }
}
