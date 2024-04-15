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
  selectedMenu: any = 0
  screenWidth!: number;
  sideNavElement: any;
  menuItems: any[] = [
    { label: 'Dashboard', icon: 'dashboard', route: 'dashboard' },
    { label: 'Payments', icon: 'payment', route: 'payments' },
    { label: 'Members', icon: 'group', route: 'members' },
  ]

  constructor(private router: Router, private sharedService: SharedService) {
    this.router.navigate(['/landing/dashboard']);
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

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
