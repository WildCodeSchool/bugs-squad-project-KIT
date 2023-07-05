import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { CollectionsService } from '../../services/collections.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  collections: Collection[] = [];
  collection!: Collection;
  title = new FormControl('');
  description = new FormControl('');
  link = new FormControl('');
  comment = new FormControl('');
  collectionColor = new FormControl('#FFFFFF');

  constructor(private collectionsSerice: CollectionsService) {}

  faPencil = faPencil;
  faLink = faLink;

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

  ngOnInit() {
    this.collectionsSerice.getCollections().subscribe((data) => {
      this.collections = data;
    });
  }
}
