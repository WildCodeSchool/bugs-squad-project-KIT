import { Component, Input } from '@angular/core';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';
import { faPencil, faLink } from '@fortawesome/free-solid-svg-icons';
import { LinksService } from '../../services/links.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
  faPencil = faPencil;
  faLink = faLink;
  public color = '#FFFFFF';

  constructor(private linksService: LinksService) {}

  links: Link[] = [];
  link!: Link;
  id = new FormControl();
  url = new FormControl('');
  comment = new FormControl('');
  collectionId = new FormControl();

  @Input() collection!: Collection;

  // If there is a comment in the Link of the Collection, the comment is displayed. Else, the url is displayed

  getLinkComment(link: Link) {
    return link.comment ? link.comment : link.url;
  }

  createLink() {
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

      this.link = new Link(
        this.link.id,
        this.url.value as string,
        this.comment.value as string,
        this.collectionId.value as number
      );
      this.linksService.updateLinkData(this.link);
    });
  }
}
