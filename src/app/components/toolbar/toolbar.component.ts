import { Component, Input } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() component: any;

  constructor(private sharedService: SharedService) { }

  toggleSideNav() {
    this.sharedService.toggleSideNav();
  }
}
