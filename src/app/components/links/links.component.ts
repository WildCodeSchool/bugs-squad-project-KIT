import { Component, Inject, Input, OnInit } from '@angular/core';
import { LinksService } from '../../services/links.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Link } from '../../models/Link';
import { FormControl, Validators } from '@angular/forms';
import { Collection } from '../../models/Collection';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['../collection-form/collection-form.component.scss'],
})
export class LinksComponent implements OnInit {
  constructor(
    private linksService: LinksService,
    public dialog: MatDialog,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: { collection: Collection }
  ) {}

  links: Link[] = [];
  collections: Collection[] = [];
  link!: Link;
  id = new FormControl();
  url = new FormControl('', [
    Validators.required,
    Validators.pattern('^(https?://)?[a-zA-Z0-9-.]+\\.[a-zA-Z]{2,}(\\S*)?$'),
  ]);
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
        this.toastr.success(`Le lien ${this.link.title} a été créé !`);
      });
    }
  }
}
