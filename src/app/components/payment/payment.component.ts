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
  paymentMethods: string[] = ['Cash', 'EFT', 'Credit/Debit Card']
  selectedPaymentMonth: any;
  paymentFormGroup: FormGroup;
  isDefaultPaymentAmt: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public memberOnView: any, private router: Router,
    private dialogRef: DialogRef<PaymentComponent>, private snackbar: MatSnackBar,
    private sharedService: SharedService) {
    const currentUser = this.sharedService.getStorage('currentUser', 'session');
    this.knowCurrentMonth();
    this.paymentFormGroup = new FormGroup({
      membershipNumber: new FormControl(memberOnView.membershipNumber, [Validators.required]),
      member: new FormControl(memberOnView.email, [Validators.required]),
      monthForPayment: new FormControl(this.selectedPaymentMonth, [Validators.required]),
      dateOfPayment: new FormControl(''),
      amount: new FormControl('', [Validators.required]),
      name: new FormControl(memberOnView.name, [Validators.required]),
      joinDate: new FormControl(memberOnView.joinDate, [Validators.required]),
      status: new FormControl('active', [Validators.required]),
      paymentType: new FormControl('Cash', [Validators.required]),
      gymBusiness: new FormControl(currentUser.email, [Validators.required]),
      yearOfPayment: new FormControl(memberOnView.yearOfPayment, [Validators.required])
    })
  }

  close() {
    this.dialogRef.close();
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

  changePaymentMonth(month: any) {
    this.selectedPaymentMonth = month;
    this.paymentFormGroup.get('monthForPayment')?.setValue(month);
    this.snackbar.open(`${month} payment`, 'Ok', { duration: 3000 });
  }

  submit() {
    if (this.paymentFormGroup.invalid) {
      this.snackbar.open('All fields are required', 'Ok', { duration: 3000 });
      return;
    }
    this.paymentFormGroup.value.dateOfPayment = new Date();
    const allPayments = this.sharedService.getStorage('allPayments', 'local');
    allPayments.push(this.paymentFormGroup.value);
    this.sharedService.setStorage('allPayments', allPayments, 'local');
    this.snackbar.open('Payment added successfully', 'Ok', { duration: 3000 });
    this.sharedService.triggerMemberPaymentsRefresh();
    this.close();
  }

  selectPaymentMethod(method: string) {
    this.paymentFormGroup.get('paymentType')?.setValue(method);
  }
}
