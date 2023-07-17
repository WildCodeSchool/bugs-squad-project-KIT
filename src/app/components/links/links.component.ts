import { Component, Inject, Input, OnInit } from '@angular/core';
import { LinksService } from '../../services/links.service';
import { CollectionsService } from '../../services/collections.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Link } from '../../models/Link';
import { FormControl } from '@angular/forms';
import { Collection } from '../../models/Collection';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss'],
})
export class LinksComponent implements OnInit {
  constructor(
    private linksService: LinksService,
    private collectionsService: CollectionsService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { collection: Collection }
  ) {}

  links: Link[] = [];
  collections: Collection[] = [];
  link!: Link;
  private i = 9999;
  id = new FormControl();
  url = new FormControl('');
  title = new FormControl('');
  collectionId = new FormControl();

  @Input() collection!: Collection;

  ngOnInit() {
    this.getAllCollections();
    this.collectionsService.currentCollectionData.subscribe(() => {
      this.getAllCollections();
    });
  }

  getAllCollections() {
    this.collectionsService.getCollections().subscribe((data) => {
      this.collections = data;
    });
  }

  createLink() {
    if (this.data.collection.links) {
      const url: string = this.url.value as string;
      const title = this.title.value as string;
      const collectionId = this.data.collection.id;

      const body = {
        url: url,
        title: title,
      };

      this.linksService.createLink(collectionId, body).subscribe((data) => {
        this.link = data;
        if (this.data.collection.links) {
          this.data.collection.links.push({
            id: this.link.id,
            url: this.link.url,
            title: this.link.title,
            collectionId: this.link.collectionId,
          });
          this.linksService.updateLinkData(this.link);
        }
      });
    }
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
}
