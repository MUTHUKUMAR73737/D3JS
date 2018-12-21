import { Component, OnInit } from '@angular/core';

import * as d3 from 'd3';

@Component({
  selector: 'app-svg-vertical-bar-chart-sample',
  templateUrl: './svg-vertical-bar-chart-sample.component.html',
  styleUrls: ['./svg-vertical-bar-chart-sample.component.css']
})
export class SvgVerticalBarChartSampleComponent implements OnInit {
  // Creation of SVG element
  svg: any;
  // Salary array
  salary = [];
  // X axis scale
  xScale: any;
  // Y axis scale
  yScale: any;
  // Graph element
  g: any;
  // Tooltip element
  toolTip: any;
  // Document data array
  documentData = [];

  constructor() {}

  ngOnInit() {}

  async getAllUser() {
    // Data loading
    this.documentData = await d3.csv('../../assets/employee.csv');
    //  insertion of salary details from loaded data
    for (const data of this.documentData) {
      this.salary.push(data.salary);
    }

    // SVG element creation
    this.svg = d3
      .select('.vertical-chart-container')
      .append('svg')
      .attr('class', 'bar-chart-svg')
      .attr('width', '800')
      .attr('height', '600')
      .style('border', '1px solid steelblue');

    // Tooltip element definition
    this.toolTip = d3
      .select('.vertical-chart-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('display', 'none');

    // set up user co-ordinate system for SVG
    this.svg = d3
      .select('.vertical-chart-container')
      .select('svg')
      .attr('viewBox', '0 0 800 600');

    // Append title header in the SVG
    this.svg
      .append('text')
      .attr('transform', 'translate(300,0)')
      .attr('x', 0)
      .attr('y', 50)
      .attr('font-size', '24px')
      .text('Name vs Salary');

    // X-Axis scale
    this.xScale = d3
      .scaleBand()
      .range([0, 700])
      .domain(this.documentData.map(data => data.username))
      .padding(0.5);
    // Y-Axis scale
    this.yScale = d3
      .scaleLinear()
      .domain([0, d3.max(this.salary)])
      .range([500, 0]);
    // Main Graph element creation
    this.g = this.svg
      .append('g')
      .attr('width', '800')
      .attr('height', '600')
      .attr('transform', 'translate(0, 0)');
    // insert x-axis into the graph scale
    this.g
      .append('g')
      .attr('transform', 'translate(50,550)')
      .call(d3.axisBottom(this.xScale));

    // insert y-axis into the graph scale
    this.g
      .append('g')
      .attr('transform', 'translate(49, 50 )')
      .call(d3.axisLeft(this.yScale));
    // rectangle bar creation
    this.g
      .append('g')
      .attr('class', 'top-bar')
      .attr('transform', 'translate(50, 50)')
      .selectAll('.vertical-bar')
      .data(this.documentData)
      .enter()
      .append('rect')
      .attr('class', 'vertical-bar')
      .on('mouseover', (data, index) => {
        this.fillOrangeColor(data, index);
        d3.selectAll('.vertical-bar')
          .filter(function(this, d, i) {
            if (index === i) {
              return true;
            } else {
              return false;
            }
          })
          .style('fill', 'orange');
      })
      .on('mouseout', this.fillBlueColor)
      .attr('x', d => this.xScale(d.username))
      .attr('y', d => this.yScale(d.salary))
      .attr('width', 20)
      .attr('height', d => 500 - this.yScale(d.salary))
      .style('fill', 'steelblue');
  }
  //  onMouseOver event
  fillOrangeColor(data, index) {
    this.toolTip.style('opacity', 1).classed('tooltip', true);
    this.toolTip
      .html(`Salary: <span>${data.salary}</span>`)
      .style('left', `${d3.event.layerX - 10}px`)
      .style('top', `${d3.event.layerY + 10}px`)
      .style('display', 'inline');
  }

  // onMouseOut event
  fillBlueColor(data, index) {
    d3.selectAll('.vertical-bar')
    .filter(function(this, d, i) {
      if (index === i) {
        return true;
      } else {
        return false;
      }
    })
    .style('fill', 'steelblue');
    d3.select('.tooltip').style('display', 'none');
  }
}
