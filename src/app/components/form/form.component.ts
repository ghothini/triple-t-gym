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
  isSelectedCheckbox: boolean = false;
  currentUser: any;
  currentUserGymMembers: any = [];
  allGymMembers: any = [];
  isOnEdit: any;
  maxDate: any = new Date();
  showAdditionalInfo: boolean = false;

  constructor(private snackbar: MatSnackBar, private dialogRef: MatDialogRef<FormComponent>,
    private sharedService: SharedService, @Inject(MAT_DIALOG_DATA) public onEdit: any) {
    this.currentUser = this.sharedService.getStorage('currentUser', 'session');
    this.allGymMembers = this.sharedService.getStorage('allGymMembers', 'local');
    this.isOnEdit = onEdit;
    if (onEdit) {
      this.addingMemberFormGroup = new FormGroup({
        name: new FormControl(onEdit.name, [Validators.required]),
        email: new FormControl(onEdit.email, [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
        phoneNumber: new FormControl(onEdit.phoneNumber, [Validators.required, Validators.pattern(/^\d{10}$/)]),
        address: new FormControl(onEdit.address),
        age: new FormControl(onEdit.age),
        emergencyContactName: new FormControl(onEdit.emergencyContactName),
        emergencyContactEmail: new FormControl(onEdit.emergencyContactEmail, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)),
        emergencyContactPhoneNumber: new FormControl(onEdit.emergencyContactPhoneNumber, Validators.pattern(/^\d{10}$/)),
        gender: new FormControl(onEdit.gender, Validators.required),
        joinDate: new FormControl(onEdit.joinDate),
        membershipNumber: new FormControl(onEdit.membershipNumber)
      })
    } else {
      this.addingMemberFormGroup = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
        phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
        address: new FormControl(''),
        age: new FormControl(''),
        emergencyContactName: new FormControl(''),
        emergencyContactEmail: new FormControl('', Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)),
        emergencyContactPhoneNumber: new FormControl('', Validators.pattern(/^\d{10}$/)),
        gender: new FormControl('Male', Validators.required),
        joinDate: new FormControl(''),
        membershipNumber: new FormControl('')
      })
    }
  }

  initializeAddingMemberFormGroup() {
    this.addingMemberFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      address: new FormControl(''),
      age: new FormControl(''),
      emergencyContactName: new FormControl('', Validators.pattern(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)),
      emergencyContactEmail: new FormControl(''),
      emergencyContactPhoneNumber: new FormControl('', Validators.pattern(/^\d{10}$/)),
      gender: new FormControl('Male', Validators.required),
      joinDate: new FormControl(''),
      membershipNumber: new FormControl('')
    })
  }

  selectCheckbox() {
    this.isSelectedCheckbox = !this.isSelectedCheckbox;
  }

  close() {
    this.dialogRef.close();
  }

  changeMemberType() {
    this.addingExistingMember = !this.addingExistingMember
    if (this.addingExistingMember) {
      this.todayDate = null;
    } else {
      this.todayDate = new Date();
    }
  }

  triggerAdditionalInfo() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
  }

  selectGender(gender: string) {
    this.addingMemberFormGroup.controls['gender'].setValue(gender);
  }

  submit() {
    if (this.isOnEdit) {
      if (this.addingMemberFormGroup.invalid) {
        this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
        return;
      }
      console.log("this.addingMemberFormGroup.value", this.addingMemberFormGroup.value);
      console.log("this.allGymMembers", this.allGymMembers);

      this.allGymMembers.forEach((member: any, indx: number) => {
        if (member.membershipNumber === this.addingMemberFormGroup.value.membershipNumber && member.gymBusiness === this.currentUser.email) {
          this.allGymMembers[indx] = this.addingMemberFormGroup.value;
          this.allGymMembers[indx]['gymBusiness'] = this.currentUser.email;
        }
      })
      this.sharedService.setStorage('allGymMembers', this.allGymMembers, 'local');
      this.sharedService.setMemberToView(this.addingMemberFormGroup.value);
      this.sharedService.triggerMemberToViewRefresh();
      this.snackbar.open('Profile updated successfully', 'Ok', { duration: 3000 });
      this.dialogRef.close();
      return;
    }
    this.createMembershipNo();
    if (this.addingMemberFormGroup.invalid) {
      this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
      return;
    }
    const isFound = this.currentUserGymMembers.find((member: any) => member.email === this.addingMemberFormGroup.value.email);
    if (!isFound) {
      const member = {
        ...this.addingMemberFormGroup.value,
        gymBusiness: this.currentUser.email
      }
      this.allGymMembers.push(member);
      this.sharedService.setStorage('allGymMembers', this.allGymMembers, 'local');
      this.snackbar.open('Member added successfully', 'Ok', { duration: 3000 });
      if (this.isSelectedCheckbox) {
        this.initializeAddingMemberFormGroup();
        return;
      }
      this.dialogRef.close();
      return;
    }
    this.snackbar.open('Member already exists', 'Ok', { duration: 3000 });
  }

  createMembershipNo() {
    if (this.allGymMembers.length > 0) {
      this.currentUserGymMembers = this.allGymMembers.filter((member: any) => member.gymBusiness === this.currentUser.email);
    }
    const membershipNumber = `${new Date().getFullYear()}/${new Date().getMonth() + 1}/${new Date().getDate()}/member-${this.currentUserGymMembers.length + 1}`;
    this.addingMemberFormGroup.controls['membershipNumber'].setValue(membershipNumber);
    this.addingMemberFormGroup.controls['joinDate'].setValue(new Date());
  }
}
