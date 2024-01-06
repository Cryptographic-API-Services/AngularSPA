import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-benchmarks',
  templateUrl: './user-benchmarks.component.html',
  styleUrl: './user-benchmarks.component.css'
})
export class UserBenchmarksComponent implements AfterViewInit {

  @ViewChild('benchmarkDateSelect')
  benchmarkDate: ElementRef;

  constructor(private httpService: HttpService) {

  }

  ngAfterViewInit(): void {
    this.getInitialChart(this.benchmarkDate.nativeElement.value);
  }

  public handleDateChangeEvent(): void {
    this.getInitialChart(this.benchmarkDate.nativeElement.value);
  }

  private getInitialChart(daysAgo: number): void {
    const url = environment.apiUrl + "BenchmarkSDKMethod/GetUserBenchmarksByDays" + `?daysAgo=${daysAgo}`
    this.httpService.getAuthenticated(url).subscribe((response) => {
      console.log(response);
    });
  }
}
