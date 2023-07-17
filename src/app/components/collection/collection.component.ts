import { Component, Input } from '@angular/core';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';
import { faLink, faPencil } from '@fortawesome/free-solid-svg-icons';
import { LinksService } from '../../services/links.service';
import { FormControl } from '@angular/forms';
import { CollectionsService } from '../../services/collections.service';
import { MatDialog } from '@angular/material/dialog';
import { CollectionsFormComponent } from '../collection-form/collection-form.component';
import { CollectionFormUpdateComponent } from '../collection-form-update/collection-form-update.component';
import { LinksComponent } from '../links/links.component';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent {
  faPencil = faPencil;
  faLink = faLink;
  public color = '#FFFFFF';

  constructor(
    private linksService: LinksService,
    private collectionService: CollectionsService,
    public dialog: MatDialog
  ) {}

  links: Link[] = [];
  link!: Link;
  private i = 9999;
  id = new FormControl();
  url = new FormControl('');
  title = new FormControl('');
  collectionId = new FormControl();

  @Input() collection!: Collection;

  // If there is a title in the Link of the Collection, the title is displayed. Else, the url is displayed

  getLinkComment(link: Link) {
    return link.title ? link.title : link.url;
  }

  updateLink() {
    const id = this.id.value;
    const url: string = this.url.value as string;
    const title = this.title.value as string;
    const collectionId = this.collectionId.value;

    const body = {
      id: id,
      url: url,
      title: title,
      collectionId: collectionId,
    };

    this.linksService.createLink(collectionId, body).subscribe((data) => {
      this.link = data;

      this.linksService.updateLinkData(this.link);
    });
  }

  deleteCollection() {
    this.collectionService.deleteCollection(this.collection.id).subscribe((data) => {
      return this.collectionService.updateCollectionData(this.collection);
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CollectionsFormComponent, {
      width: '280px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  openDialogUpdate(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CollectionFormUpdateComponent, {
      width: '280px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        collection: this.collection,
      },
    });
  }

  openDialogCreateLink(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LinksComponent, {
      width: '280px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        collection: this.collection,
      },
    });
  }

  patchFavorite() {
    this.collectionService.patchFavorite(this.collection.id, !this.collection.favorite).subscribe(() => {
      return (this.collection.favorite = !this.collection.favorite);
    });
  }
}
