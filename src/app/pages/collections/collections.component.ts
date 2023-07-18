import { Component, OnInit } from '@angular/core';
import { Collection } from 'src/app/models/Collection';
import { faPencil, faLink } from '@fortawesome/free-solid-svg-icons';
import { CollectionsService } from '../../services/collections.service';
import { MatDialog } from '@angular/material/dialog';
import { CollectionsFormComponent } from '../../components/collection-form/collection-form.component';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss'],
})
export class CollectionsComponent implements OnInit {
  collections: Collection[] = [];
  collection!: Collection;

  constructor(private collectionsService: CollectionsService, public dialog: MatDialog) {}

  faPencil = faPencil;
  faLink = faLink;

  ngOnInit() {
    this.getAllCollections();
    this.collectionsService.currentCollectionData$.subscribe(() => {
      this.getAllCollections();
    });
  }

  getAllCollections() {
    this.collectionsService.getCollections().subscribe((data) => {
      this.collections = data;
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(CollectionsFormComponent, {
      width: '280px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
