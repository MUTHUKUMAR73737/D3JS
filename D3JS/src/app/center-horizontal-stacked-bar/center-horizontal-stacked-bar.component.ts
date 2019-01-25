import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-center-horizontal-stacked-bar',
  templateUrl: './center-horizontal-stacked-bar.component.html',
  styleUrls: ['./center-horizontal-stacked-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CenterHorizontalStackedBarComponent implements OnInit {
  employeeData: any;
  svg: any;
  graph: any;
  stack: any;
  stackSeries: any;
  legend: any;
  toolTip: any;
  yScale: any;
  x1Scale: any;
  xScale: any;
  color = d3.scaleOrdinal(d3.schemeSet2);
  largestMidPoint: any;
  layer: any;
  midPoint: any;

  constructor() {}

  ngOnInit() {
    d3.csv('../../assets/employee-status.csv').then(data => {
      this.employeeData = data;
    });
  }

  getCenterAlignedHorizontalStackedChart() {
    // Main SVG element
    this.svg = d3
      .select('.center-horizontal-stacked-bar-container')
      .append('svg')
      .attr('width', 700)
      .attr('height', 600)
      .style('border', '1px solid steelblue');

    // Main graph
    this.graph = this.svg
      .append('g')
      .attr('class', 'horizontal-stacked-bar-main-graph');

    // Tooltip
    this.toolTip = d3
      .select('.center-horizontal-stacked-bar-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('display', 'none');

    // Stack shape
    this.stack = d3.stack().keys(['2018', '2017', '2016', '2015']);

    // Output of stack shape
    this.stackSeries = this.stack(this.employeeData);

    // console.log(this.stackSeries);

    // Midpoint calculation for each rectangle bar(eg-username)
    this.midPoint = this.stackSeries[this.stackSeries.length - 1].map(
      data => +data[1] / 2
    );

    // Y scale - Username
    this.yScale = d3
      .scaleBand()
      .domain(this.employeeData.map(data => data.username))
      .range([500, 0]);

    // X scale - From 0 to highest salary
    this.xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.stackSeries[this.stackSeries.length - 1], d => +d[1])
      ])
      .range([0, 500]);

    // Midpoint calculation for each user
    this.largestMidPoint =
      d3.max(this.stackSeries[this.stackSeries.length - 1], d => +d[1]) / 2;

    // X-scale
    this.graph
      .append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(50, 50)')
      .call(d3.axisTop(this.xScale));

    // Midpoint line
    this.graph
      .append('g')
      .append('line')
      .attr('x1', 300)
      .attr('y1', 50)
      .attr('x2', 300)
      .attr('y2', 550)
      .attr('stroke', 'black');


    // Y-scale
    this.graph
      .append('g')
      .attr('class', 'y-axis')
      .attr('transform', 'translate(50, 50)')
      .call(d3.axisLeft(this.yScale));

      // Legend
      this.legend = this.svg
      .append('g')
      .attr('class', 'horizontal-stack-main-graph')
      .attr('width', '200px')
      .attr('height', '200px')
      .attr('transform', 'translate(580 70)');


    d3.selectAll('.horizontal-stack-main-graph')
      .selectAll('.horizontal-stack-bar-legend')
      .data(['2018-salary', '2017-salary', '2016-salary', '2015-salary'])
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return `translate (0, ${i * 35})`;
      })
      .attr('class', 'horizontal-stack-bar-legend')
      .append('text')
      .text(function(d) {
        return d;
      }).style('font-size', '12px')
      .attr('x', '0px')
      .attr('y', function(d, i) {
        return 12;
      });

    d3.selectAll('.horizontal-stack-bar-legend')
      .append('rect')
      .attr('x', '70px')
      .attr('width', `20px`)
      .attr('height', '20px')
      .attr('fill', (d, i) => {
        return this.color(`${i}`);
      });

    // Salary layer based on years
    this.layer = this.graph
      .selectAll('.center-horizontal-layer')
      .data(this.stackSeries)
      .enter()
      .append('g')
      .attr('transform', 'translate(50, 50 )')
      .attr('class', 'center-horizontal-layer')
      .style('fill', (d, i) => {
        return this.color(i);
      });

    // rectangle bars - salary years(layers)
    this.layer
      .selectAll('.center-horizontal-stack-bar')
      .data(function(d, i) {
        return d;
      })
      .enter()
      .append('rect')
      .attr('class', 'center-horizontal-stack-bar')
      .attr('x', (d, i) => {
        return this.xScale(this.largestMidPoint - this.midPoint[i] + d[0]);
      })
      .attr('y', (d, i) => {
        return this.yScale(d.data.username);
      })
      .attr('height', 30)
      .attr('width', (d, i) => {
        return this.xScale(d[1]) - this.xScale(d[0]);
      })
      .on('mouseover', (d, i, nodes) => {
        this.toolTip.style('opacity', '1').classed('tooltip', true);
        d3.select(nodes[i]).attr('fill', data => {
          this.toolTip
            .html(
              `<div>Salary: ${data[1] - data[0]}</div>
            `
            )
            .style('left', `${d3.event.layerX - 10}px`)
            .style('top', `${d3.event.layerY + 10}px`)
            .style('display', 'inline');
          return null;
        });
      })
      .on('mouseout', (d, i, nodes) => {
        d3.select(nodes[i]).attr('fill', data => {
          this.toolTip.style('opacity', '0');
          return null;
        });
      });
  }
}
