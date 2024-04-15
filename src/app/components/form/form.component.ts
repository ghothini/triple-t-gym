import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  addingMemberFormGroup: FormGroup;
  addingExistingMember: boolean = false;
  todayDate: any = new Date();
  membersGender: string[] = ['Male', 'Female'];
  totalGymMembers: any[] = [];

  constructor(private snackbar: MatSnackBar, private dialogRef: MatDialogRef<FormComponent>,
    private sharedService: SharedService, @Inject(MAT_DIALOG_DATA) public edittingMember: any) {
    console.log("edittingMember", edittingMember)
    if (edittingMember) {
      this.addingMemberFormGroup = new FormGroup({
        fullName: new FormControl(edittingMember.fullName, [Validators.required]),
        gender: new FormControl(edittingMember.gender, [Validators.required]),
        email: new FormControl(edittingMember.email, [Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
        cellphone: new FormControl(edittingMember.cellphone),
        emergencyCellphone: new FormControl(edittingMember.emergencyCellphone),
        homeAddr: new FormControl(edittingMember.homeAddr, [Validators.required]),
        joinDate: new FormControl(edittingMember.joinDate, [Validators.required]),
        existingMember: new FormControl(edittingMember.existingMember),
        membershipNo: new FormControl(edittingMember.membershipNo)
      })
    } else {
      this.addingMemberFormGroup = new FormGroup({
        fullName: new FormControl('', [Validators.required]),
        gender: new FormControl('Male', [Validators.required]),
        email: new FormControl('', [Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
        cellphone: new FormControl(''),
        emergencyCellphone: new FormControl(''),
        homeAddr: new FormControl('', [Validators.required]),
        joinDate: new FormControl('', [Validators.required]),
        existingMember: new FormControl(false),
        membershipNo: new FormControl('')
      })
    }
    this.createMembershipNo();
  }

  changeMemberType() {
    this.addingExistingMember = !this.addingExistingMember
    if (this.addingExistingMember) {
      this.todayDate = null;
    } else {
      this.todayDate = new Date();
    }
  }

  submit() {
    if (this.addingMemberFormGroup.invalid) {
      this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
      return;
    }
    const allMembers = this.sharedService.getStorage('gymMembers', 'local');
    // Editting
    if (this.edittingMember) {
      allMembers.forEach((member: any) => {
        if (member.email === this.addingMemberFormGroup.value.email) {
          let { fullName, gender, email, joinDate, existingMember } = this.addingMemberFormGroup.value;
          member.fullName = fullName,
            member.gender = gender,
            member.email = email,
            member.joinDate = joinDate,
            member.existingMember = existingMember
        }
      })
      this.snackbar.open('Member updated successfully', 'Ok', { duration: 3000 });
      this.sharedService.setStorage('gymMembers', allMembers, 'local');
      this.sharedService.setStorage('since24members', this.totalGymMembers, 'local');
      this.dialogRef.close();
      return;
    }
    if (!this.todayDate) {
      this.addingMemberFormGroup.value.existingMember = true
    }
    if (allMembers.length > 0) {
      const isFound = allMembers.find((member: any) => member.email.toLowerCase() === this.addingMemberFormGroup.value.email.toLowerCase())
      if (isFound) {
        this.snackbar.open('Account exists', 'Ok', { duration: 3000 });
        return;
      }
      allMembers.push(this.addingMemberFormGroup.value);
      this.snackbar.open('Member added successfully', 'Ok', { duration: 3000 });
      this.sharedService.setStorage('gymMembers', allMembers, 'local');
      this.dialogRef.close()
    } else {
      allMembers.push(this.addingMemberFormGroup.value);
      this.snackbar.open('Member added successfully', 'Ok', { duration: 3000 });
      this.sharedService.setStorage('gymMembers', allMembers, 'local');
      this.dialogRef.close()
    }
    this.sharedService.setStorage('since24members', this.totalGymMembers, 'local');
  }

  createMembershipNo() {
    const membersSince23: any[] = this.sharedService.getStorage('since24members', 'local');
    if (membersSince23.length > 0) {
      membersSince23[0] += 1;
    } else {
      membersSince23.push(1);
    }
    this.totalGymMembers[0] = membersSince23[0];
    const memberId = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}/member-${membersSince23[0]}`;
    console.log("memberId", memberId);
    this.addingMemberFormGroup.controls['membershipNo'].setValue(memberId);
  }
}
