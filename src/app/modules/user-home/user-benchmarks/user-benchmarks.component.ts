import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';
import { BenchmarkSDKMethod } from './types/benchmark-sdk-method';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-user-benchmarks',
  templateUrl: './user-benchmarks.component.html',
  styleUrl: './user-benchmarks.component.css'
})
export class UserBenchmarksComponent implements AfterViewInit {

  @ViewChild('benchmarkDateSelect')
  benchmarkDate: ElementRef;

  @ViewChild('benchmarkRefreshRate')
  benchmarkRefreshRate: ElementRef;

  public labels: string[] = [];
  public dataLabels: string[][] = [];
  public data: number[][] = [];

  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: Array<ChartConfiguration<"bar">["data"]>;
  public barChartOptions: Array<ChartConfiguration<"bar">["options"]>;

  public refreshTimer: any;

  constructor(private httpService: HttpService) {

  }
  
  ngAfterViewInit(): void {
    this.getInitialChart(this.benchmarkDate.nativeElement.value);
  }

  public handleDateChangeEvent(): void {
    const newValue = this.benchmarkDate.nativeElement.value;
    if (newValue !== "0") {
      this.refreshTimer = setInterval(()=>{ 
        this.getInitialChart(newValue);
      });
    }
  }

  public handleRefreshChangeEvent(): void {
    clearInterval(this.refreshTimer);
    this.refreshTimer = setInterval(() => {
      this.getInitialChart(this.benchmarkDate.nativeElement.value);
    }, parseInt(this.benchmarkRefreshRate.nativeElement.value) * 1000);
  }

  private getInitialChart(daysAgo: number): void {
    this.labels = [];
    this.data = [];
    this.dataLabels = [];
    const url = environment.apiUrl + "BenchmarkSDKMethod/GetUserBenchmarksByDays" + `?daysAgo=${daysAgo}`
    this.httpService.getAuthenticated(url).subscribe((response: any) => {
      this.barChartData = [];
      this.barChartOptions = [];
      for (let i = 0; i < response.benchmarks.length; i++) {
        let labelIndex = this.labels.findIndex(x => x === response.benchmarks[i].methodDescription);
        if (labelIndex === -1) {
          this.labels.push(response.benchmarks[i].methodDescription);
          labelIndex = this.labels.findIndex(x => x === response.benchmarks[i].methodDescription);
          this.data[labelIndex] = [];
          this.dataLabels[labelIndex] = [];
          this.data[labelIndex].push(response.benchmarks[i].amountOfTime);
          this.dataLabels[labelIndex].push(response.benchmarks[i].methodName);
          this.barChartOptions.push({ responsive: true });
        } else {
          this.data[labelIndex].push(response.benchmarks[i].amountOfTime);
          this.dataLabels[labelIndex].push(response.benchmarks[i].methodName);
        }
      }
      console.log(this.data);

      let possibleColors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'black']
      for (let i = 0; i < this.labels.length; i++) {
        let newLabels = [];
        for (let j = 0; j < this.data[i].length; j++) {
          newLabels.push(this.labels[i]);
        }
        this.barChartData.push({
          labels: this.dataLabels[i],
          datasets: [
            {data: this.data[i], label: this.labels[i]}
          ]
        });
      }
    });
  }
}
