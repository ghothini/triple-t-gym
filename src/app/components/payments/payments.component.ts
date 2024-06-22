import { AfterViewInit, Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { PaymentComponent } from '../payment/payment.component';
import { Dialog } from '@angular/cdk/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements AfterViewInit {
  monthsAndKeyColors: any[] = [{
    month: 'January'
  }, {
    month: 'Febuary'
  }, {
    month: 'March'
  }, {
    month: 'April'
  }, {
    month: 'May'
  }, {
    month: 'June'
  }, {
    month: 'July'
  }, {
    month: 'August'
  }, {
    month: 'September'
  }, {
    month: 'October'
  }, {
    month: 'November'
  }, {
    month: 'December'
  }]
  currentYearMembers: any[] = [];
  nowFullYear: any = new Date().getFullYear();
  currentPageIndex: number = 0;
  membersToShowOnCurrentPage: any[] = [];
  totalItems: number = 0;
  yearFormGroup: FormGroup;
  constructor(private sharedService: SharedService, private dialog: Dialog) {
    this.yearFormGroup = new FormGroup({
      year: new FormControl(this.nowFullYear)
    })
    const allMembers = this.sharedService.getStorage('gymMembers', 'local');
    const allPayments = this.sharedService.getStorage('allPayments', 'local');
    allMembers.forEach((member: any) => {
      if (new Date(member.joinDate).getFullYear() === this.nowFullYear) {
        const memberPayments = allPayments.filter((payment: any) => payment.member === member.email);
        if (memberPayments.length > 0) {
          this.currentYearMembers.push({
            "member": member,
            "payments": memberPayments
          })
        }
      }
    })
    this.updateItemsToShow(12);
  }
  selectedNav: any = {
    label: 'Payments',
    icon: 'payment'
  }

  ngAfterViewInit(): void {
  }

  // Method to update items to show on the current page
  updateItemsToShow(itemsPerPage: any) {
    this.totalItems = this.currentYearMembers.length;
    const startIndex = this.currentPageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    this.membersToShowOnCurrentPage = this.currentYearMembers.slice(startIndex, endIndex);
  }

  onPageChange(e: any) {
    this.currentPageIndex = e.pageIndex;
    this.updateItemsToShow(e.pageSize);
  }

  seePayment(member: any) {
    console.log("selected member", member)
    this.dialog.open(PaymentComponent, {
      data: member,
      width: '335px',
      // height: '50%',
    });
  }

}
