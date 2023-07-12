import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';
import { faPencil, faLink } from '@fortawesome/free-solid-svg-icons';
import { CollectionsService } from '../../services/collections.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LinksService } from '../../services/links.service';

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
    this.collectionsService.currentCollectionData.subscribe((collection) => {
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
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  addToCollections() {
    this.collections.push(this.collection);
  }
}

@Component({
  selector: 'app-collections-form',
  templateUrl: 'collections-form.component.html',
  styleUrls: ['./collections.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule],
})
export class CollectionsFormComponent {
  constructor(
    public dialogRef: MatDialogRef<CollectionsFormComponent>,
    private collectionsService: CollectionsService,
    private linkService: LinksService
  ) {}

  collections: Collection[] = [];
  collection!: Collection;
  newLink!: Link;
  id = new FormControl();
  title = new FormControl('');
  description = new FormControl('');
  link = new FormControl([]);
  comment = new FormControl('');
  collectionColor = new FormControl('#FFFFFF');

  createCollection() {
    const id = this.id.value;
    const title = this.title.value;
    const description = this.description.value;
    const collectionColor = this.collectionColor.value;

    const body = {
      id: id,
      title: title,
      description: description,
      color: collectionColor,
    };

    this.collectionsService.createCollection(body).subscribe((data) => {
      this.collection = data;

      this.collection = new Collection(
        this.collection.id,
        this.title.value as string,
        null,
        this.collectionColor.value as string,
        this.description.value as string
      );
      this.collectionsService.updateCollectionData(this.collection);
      this.dialogRef.close();
    });
  }
}
