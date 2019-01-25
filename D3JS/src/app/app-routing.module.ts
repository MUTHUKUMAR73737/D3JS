import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { D3SampleComponent } from './d3-sample/d3-sample.component';
import { SvgSampleComponent } from './svg-sample/svg-sample.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/d3-sample', pathMatch: 'full' },
  { path: 'd3-sample', component: D3SampleComponent },
  { path: 'svg-sample', component: SvgSampleComponent },
  { path: 'css-animations-sample', component: CssAnimationSampleComponent },
  { path: 'svg-view-box-sample', component: SvgViewboxSampleComponent },
  { path: 'horizontal-bar-chart', component: SvgBarChartComponent },
  { path: 'vertical-bar-chart', component: SvgVerticalBarChartSampleComponent },
  { path: 'pie-chart', component: PieChartComponent },
  { path: 'stacked-bar', component: StackedBarSampleComponent },
  { path: 'horizontal-stacked-bar', component: HorizontalStackedBarComponent },
  { path: 'group-bar-chart', component: GroupedBarChartComponent },
  { path: 'center-horizontal-stack-bar', component: CenterHorizontalStackedBarComponent },
  { path: 'stack-group-bar-chart', component: StackGroupBarChartComponent },
  { path: 'group-stack-bar-chart', component: GroupedStackChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
