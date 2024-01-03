import { Component, OnInit } from "@angular/core";
import { HomeBenchMark } from "src/app/model/HomeBenchMark";
import { HttpService } from "src/app/services/http.service";
import { environment } from "src/environments/environment";
import { BenchmarkMethodChartFormatterService } from "../services/benchmark-method-chart-formatter.service";
import { ChartConfiguration } from "chart.js";

@Component({
  selector: "app-benchmark-method-chart",
  templateUrl: "./benchmark-method-chart.component.html",
  styleUrls: ["./benchmark-method-chart.component.css"],
})
export class BenchmarkMethodChartComponent implements OnInit {
  public canDisplay: boolean = false;
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<"bar">["data"];

  public barChartOptions: ChartConfiguration<"bar">["options"] = {
    responsive: true,
  };

  constructor(
    private formatter: BenchmarkMethodChartFormatterService,
    private http: HttpService,
  ) {}

  ngOnInit(): void {
    this.getBenchMarkData();
  }

  public getBenchMarkData(): void {
    this.http.get(environment.apiUrl + "UIData/GetHomeBenchmarkData").subscribe(
      (response: any) => {
        this.createLast25RequestChart(response);
      },
      (error) => {
      },
    );
  }

  private createLast25RequestChart(httpResponse: HomeBenchMark): void {
    let labels: string[] = [];
    let data: number[] = [];
    for (let i = 0; i < httpResponse.data.length; i++) {
      let currentData = httpResponse.data[i];
      if (!labels.includes(currentData.details.method)) {
        labels.push(currentData.details.method);
      }
      let currentIndexEditing = labels.indexOf(currentData.details.method);
      if (!data[currentIndexEditing]) {
        data[currentIndexEditing] = 1
      } else {
        data[currentIndexEditing] = data[currentIndexEditing] + 1;
      }
    }
    this.barChartData = {
      labels: labels,
      datasets: [
        { data: data, label: "Our Last Executed Methods" },
      ],
    };
    this.canDisplay = true;
  }
}
