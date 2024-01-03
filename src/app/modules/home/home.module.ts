import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { BenchmarkMethodChartComponent } from './benchmark-method-chart/benchmark-method-chart.component';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    HomeComponent,
    BenchmarkMethodChartComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgChartsModule
  ]
})
export class HomeModule { }
