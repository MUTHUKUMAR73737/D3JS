import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  pieChartData = new Array();
  pie: any;
  arc: any;
  arcs: any;
  svg: any;
  employeeData: any;
  // tslint:disable-next-line:no-inferrable-types
  width: number = 400;
  // tslint:disable-next-line:no-inferrable-types
  height: number = 400;
  color = d3.scaleOrdinal(d3.schemeSet2);
  radius = Math.min(this.height, this.width) / 2;
  graph: any;
  toolTip: any;
  employeeName = [];
  legendary: any;
  dist: any;
  x: any;
  y: any;
  constructor() {}

  ngOnInit() {
    d3.csv('../../assets/employee1.csv').then(data => {
      this.employeeData = data;
    });
  }

  getPieChart() {
    for (const employee of this.employeeData) {
      this.pieChartData.push(employee.salary);
    }

    for (const employee of this.employeeData) {
      this.employeeName.push(employee.username);
    }

    this.svg = d3
      .select('.pie-chart-container')
      .append('svg')
      .attr('width', 800)
      .attr('height', 500)
      .style('border', '1px solid steelblue');

    this.legendary = d3
      .select('.pie-chart-container')
      .select('svg')
      .append('g')
      .attr('class', 'pie-legend-main-graph')
      .attr('width', '300px')
      .attr('height', '300px')
      .attr('transform', 'translate(550 30)');

    d3.selectAll('.pie-legend-main-graph')
      .selectAll('.pie-chart-legend')
      .data(this.employeeName)
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return `translate (0, ${i * 35})`;
      })
      .attr('class', 'pie-chart-legend')
      .append('text')
      .text(function(d) {
        return d;
      })
      .attr('x', '0px')
      .attr('y', function(d, i) {
        return 10;
      });

    d3.selectAll('.pie-chart-legend')
      .append('rect')
      .attr('x', '90px')
      .attr('width', `15px`)
      .attr('height', '15px')
      .style('border', '1px solid lightgray')
      .attr('fill', (d, i) => {
        return this.color(`${i}`);
      });

    this.toolTip = d3
      .select('.pie-chart-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('display', 'none');

    this.graph = this.svg
      .append('g')
      .attr('class', 'pie-chart-graph')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    this.pie = d3.pie();

    this.arc = d3
      .arc()
      .innerRadius(this.radius - 50)
      .outerRadius(this.radius);

    this.arcs = this.graph
      .selectAll('.arc-container')
      .data(this.pie(this.pieChartData))
      .enter()
      .append('g')
      .attr('class', 'arc-container');

    this.arcs
      .append('path')
      .attr('fill', (data, index) => {
        return this.color(index);
      })
      .attr('d', this.arc)
      .on('mouseover', (data1, index1) => {
        // console.log(data1);
        this.toolTip.style('opacity', 1).classed('tooltip', true);
        d3.selectAll('.arc-container').filter((d, i) => {
          if (index1 === i) {
            this.toolTip
              .html(`<div>Salary: ${data1.data}</div>`)
              .style('left', `${d3.event.layerX - 10}px`)
              .style('top', `${d3.event.layerY + 10}px`)
              .style('display', 'inline');
            return true;
          } else {
            return null;
          }
        })
        .transition().duration(500).attr('transform', 'translate(50, 0)');

      })
      .on('mouseout', (data, index) => {
        d3.select('.tooltip').style('display', 'none');
        d3.selectAll('.arc-container')
          .transition()
          .duration(500)
          .attr('transform', 'translate(0, 0)');
      });
  }
}
