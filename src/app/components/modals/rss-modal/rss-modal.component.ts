import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-rss-modal',
  templateUrl: './rss-modal.component.html',
  styleUrls: ['./rss-modal.component.scss'],
})
export class RssModalComponent {
  isFormSubmitted = false;

  rssCreateForm = this.fb.group({
    rssUrl: ['', Validators.required],
  });

  constructor(private dialogRef: MatDialogRef<RssModalComponent>, private fb: FormBuilder) {}

  closeModal(): void {
    this.isFormSubmitted = true;
    if (this.rssCreateForm.invalid) {
      return;
    }
    const rssUrl = this.rssCreateForm.value.rssUrl;
    this.dialogRef.close(rssUrl);
  }
}
