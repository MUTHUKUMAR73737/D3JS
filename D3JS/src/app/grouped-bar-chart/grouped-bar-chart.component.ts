import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.css']
})
export class GroupedBarChartComponent implements OnInit {
  employeeData: any;
  salaryData: any;
  svg: any;
  graph: any;
  xScale: any;
  yScale: any;
  yScaleLimit: number;

  subGraph: any;

  sampleData = new Array();

  color = d3.scaleOrdinal(d3.schemeCategory10);

  totalData: any;
  constructor() {}

  ngOnInit() {
    d3.csv('../../assets/employee-status1.csv').then(data => {
      this.employeeData = data;
    });
  }

  getGroupChart() {
    this.svg = d3
      .select('.group-bar-chart-container')
      .append('svg')
      .attr('class', 'group-chart-svg')
      .attr('width', 600)
      .attr('height', 600)
      .style('border', '1px solid steelblue');

    this.graph = this.svg.append('g').attr('class', 'group-chart-main-graph');

    this.totalData = this.employeeData.reduce(function(accumulator, item) {
      Object.keys(item).forEach(function(key) {
        accumulator[key] = (accumulator[key] || 0) + +item[key];
      });
      return accumulator;
    }, {});

    Object.values(this.totalData).forEach((data, index) => {
      if (index === 0) {
        this.yScaleLimit = +data;
      }
      if (this.yScaleLimit <= +data) {
        this.yScaleLimit = +data;
      }
    });

    this.xScale = d3
      .scaleBand()
      .range([0, 500])
      .domain(this.employeeData.map(data => data.username));

    this.yScale = d3
      .scaleLinear()
      .range([500, 0])
      .domain([0, this.yScaleLimit])
      .nice();

    this.graph
      .append('g')
      .attr('transform', 'translate(50, 550)')
      .call(d3.axisBottom(this.xScale));

    this.graph
      .append('g')
      .attr('transform', 'translate(50, 50)')
      .call(d3.axisLeft(this.yScale));

    this.subGraph = this.graph
      .selectAll('.group-chart-sub-graph')
      .data(this.employeeData, (d, i) => {
        const sample = new Array();
        Object.keys(d).forEach((data, index) => {
          if (d[+data] !== undefined) {
            sample.push(+d[data]);
          }
        });
        console.log(sample);
        return sample;
      })
      .enter()
      .append('g')
      .attr('class', 'group-chart-sub-graph')
      .attr('x', (data, index) => {
        // console.log(data);
        return this.xScale(data.username);
      });

    this.subGraph
      // .select('.group-chart-sub-graph')
      .selectAll('.group-chart-rect')
      .data((d, i) => {
        // console.log(d);
        return d;
      })
      .enter()
      .append('rect')
      .attr('class', 'group-chart-rect')
      .attr('x', (data1, index1) => {
        // console.log(data1);
        return 120;
        // return this.xScale(data1);
      })
      .attr('y', '200')
      .attr('width', '20')
      .attr('height', '50')
      .attr('fill', 'steelblue');
  }
}
