import { Component, OnInit, ElementRef } from '@angular/core';

import * as d3 from 'd3';
import { EmployeeModel } from '../model/employee.model';
import { CONTEXT } from '@angular/core/src/render3/interfaces/view';
import { schemeSet3 } from 'd3';

@Component({
  selector: 'app-vertical-bar-chart',
  templateUrl: './vertical-bar-chart.component.html',
  styleUrls: ['./vertical-bar-chart.component.css']
})
export class VerticalBarChartComponent implements OnInit {
  // data: D
  // Creation of SVG element
  svg: any ;
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
  // sorting
  sortOrder: any = null;


  employeeModel: EmployeeModel[] = [];
  line: any;
  linePlot: any;
  pathAnimation: any;
  pathLength: any;

  constructor() {}

  ngOnInit() {
    d3.csv('../../assets/employee.csv').then(data => {
      for (const employee of data) {
        const employeeModel = new EmployeeModel();
        employeeModel.employeeData(employee.username, employee.id, employee.domain, employee.salary);
        this.employeeModel.push(employeeModel);
      }
    });
  }

   getAllUser() {

    d3.select('.vertical-chart-container').append('select').attr('class', 'order-selection');
    d3.select('.vertical-chart-container').select('.order-selection').append('option').text('Ascending').attr('value', 'Ascending');
    d3.select('.vertical-chart-container').select('.order-selection').append('option').text('Descending').attr('value', 'Descending');

    d3.select('.vertical-chart-container').append('br');

    d3.select('.vertical-chart-container').select('select').on('change', (baseData, baseIndex, nodes) => {
          d3.select('.vertical-chart-container').select('svg').remove();
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
          .style('opacity', 0);

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
          .padding(0.5);
        // Y-Axis scale
        this.yScale = d3
          .scaleLinear()
          .domain([0, d3.max(this.employeeModel.map (data => data._salary))])
          .range([500, 0]);

          // Sorting rectangle bars
          if (d3.select(nodes[baseIndex]).property('value') === 'Ascending') {
            this.sortOrder  = this.employeeModel.sort((a, b) => {
                return d3.ascending(a._salary.toString(), b._salary.toString());
            });
            // console.log(this.sortOrder);
          } else if (d3.select(nodes[baseIndex]).property('value') === 'Descending') {
            this.sortOrder = this.employeeModel.sort((a, b) => {
              return d3.descending(a._salary.toString(), b._salary.toString());
            });
            // console.log(this.sortOrder);
          }

          this.yScale.domain([0, d3.max(this.sortOrder.map (data => data._salary))]);

          this.xScale.domain(this.employeeModel.map((d) => {
            return d._username;
          }));



          // Sorting x-axis
          // if (d3.select(nodes[baseIndex]).property('value') === 'Ascending') {
          //   this.sortOrder  = this.employeeModel.sort((a, b) => {
          //       return d3.ascending(a._username.toString(), b._username.toString());
          //   });
          //   console.log(this.sortOrder);
          // } else if (d3.select(nodes[baseIndex]).property('value') === 'Descending') {
          //   this.sortOrder = this.employeeModel.sort((a, b) => {
          //     return d3.descending(a._username.toString(), b._username.toString());
          //   });
          //   console.log(this.sortOrder);
          // }

          //     this.xScale.domain(this.sortOrder.map((d) => {
          //       return d._username;
          //     }));

              this.line = d3
              .line()
              .x(data => {
                return this.xScale(data['_username']) + 10;
              })
              .y(data => this.yScale(data['_salary']));

            this.linePlot = this.line(this.employeeModel);


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

            this.pathAnimation = this.g
              .append('path')
              .attr('transform', 'translate(50, 50)')
              .datum(this.employeeModel)
              .attr('fill', 'none')
              .attr('stroke', 'yellowgreen')
              .attr('stroke-width', 1.5)
              .attr('d', this.linePlot);

            this.pathLength = this.pathAnimation.node().getTotalLength();

            // line plot animation
            this.pathAnimation
              .attr('stroke-dasharray', this.pathLength + ' ' + this.pathLength)
              .attr('stroke-dashoffset', this.pathLength)
              .transition()
              .delay(3000)
              .duration(5000)
              .ease(d3.easeLinear)
              .attr('stroke-dashoffset', 0);



            // rectangle bar creation
            this.g
              .append('g')
              .attr('class', 'top-bar')
              .attr('transform', 'translate(50, 50)')
              .selectAll('.vertical-bar')
              .data(this.employeeModel)
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
              .attr('x', d => this.xScale(d._username))
              .attr('y', d => this.yScale(0))
              .attr('width', 20)
              .attr('height', d => 500 - this.yScale(0))
              .style('fill', 'steelblue');

            this.g
              .selectAll('rect')
              .transition()
              .ease(d3.easeLinear)
              .delay(d => Math.random() * 1000)
              .duration(2000)
              .attr('y', d => this.yScale(d._salary))
              .attr('height', d => 500 - this.yScale(d._salary));
      });
  }

  //  onMouseOver event
  fillOrangeColor(data, index) {
    this.toolTip.style('opacity', 1).classed('tooltip1', true);
    this.toolTip
      .html(
        `
      <div class='header'><h4>SALARY</h4></div>
  <div class='tip'><h6>Year - 2018</h6><h5>${data.salary}</h5></div>
  <div class='tip'><h6>Year - 2017</h6><h5>8500</h5></div>
  <div class='tip'><h6>Year - 2016</h6><h5>6000</h5></div>
      `
      )
      .style('left', `${d3.event.offsetX + 5}px`)
      .style('top', `${d3.event.offsetY + 50}px`)
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
    d3.select('.tooltip1').style('display', 'none');
  }

}
