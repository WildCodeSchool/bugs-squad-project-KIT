import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.scss'],
})
export class ConfirmDeleteModalComponent {
  isFormSubmitted = false;

  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  closeModal(): void {
    this.isFormSubmitted = true;
    this.dialogRef.close(this.isFormSubmitted);
  }
}
