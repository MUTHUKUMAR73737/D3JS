import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
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
  legendary: any;
  dist: any;
  x: any;
  y: any;
  animatedArc: any;

  constructor() {}

  ngOnInit() {
    d3.csv('../../assets/employee1.csv').then(data => {
      this.employeeData = data;
    });
  }

  getPieChart() {

    d3.select('.pie-chart-container').html(' ');

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
      .data(this.employeeData.map(data => data.username))
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return `translate (0, ${i * 35})`;
      })
      .attr('class', 'pie-chart-legend')
      .append('text')
      .text(function(d) {
        return d.toString();
      })
      .attr('x', '0px')
      .attr('y', function(d, i) {
        return 10;
      });

    d3.selectAll('.pie-chart-legend')
      .append('rect')
      .attr('x', '80px')
      .attr('width', `15px`)
      .attr('height', '15px')
      .attr('rx', '7.5px')
      .attr('ry', '7.5px')
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

    this.pie = d3.pie().padAngle(0.01);

    this.arc = d3
      .arc()
      .innerRadius(this.radius - 100)
      .outerRadius(this.radius - 50);
      this.animatedArc = d3
      .arc()
      .innerRadius(this.radius - 80)
      .outerRadius(this.radius - 30 );

    this.arcs = this.graph
      .selectAll('.arc-container')
      .data(this.pie(this.employeeData.map(data => data.salary)))
      .enter()
      .append('g')
      .attr('class', 'arc-container');

    this.arcs
      .append('path')
      .attr('fill', (data, index) => {
        return this.color(index);
      })
      .attr('d', this.arc)
      .on('mouseover', (data1, index1, nodes) => {
        d3.select(nodes[index1]).transition().duration(2000).attr('d', this.animatedArc);
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
        });
      })
      .on('mouseout', (data, index, nodes) => {
        d3.select(nodes[index]).transition().delay(500).duration(1000).attr('d', this.arc);
        d3.select('.tooltip').style('display', 'none');
        d3.selectAll('.arc-container')
          .transition()
          .duration(500)
          .attr('transform', 'translate(0, 0)');
      });
  }
}
