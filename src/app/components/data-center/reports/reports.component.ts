import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReportDownloadComponent } from '../../pop-ups/report-download/report-download.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  reportCards: any[] = [{
    imgIconPath: '../../../../assets/images/icons/south-african-rand.png',
    label: 'Transactions',
    subLabel: 'Download your payments history.'
  }, {
    imgIconPath: '../../../../assets/images/icons/customers.png',
    label: 'Members',
    subLabel: 'Download your Member Information.'
  }]

  constructor(private dialog: MatDialog) { }

  selectCard(indx: number) {
    switch (indx) {
      case 0:
        this.dialog.open(ReportDownloadComponent, {
          data: 'Transactions',
          width: '50%'
        })
        break;
      default:
        this.dialog.open(ReportDownloadComponent, {
          data: 'Members',
          width: '50%'
        })
        break;
    }
  }
}
