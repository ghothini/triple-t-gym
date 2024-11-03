import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/services/shared.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-workbook-import',
  templateUrl: './workbook-import.component.html',
  styleUrls: ['./workbook-import.component.scss']
})
export class WorkbookImportComponent implements OnInit {
  uploadedFile: any = {
    size: 0,
    name: null,
  };
  isUploadedFileXlsx: boolean = false;
  excelData: any[] = [];

  constructor(private snackbar: MatSnackBar, private dialogRef: DialogRef<WorkbookImportComponent>,
    private sharedService: SharedService) { }

  ngOnInit(): void {
    const uploadInputElement = document.getElementById('upload');
    uploadInputElement?.addEventListener('change', (e: any) => {
      var file = e.target.files[0];
      // KB conversion
      this.uploadedFile.size = (file.size * 0.001).toFixed();
      this.uploadedFile.name = file.name;
      if (file.name.split(".")[file.name.split(".").length - 1] !== 'xlsx') {
        this.snackbar.open('Only .xlsx format is supported', 'Ok', { duration: 3000 });
        this.isUploadedFileXlsx = false;
        return;
      }
      this.isUploadedFileXlsx = true;
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);
      fileReader.onload = (event) => {
        const data = new Uint8Array(fileReader.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const headers = ["name", "email", "phoneNumber", "address", "age", "emergencyContactName", "emergencyContactEmail", "emergencyContactPhoneNumber", "gender", "joinDate", "membershipNumber"];
        const excelData = XLSX.utils.sheet_to_json(worksheet, { header: headers });
        excelData.shift();
        this.excelData = excelData;
      }
    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (!this.isUploadedFileXlsx) {
      this.snackbar.open('Excel file is required', 'Ok', { duration: 3000 });
      return;
    }
    if (this.excelData.length < 1) {
      this.snackbar.open('No members to import', 'Ok', { duration: 3000 });
      return;
    }
    const currentUser = this.sharedService.getStorage('currentUser', 'session');
    const allGymMembers = this.sharedService.getStorage('allGymMembers', 'local');
    const currentUserGymMembers = allGymMembers.filter((member: any) => member.gymBusiness === currentUser.email);
    this.excelData.forEach((row: any) => {
      const isFound = currentUserGymMembers.find((member: any) => member.email === row.email);
      if (!isFound) {
        row['gymBusiness'] = currentUser.email; // assign owner
        allGymMembers.push(row);
        this.sharedService.setStorage('allGymMembers', allGymMembers, 'local');
      }
    })
    this.snackbar.open('Import complete', 'Ok', { duration: 3000 });
    this.dialogRef.close();
  }
}
