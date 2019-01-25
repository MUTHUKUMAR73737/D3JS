import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-stack-group-bar-chart',
  templateUrl: './stack-group-bar-chart.component.html',
  styleUrls: ['./stack-group-bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StackGroupBarChartComponent implements OnInit {
  employeeData: any;
  stackSeries: any;
  stack: any;

  xScale: any;
  x1Scale: any;
  yScale: any;

  svg: any;
  graph: any;
  legend: any;
  yearKeys: any;

  groupSubGraph: any;
  stackSubGraph: any;

  color = d3.scaleOrdinal(d3.schemeSet2);

  getStackChart: any;
  getGroupChart: any;

  constructor() {}

  ngOnInit() {
    d3.csv('../../assets/employee-status1.csv').then(data => {
      this.employeeData = data;
    });
  }


  // onChange(event) {
  //   console.log(event.target.value);
  //   // alert(value);
  //   if (event.target.value === 'Stack') {
  //     this.getStackChart();
  //   } else if (event.target.value === 'Group') {
  //     this.getGroupChart();
  //   }
  // }

  getStackedGroupChart() {

    this.svg = d3
      .select('.stack-group-chart-container')
      .append('svg')
      .attr('width', 600)
      .attr('height', 600)
      .style('border', '1px solid steelblue');

    this.graph = this.svg
      .append('g')
      .attr('width', 600)
      .attr('height', 600);
    this.stack = d3.stack().keys(['2018', '2017', '2016', '2015']);
    this.stackSeries = this.stack(this.employeeData);

    this.yearKeys = this.employeeData.columns.slice(3);

    this.xScale = d3
      .scaleBand()
      .domain(this.employeeData.map(data => data.username))
      .range([0, 500]);

    this.x1Scale = d3
      .scaleLinear()
      .domain(this.yearKeys)
      .range([0, this.xScale.bandwidth()]);



    // this.getStackChart = () => {
      // Stack(y-axis)
      // this.yScale = d3
      //   .scaleLinear()
      //   .domain([
      //     0,
      //     d3.max(this.stackSeries[this.stackSeries.length - 1], d => +d[1])
      //   ])
      //   .nice()
      //   .range([500, 0]);

      this.graph
        .append('g')
        .attr('class', 'x-axis')
        .attr('transform', 'translate(50, 550)')
        .call(d3.axisBottom(this.xScale));



      // this.stackSubGraph = this.graph
      //   .selectAll('.stack-bar-subGraph')
      //   .data(this.stackSeries)
      //   .enter()
      //   .append('g')
      //   .attr('class', 'stack-bar-subGraph')
      //   .attr('transform', (d, i) => {
      //     return 'translate(65, 50)';
      //   })
      //   .attr('class', 'layer')
      //   .style('fill', (d, i) => {
      //     return this.color(i);
      //   });

      // // creation of rectangle bars in the layers
      // this.stackSubGraph
      //   .selectAll('.stack-chart-rect-bar')
      //   .data(function(d, i) {
      //     return d;
      //   })
      //   .enter()
      //   .append('rect')
      //   .attr('class', 'stack-chart-rect-bar')
      //   .attr('y', (d, i) => {
      //     return this.yScale(d[1]);
      //   })
      //   .attr('x', (d, i) => {
      //     return 35 + this.xScale(d.data.username);
      //   })
      //   .attr('width', 30)
      //   .attr('height', (d, i) => {
      //     return this.yScale(d[0]) - this.yScale(d[1]);
      //   });
    // };

    // this.getGroupChart = () => {
      this.yScale = d3
        .scaleLinear()
        .domain([
          0,
          +d3.max(this.employeeData, data =>
            d3.max(this.yearKeys, key => data[+key])
          )
        ])
        .nice()
        .range([500, 0]);

        this.graph
        .append('g')
        .attr('class', 'y-axis')
        .attr('transform', 'translate(50, 50)')
        .call(d3.axisLeft(this.yScale));

      this.groupSubGraph = this.graph
        .selectAll('.group-bar-subGraph')
        .data(this.employeeData)
        .enter()
        .append('g')
        .attr('class', 'group-bar-subGraph')
        .attr('transform', data => {
          return `translate(${this.xScale(data.username)} , 50)`;
        });

      this.groupSubGraph
        .selectAll('.group-chart-rect-bar')
        .data(data =>
          this.yearKeys.map(key => {
            return { key: key, value: data[+key] };
          })
        )
        .enter()
        .append('rect')
        .attr('class', 'group-chart-rect-bar')
        .attr('width', 20)
        .attr('height', data => {
          return 500 - this.yScale(data.value);
        })
        .attr('x', (data, index) => {
          return this.xScale.bandwidth() / 2 + index * 25;
        })
        .attr('y', data => {
          return this.yScale(data.value);
        })
        .style('fill', data => {
          return this.color(data.key);
        });
    // };
  }
}
