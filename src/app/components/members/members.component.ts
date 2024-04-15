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

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements AfterViewInit {
  displayedColumns: string[] = ['membershipNo','joinDate', 'fullName', 'gender', 'contact', 'payments', 'actions'];
  dataSource: any;
  allMembers: any;
  gymMembersAvailable: boolean = false;
  selectedNav: any = {
    label: 'Gym Members',
    icon: 'group'
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private sharedService: SharedService, private dialog: MatDialog, private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public filteredMembers: any) {
    this.assignMembers()
    if (filteredMembers.filteredType) {
      this.dataSource = new MatTableDataSource<any>(filteredMembers.members);
    }
  }
  addMember() {
    const dialogRef = this.dialog.open(FormComponent, {
      height: '80%'
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      this.assignMembers();
    })
  }

  ngAfterViewInit() {
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

  assignMembers() {
    this.allMembers = this.sharedService.getStorage('gymMembers', 'local');
    this.dataSource = new MatTableDataSource<any>(this.allMembers);
    if (this.allMembers.length > 0) {
      this.gymMembersAvailable = true;
    } else {
      this.gymMembersAvailable = false;
    }
  }

  editMember(member: any) {
    const dialogRef = this.dialog.open(FormComponent, {
      data: member,
      height: '80%'
    })
    dialogRef.afterClosed().subscribe((result: any) => {
      this.assignMembers();
    })
  }

  deleteMember(member: any) {
    const confirmation = prompt('Enter delete to confirm action')
    if (confirmation?.toLowerCase() !== 'delete') {
      this.snackbar.open('Action cancelled', 'Ok', { duration: 3000 });
      return;
    }
  this.allMembers = this.allMembers.filter((_member: any) => _member.email !== member.email);
    this.sharedService.setStorage('gymMembers', this.allMembers, 'local');
    this.assignMembers();
    this.snackbar.open('Member deleted successfully', 'Ok', { duration: 3000 });
  }

  seePayment(member: any) {
    this.dialog.open(PaymentComponent,{
      data: member,
      width: '335px',
      // height: '50%',
    });
  }
}
