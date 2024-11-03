import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ProfileAddComponent } from '../pop-ups/profile-add/profile-add.component';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.scss']
})
export class MemberProfileComponent {
  memberToView: any;
  memberToViewSubscription: any;

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private dialog: MatDialog) {
    const memberToViewEmail = this.route.snapshot.params['email'];
    const allGymMembers = this.sharedService.getStorage('allGymMembers', 'local');
    const currentUser = this.sharedService.getStorage('currentUser', 'session');
    this.memberToView = allGymMembers.find((member: any) => member.email === memberToViewEmail && member.gymBusiness === currentUser.email);
    this.sharedService.setMemberToView(this.memberToView);
    this.memberToViewSubscription = this.sharedService.watchMemberToViewRefresh().subscribe((changes: any) => {
      this.refreshMemberToView();
    })
  }

  addNote() {
    const dialogRef = this.dialog.open(ProfileAddComponent, {
      data: 'note',
      width: '60%'
    });
  }

  editMember() {
    const dialogRef = this.dialog.open(FormComponent, {
      data: this.memberToView,
      width: '60%'
    })
  }

  refreshMemberToView(){
    this.memberToView = this.sharedService.getMemberToView();
  }
}
