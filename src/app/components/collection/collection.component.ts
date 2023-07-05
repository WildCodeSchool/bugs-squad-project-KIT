import { Component, Input, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';
import { faPencil, faLink } from '@fortawesome/free-solid-svg-icons';
import { AbstractControl } from '@angular/forms';
import { CollectionsService } from '../../services/collections.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  constructor(private collectionsSerice: CollectionsService) {}
  private _collections!: Collection[];

  faPencil = faPencil;
  faLink = faLink;

  public color = '#FFFFFF';

  @Input() collection!: Collection;
  @Input() collectionColor!: AbstractControl;

  // If there is a comment in the Link of the Collection, the comment is displayed. Else, the url is displayed

  getLinkComment(link: Link) {
    return link.comment ? link.comment : link.url;
  }

  get collections() {
    return this._collections;
  }

  public handleAllCollections() {
    this.collectionsSerice.getCollections().subscribe((data) => {
      this._collections = data;
    });
  }

  ngOnInit() {
    this.collectionsSerice.getCollections().subscribe((data) => {
      this._collections = data;
    });
  }
}
