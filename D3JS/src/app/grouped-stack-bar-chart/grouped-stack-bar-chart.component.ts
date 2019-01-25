import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-grouped-stack-chart',
  templateUrl: './grouped-stack-bar-chart.component.html',
  styleUrls: ['./grouped-stack-bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class GroupedStackChartComponent implements OnInit {
  employeeData: any;
  svg: any;
  graph: any;
  xScale: any;
  yScale: any;
  x1Scale: any;
  subGraph2017: any;
  subGraph2018: any;
  stack: any;
  stack1: any;
  stackSeries1: any;
  stackSeries: any;
  peakElement: any;
  color = d3.scaleOrdinal(d3.schemeSet2);
  color1 = d3.scaleOrdinal(d3.schemeCategory10);
  yearKeys2018: any;
  yearKeys2017: any;
  mainGraph: any;
  toolTip: any;
  legend: any;
  constructor() {}

  ngOnInit() {
    d3.csv('../../assets/employee5.csv').then(data => {
      this.employeeData = data;
    });
  }

  getGroupedStackChart() {
    d3
    .select('.grouped-stack-chart-container')
    .html('');

    // 2018 year - keys separation(Eg- Jan 2018, Feb 2018, Mar 2018)
    this.yearKeys2018 = this.employeeData.columns.slice(1, 4);
    // 2017 year - keys separation
    this.yearKeys2017 = this.employeeData.columns.slice(4);

    // SVG element
    this.svg = d3
      .select('.grouped-stack-chart-container')
      .append('svg')
      .attr('width', 700)
      .attr('height', 600)
      .style('border', '1px solid steelblue');

    // Main graph
    this.graph = this.svg.append('g').attr('class', 'group-chart-main-graph');

    // Stack shape - salary(2018 - year)
    this.stack = d3.stack().keys(['Jan 2018', 'Feb 2018', 'Mar 2018']);
    // Stack shape - salary(2018 - year)
    this.stack1 = d3.stack().keys(['Jan 2017', 'Feb 2017', 'Mar 2017']);

    // output of each year salary details
    this.stackSeries1 = this.stack1(this.employeeData);
    this.stackSeries = this.stack(this.employeeData);

    // console.log(this.employeeData);
    // console.log(this.stackSeries);
    // console.log(this.stackSeries1);

    // Peak element(salary) from 2018 and 2017 details
    if (
      d3.max(this.stackSeries[this.stackSeries.length - 1], data => +data[1]) >=
      d3.max(this.stackSeries1[this.stackSeries1.length - 1], data => +data[1])
    ) {
      this.peakElement = d3.max(
        this.stackSeries[this.stackSeries.length - 1],
        data => +data[1]
      );
    } else {
      this.peakElement = d3.max(
        this.stackSeries1[this.stackSeries1.length - 1],
        data => +data[1]
      );
    }

    // x-scale
    this.xScale = d3
      .scaleBand()
      .domain(this.employeeData.map(data => data.username))
      .range([0, 500])
      .paddingInner(0.3)
      .paddingOuter(0.1);

    // x1-scale
    this.x1Scale = d3
      .scaleLinear()
      .domain([2017, 2018])
      .range([0, this.xScale.bandwidth()]);

    //  console.log(this.x1Scale(2017));
    //  console.log(this.x1Scale(2018));
    //  console.log(this.xScale.bandwidth());

    // y-scale
    this.yScale = d3
      .scaleLinear()
      .domain([0, this.peakElement])
      .range([500, 0])
      .nice();

    // tooltip
    this.toolTip = d3
      .select('.grouped-stack-chart-container')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('display', 'none');

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

    // salary stacked graph(year - 2018)
    this.subGraph2018 = this.graph
      .selectAll('.layer')
      .data(this.stackSeries)
      .enter()
      .append('g')
      .attr('transform', d => {
        return `translate(${50 + this.x1Scale(2018) / 2}, 50 )`;
      })
      .attr('class', 'layer')
      .style('fill', (d, i) => {
        return this.color(i);
      });
    // stack bar creation for salary(year - 2018)
    this.subGraph2018
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
        return this.xScale(d.data.username);
      })
      .attr('width', this.xScale.bandwidth() / 2 - 2)
      .attr('height', (d, i) => {
        return this.yScale(d[0]) - this.yScale(d[1]);
      })
      .on('mouseover', (data, index, nodes) => {
        d3.select(nodes[index]).attr('fill', d => {
          this.toolTip.style('opacity', 1).classed('tooltip', true);
          this.toolTip
            .html(
              `<div>Salary: ${data[1] - data[0]}</div>
              `
            )
            .style('left', `${d3.event.layerX - 10}px`)
            .style('top', `${d3.event.layerY + 10}px`)
            .style('display', 'inline');
          return null;
        });
      })
      .on('mouseout', (data, index, nodes) => {
        d3.select(nodes[index]).attr('fill', d => {
          this.toolTip.style('opacity', 0);
          return null;
        });
      });

    // salary stack graph (year - 2017)
    this.subGraph2017 = this.graph
      .selectAll('.layer-2017')
      .data(this.stackSeries1)
      .enter()
      .append('g')
      .attr('transform', d => {
        return `translate(${50 + this.x1Scale(2017) / 2}, 50 )`;
      })
      .attr('class', 'layer-2017')
      .style('fill', (d, i) => {
        // console.log(d);
        return this.color1(i);
      });
    // stack bar creation for salary(year - 2017)
    this.subGraph2017
      .selectAll('.stack-bar-2017')
      .data(function(d, i) {
        return d;
      })
      .enter()
      .append('rect')
      .attr('class', 'stack-bar-2017')
      .attr('y', (d, i) => {
        return this.yScale(d[1]);
      })
      .attr('x', (d, i) => {
        return this.xScale(d.data.username);
      })
      .attr('width', this.xScale.bandwidth() / 2 - 2)
      .attr('height', (d, i) => {
        return this.yScale(d[0]) - this.yScale(d[1]);
      })
      .on('mouseover', (data, index, nodes) => {
        d3.select(nodes[index]).attr('fill', d => {
          this.toolTip.style('opacity', 1).classed('tooltip', true);
          this.toolTip
            .html(
              `<div>Salary: ${data[1] - data[0]}</div>
              `
            )
            .style('left', `${d3.event.layerX - 10}px`)
            .style('top', `${d3.event.layerY + 10}px`)
            .style('display', 'inline');
          return null;
        });
      })
      .on('mouseout', (data, index, nodes) => {
        d3.select(nodes[index]).attr('fill', d => {
          this.toolTip.style('opacity', 0);
          return null;
        });
      });
    // legend graph for salary(year - 2018)
    this.legend = this.graph
      .append('g')
      .attr('class', 'group-stack-chart-main-graph-legend')
      .attr('transform', 'translate(0, 30)')
      .selectAll('.group-stack-chart-legend-sample')
      .data(this.stackSeries)
      .enter()
      .append('g')
      .attr('class', 'group-chart-legend-sample')
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * 20 + ')';
      })
      .style('opacity', '0');
    //  legend rectangle bar
    this.legend
      .append('rect')
      .attr('x', 600 - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', (d, i) => this.color(i));
    //  legend text
    this.legend
      .append('text')
      .attr('x', 600 - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(function(d) {
        return d.key;
      });
    // legend - animation
    this.legend
      .transition()
      .duration(3000)
      .delay(function(d, i) {
        return 1300 + 100 * i;
      })
      .style('opacity', '1');

    // legend graph salary (year - 2017)
    this.legend = this.graph
      .append('g')
      .attr('class', 'group-stack-chart-main-graph-legend1')
      .attr('transform', 'translate(0, 90)')
      .selectAll('.group-stack-chart-legend-sample1')
      .data(this.stackSeries1)
      .enter()
      .append('g')
      .attr('class', 'group-chart-legend-sample1')
      .attr('transform', function(d, i) {
        return 'translate(0,' + i * 20 + ')';
      })
      .style('opacity', '0');
    // legend rectangle bar
    this.legend
      .append('rect')
      .attr('x', 600 - 18)
      .attr('width', 18)
      .attr('height', 18)
      .style('fill', (d, i) => this.color1(i));
    //  legend text
    this.legend
      .append('text')
      .attr('x', 600 - 24)
      .attr('y', 9)
      .attr('dy', '.35em')
      .style('text-anchor', 'end')
      .text(function(d) {
        return d.key;
      });
    //  legend animation
    this.legend
      .transition()
      .duration(6000)
      .delay(function(d, i) {
        return 1300 + 100 * i;
      })
      .style('opacity', '1');
  }
}
