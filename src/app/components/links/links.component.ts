import { Component, Inject, Input, OnInit } from '@angular/core';
import { LinksService } from '../../services/links.service';
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
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: { collection: Collection }
  ) {}

  links: Link[] = [];
  collections: Collection[] = [];
  link!: Link;
  id = new FormControl();
  url = new FormControl('');
  title = new FormControl('');
  collectionId = new FormControl();

  @Input() collection!: Collection;

  ngOnInit() {
    this.getAllLinks();
    this.linksService.currentLinkData$.subscribe(() => {
      this.getAllLinks();
    });
  }

  getAllLinks() {
    this.linksService.getLinks().subscribe((data) => {
      this.links = data;
    });
  }

  createLink() {
    if (this.data.collection.links) {
      const url: string = this.url.value as string;
      const title = this.title.value as string;
      const position = this.data.collection.links.length;
      const collectionId = this.data.collection.id;

      const body = {
        url: url,
        title: title,
        position: position,
      };

      this.linksService.createLink(collectionId, body).subscribe((data) => {
        this.link = data;
        if (this.data.collection.links) {
          this.data.collection.links.push({
            id: this.link.id,
            url: this.link.url,
            title: this.link.title,
            position: position,
            collectionId: this.link.collectionId,
          });
          this.linksService.updateLinkData(this.link);
        }
      });
    }
  }
}
