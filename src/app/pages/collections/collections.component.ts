import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

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

  faPencil = faPencil;
  faLink = faLink;

  angular: Collection = new Collection(
    'Angular',
    [
      new Link('https://angular.io/', 'Bases'),
      new Link('https://angular.io/tutorial', 'Tutoriel'),
      new Link('https://angular.io/guide', 'Guide'),
    ],
    "Doc officielle d'Angular"
  );

  react: Collection = new Collection(
    'React',
    [
      new Link('https://react.dev/', 'Bases'),
      new Link('https://www.youtube.com/watch?v=SMgQlTSoXf0&list=PLjwdMgw5TTLWom67YfZuha-1iYzIirwJR', 'formations YT'),
      new Link('https://react.dev/learn/tutorial-tic-tac-toe', 'Tuto tic tac toe'),
    ],
    'Doc officielle de React'
  );

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
