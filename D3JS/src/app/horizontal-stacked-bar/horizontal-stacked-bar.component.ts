import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-horizontal-stacked-bar',
  templateUrl: './horizontal-stacked-bar.component.html',
  styleUrls: ['./horizontal-stacked-bar.component.css']
})
export class HorizontalStackedBarComponent implements OnInit {
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

  constructor() {}

  ngOnInit() {}

  async getHorizontalStackedBarChart() {
    this.employeeData = await d3.csv('../../assets/employee-status.csv');

    //  Stack shape
    this.stack = d3
      .stack()
      .keys(['2018', '2017', '2016', '2015']);

    // Shape output
    this.stackSeries = this.stack(this.employeeData);

    console.log(this.stackSeries);

    // SVG element
    this.svg = d3
      .select('.horizontal-stacked-bar-chart')
      .append('svg')
      .attr('class', 'horizontal-stack-bar-svg')
      .style('margin', '5px')
      .attr('width', 800)
      .attr('height', 600)
      .style('border', '1px solid steelblue');
// User view port
    this.svg = d3
      .select('.horizontal-stack-bar-svg')
      .attr('viewBox', '0 0 800 600');

    // Tooltip element
    this.toolTip = d3
      .select('.horizontal-stacked-bar-chart')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('display', 'none');

      // y-scale
    this.yScale = d3
      .scaleBand()
      .range([0, 500])
      .domain(this.employeeData.map(data => data.username))
      .padding(0.5);

      // x-scale
    this.xScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(this.stackSeries[this.stackSeries.length - 1], d => +d[1])
      ])
      .nice()
      .range([0, 600]);

    // Main Graph
    this.graph = this.svg
      .append('g')
      .attr('width', '800')
      .attr('height', '800')
      .attr('transform', 'translate(0, 0)');

      // legend
    this.legendary = d3
      .select('.horizontal-stack-bar-svg')
      .append('g')
      .attr('class', 'horizontal-stack-main-graph')
      .attr('width', '300px')
      .attr('height', '300px')
      .attr('transform', 'translate(650 70)');


// legend bars and text
    d3.selectAll('.horizontal-stack-main-graph')
      .selectAll('.horizontal-stack-bar-legend')
      .data(['2018-Salary', '2017-Salary', '2016-Salary', '2015-Salary'])
      .enter()
      .append('g')
      .attr('transform', function(d, i) {
        return `translate (0, ${i * 35})`;
      })
      .attr('class', 'horizontal-stack-bar-legend')
      .append('text')
      .text(function(d) {
        return d;
      })
      .attr('x', '0px')
      .attr('y', function(d, i) {
        return 22;
      });

    d3.selectAll('.horizontal-stack-bar-legend')
      .append('rect')
      .attr('x', '90px')
      .attr('width', `30px`)
      .attr('height', '30px')
      .attr('fill', (d, i) => {
        return this.color(`${i}`);
      });

    //  x-axis scale
    this.graph
      .append('g')
      .attr('transform', 'translate(50,50)')
      .call(d3.axisTop(this.xScale));

    // y-axis scale
    this.graph
      .append('g')
      .attr('transform', 'translate(49, 50 )')
      .call(d3.axisLeft(this.yScale));

      // stack layer
    this.layer = this.graph
      .selectAll('.horizontal-layer')
      .data(this.stackSeries)
      .enter()
      .append('g')
      .attr('transform', 'translate(50, 50 )')
      .attr('class', 'horizontal-layer')
      .style('fill', (d, i) => {
        return this.color(i);
      });

      // stack bar
    this.layer
      .selectAll('.horizontal-stack-bar')
      .data(function(d, i) {
        return d;
      })
      .enter()
      .append('rect')
      .attr('class', 'horizontal-stack-bar')
      .attr('x', (d, i) => {
        return this.xScale(d[0]);
      })
      .attr('y', (d, i) => {
        return this.yScale(d.data.username);
      })
      .attr('height', 30)
      .attr('width', (d, i) => {
        return this.xScale(d[1]) - this.xScale(d[0]);
      })
      .on('mouseover', (data, index) => {
        this.getToolTip(data, index);
      })
      .on('mouseout', (data, index) => {
        d3.select('.tooltip').style('display', 'none');
      });
  }

  // tooltip
  getToolTip(data, index) {
    this.toolTip.style('opacity', 1).classed('tooltip', true);
    d3.selectAll('.horizontal-stack-bar').filter((data1, index1) => {
      if (index === index1) {
        this.toolTip
          .html(
            `<div>Salary: ${data[1] - data[0]}</div>
            `
          )
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
