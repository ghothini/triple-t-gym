import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedService } from 'src/app/services/shared.service';
import { MembersComponent } from '../members/members.component';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  displayedColumns: string[] = ['member', 'month', 'date', 'total', 'status', 'action'];
  dataSource: any;
  annualMonths: string[] = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
    'December'];
  newMembersOptions: string[] = ['Month', '2 Months', '3 Months'];
  selctedNewMembersOptions = this.newMembersOptions[0];
  totalMembers: any[] = [];
  newMembers: any[] = [];
  allPayments: any;
  paymentsYearsArr: any = []
  currentYear: any = new Date().getFullYear();
  yearFormGroup: FormGroup;
  totalMembersPayments: any = {
    paid: 0,
    overdue: 0
  };
  totalMembersOverduePayments: any = 0;
  paymentPlansFormGroup!: FormGroup;
  isEddingPlans: boolean = false;
  paymentPlans: any[] = [];
  paymentsPerMonth: any;
  constructor(private dialog: MatDialog, private router: Router, private sharedService: SharedService,
    private snackbar: MatSnackBar, private cd: ChangeDetectorRef) {
    this.yearFormGroup = new FormGroup({
      year: new FormControl(this.currentYear)
    })
    this.getStatisticsData();
    this.totalMembers = this.sharedService.getStorage('gymMembers', 'local');
    this.dataSource = new MatTableDataSource<any>(this.allPayments.reverse().slice(0, 3));;
    this.getPaymentPlans();
    this.totalMembers.forEach((member: any) => {
      if (new Date(member.joinDate).getFullYear() === new Date().getFullYear()) {
        if (new Date(member.joinDate).getMonth() > new Date().getMonth() - 1) {
          this.newMembers.push(member)
        }
      }
    })
    this.managePayments(2024);
    this.getStatisticsData();
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

  getStatisticsData() {
    this.allPayments = this.sharedService.getStorage('allPayments', 'local');
    this.dataSource = new MatTableDataSource<any>(this.allPayments.reverse().slice(0, 3));
    this.paymentsPerMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.annualMonths.forEach((month: any, indx: any) => {
      const monthPayments = this.allPayments.filter((payment: any) => payment.monthForPayment === month);
      if (monthPayments.length > 0) {
        monthPayments.forEach((payment: any) => {
          if (new Date(payment.dateOfPayment).getFullYear() === this.currentYear) {
            this.paymentsPerMonth[indx] += Number(payment.amout);
          }
          if (!this.paymentsYearsArr.includes(new Date(payment.dateOfPayment).getFullYear())) this.paymentsYearsArr.push(new Date(payment.dateOfPayment).getFullYear());
        })
      }
    })
    this.sharedService.triggerPaymentUpdates(this.paymentsPerMonth);
  }

  managePayments(year: any) {
    this.totalMembersPayments.paid = 0;
    // change amount
    this.allPayments.forEach((payment: any) => {
      if (new Date(payment.dateOfPayment).getFullYear() !== year) {
        console.log("payment", payment);
        return;
      };
      this.totalMembersPayments.paid += payment.amout;
    })

    // overdue payments
    // this.totalMembers.forEach((member: any) => {
    //   let annualOverduePayments = 0;
    //   const isFound = this.allPayments.filter((payment: any) => payment.member === member.email)
    //   const paymentMonths = this.knowStartPayingMonth(member.joinDate)
    //   paymentMonths.forEach((month: any) => {
    //     const isPayedMonth = isFound.find((payment: any) => payment.monthForPayment === month);
    //     // not found
    //     if (!isPayedMonth) {
    //       this.annualMonths.forEach((_month: any, indx: any) => {
    //         if (_month === month) {
    //           if (indx > new Date().getMonth()) {
    //             return;
    //           }
    //           console.log("this.paymentPlans", this.paymentPlans)
    //           // make dynamic with months plans
    //           annualOverduePayments += Number(this.paymentPlans[0].perMonth);
    //         }
    //       })
    //     }
    //   })
    //   this.totalMembersOverduePayments += annualOverduePayments;
    // })
    // this.totalMembersPayments.overdue = this.totalMembersOverduePayments;
  }

  knowStartPayingMonth(memberJoinDate: any) {
    let paymentMonths: any = []
    if (new Date(memberJoinDate).getFullYear() === new Date().getUTCFullYear()) {
      switch (new Date(memberJoinDate).getMonth()) {
        case 0:
          paymentMonths = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 1:
          paymentMonths = ['Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 2:
          paymentMonths = ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 3:
          paymentMonths = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 4:
          paymentMonths = ['May', 'June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 5:
          paymentMonths = ['June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 6:
          paymentMonths = ['July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 7:
          paymentMonths = ['August', 'September', 'October', 'November',
            'December'];
          break;
        case 8:
          paymentMonths = ['September', 'October', 'November',
            'December'];
          break;
        case 9:
          paymentMonths = ['October', 'November',
            'December'];
          break;
        case 10:
          paymentMonths = ['November',
            'December'];
          break;
        case 11:
          paymentMonths = ['December'];
          break;
        default:
          break;
      }
      return paymentMonths;
    } else {
      // for other years
    }
  }

  getPaymentPlans() {
    let paymentPlans: any = localStorage.getItem('paymentPlans');
    paymentPlans = JSON.parse(paymentPlans)
    if (!paymentPlans) {
      this.paymentPlans = [{
        timeline: 'Month',
        perMonth: 0,
        total: 0
      }, {
        timeline: '6 Months',
        perMonth: 0,
        total: 0 * 6
      }, {
        timeline: '12 Months',
        perMonth: 0,
        total: 0 * 12
      }]
      this.paymentPlansFormGroup = new FormGroup({
        month: new FormControl("0"),
        sixMonths: new FormControl("0"),
        twelveMonths: new FormControl("0")
      })
    } else {
      this.paymentPlans = [{
        timeline: 'Month',
        perMonth: paymentPlans.month,
        total: paymentPlans.month
      }, {
        timeline: '6 Months',
        perMonth: paymentPlans.sixMonths,
        total: paymentPlans.sixMonths * 6
      }, {
        timeline: '12 Months',
        perMonth: paymentPlans.twelveMonths,
        total: paymentPlans.twelveMonths * 12
      }]
      this.paymentPlansFormGroup = new FormGroup({
        month: new FormControl(paymentPlans.month),
        sixMonths: new FormControl(paymentPlans.sixMonths),
        twelveMonths: new FormControl(paymentPlans.twelveMonths)
      })
    }
  }

  changeNewMemberFilterOption(indx: any) {
    const allMembers = this.sharedService.getStorage('gymMembers', 'local');
    switch (indx) {
      case 0:
        this.newMembers = [];
        allMembers.forEach((member: any) => {
          if (new Date(member.joinDate).getFullYear() === new Date().getFullYear()) {
            if (new Date(member.joinDate).getMonth() > new Date().getMonth() - 1) {
              this.newMembers.push(member)
            }
          }
        })
        break;
      case 1:
        this.newMembers = [];
        allMembers.forEach((member: any) => {
          if (new Date(member.joinDate).getFullYear() === new Date().getFullYear()) {
            if (new Date(member.joinDate).getMonth() > new Date().getMonth() - 2) {
              this.newMembers.push(member)
            }
          }
        })
        break;
      case 2:
        this.newMembers = [];
        allMembers.forEach((member: any) => {
          if (new Date(member.joinDate).getFullYear() === new Date().getFullYear()) {
            if (new Date(member.joinDate).getMonth() > new Date().getMonth() - 3) {
              this.newMembers.push(member)
            }
          }
        })
        break;
      default:
        break;
    }
    this.selctedNewMembersOptions = this.newMembersOptions[indx];
    this.snackbar.open('Filter updated successfully', 'Ok', { duration: 3000 });
  }

  seeAllMembers() {
    this.router.navigate(['/landing/members']);
  }

  showFilteredNewMembers() {
    if (this.newMembers.length < 1) {
      this.snackbar.open('You need to add members', 'Ok', { duration: 3000 });
      return;
    }
    const dialogRef = this.dialog.open(MembersComponent, {
      data: {
        members: this.newMembers,
        filteredType: this.selctedNewMembersOptions
      }
    })

    dialogRef.afterClosed().subscribe(() => {
      // Refresh displayed data
      this.getStatisticsData();
    })
  }

  editPlans() {
    this.isEddingPlans = true;
  }

  savePlans() {
    const confirmation = prompt('Are you sure to save payment plans?', 'Yes')
    if (confirmation?.toLowerCase() !== 'yes') {
      this.snackbar.open('Action cancelled', 'Ok', { duration: 3000 });
      this.getPaymentPlans();
      this.isEddingPlans = false;
      return;
    }

    // dynamic
    let paymentPlans = this.sharedService.getStorage('paymentPlans', 'local');
    paymentPlans = this.paymentPlansFormGroup.value;
    this.sharedService.setStorage('paymentPlans', paymentPlans, 'local');
    this.getPaymentPlans();
    this.snackbar.open('Payment plans saved successfully', 'Ok', { duration: 3000 });
    this.isEddingPlans = false;
  }

  filterTotalPayments(year: any) {
    this.managePayments(year);
    this.sharedService.triggerPaymentsTotalUpdates(this.totalMembersPayments)
  }

  filterYearlyPayments(year: any) {
    this.sharedService.triggerPaymentUpdates(this.sharedService.calculateYearPayments(this.annualMonths, this.allPayments, year));
  }
}