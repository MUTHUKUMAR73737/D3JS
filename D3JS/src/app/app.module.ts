
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SvgSampleComponent } from './svg-sample/svg-sample.component';
import { D3SampleComponent } from './d3-sample/d3-sample.component';
import { CssAnimationSampleComponent } from './css-animation-sample/css-animation-sample.component';
import { SvgViewboxSampleComponent } from './svg-viewbox-sample/svg-viewbox-sample.component';
import { SvgBarChartComponent } from './svg-bar-chart/svg-bar-chart.component';
import { SvgVerticalBarChartSampleComponent } from './svg-vertical-bar-chart-sample/svg-vertical-bar-chart-sample.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { StackedBarSampleComponent } from './stacked-bar-sample/stacked-bar-sample.component';
import { HorizontalStackedBarComponent } from './horizontal-stacked-bar/horizontal-stacked-bar.component';
import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
import { CenterHorizontalStackedBarComponent } from './center-horizontal-stacked-bar/center-horizontal-stacked-bar.component';
import { StackGroupBarChartComponent } from './stack-group-bar-chart/stack-group-bar-chart.component';
import { GroupedStackChartComponent } from './grouped-stack-chart/grouped-stack-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgSampleComponent,
    D3SampleComponent,
    CssAnimationSampleComponent,
    SvgViewboxSampleComponent,
    SvgBarChartComponent,
    SvgVerticalBarChartSampleComponent,
    PieChartComponent,
    StackedBarSampleComponent,
    HorizontalStackedBarComponent,
    GroupedBarChartComponent,
    CenterHorizontalStackedBarComponent,
    StackGroupBarChartComponent,
    GroupedStackChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
