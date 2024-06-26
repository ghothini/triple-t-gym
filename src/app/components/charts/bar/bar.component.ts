import { AfterViewInit, Component, Input } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements AfterViewInit {
  pieData!: any;
  pieChartDatasets: any = [];
  pieChartLabels: any = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November',
    'December'];
 
  @Input() paymentsPerMonth: any;

  constructor(private sharedService: SharedService){}

  ngAfterViewInit(){
    this.sharedService.watchPaymentsChanges().subscribe((paymentsPerMonthArr) => {
      this.pieChartDatasets = [{
        data: paymentsPerMonthArr,
        backgroundColor: [ // Define colors for each bar
          'rgb(56 55 255 / 60%)',
          'rgb(183 123 165 / 60%)',
          'rgb(68 69 59 / 60%)',
          'rgba(75, 192, 192, 0.6)', // Green
          'rgba(153, 102, 255, 0.6)', // Purple
          'rgba(255, 159, 64, 0.6)', // Orange
          'rgba(255, 99, 132, 0.6)', // Red
          'rgba(54, 162, 235, 0.6)', // Blue
          'rgba(255, 206, 86, 0.6)', // Yellow
          'rgb(29 34 53 / 60%)', 
          'rgb(169 255 162 / 60%)',
          'rgb(255 55 66 / 60%)'  
        ]
      }]
    })
    this.pieChartDatasets = [{
      data: this.paymentsPerMonth,
      backgroundColor: [ // Define colors for each bar
        'rgb(56 55 255 / 60%)',
        'rgb(183 123 165 / 60%)',
        'rgb(68 69 59 / 60%)',
        'rgba(75, 192, 192, 0.6)', // Green
        'rgba(153, 102, 255, 0.6)', // Purple
        'rgba(255, 159, 64, 0.6)', // Orange
        'rgba(255, 99, 132, 0.6)', // Red
        'rgba(54, 162, 235, 0.6)', // Blue
        'rgba(255, 206, 86, 0.6)', // Yellow
        'rgb(29 34 53 / 60%)', 
        'rgb(169 255 162 / 60%)',
        'rgb(255 55 66 / 60%)'  
      ]
    }]
  }

  // Pie
  public pieChartOptions: ChartOptions<'bar'> = {
    responsive: false,
    plugins: {
      legend: {
        position: "top"
      }
    }
  };
  public pieChartLegend = false;
  public pieChartPlugins = [];
}
