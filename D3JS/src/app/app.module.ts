

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { VerticalStackedBarComponent } from './vertical-stacked-bar-chart/vertical-stacked-bar-chart.component';
import { HorizontalStackedBarComponent } from './horizontal-stacked-bar/horizontal-stacked-bar.component';
import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
import { CenterHorizontalStackedBarComponent } from './center-horizontal-stacked-bar/center-horizontal-stacked-bar.component';
import { GroupedStackChartComponent } from './grouped-stack-bar-chart/grouped-stack-bar-chart.component';
import { LayerDonutChartComponent } from './layer-donut-chart/layer-donut-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    VerticalBarChartComponent,
    PieChartComponent,
    VerticalStackedBarComponent,
    HorizontalStackedBarComponent,
    GroupedBarChartComponent,
    CenterHorizontalStackedBarComponent,
    GroupedStackChartComponent,
    LayerDonutChartComponent,
    BubbleChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
