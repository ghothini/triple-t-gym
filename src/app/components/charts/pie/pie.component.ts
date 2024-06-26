import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements AfterViewInit {
  pieData!: any;
  pieChartDatasets: any;
  pieChartLabels: any = ['Paid'];

  @Input() totalMembersPayments: any;

  constructor(private cd: ChangeDetectorRef, private sharedService: SharedService) {
    this.sharedService.watchpaymentsTotalChanges().subscribe((paymentsTotalObj) => {
      this.pieChartDatasets = [{
        data: [paymentsTotalObj.paid]
      }]
    })
  }

  ngAfterViewInit() {
    this.pieChartDatasets = [{
      data: [this.totalMembersPayments.paid]
    }]
    this.cd.detectChanges();
  }

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    plugins: {
      legend: {
        position: "top"
      }
    }
  };
  public pieChartLegend = true;
  public pieChartPlugins = [];

}
