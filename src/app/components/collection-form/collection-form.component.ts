import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CollectionsService } from '../../services/collections.service';
import { LinksService } from '../../services/links.service';
import { Collection } from '../../models/Collection';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-collections-form',
  templateUrl: 'collection-form.component.html',
  styleUrls: ['./collection-form.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, ReactiveFormsModule],
})
export class CollectionsFormComponent {
  constructor(
    public dialogRef: MatDialogRef<CollectionsFormComponent>,
    private collectionsService: CollectionsService,
    private linkService: LinksService,
    private toastr: ToastrService
  ) {}

  collections: Collection[] = [];
  collection!: Collection;
  id = new FormControl();
  title = new FormControl('');
  description = new FormControl('');
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
        false,
        this.description.value as string
      );
      this.collectionsService.updateCollectionData(this.collection);
      this.dialogRef.close();
      this.toastr.success(`La collection ${this.collection.title} a été créée !`);
    });
  }
}
