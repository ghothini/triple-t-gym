import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  selectedMenu: any = 0;
  screenWidth!: number;
  sideNavElement: any;
  currentUser: any;
  menuItems: any[] = [
    { label: 'Home', imgIconPath: '../../../assets/images/icons/home.png', selectedImgIconPath: '../../../assets/images/icons/home-blue.png', route: 'home' },
    { label: 'Members', imgIconPath: '../../../assets/images/icons/customers.png', selectedImgIconPath: '../../../assets/images/icons/customers-blue.png', route: 'members' },
    { label: 'Transactions', imgIconPath: '../../../assets/images/icons/credit-card.png', selectedImgIconPath: '../../../assets/images/icons/credit-card-blue.png', route: 'transactions' },
    { label: 'Data Center', imgIconPath: '../../../assets/images/icons/cloud-server.png', selectedImgIconPath: '../../../assets/images/icons/cloud-server-blue.png', route: 'data-center/reports' }
  ]

  constructor(private router: Router, private sharedService: SharedService) {
    // this.router.navigate(['/landing/home']);
    // this.currentUser = this.sharedService.getLoggedInBusiness();
    this.currentUser = this.sharedService.getStorage('currentUser','session');
    this.sharedService.watchSideNavChanges().subscribe((changes: any) => {
      this.sidenav.toggle();
    })
  }


  @ViewChild('sideNav') sidenav!: MatSidenav

  ngOnInit(): void {
    this.sideNavElement = document.getElementById('sideNav') as HTMLElement;
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleScreenWidthChanges()
  }

  handleScreenWidthChanges() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 600) {
      this.sidenav.close()
      return;
    }
    this.sidenav.open()
  }

  selectMenu(indx: any) {
    this.selectedMenu = indx
    this.sidenav.toggle();
  }

  // logout() {
  //   sessionStorage.clear();
  //   this.router.navigate(['/login']);
  // }
}
