import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  annualMonths: string[] = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
    'December'];
  paymentsMonths: string[] = [];
  paymentOptions: string[] = ['Cash', 'Paypal', 'Debit/Credit Card'];
  selectedPaymentOption: any = 'Cash';
  selectedPaymentMonth: any;
  addingPayment: boolean = false;
  paymentFormGroup: FormGroup;
  payedMonthsFormGroup: FormGroup;
  payedMonths: string[] = []
  now: any;
  nowFullDate: any;
  current: any;
  isDefaultPaymentAmt: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public selectedMember: any, private router: Router,
    private dialogReg: DialogRef<PaymentComponent>, private snackbar: MatSnackBar,
    private sharedService: SharedService) {
    this.knowCurrentMonth();
    let paymentPlans: any = localStorage.getItem('paymentPlans');
    paymentPlans = JSON.parse(paymentPlans)
    if (paymentPlans) {
      this.paymentFormGroup = new FormGroup({
        membershipNo: new FormControl(selectedMember.membershipNo, [Validators.required]),
        member: new FormControl(selectedMember.email, [Validators.required]),
        monthForPayment: new FormControl(this.selectedPaymentMonth, [Validators.required]),
        dateOfPayment: new FormControl('', [Validators.required]),
        amout: new FormControl(Number(paymentPlans.month), [Validators.required]),
        gender: new FormControl(selectedMember.gender, [Validators.required]),
        memberName: new FormControl(selectedMember.fullName, [Validators.required]),
        joinDate: new FormControl(selectedMember.joinDate, [Validators.required]),
        status: new FormControl('active', [Validators.required]),
        paymentType: new FormControl('Cash', [Validators.required])
      })
    } else {
      this.paymentFormGroup = new FormGroup({
        membershipNo: new FormControl(selectedMember.membershipNo, [Validators.required]),
        member: new FormControl(selectedMember.email, [Validators.required]),
        monthForPayment: new FormControl(this.selectedPaymentMonth, [Validators.required]),
        dateOfPayment: new FormControl('', [Validators.required]),
        amout: new FormControl('', [Validators.required]),
        gender: new FormControl(selectedMember.gender, [Validators.required]),
        memberName: new FormControl(selectedMember.fullName, [Validators.required]),
        joinDate: new FormControl(selectedMember.joinDate, [Validators.required]),
        status: new FormControl('active', [Validators.required]),
        paymentType: new FormControl('Cash', [Validators.required])
      })
    }
    this.payedMonthsFormGroup = new FormGroup({
      months: new FormControl([])
    })

    // Get member month payments
    const allPayments = this.sharedService.getStorage('allPayments', 'local');
    let myPayments = [];
    if (allPayments.length > 0) {
      myPayments = allPayments.filter((payment: any) => payment.member === selectedMember.email);
      myPayments.forEach((payment: any) => this.payedMonths.push(payment.monthForPayment));
      this.payedMonthsFormGroup.setValue({
        months: this.payedMonths
      })
    }

    this.nowFullDate = new Date()
    this.now = this.nowFullDate.toString().replace(' GMT+0200 (South Africa Standard Time)', '')
    this.current = this.now.split(' ');
    setInterval(() => {
      this.nowFullDate = new Date()
      this.now = this.nowFullDate.toString().replace(' GMT+0200 (South Africa Standard Time)', '')
      this.current = this.now.split(' ');
    }, 1000);

    this.knowStartPayingMonth()
  }

  changePaymentOption(indx: any) {
    this.selectedPaymentOption = this.paymentOptions[indx]
  }

  close() {
    if (this.addingPayment) {
      this.addingPayment = false;
      return;
    }
    this.dialogReg.close();
  }

  knowCurrentMonth() {
    switch (new Date().getMonth()) {
      case 0:
        this.selectedPaymentMonth = 'January';
        break;
      case 1:
        this.selectedPaymentMonth = 'Febuary';
        break;
      case 2:
        this.selectedPaymentMonth = 'March';
        break;
      case 3:
        this.selectedPaymentMonth = 'April';
        break;
      case 4:
        this.selectedPaymentMonth = 'May';
        break;
      case 5:
        this.selectedPaymentMonth = 'June';
        break;
      case 6:
        this.selectedPaymentMonth = 'July';
        break;
      case 7:
        this.selectedPaymentMonth = 'August';
        break;
      case 8:
        this.selectedPaymentMonth = 'September';
        break;
      case 9:
        this.selectedPaymentMonth = 'October';
        break;
      case 10:
        this.selectedPaymentMonth = 'November';
        break;
      case 11:
        this.selectedPaymentMonth = 'December';
        break;
      default:
        break;
    }
  }

  knowStartPayingMonth() {
    if (new Date(this.selectedMember.joinDate).getFullYear() === new Date().getUTCFullYear()) {
      switch (new Date(this.selectedMember.joinDate).getMonth()) {
        case 0:
          this.paymentsMonths = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 1:
          this.paymentsMonths = ['Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 2:
          this.paymentsMonths = ['March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 3:
          this.paymentsMonths = ['April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 4:
          this.paymentsMonths = ['May', 'June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 5:
          this.paymentsMonths = ['June', 'July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 6:
          this.paymentsMonths = ['July', 'August', 'September', 'October', 'November',
            'December'];
          break;
        case 7:
          this.paymentsMonths = ['August', 'September', 'October', 'November',
            'December'];
          break;
        case 8:
          this.paymentsMonths = ['September', 'October', 'November',
            'December'];
          break;
        case 9:
          this.paymentsMonths = ['October', 'November',
            'December'];
          break;
        case 10:
          this.paymentsMonths = ['November',
            'December'];
          break;
        case 11:
          this.paymentsMonths = ['December'];
          break;
        default:
          break;
      }

    } else {

    }
  }

  changePaymentMonth(month: any) {
    this.selectedPaymentMonth = month;
    this.paymentFormGroup.value.monthForPayment = month;
    this.snackbar.open(`${month} payment`, 'Ok', { duration: 3000 });
  }

  submit() {
    this.paymentFormGroup.value.dateOfPayment = this.nowFullDate;
    if (this.paymentFormGroup.value.amout === "" || this.paymentFormGroup.value.amout === null) return;
    const allPayments = this.sharedService.getStorage('allPayments', 'local');
    if (allPayments.length < 1) {
      this.processCashPayment(allPayments);
      return;
    }

    const membersPayments = allPayments.filter((payment: any) => payment.member === this.paymentFormGroup.value.member);
    const paymentAlreadyExists = membersPayments.find((payment: any) => payment.monthForPayment === this.selectedPaymentMonth);
    if (paymentAlreadyExists) {
      this.snackbar.open(`Payment for ${this.selectedPaymentMonth} already exists`, 'Ok', { duration: 3000 });
      return;
    }
    this.processCashPayment(allPayments);
  }

  processCashPayment(allPayments: any) {
    const confirmation: any = prompt(`Are you sure to add ${this.selectedPaymentMonth} payment?`, 'Yes');
    if (confirmation.toLowerCase() === 'yes') {
      this.paymentFormGroup.value.monthForPayment = this.selectedPaymentMonth;
      allPayments.push(this.paymentFormGroup.value);
      this.payedMonths.push(this.selectedPaymentMonth);
      this.payedMonthsFormGroup.setValue({
        months: this.payedMonths
      })

      this.sharedService.setStorage('allPayments', allPayments, 'local');
      this.snackbar.open('Payment added successfully', 'Ok', { duration: 3000 });
      // if (this.router.url.includes('/landing/dashboard')) {
      //   location.reload();
      // }
      this.addingPayment = false;
      return;
    } else {
      this.snackbar.open('Action cancelled', 'Ok', { duration: 3000 });
    }
  }
  addPayment() {
    switch (this.selectedPaymentOption) {
      case 'Cash':
        this.addingPayment = true;
        break;
      case 'Paypal':
        this.snackbar.open('Feature not available', 'Ok', { duration: 3000 });
        break;
      default:
        this.snackbar.open('Feature not available', 'Ok', { duration: 3000 });
        break;
    }
  }

  changePaymentAmt() {
    const confirmation: any = prompt(`Are you sure to change payment amount for ${this.selectedPaymentMonth}?`, 'Yes');
    if (confirmation.toLowerCase() === 'yes') {
      this.snackbar.open('Enter new payment amount', 'Ok', { duration: 3000 });
      this.isDefaultPaymentAmt = false;
      // send email about change and when payment is complete
    } else {
      this.snackbar.open('Action cancelled', 'Ok', { duration: 3000 });
    }
  }
}
