import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-stacked-bar-sample',
  templateUrl: './stacked-bar-sample.component.html',
  styleUrls: ['./stacked-bar-sample.component.css']
})
export class StackedBarSampleComponent implements OnInit {
  stack: any;
  stackSeries: any;
  employeeData: any;
  svg: any;
  graph: any;
  xScale: any;
  yScale: any;
  // Color schemes for chart
  color = d3.scaleOrdinal(d3.schemeSet2);
  layer: any;
  toolTip: any;
  legendary: any;

  constructor() {}

  ngOnInit() {}

  async getVerticalStackedBarChart() {
    // Data loading from CSV file
    this.employeeData = await d3.csv('../../assets/employee-status.csv');

    // console.log(this.employeeData);

    // Stack bar shape define
    this.stack = d3
      .stack()
      .keys(['2018', '2017', '2016', '2015']);

    // to apply our loaded data into the stack shape
    this.stackSeries = this.stack(this.employeeData);

    // console.log(this.stackSeries);

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
      .domain([0, d3.max(this.stackSeries[this.stackSeries.length - 1], d => +d[1])])
      .nice()
      .range([500, 0]);

    // Main Graph element creation
    this.graph = this.svg
      .append('g')
      .attr('width', '800')
      .attr('height', '600')
      .attr('transform', 'translate(0, 0)');

    // Legendary label graph creation
    this.legendary = d3.select('.stack-bar-svg')
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
      }).attr('x', '0px')
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
      .attr('transform', 'translate(20, 50 )')
      .attr('class', 'layer')
      .style('fill', (d, i) => {
        return this.color(i);
      });

    // creation of rectangle bars in the layers
    this.layer
      .selectAll('.stack-bar')
      .data(function(d, i) {
        return d;
      })
      .enter()
      .append('rect')
      .attr('class', 'stack-bar')
      .attr('y', (d, i) => {
        return this.yScale(d[1]);
      })
      .attr('x', (d, i) => {
        return 35 + this.xScale(d.data.username);
      })
      .attr('width', 30)
      .attr('height', (d, i) => {
        return this.yScale(d[0]) - this.yScale(d[1]);
      })
      .on('mouseover', (data, index) => {
        this.getToolTip(data, index);
      })
      .on('mouseout', (data, index) => {
        d3.select('.tooltip').style('display', 'none');
      });
  }

  // Tooltip
  getToolTip(data, index) {
    this.toolTip.style('opacity', 1).classed('tooltip', true);
    d3.selectAll('.stack-bar').filter((d, i) => {
      if (index === i) {
        this.toolTip
          .html(
            `<div>Salary: ${data[1] - data[0]}</div>
              `)
          .style('left', `${d3.event.layerX - 10}px`)
          .style('top', `${d3.event.layerY + 10}px`)
          .style('display', 'inline');
        return true;
      } else {
        return null;
      }
    });
  }
}


