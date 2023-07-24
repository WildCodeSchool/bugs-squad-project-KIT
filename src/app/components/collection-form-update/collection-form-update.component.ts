import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CollectionsService } from '../../services/collections.service';
import { Collection } from '../../models/Collection';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-collection-form-update',
  templateUrl: './collection-form-update.component.html',
  styleUrls: ['../collection-form/collection-form.component.scss'],
})
export class CollectionFormUpdateComponent {
  constructor(
    public dialogRef: MatDialogRef<CollectionFormUpdateComponent>,
    private collectionsService: CollectionsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { collection: Collection }
  ) {}

  collection!: Collection;
  title = new FormControl(this.data.collection.title, [Validators.required]);
  description = new FormControl(this.data.collection.description);
  collectionColor = new FormControl(this.data.collection.color);

  updateCollection() {
    if (this.title.invalid) {
      this.toastr.error('Le titre est obligatoire');
      return;
    }
    const title = this.title.value;
    const description: string = this.description.value as string;
    const collectionColor = this.collectionColor.value;
    const collection = this.data.collection;

    const body = {
      title: title,
      description: description,
      color: collectionColor,
    };

    this.collectionsService.updateCollection(collection.id, body).subscribe(() => {
      this.collectionsService.updateCollectionData(this.collection);
      this.dialogRef.close();
      this.toastr.success(`La collection ${collection.title} a été modifiée !`);
    });
  }
}
