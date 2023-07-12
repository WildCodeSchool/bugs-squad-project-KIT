import { Component, Input } from '@angular/core';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';
import { faLink, faPencil } from '@fortawesome/free-solid-svg-icons';
import { LinksService } from '../../services/links.service';
import { FormControl } from '@angular/forms';
import { CollectionsService } from '../../services/collections.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
  faPencil = faPencil;
  faLink = faLink;
  public color = '#FFFFFF';

  constructor(private linksService: LinksService, private collectionService: CollectionsService) {}

  links: Link[] = [];
  link!: Link;
  private i = 9999;
  id = new FormControl();
  url = new FormControl('');
  comment = new FormControl('');
  collectionId = new FormControl();

  @Input() collection!: Collection;

  // If there is a comment in the Link of the Collection, the comment is displayed. Else, the url is displayed

  getLinkComment(link: Link) {
    return link.comment ? link.comment : link.url;
  }

  updateLink() {
    const id = this.id.value;
    const url: string = this.url.value as string;
    const comment = this.comment.value;
    const collectionId = this.collectionId.value;

    const body = {
      id: id,
      url: url,
      comment: comment,
      collectionId: collectionId,
    };

    this.linksService.createLink(body).subscribe((data) => {
      this.link = data;

      this.linksService.updateLinkData(this.link);
    });
  }

  deleteCollection() {
    this.collectionService.deleteCollection(this.collection.id).subscribe((data) => {
      return this.collectionService.updateCollectionData(this.collection);
    });
  }

  patchCollection() {
    const color = this.collection.color;
    const title = this.collection.title;
    const description = this.collection.description;

    const body = {
      color: color,
      description: description,
      title: title,
    };

    this.collectionService.updateCollection(this.collection.id, body).subscribe(() => {
      return this.collectionService.updateCollectionData(this.collection);
    });
  }

  patchFavorite() {
    this.collectionService.patchFavorite(this.collection.id, !this.collection.favorite).subscribe(() => {
      return (this.collection.favorite = !this.collection.favorite);
    });
  }
}
