import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.scss']
})
export class DeleteConfirmComponent {
  deleteType: any;
  constructor(private dialogRef: DialogRef<DeleteConfirmComponent>, @Inject(MAT_DIALOG_DATA) deleteType: any,
    private sharedService: SharedService) {
    this.deleteType = deleteType;
  }

  close() {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.sharedService.setIsDeleteConfirmed(true);
    this.dialogRef.close();
  }
}
