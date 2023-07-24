import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LinksService } from '../../services/links.service';
import { Link } from '../../models/Link';
import { FormControl } from '@angular/forms';
import { CollectionsService } from '../../services/collections.service';
import { Collection } from '../../models/Collection';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-link-form-update',
  templateUrl: './link-form-update.component.html',
  styleUrls: ['../collection-form/collection-form.component.scss'],
})
export class LinkFormUpdateComponent {
  constructor(
    public dialogRef: MatDialogRef<LinkFormUpdateComponent>,
    private linksService: LinksService,
    private collectionService: CollectionsService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { link: Link }
  ) {}

  link!: Link;
  url = new FormControl(this.data.link.url);
  title = new FormControl(this.data.link.title);
  @Input() collection!: Collection;

  updateLink() {
    const id = this.data.link.id;
    const url: string = this.url.value as string;
    const title = this.title.value as string;

    const body = {
      url: url,
      title: title,
    };

    this.linksService.updateLink(id, body).subscribe((data) => {
      this.link = data as Link;
      this.collectionService.updateCollectionData(this.collection);
      this.dialogRef.close();
      this.toastr.success(`Le lien ${this.link.title} a été modifié !`);
    });
  }
}
