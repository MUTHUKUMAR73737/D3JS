import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-grouped-bar-chart',
  templateUrl: './grouped-bar-chart.component.html',
  styleUrls: ['./grouped-bar-chart.component.css']
})
export class GroupedBarChartComponent implements OnInit {
  employeeData: any;
  svg: any;
  graph: any;
  xScale: any;
  yScale: any;
  x1Scale: any;
  x1ScaleBandwidth: number;
  subGraph: any;
  color = d3.scaleOrdinal(d3.schemeSet2);
  toolTip: any;
  legend: any;

  constructor() {}

  ngOnInit() {
    d3.json('../../assets/employee.json').then(data => {
      this.employeeData = data;
    });
  }

  getGroupChart() {
    d3
    .select('.group-bar-chart-container')
    .html('');

    // SVG element
    this.svg = d3
      .select('.group-bar-chart-container')
      .append('svg')
      .attr('class', 'group-chart-svg')
      .attr('width', 700)
      .attr('height', 600)
      .style('border', '1px solid steelblue');

    // Main graph inside SVG element
    this.graph = this.svg.append('g').attr('class', 'group-chart-main-graph');

    // Tooltip
    this.toolTip = d3
      .select('.group-bar-chart-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('display', 'none');

    // x-scale
    this.xScale = d3
      .scaleBand()
      .range([0, 500])
      .domain(this.employeeData.map(function(d) {
        return d.username;
      }));

    // x1-scale(grouping)
    this.x1Scale = d3
      .scaleLinear()
      .domain(this.employeeData[0].salary.map(function(d) {
        return d.year;
      }))
      .range([0, this.xScale.bandwidth()]);

    // y-scale
    this.yScale = d3
      .scaleLinear()
      .range([500, 0])
      .domain([
        0,
        d3.max(this.employeeData, function(item) {
          return d3.max(item['salary'], function(d) {
            return +d['value'];
          });
        })
      ]);

    // x-scale graph
    this.graph
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(50,' + 550 + ')')
      .call(d3.axisBottom(this.xScale));

    // y-scale graph
    this.graph
      .append('g')
      .attr('class', 'y axis')
      .attr('transform', 'translate(50,' + 50 + ')')
      .call(d3.axisLeft(this.yScale));

    // group graph
    this.subGraph = this.graph
      .selectAll('.group-chart-graph')
      .data(this.employeeData)
      .enter()
      .append('g')
      .attr('class', 'group-chart-graph')
      .attr('transform', d => {
        return 'translate(' + this.xScale(d.username) + ',50)';
      });

    // rectangle bar inside each group graph
    this.subGraph
      .selectAll('.group-chart-rect')
      .data(function(d) {
        return d.salary;
      })
      .enter()
      .append('rect')
      .attr('class', 'group-chart-rect')
      .attr('width', 15)
      .attr('x', (d, i) => {
        return this.xScale.bandwidth() / 2 + i * 20 + 5;
      })
      .style('fill', d => this.color(d.year))
      .attr('y', d => this.yScale(d.value))
      .attr('y', d => this.yScale(0))
      .attr('height', d => 500 - this.yScale(0))
      .on('mouseover', (d, i, nodes) => {
        this.toolTip.style('opacity', '1').classed('tooltip', true);
        // Select current node from arrow function
        d3.select(nodes[i]).style('fill', data => {
          this.toolTip
            .html(`<div>Salary: ${data['value']}</div>`)
            .style('left', `${d3.event.layerX - 10}px`)
            .style('top', `${d3.event.layerY + 10}px`)
            .style('display', 'inline');
          return 'yellowgreen';
        });
      })
      .on('mouseout', (d, i) => {
        d3.selectAll('.group-chart-graph')
          .selectAll('.group-chart-rect')
          .filter((data, index) => {
            if (index === i) {
              return true;
            } else {
              return false;
            }
          })
          .style('fill', data => {
            return `${this.color(data['year'])}`;
          });
        this.toolTip.style('opacity', '0');
      });

    // rectangle bar arrival animation
    this.subGraph
      .selectAll('rect')
      .transition()
      .delay(d => Math.random() * 1000)
      .duration(2000)
      .ease(d3.easeLinear)
      .attr('y', d => this.yScale(d.value))
      .attr('height', d => 500 - this.yScale(d.value));

    // legendary label graph
    this.legend = this.graph
      .append('g')
      .attr('class', 'group-chart-main-graph-legend')
      .attr('transform', 'translate(0, 30)')
      .selectAll('.group-chart-legend-sample')
      .data(this.employeeData[0].salary.map(data => data.year))
      .enter()
      .append('g')
      .attr('class', 'group-chart-legend-sample')
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * 20 + ')';
      })
      .style('opacity', '0');

    // legend - rectangle bar
    this.legend
      .append('rect')
      .attr('x', 600 - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', d => this.color(d));

    // legend - text
    this.legend
      .append('text')
      .attr('x', 600 - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(function(d) {
        return d;
      });

    // legendary label animation
    this.legend
      .transition()
      .duration(3000)
      .delay(function(d, i) {
        return 1300 + 100 * i;
      })
      .style('opacity', '1');
  }
}
