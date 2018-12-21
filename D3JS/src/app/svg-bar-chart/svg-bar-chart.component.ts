import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-svg-bar-chart',
  templateUrl: './svg-bar-chart.component.html',
  styleUrls: ['./svg-bar-chart.component.css']
})
export class SvgBarChartComponent implements OnInit {
  // Horizontal bar chart
  data: Number[] = [15, 30, 45, 90, 60, 75];
  graph: any;
  horizontalBarChart: any;
  scaleFactor: any = 30;

  // Vertical Bar chart
  data1: Number[] = [60, 15, 30, 90, 45, 75, 120, 105];
  data2: Number[] = [100, 200, 300, 900, 450, 750, 150, 500];
  graph1: any;
  verticalBarChart: any;

  xLinearScale: any;
  yLinearScale: any;

  xAxis: any;
  yAxis: any;

  constructor() {}

  ngOnInit() {}

  getHorizontalBarChart() {
    this.graph = d3
      .select('.bar-chart-container')
      .append('svg')
      .attr('width', '300')
      .attr('height', this.scaleFactor * this.data.length)
      .style('border', '1px solid steelblue');

    this.horizontalBarChart = this.graph
      .selectAll('g')
      .data(this.data)
      .enter()
      .append('g')
      .attr('transform', (data, index) => {
        return 'translate(0,' + index * this.scaleFactor + ')';
      });

    this.horizontalBarChart
      .append('rect')
      .attr('width', data => {
        return data;
      })
      .attr('height', data => {
        return this.scaleFactor - 1;
      })
      .style('fill', 'yellowgreen');

    this.horizontalBarChart
      .append('text')
      .attr('x', function(data) {
        return data;
      })
      .attr('y', this.scaleFactor)
      .text(function(data) {
        return data;
      });
  }

  getVerticalBarChart() {
    this.graph1 = d3
      .select('.vertical-bar-chart-container')
      .append('svg')
      .attr('width', '400')
      .attr('height', '400').style('border', '1px solid steelblue');

    this.xLinearScale = d3
      .scaleLinear()
      .domain([d3.min(this.data1), d3.max(this.data1)])
      .range([0, 300]);

    this.yLinearScale = d3
      .scaleLinear()
      .domain([d3.min(this.data2), d3.max(this.data2)])
      .range([200, 0]);

    this.xAxis = d3.axisBottom(this.xLinearScale);
    this.yAxis = d3.axisLeft(this.yLinearScale);

    this.graph1
      .append('g')
      .attr('transform', 'translate(50, 50)')
      .call(this.yAxis);

    this.graph1
      .append('g')
      .attr('transform', 'translate(50, ' + 250 + ')')
      .call(this.xAxis);
  }
}
