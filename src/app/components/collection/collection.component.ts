import { Component, Input } from '@angular/core';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';
import { faPencil, faLink } from '@fortawesome/free-solid-svg-icons';
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

  @Input() collection!: Collection;
  @Input() collectionColor!: AbstractControl;

  // If there is a comment in the Link of the Collection, the comment is displayed. Else, the url is displayed

  getLinkComment(link: Link) {
    return link.comment ? link.comment : link.url;
  }
}
