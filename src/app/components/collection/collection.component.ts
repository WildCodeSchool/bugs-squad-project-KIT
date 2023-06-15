import { Component, Input } from '@angular/core';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
  faPencil = faPencil;
  faLink = faLink;

  public color = '#FFFFFF';

  testcollection: Collection = new Collection(
    'Ma collection',
    [
      new Link('https://angular.io/', 'doc officielle Angular'),
      new Link('https://angular.io/', 'doc officielle Angular'),
      new Link('https://angular.io/', 'doc officielle Angular'),
      new Link('https://angular.io/', 'doc officielle Angular'),
    ],
    'ma description'
  );

  @Input() collection!: Collection;
  @Input() collectionColor!: AbstractControl;

  ngOnInit() {
    this.color = this.collectionColor.value;
  }
}
