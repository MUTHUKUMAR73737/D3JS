
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { D3JSSampleComponent } from './d3js-sample/d3js-sample.component';
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

const routes: Routes = [
  { path: '', redirectTo: '/d3-sample', pathMatch: 'full' },
  { path: 'd3-sample', component: D3JSSampleComponent },
  { path: 'svg-sample', component: SvgComponent },
  { path: 'css-animation', component: CssAnimationComponent },
  { path: 'svg-view-box', component: SvgViewboxComponent },
  { path: 'svg-bar-chart', component: SvgBarChartComponent },
  { path: 'vertical-bar-chart', component: VerticalBarChartComponent },
  { path: 'pie-chart', component: PieChartComponent },
  { path: 'vertical-stacked-bar', component: VerticalStackedBarComponent },
  { path: 'horizontal-stacked-bar', component: HorizontalStackedBarComponent },
  { path: 'group-bar-chart', component: GroupedBarChartComponent },
  { path: 'center-horizontal-stack-bar', component: CenterHorizontalStackedBarComponent },
  { path: 'stack-group-bar-chart', component: StackGroupBarChartComponent },
  { path: 'group-stack-bar-chart', component: GroupedStackChartComponent },
  { path: 'layer-donut', component: LayerDonutChartComponent },
  { path: 'bubble-chart', component: BubbleChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
