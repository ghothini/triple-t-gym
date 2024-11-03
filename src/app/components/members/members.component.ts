import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { SharedService } from 'src/app/services/shared.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentsComponent } from '../payments/payments.component';
import { PaymentComponent } from '../payment/payment.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements AfterViewInit {
  displayedColumns: string[] = ['image', 'name', 'gender', 'joinDate', 'email', 'phoneNumber'];
  dataSource: any;
  allMembers: any;
  gymMembersAdded: boolean = false;
  currentUser: any;
  totalMembers: number = 0;
  currentPageIndex: number = 0;
  membersActions: any[] = [
    {
      label: 'Import Members',
      icon: 'arrow_upward'
    },
    {
      label: 'Export Members',
      icon: 'arrow_downward'
    },
    {
      label: 'Add Member',
      icon: 'person_add'
    }
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sharedService: SharedService, private dialog: MatDialog, private snackbar: MatSnackBar,
    private router: Router) {
    this.currentUser = this.sharedService.getStorage('currentUser', 'session');
  }

  addMember() {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '60%'
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      this.getMembers();
    })
  }

  ngAfterViewInit() {
    this.getMembers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  membersAction(indx: number) {
    switch (indx) {
      case 0:
        this.router.navigate(['/landing/data-center/imports']);
        break;
      case 1:
        this.router.navigate(['/landing/data-center/reports']);
        break;
      default:
        this.addMember();
        break;
    }
  }

  getMembers() {
    const allGymMembers = this.sharedService.getStorage('allGymMembers', 'local');
    this.allMembers = allGymMembers.filter((member: any) => member.gymBusiness === this.currentUser.email).reverse();
    if (this.allMembers.length > 0) {
      this.gymMembersAdded = true;
      this.updateItemsToShow(5);
    } else {
      this.gymMembersAdded = false;
    }
  }

  // Method to update items to show on the current page
  updateItemsToShow(itemsPerPage: any) {
    this.totalMembers = this.allMembers.length;
    console.log("this.totalMembers", this.totalMembers)
    const startIndex = this.currentPageIndex * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    this.dataSource = new MatTableDataSource<any>(this.allMembers.slice(startIndex, endIndex));
  }

  onPageChange(e: any) {
    this.currentPageIndex = e.pageIndex;
    this.updateItemsToShow(e.pageSize);
  }

  viewMember(row: any) {
    this.router.navigate([`landing/profile/${row.email}`]);
  }

  // editMember(member: any) {
  //   const dialogRef = this.dialog.open(FormComponent, {
  //     data: member
  //   })
  //   dialogRef.afterClosed().subscribe((result: any) => {
  //     this.getMembers();
  //   })
  // }

  // deleteMember(member: any) {
  //   const confirmation = prompt('Enter delete to confirm action')
  //   if (confirmation?.toLowerCase() !== 'delete') {
  //     this.snackbar.open('Action cancelled', 'Ok', { duration: 3000 });
  //     return;
  //   }
  //   this.allMembers = this.allMembers.filter((_member: any) => _member.email !== member.email);
  //   this.sharedService.setStorage('gymMembers', this.allMembers, 'local');
  //   this.getMembers();
  //   this.snackbar.open('Member deleted successfully', 'Ok', { duration: 3000 });
  // }

  // seePayment(member: any) {
  //   this.dialog.open(PaymentComponent, {
  //     data: member,
  //     width: '335px',
  //     height: '509px',
  //   });
  // }
}
