

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { D3JSSampleComponent } from './d3js-sample/d3js-sample.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SvgComponent } from './svg-sample/svg-sample.component';
import { CssAnimationComponent } from './css-animation/css-animation.component';
import { SvgViewboxComponent } from './svg-viewbox/svg-viewbox.component';
import { SvgBarChartComponent } from './svg-bar-chart/svg-bar-chart.component';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { VerticalStackedBarComponent } from './vertical-stacked-bar-chart/vertical-stacked-bar-chart.component';
import { HorizontalStackedBarComponent } from './horizontal-stacked-bar/horizontal-stacked-bar.component';
import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
import { CenterHorizontalStackedBarComponent } from './center-horizontal-stacked-bar/center-horizontal-stacked-bar.component';
import { StackGroupBarChartComponent } from './stack-group-bar-chart/stack-group-bar-chart.component';
import { GroupedStackChartComponent } from './grouped-stack-bar-chart/grouped-stack-bar-chart.component';
import { LayerDonutChartComponent } from './layer-donut-chart/layer-donut-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgComponent,
    D3JSSampleComponent,
    CssAnimationComponent,
    SvgViewboxComponent,
    SvgBarChartComponent,
    VerticalBarChartComponent,
    PieChartComponent,
    VerticalStackedBarComponent,
    HorizontalStackedBarComponent,
    GroupedBarChartComponent,
    CenterHorizontalStackedBarComponent,
    StackGroupBarChartComponent,
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
