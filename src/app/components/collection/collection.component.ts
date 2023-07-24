import { Component, Input, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';
import { faLink, faPencil } from '@fortawesome/free-solid-svg-icons';
import { LinksService } from '../../services/links.service';
import { FormControl } from '@angular/forms';
import { CollectionsService } from '../../services/collections.service';
import { MatDialog } from '@angular/material/dialog';
import { CollectionFormUpdateComponent } from '../collection-form-update/collection-form-update.component';
import { LinksComponent } from '../links/links.component';
import { LinkFormUpdateComponent } from '../link-form-update/link-form-update.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss'],
})
export class CollectionComponent implements OnInit {
  faPencil = faPencil;
  faLink = faLink;
  public color = '#FFFFFF';
  @Input() isFavCollection = false;

  constructor(
    private linksService: LinksService,
    private collectionService: CollectionsService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  links: Link[] = [];
  link!: Link;
  id = new FormControl();
  url = new FormControl('');
  title = new FormControl('');
  collectionId = new FormControl();

  @Input() collection!: Collection;

  ngOnInit() {
    this.collection.links?.sort((a, b) => a.position - b.position);
  }

  getLinkComment(link: Link) {
    return link.title ? link.title : link.url;
  }

  deleteCollection() {
    this.collectionService.deleteCollection(this.collection.id).subscribe((data) => {
      this.collectionService.updateCollectionData(this.collection);
      this.toastr.success(`La collection ${this.collection.title} a été supprimée !`);
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

  openDialogUpdateLink(link: Link, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(LinkFormUpdateComponent, {
      width: '280px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        link: link,
      },
    });
  }

  patchFavorite() {
    this.collectionService.patchFavorite(this.collection.id, !this.collection.favorite).subscribe(() => {
      this.collection.favorite = !this.collection.favorite;
      this.toastr.success(`La collection ${this.collection.title} a été ajoutée aux favoris !`);
    });
  }

  deleteLink(id: number) {
    this.linksService.deleteLink(id).subscribe(() => {
      return this.collectionService.updateCollectionData(this.collection);
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.collection.links) {
      moveItemInArray(this.collection.links, event.previousIndex, event.currentIndex);
      this.collection.links?.forEach((link, index) => {
        link.position = index;
      });
      const links = this.collection.links;
      if (links) {
        links.sort((a, b) => a.position - b.position);
        this.collectionService.updateLinksPosition(this.collection.id, links).subscribe(() => {
          return this.collectionService.updateCollectionData(this.collection);
        });
      }
    }
  }
}
