import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';
import { Numeric } from 'd3';

@Component({
  selector: 'app-layer-donut-chart',
  templateUrl: './layer-donut-chart.component.html',
  styleUrls: ['./layer-donut-chart.component.css']
})
export class LayerDonutChartComponent implements OnInit {
  arc: any;

  arcs: any;

  graph: any;
  svg: any;
  pie: any;

  color = d3.scaleOrdinal(d3.schemeSet2);
  employeeData: any;
  donutChartData: any;

  // tslint:disable-next-line:no-inferrable-types
  layerRadius: number = 0;
  currentLayer: Boolean = false;

  width = 600;
  height = 500;
  radius = Math.min(this.height, this.width) / 2;

  legend: any;
  toolTip: any;
  constructor() {}

  ngOnInit() {
    d3.csv('../../assets/employee6.csv').then(data => {
      this.employeeData = data;
    });
  }

  getLayeredDonut() {
    // console.log(this.employeeData);

    this.donutChartData = [
      this.employeeData.map(data => data[2018]),
      this.employeeData.map(data => data[2017]),
      // [1600, 8000, 3000, 4000],
      // [1600, 8000, 3000, 4000],
    ];

    this.svg = d3
      .select('.layer-donut-container')
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .style('border', '1px solid steelblue');

    this.toolTip = d3
      .select('.layer-donut-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('display', 'none');

    this.graph = this.svg
      .selectAll('.donut-chart-graph')
      .data(this.donutChartData)
      .enter()
      .append('g')
      .attr('class', 'donut-chart-graph')
      .attr(
        'transform',
        `translate(${(this.width - 100) / 2}, ${this.height / 2})`
      );

    this.pie = d3.pie();

    this.arcs = this.graph
      .selectAll('.arc-container')
      .data((d, i) => {
        return this.pie(d);
      })
      .enter()
      .append('g')
      .attr('class', (d, i) => {
        return 'arc-container';
      });

    this.arcs
      .append('path')
      .attr('fill', (data, index) => {
        return this.color(index);
      })
      .attr('d', (d, i, j) => {
        if (i === 0 && !this.currentLayer) {
          this.currentLayer = true;
          this.layerRadius = this.layerRadius + 1;
        } else if (i === 0 && this.currentLayer) {
          this.layerRadius = this.layerRadius + 1.1;
        }
        return d3
          .arc()
          .outerRadius(this.radius - 40 * this.layerRadius)
          .innerRadius(this.radius - 40 * (this.layerRadius + 1))(d);
      })
      .on('mouseover', (data, index, nodes) => {
        this.toolTip.style('opacity', 1).classed('tooltip', true);
        d3.select(nodes[index]).style('fill', (d, i) => {
          // console.log(this.layerRadius);
          this.toolTip
          .html(`<div>Salary: ${data.data}</div>`)
          .style('left', `${d3.event.layerX - 10}px`)
          .style('top', `${d3.event.layerY + 10}px`)
          .style('display', 'inline');
          return null;
        });
      })
      .on('mouseout', (data, index, nodes) => {
        this.toolTip.style('opacity', 0).style('display', 'none');
      });

    this.legend = d3
      .select('.layer-donut-container')
      .select('svg')
      .append('g')
      .attr('class', 'layer-donut-legend-main-graph')
      .attr('width', '200px')
      .attr('height', '200px')
      .attr('transform', 'translate(500 30)');

    d3.selectAll('.layer-donut-legend-main-graph')
      .selectAll('.layer-donut-chart-legend')
      .data(this.employeeData.map(data => data.username))
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return `translate (0, ${i * 35})`;
      })
      .attr('class', 'layer-donut-chart-legend')
      .append('text')
      .text(function(d) {
        return d.toString();
      })
      .attr('x', '0px')
      .attr('y', function(d, i) {
        return 12;
      });

    d3.selectAll('.layer-donut-chart-legend')
      .append('rect')
      .attr('x', '60px')
      .attr('width', `15px`)
      .attr('height', '15px')
      .attr('rx', '7.5px')
      .attr('ry', '7.5px')
      .style('border', '1px solid lightgray')
      .attr('fill', (d, i) => {
        return this.color(`${i}`);
      });
  }
}
