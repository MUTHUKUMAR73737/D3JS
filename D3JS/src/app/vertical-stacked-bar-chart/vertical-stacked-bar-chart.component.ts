import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-vertical-stacked-bar-chart',
  templateUrl: './vertical-stacked-bar-chart.component.html',
  styleUrls: ['./vertical-stacked-bar-chart.component.css']
})
export class VerticalStackedBarComponent implements OnInit {
  // Stacked bar chart
  stack: any;
  stackSeries: any;
  employeeData: any;
  svg: any;
  graph: any;
  xScale: any;
  yScale: any;
  color = d3.scaleOrdinal(d3.schemeSet2);
  layer: any;
  toolTip: any;
  legendary: any;

  // tooltip pie chart
  pie: any;
  arc: any;
  arcs: any;
  tooltipSVG: any;
  tooltipGraph: any;
  // tslint:disable-next-line:no-inferrable-types
  width: number = 250;
  // tslint:disable-next-line:no-inferrable-types
  height: number = 250;
  radius = Math.min(this.height, this.width) / 2;
  tooltipLegend: any;

  constructor() {}

  ngOnInit() {}

  async getVerticalStackedBarChart() {
    // Data loading from CSV file
    this.employeeData = await d3.csv('../../assets/employee3.csv');

    // console.log(this.employeeData);

    // Stack bar shape define
    this.stack = d3.stack().keys(['2018', '2017', '2016', '2015']);

    // to apply our loaded data into the stack shape
    this.stackSeries = this.stack(this.employeeData);

    // console.log(this.stackSeries);

    d3.select('.vertical-stacked-bar-chart').html('');

    // Create SVG
    this.svg = d3
      .select('.vertical-stacked-bar-chart')
      .append('svg')
      .attr('class', 'stack-bar-svg')
      .style('margin', '5px')
      .attr('width', 800)
      .attr('height', 600)
      .style('border', '1px solid steelblue');

    // ViewBox setup for the svg
    this.svg = d3.select('.stack-bar-svg').attr('viewBox', '0 0 750 600');

    // Tooltip element creation
    this.toolTip = d3
      .select('.vertical-stacked-bar-chart')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('display', 'none');

    // X-Axis scale
    this.xScale = d3
      .scaleBand()
      .range([0, 600])
      .domain(this.employeeData.map(data => data.username));

    // Y-Axis scale
    this.yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.stackSeries[this.stackSeries.length - 1], d => +d[1])
      ])
      .nice()
      .range([500, 0]);

    // Main Graph element creation
    this.graph = this.svg
      .append('g')
      .attr('width', '800')
      .attr('height', '600')
      .attr('transform', 'translate(0, 0)');

    // Legendary label graph creation
    this.legendary = d3
      .select('.stack-bar-svg')
      .append('g')
      .attr('class', 'stack-main-graph')
      .attr('width', '200px')
      .attr('height', '200px')
      .attr('transform', 'translate(650 30)');

    // Legendary label graph with text and rectangle bar
    d3.selectAll('.stack-main-graph')
      .selectAll('.stack-bar-legend')
      .data(['2018-Salary', '2017-Salary', '2016-Salary', '2015-Salary'])
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return `translate (0, ${i * 35})`;
      })
      .attr('class', 'stack-bar-legend')
      .append('text')
      .text(function(d) {
        return d;
      })
      .attr('x', '0px')
      .style('font-size', '12px')
      .attr('y', function(d, i) {
        return 10;
      });

    // Legendary label rectangle bar
    d3.selectAll('.stack-bar-legend')
      .append('rect')
      .attr('x', '70px')
      .attr('width', `15px`)
      .attr('height', '15px')
      .style('border', '1px solid lightgray')
      .attr('fill', (d, i) => {
        return this.color(`${i}`);
      });

    // insert x-axis into the graph scale
    this.graph
      .append('g')
      .attr('transform', 'translate(50,550)')
      .call(d3.axisBottom(this.xScale));

    // insert y-axis into the graph scale
    this.graph
      .append('g')
      .attr('transform', 'translate(49, 50 )')
      .call(d3.axisLeft(this.yScale));

    // Layer creation based on salary(in years)
    this.layer = this.graph
      .selectAll('.layer')
      .data(this.stackSeries)
      .enter()
      .append('g')
      .attr('transform', (d, i) => {
        return 'translate(20, 50 )';
      })
      .attr('class', 'layer')
      .style('fill', (d, i) => {
        return this.color(i);
      });

    // creation of rectangle bars in the layers
    this.layer
      .selectAll('.stack-bar')
      .data(function(d, i) {
        // console.log(d);
        return d;
      })
      .enter()
      .append('rect')
      .attr('class', 'stack-bar')
      .attr('y', (d, i) => {
        return this.yScale(0);
      })
      .attr('x', (d, i) => {
        return 35 + this.xScale(d.data.username);
      })
      .on('mouseover', (data, index) => {
        this.getToolTip(data, index);
      })
      .on('mouseout', (data, index) => {
        d3.select('.tooltip2')
          .style('opacity', '0')
          .style('display', 'none');
      })
      .attr('width', 30)
      .attr('height', (d, i) => {
        return this.yScale(0) - this.yScale(0);
      })
      .transition()
      .ease(d3.easeLinear)
      .duration(1500)
      .delay(function(d, i) {
        return i * 1500;
      })
      .attr('y', (d, i) => {
        return this.yScale(d[1]);
      })
      .attr('height', (d, i) => {
        return this.yScale(d[0]) - this.yScale(d[1]);
      });
  }

  // Tooltip
  getToolTip(data, index) {
    this.getToolTipPieChart(data, index);
  }

  getToolTipPieChart(data, index) {
    this.toolTip.style('opacity', 1).classed('tooltip2', true);
    this.toolTip
      .html(
        `<div class='tooltip-stack-pie-chart-container'>
        <div class='header'>
        <h4>SALARY DETAILS</h4>
        </div>
          </div>
              `
      )
      .style('left', `${d3.event.offsetX - 100}px`)
      .style('top', `${d3.event.offsetY + 5}px`)
      .style('display', 'inline');

    this.tooltipSVG = d3
      .select('.tooltip-stack-pie-chart-container')
      .append('svg')
      .attr('width', 400)
      .attr('height', 260)
      .style('padding', '10px 0px 0px 0px');

    this.tooltipGraph = this.tooltipSVG
      .append('g')
      .attr('class', 'stack-pie-chart-graph')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    this.pie = d3.pie();

    this.arc = d3
      .arc()
      .innerRadius(75)
      .outerRadius(this.radius);

    this.arcs = this.tooltipGraph
      .selectAll('.stack-pie-arc-container')
      .data(
        this.pie([
          data['data'][2018],
          data['data'][2017],
          data['data'][2016],
          data['data'][2015]
        ])
      )
      .enter()
      .append('g')
      .attr('class', 'stack-pie-arc-container');

    this.arcs
      .append('path')
      .attr('fill', (d, i) => {
        return this.color(i);
      })
      .attr('d', this.arc);

    this.tooltipLegend = this.tooltipSVG
      .append('g')
      .attr('class', 'stack-pie-chart-main-graph-legend')
      .attr('transform', 'translate(0, 20)')
      .selectAll('.stack-pie-chart-legend')
      .data([
        data['data'][2018],
        data['data'][2017],
        data['data'][2016],
        data['data'][2015]
      ])
      .enter()
      .append('g')
      .attr('class', 'group-chart-legend')
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * 50 + ')';
      })
      .style('opacity', '1');
    //  legend rectangle bar
    this.tooltipLegend
      .append('rect')
      .attr('x', 300 - 18)
      .attr('width', 18)
      .attr('height', 18)
      .attr('rx', 9)
      .attr('ry', 9)
      .style('fill', (d, i) => this.color(i));
    //  legend text
    this.tooltipLegend
      .append('text')
      .attr('x', 400 - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(function(d) {
        return d;
      });
  }
}
