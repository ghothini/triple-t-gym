import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { SharedService } from 'src/app/services/shared.service';
import { ProfileAddComponent } from '../pop-ups/profile-add/profile-add.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteConfirmComponent } from '../pop-ups/delete-confirm/delete-confirm.component';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentComponent } from '../payment/payment.component';

@Component({
  selector: 'app-member-profile-actions',
  templateUrl: './member-profile-actions.component.html',
  styleUrls: ['./member-profile-actions.component.scss']
})
export class MemberProfileActionsComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['name', 'email', 'phoneNumber'];
  dataSource: any;
  actionsLabels: any[] = ['Notes', 'Additional Info', 'Family', 'Payment Information', 'Manage Member']
  annualMonthsPayments: any[] = [{
    month: 'January',
    isPaymentMade: false,
    paymentAmt: 0
  }, {
    month: 'Febuary',
    isPaymentMade: false,
    paymentAmt: 0
  }, {
    month: 'March',
    isPaymentMade: false,
    paymentAmt: 0
  }, {
    month: 'April',
    isPaymentMade: false,
    paymentAmt: 0
  }, {
    month: 'May',
    isPaymentMade: false,
    paymentAmt: 0
  }, {
    month: 'June',
    isPaymentMade: false,
    paymentAmt: 0
  }, {
    month: 'July',
    isPaymentMade: false,
    paymentAmt: 0
  }, {
    month: 'August',
    isPaymentMade: false,
    paymentAmt: 0
  }, {
    month: 'September',
    isPaymentMade: false,
    paymentAmt: 0
  }, {
    month: 'October',
    isPaymentMade: false,
    paymentAmt: 0
  }, {
    month: 'November',
    isPaymentMade: false,
    paymentAmt: 0
  }, {
    month: 'December',
    isPaymentMade: false,
    paymentAmt: 0
  }];
  additionalInfoData: any[] = [];
  gymMemberNotes: any[] = [];
  selectedAction: number = 0;
  memberToView: any;
  memberToViewPayments: any = [];
  subscription: any;
  memberToViewSubscription: any;
  memberPaymentsSubscription: any;
  currentYear: any = new Date().getFullYear();
  currentUser: any;
  paymentsYearFormGroup: any;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sharedService: SharedService, private dialog: MatDialog, private snackbar: MatSnackBar,
    private router: Router, private cd: ChangeDetectorRef
  ) {
    this.paymentsYearFormGroup = new FormGroup({
      year: new FormControl(this.currentYear, [Validators.required, Validators.pattern(/^\d{4}$/)])
    })
    this.currentUser = this.sharedService.getStorage('currentUser', 'session');
    this.memberToView = this.sharedService.getMemberToView();
    this.setAdditionalInfoData();
    this.setMemberPayments();
    this.setFamilyMembersData();
    this.setNotesData();
    this.subscription = this.sharedService.watchNoteReset().subscribe((changes: any) => {
      this.setNotesData();
    })
    this.memberToViewSubscription = this.sharedService.watchMemberToViewRefresh().subscribe((changes: any) => {
      this.setAdditionalInfoData();
    })
    this.memberPaymentsSubscription = this.sharedService.watchMemberPaymentsRefresh().subscribe((changes: any) => {
      this.setMemberPayments();
    })
  }

  setNotesData() {
    const allNotes = this.sharedService.getStorage('allNotes', 'local');
    this.gymMemberNotes = allNotes.filter((note: any) => note.gymMember === this.memberToView.email && note.gymBusiness === this.currentUser.email).reverse();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.cd.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.memberToViewSubscription.unsubscribe();
    this.memberPaymentsSubscription.unsubscribe();
  }

  setAdditionalInfoData() {
    const memberToView = this.sharedService.getMemberToView();
    this.additionalInfoData = [{
      label: 'Address',
      value: memberToView.address
    }, {
      label: 'Age',
      value: memberToView.age
    }, {
      label: 'Emergency Contact Name',
      value: memberToView.emergencyContactName
    }, {
      label: 'Emergency Contact Email',
      value: memberToView.emergencyContactEmail
    }, {
      label: 'Emergency Contact Phone Number',
      value: memberToView.emergencyContactPhoneNumber
    }, {
      label: 'Gender',
      value: memberToView.gender
    }, {
      label: 'Membership Number',
      value: memberToView.membershipNumber
    }, {
      label: 'Join Date',
      value: memberToView.joinDate
    }];
  }

  setFamilyMembersData() {
    const allFamilyMembers = this.sharedService.getStorage('allFamilyMembers', 'local');
    const memberToViewFamilyMembers = allFamilyMembers.filter((familyMember: any) => familyMember.gymMember === this.memberToView.email && familyMember.gymBusiness === this.currentUser.email);
    this.dataSource = new MatTableDataSource<any>(memberToViewFamilyMembers.reverse());
  }

  setMemberPayments() {
    const allPayments = this.sharedService.getStorage('allPayments', 'local');
    if (allPayments.length < 1) return;
    this.memberToViewPayments = [];
    this.annualMonthsPayments = [{
      month: 'January',
      isPaymentMade: false,
      paymentAmt: 0
    }, {
      month: 'Febuary',
      isPaymentMade: false,
      paymentAmt: 0
    }, {
      month: 'March',
      isPaymentMade: false,
      paymentAmt: 0
    }, {
      month: 'April',
      isPaymentMade: false,
      paymentAmt: 0
    }, {
      month: 'May',
      isPaymentMade: false,
      paymentAmt: 0
    }, {
      month: 'June',
      isPaymentMade: false,
      paymentAmt: 0
    }, {
      month: 'July',
      isPaymentMade: false,
      paymentAmt: 0
    }, {
      month: 'August',
      isPaymentMade: false,
      paymentAmt: 0
    }, {
      month: 'September',
      isPaymentMade: false,
      paymentAmt: 0
    }, {
      month: 'October',
      isPaymentMade: false,
      paymentAmt: 0
    }, {
      month: 'November',
      isPaymentMade: false,
      paymentAmt: 0
    }, {
      month: 'December',
      isPaymentMade: false,
      paymentAmt: 0
    }];
    allPayments.forEach((payment: any) => {
      if (payment.member === this.memberToView.email && payment.gymBusiness === this.currentUser.email && payment.yearOfPayment === Number(this.paymentsYearFormGroup.value.year)) {
        this.memberToViewPayments.push(payment);
      }
    })
    if (this.memberToViewPayments.length < 1) return;
    this.annualMonthsPayments.forEach((payment: any, indx: number) => {
      this.memberToViewPayments.forEach((_payment: any) => {
        if (payment.month === _payment.monthForPayment) {
          this.annualMonthsPayments[indx].isPaymentMade = true;
          this.annualMonthsPayments[indx].paymentAmt += Number(_payment.amount);
        }
      })
    })
  }

  addFamilyMember() {
    if (this.dataSource.filteredData.length === 10) {
      this.snackbar.open('Maximum family members added', 'Ok', { duration: 3000 });
      return;
    }
    const dialogRef = this.dialog.open(ProfileAddComponent, {
      data: 'family',
      width: '60%'
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      this.setFamilyMembersData();
    })
  }

  selectAction(indx: number) {
    this.selectedAction = indx;
  }

  deleteNote(note: any) {
    this.sharedService.setIsDeleteConfirmed(false);
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: 'note',
      width: '400px'
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      if (this.sharedService.getIsDeleteConfirmed()) {
        let allNotes = this.sharedService.getStorage('allNotes', 'local');
        allNotes = allNotes.filter((_note: any) => _note.id !== note.id);
        this.sharedService.setStorage('allNotes', allNotes, 'local');
        this.snackbar.open('Note deleted successfully', 'Ok', { duration: 3000 });
        this.setNotesData();
      }
    })
  }

  deleteMember() {
    this.sharedService.setIsDeleteConfirmed(false);
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      data: 'member',
      width: '400px'
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      if (this.sharedService.getIsDeleteConfirmed()) {
        let allGymMembers = this.sharedService.getStorage('allGymMembers', 'local');
        let allNotes = this.sharedService.getStorage('allNotes', 'local');
        let allFamilyMembers = this.sharedService.getStorage('allFamilyMembers', 'local');
        // delete member notes
        let allNotesResults: any = [];
        allNotes.forEach((note: any) => {
          if (note.gymMember === this.memberToView.email && note.gymBusiness === this.currentUser.email) {
          } else {
            allNotesResults.push(note);
          }
        })
        this.sharedService.setStorage('allNotes', allNotesResults, 'local');
        // delete family members
        let allFamilyMembersResults: any = [];
        allFamilyMembers.forEach((familyMember: any) => {
          if (familyMember.gymMember === this.memberToView.email && familyMember.gymBusiness === this.currentUser.email) {
          } else {
            allFamilyMembersResults.push(familyMember);
          }
        })
        this.sharedService.setStorage('allFamilyMembers', allFamilyMembersResults, 'local');
        // delete member
        let allMembersResults: any = [];
        allGymMembers.forEach((member: any) => {
          if (member.email === this.memberToView.email && member.gymBusiness === this.currentUser.email) {
          } else {
            allMembersResults.push(member)
          }
        })
        this.sharedService.setStorage('allGymMembers', allMembersResults, 'local');
        this.snackbar.open('Member deleted successfully', 'Ok', { duration: 3000 });
        // send user to members
        this.router.navigate(['/landing/members']);
      }
    })
  }

  loadAnnualPayments() {
    if (this.paymentsYearFormGroup.invalid) return;
    this.setMemberPayments();
    this.snackbar.open(`${Number(this.paymentsYearFormGroup.value.year)} payments`, 'Ok', { duration: 3000 });
  }

  makeMemberPayment() {
    if (this.paymentsYearFormGroup.invalid) {
      this.snackbar.open('Year is required', 'Ok', { duration: 3000 });
      return;
    }
    this.memberToView['yearOfPayment'] = Number(this.paymentsYearFormGroup.value.year);
    this.dialog.open(PaymentComponent, {
      data: this.memberToView,
      width: '335px',
    });
  }
}