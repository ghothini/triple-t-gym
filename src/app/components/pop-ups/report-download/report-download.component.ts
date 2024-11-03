import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-report-download',
  templateUrl: './report-download.component.html',
  styleUrls: ['./report-download.component.scss']
})
export class ReportDownloadComponent {
  membersStatusFormGroup: any;
  actionButtons: string[] = ['Cancel', 'Download']
  selectedReportType: any;

  constructor(private dialogRef: DialogRef<ReportDownloadComponent>, @Inject(MAT_DIALOG_DATA) public reportType: any,
    private sharedService: SharedService) {
    this.selectedReportType = reportType;
    this.membersStatusFormGroup = new FormGroup({
      status: new FormControl('Total Members', Validators.required)
    })
  }

  selectAction(indx: number) {
    switch (indx) {
      case 0:
        this.dialogRef.close();
        break;
      default:
        // temp members download only
        const currentUser = this.sharedService.getStorage('currentUser', 'session');
        const allGymMembers = this.sharedService.getStorage('allGymMembers', 'local');
        const currentUserGymMembers = allGymMembers.filter((member: any) => member.gymBusiness === currentUser.email);
        this.sharedService.downloadSpreadsheet(this.selectedReportType, currentUserGymMembers);
        break;
    }
  }
}
