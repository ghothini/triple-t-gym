import { Component, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  menuItems: any[] = [{
    imgIconPath: '../../../assets/images/icons/user-black.png',
    label: 'My Profile'
  }, {
    imgIconPath: null,
    label: 'Contact Support'
  }, {
    imgIconPath: null,
    label: 'Logout'
  }]
  currentUser: any;
  currentUserAcronyms: string = '';

  constructor(private sharedService: SharedService) {
    this.currentUser = this.sharedService.getStorage('currentUser', 'session');
    this.setAcronyms(this.currentUser.fullName);
  }

  toggleSideNav() {
    this.sharedService.toggleSideNav();
  }

  setAcronyms(fullName: string) {
    fullName.toUpperCase().split(' ').forEach((name: any) => {
      this.currentUserAcronyms = this.currentUserAcronyms + name.substr(0, 1);
    })
  }
}
