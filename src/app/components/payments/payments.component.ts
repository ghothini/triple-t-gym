import { AfterViewInit, Component } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements AfterViewInit {
  currentYearMembers: any[] = [];
  nowFullYear: any = new Date().getFullYear();
  currentPageIndex: number = 0;
  membersToShowOnCurrentPage: any[] = [];
  totalItems: number = 0;
  constructor(private sharedService: SharedService) {
    const allMembers = this.sharedService.getStorage('gymMembers', 'local');
    const allPayments = this.sharedService.getStorage('allPayments', 'local');
    allMembers.forEach((member: any) => {
      if (new Date(member.joinDate).getFullYear() === this.nowFullYear) {
        const memberPayments = allPayments.filter((payment: any) => payment.member === member.email);
        this.currentYearMembers.push({
          "member": member,
          "payments": memberPayments
        })
      }
    })
    this.updateItemsToShow(10);
  }
  selectedNav: any = {
    label: 'Payments',
    icon: 'payment'
  }

  ngAfterViewInit(): void {
    const checkboxElement = document.getElementById('checkbox') as HTMLElement;
    console.log("checkboxElement", checkboxElement.innerHTML)
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

}
