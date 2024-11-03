import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-center',
  templateUrl: './data-center.component.html',
  styleUrls: ['./data-center.component.scss']
})
export class DataCenterComponent {
  titles: any[] = [{
    label: 'Reports',
    route: 'reports'
  }, {
    label: 'Imports',
    route: 'imports'
  }];
  selectedTitle: number = 0;

  constructor(private router: Router) {
    if (!this.router.url.includes('imports') && !this.router.url.includes('reports')) {
      this.router.navigate(['/landing/data-center/reports']);
    }
    if (this.router.url.includes('imports')) {
      this.selectedTitle = 1;
    }
  }

  selectTitle(indx: number) {
    this.selectedTitle = indx;
  }
}