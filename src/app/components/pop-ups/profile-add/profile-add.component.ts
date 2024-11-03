import { DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-profile-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.scss']
})
export class ProfileAddComponent {
  familyMemberFormGroup: any;
  noteFormGroup: any;
  memberToView: any;
  formType: any;

  constructor(private dialogRef: DialogRef<ProfileAddComponent>, private snackbar: MatSnackBar,
    private sharedService: SharedService, @Inject(MAT_DIALOG_DATA) public _formType: any) {
    this.formType = _formType;
    this.memberToView = this.sharedService.getMemberToView();
    this.familyMemberFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
    })
    this.noteFormGroup = new FormGroup({
      note: new FormControl('', [Validators.required]),
      id: new FormControl(new Date().getTime(), [Validators.required]),
      createDate: new FormControl(new Date(), [Validators.required]),
    })
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    if (this.formType === 'note') {
      if (this.noteFormGroup.invalid) {
        this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
        return;
      }
      const allNotes = this.sharedService.getStorage('allNotes', 'local');
      const currentUser = this.sharedService.getStorage('currentUser', 'session');
      const note = {
        ...this.noteFormGroup.value,
        gymMember: this.memberToView.email,
        gymBusiness: currentUser.email
      }
      allNotes.push(note);
      this.sharedService.setStorage('allNotes', allNotes, 'local');
      this.snackbar.open('Note added successfully', 'Ok', { duration: 3000 });
      this.sharedService.triggerNoteRefresh();
      this.close();
      return;
    }
    if (this.familyMemberFormGroup.invalid) {
      this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
      return;
    }
    const allFamilyMembers = this.sharedService.getStorage('allFamilyMembers', 'local');
    const currentUser = this.sharedService.getStorage('currentUser', 'session');
    const familyMember = {
      ...this.familyMemberFormGroup.value,
      gymMember: this.memberToView.email,
      gymBusiness: currentUser.email
    }
    allFamilyMembers.push(familyMember);
    this.sharedService.setStorage('allFamilyMembers', allFamilyMembers, 'local');
    this.snackbar.open('Family member added successfully', 'Ok', { duration: 3000 });
    this.close();
  }
}
