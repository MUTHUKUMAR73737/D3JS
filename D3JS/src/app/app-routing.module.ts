
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerticalBarChartComponent } from './vertical-bar-chart/vertical-bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { VerticalStackedBarComponent } from './vertical-stacked-bar-chart/vertical-stacked-bar-chart.component';
import { HorizontalStackedBarComponent } from './horizontal-stacked-bar/horizontal-stacked-bar.component';
import { GroupedBarChartComponent } from './grouped-bar-chart/grouped-bar-chart.component';
import { CenterHorizontalStackedBarComponent } from './center-horizontal-stacked-bar/center-horizontal-stacked-bar.component';
import { GroupedStackChartComponent } from './grouped-stack-bar-chart/grouped-stack-bar-chart.component';
import { LayerDonutChartComponent } from './layer-donut-chart/layer-donut-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';

const routes: Routes = [
  { path: '', redirectTo: '/vertical-bar-chart', pathMatch: 'full' },
  { path: 'vertical-bar-chart', component: VerticalBarChartComponent },
  { path: 'pie-chart', component: PieChartComponent },
  { path: 'vertical-stacked-bar', component: VerticalStackedBarComponent },
  { path: 'horizontal-stacked-bar', component: HorizontalStackedBarComponent },
  { path: 'group-bar-chart', component: GroupedBarChartComponent },
  { path: 'center-horizontal-stack-bar', component: CenterHorizontalStackedBarComponent },
  { path: 'group-stack-bar-chart', component: GroupedStackChartComponent },
  { path: 'layer-donut', component: LayerDonutChartComponent },
  { path: 'bubble-chart', component: BubbleChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
