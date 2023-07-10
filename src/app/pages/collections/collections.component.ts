import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Collection } from 'src/app/models/Collection';
import { Link } from 'src/app/models/Link';
import { faPencil, faLink } from '@fortawesome/free-solid-svg-icons';
import { CollectionsService } from '../../services/collections.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

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
    private collectionsService: CollectionsService
  ) {}

  collections: Collection[] = [];
  collection!: Collection;
  title = new FormControl('');
  description = new FormControl('');
  link = new FormControl('');
  comment = new FormControl('');
  collectionColor = new FormControl('#FFFFFF');

  addToCollections() {
    this.collections.push(this.collection);
  }

  createCollection() {
    const title = this.title.value;
    const description = this.description.value;
    const link = this.link.value;
    const comment = this.comment.value;
    const collectionColor = this.collectionColor.value;

    const body = {
      title: title,
      description: description,
      link: [link],
      comment: comment,
      color: collectionColor,
    };

    this.collectionsService.createCollection(body).subscribe((data) => {
      this.collection = data;
    });

    this.collection = new Collection(
      this.title.value as string,
      [new Link(this.link.value as string, this.comment.value as string)],
      this.description.value as string
    );
    this.addToCollections();
  }
}
