import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SharedService } from 'src/app/services/shared.service';
import { WorkbookImportComponent } from '../../pop-ups/workbook-import/workbook-import.component';

@Component({
  selector: 'app-imports',
  templateUrl: './imports.component.html',
  styleUrls: ['./imports.component.scss']
})
export class ImportsComponent {
  constructor(private sharedService: SharedService, private dialog: MatDialog) { }

  downloadImportTemplate(importType: any) {
    this.sharedService.downloadImportTemplateSpreadsheet(importType);
  }

  importMembers() {
    this.dialog.open(WorkbookImportComponent, {
      width: '50%'
      // width: '555px'
    })
  }
}
